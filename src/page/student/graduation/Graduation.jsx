import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/Spinner/Spinner";
import {
  CheckCircle,
  CloudUpload,
  EditOutlined,
  UploadFile,
  Visibility,
} from "@mui/icons-material";

import { toast } from "react-toastify";
import FinishService from "../../../components/FinishService/FinishService";
import DeleteStudentService from "../../../components/DeleteStudentService/DeleteStudentService";
import {
  dangKyXetTotNghiep,
  getCert,
  getDotXetTotNghiep,
  xetTotNghiep,
  xetTotNghiepInfo,
} from "../../../features/graduationSlice/GraduationSlice";

import { format } from "date-fns";
import CertificateModal from "./CertificateModal";
import AddCert from "../../../components/addCert/AddCert";
import ViewDetailCer from "../../../components/viewDetailCer/ViewDetailCer";
import UpdateCert from "../../../components/updateCert/UpdateCert";

const inputStyles = {
  "& .MuiInputBase-input": {
    fontSize: "15px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "8px",
    border: "3px solid #0085885a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all ease 0.4s",
    padding: "9px 14px",

    "&:hover": {
      borderColor: "#008588",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSvgIcon-root": {
    color: "green",
    backgroundSize: "cover",
  },
};

const selectStyles = {
  "&:focus": {
    borderRadius: "8px",
  },
  borderRadius: "8px",
  "& .MuiInputBase-input": {
    fontSize: "15px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "8px",
    border: "3px solid #0085885a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all ease 0.4s",
    padding: "9px 14px",
  },
  "& .MuiSvgIcon-root": {
    color: "#0085885a",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0085885a",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0085885a",
  },
  "& .MuiSelect-select:focus": {
    borderRadius: "8px",
    borderColor: "#008588",
  },
};
const columnsDK = [
  {
    field: "loaiChungChi",
    headerName: "Loại chứng chỉ",
    align: "center",
    minWidth: "220px",
  },
  {
    field: "theoQuyDinh",
    headerName: "Theo quy định",
    align: "left",
    minWidth: "200px",
  },
  { field: "daNop", headerName: "Đã nộp", align: "center" },
  { field: "xacNhan", headerName: "Xác nhận", align: "center" },
  // {
  //   field: "chungChiNgoai",
  //   headerName: "Tải Chứng chỉ ngoài",
  //   align: "center",
  // },
];
// Component TextFieldWrapper

const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle null or undefined dateString
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid date strings
  return format(date, "dd/MM/yyyy");
};
const tableCellBody = {
  border: "1px solid rgb(221, 221, 221)",
  color: "rgb(102, 117, 128)",
  fontSize: "14px",
  fontWeight: "500",
  textAlign: "center",
};
const CustomTable = ({
  columns,
  rows,
  renderRow,
  loading,
  customize,
  customizeCert,
}) => {
  const tableCellStyle = {
    fontWeight: "700",
    border: "1px solid rgba(224, 224, 224, 1)",
    fontSize: { xs: "13px", lg: "15px" },
    textAlign: "center",
    backgroundColor: "#008689", // Màu nền cho header
    color: "white",
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} sx={tableCellStyle}>
                {column}
              </TableCell>
            ))}
            {customize && <TableCell sx={tableCellStyle}>Cập nhật</TableCell>}
          </TableRow>
        </TableHead>
        {loading ? (
          <Spinner />
        ) : (
          <TableBody>
            {rows.map((row, index) => renderRow(row, index))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};
const TextFieldWrapper = ({
  name,
  value,
  onChange,
  label,
  type = "text",
  successAccess,
  placeholder,
}) => {
  // Xử lý thay đổi giá trị cho trường hợp loại ngày tháng

  const handleChange = (event) => {
    const newValue = event.target.value;

    // if (name === "schoolEmail" && !newValue.endsWith("@ut.edu.vn")) {
    //   alert("Email phải là @ut.edu.vn");
    //   return;
    // }
    onChange({ target: { name, value: newValue } });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
        {label}
      </Typography>
      <TextField
        name={name}
        value={value}
        onChange={handleChange}
        type={type}
        disabled={!successAccess}
        placeholder={placeholder}
        sx={{ ...inputStyles, width: "100%" }} // Adjust `inputStyles` as needed
      />
    </Box>
  );
};

const tableCell = [
  "STT",
  "Tên đợt",
  "Ngày yêu cầu",
  "Trạng thái",
  "Ngày xử lý",
  "Ghi chú",
  "Chi tiết",
];
const Graduation = () => {
  const dispatch = useDispatch();
  const nations = useSelector((state) => state.nation.nations) || [];
  const select = useSelector(
    (state) => state.graduation.getDotXetTotNghiep?.body
  );
  const profile = useSelector(
    (state) => state.graduation.xetTotNghiepInfo?.body
  );
  const receipts = useSelector((state) => state.graduation.xetTotNghiep?.body);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const cert = useSelector((state) => state.graduation.getCert?.body);
  const [semester, setSemester] = useState(0);
  const [formDataFile, setFormDataFile] = useState([]); // Lưu trữ file chứng chỉ ngoài
  const [ids, setIds] = useState([]); // Khởi tạo ids là mảng rỗng
  const [selectedChungChiList, setSelectedChungChiList] = useState([]);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [selectedCertId, setSelectedCertId] = useState(null);
  const [currentCert, setCurrentCert] = useState(null); // Quản lý chứng chỉ hiện tại
  const [idCertUpdate, setIdCertUpdate] = useState(null);
  const certUpdated =
    useSelector((state) => state.graduation.xetTotNghiep.body?.chungChi) || [];
  const handleOpenCertModal = (id) => {
    setSelectedCertId(id); // Lưu id của phiếu đăng ký thành công
    setOpenModalDetail(true); // Mở modal
  };

  const handleCloseModal = () => {
    setOpenModalDetail(false); // Đóng modal
    setSelectedCertId(null); // Xóa id khi đóng modal
  };
  const successAccess = false;

  const handleOpenModal = (chungChiList, cert) => {
    setSelectedChungChiList(chungChiList);
    setCurrentCert(cert); // Cập nhật chứng chỉ hiện tại
    setOpenModal(true);
  };
  const handleOpenModalUpdateCert = (id) => {
    setIdCertUpdate(id);
    setOpenModalUpdateCert(true);
  };
  useEffect(() => {
    dispatch(getCert());
    dispatch(xetTotNghiep(semester));
    dispatch(xetTotNghiepInfo());
    dispatch(getDotXetTotNghiep());
    // dispatch()
  }, [dispatch, semester]);
  useEffect(() => {
    // Nếu danh sách đợt xét không rỗng, tự động chọn đợt xét đầu tiên
    if (select && select.length > 0) {
      setSemester(select[0].id); // Chọn đợt xét đầu tiên trong danh sách
    }
  }, [select]);
  const handleChange = (event) => {
    setSemester(event.target.value);
  };

  // Trong handleFileChange, cập nhật ids dưới dạng mảng

  const loading = useSelector((state) => state.graduation?.loading);
  const message = useSelector((state) => state.graduation?.message);
  const success = useSelector((state) => state.graduation?.success);
  const timestamp = useSelector((state) => state.graduation?.timestamp);
  useEffect(() => {
    if (!loading && timestamp) {
      if (message && success) {
        toast.success(message);
        // Reset form values to empty after success
      } else if (!success) {
        toast.error(message);
      }
      setEmail("");
      setPhone("");
      setFormDataFile([]);
      setIds([]);
    }
  }, [loading, message, success, timestamp]);
  const [certificates, setCertificates] = useState([]); // Danh sách chứng chỉ

  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdateCert, setOpenModalUpdateCert] = useState(false);

  const handleAddCert = (newCert) => {
    setCertificates((prevCertificates) => {
      // Kiểm tra xem chứng chỉ đã tồn tại chưa
      const existingCertIndex = prevCertificates.findIndex(
        (cert) => cert.idchungchi === newCert.idchungchi
      );

      if (existingCertIndex !== -1) {
        // Nếu chứng chỉ đã tồn tại, cập nhật thông tin
        const updatedCertificates = [...prevCertificates];
        updatedCertificates[existingCertIndex] = newCert;
        return updatedCertificates;
      } else {
        // Nếu chứng chỉ chưa tồn tại, thêm vào danh sách
        return [...prevCertificates, newCert];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const chungchiList = certificates.map((cert) => ({
      idChungChi: cert.idchungchi,
      ngayCap: cert.ngayCap,
      nguoiCap: cert.nguoiCap,
      soHieu: cert.soHieu,
      soVaoSo: cert.soVaoSo,
      noiCap: cert.noiCap,
      soSeri: cert.soSeri,
    }));

    const proofs = certificates.map((cert) => cert.fileChungChi); // Danh sách file ảnh

    // Tạo payload JSON
    const jsonPayload = JSON.stringify({
      email,
      phone,
      chungChiList: chungchiList, // Danh sách thông tin chứng chỉ
    });

    const formData = new FormData();

    // Append các giá trị vào FormData
    formData.append(
      "chungChi",
      new Blob([jsonPayload], { type: "application/json" })
    );

    // Append each file without index
    proofs.forEach((proof) => {
      formData.append("proofs", proof); // Append mỗi file vào cùng khóa "proofs"
    });

    formData.append("idDot", semester);

    // Dispatch form data for API submission
    dispatch(dangKyXetTotNghiep({ formData, semester }));
  };
  const columnsCert = [
    "STT",
    "Tên chứng chỉ",
    "Ngày cấp",
    "Người cấp",
    "Số hiệu",
    "Số vào sổ",
    "Nơi cấp",
    "Số seri",
    "Xem chi tiết",
  ];
  const columnsHistory = [
    "STT",
    "Tên đợt",
    "Ngày yêu cầu",
    "Trạng thái",
    "Ngày xử lý",
    "Ghi chú",
  ];
  const genders = [
    {
      id: false,
      name: "Nam",
    },
    {
      id: true,
      name: "Nữ",
    },
  ];
  const personalFields = [
    { name: "maSinhVien", label: "Mã số sinh viên", lg: 2 },
    { name: "hoDem", label: "Họ đệm", lg: 3 },
    { name: "ten", label: "Tên", lg: 2 },
    { name: "lopHoc", label: "Lớp", lg: 1.5 },
    {
      name: "gioiTinh",
      label: "Giới tính",
      lg: 1.5,
      type: "select",
      options: genders,
    },
    {
      name: "ngaySinh2",
      label: "Ngày sinh",
      lg: 2,
      placeholder: "Ví dụ: 04/02/2006",
    },
    { name: "danToc", label: "Dân tộc", lg: 2 },
    { name: "tonGiao", label: "Tôn giáo", lg: 2 },
    { name: "queQuanTinh", label: "Quê quán Tỉnh (CCCD)", lg: 2 },
    { name: "noiSinhTinh", label: "Nơi sinh Tỉnh", lg: 2 },
    { name: "soCMND", label: "Căn cước công dân", lg: 2 },
    { name: "quocTich", label: "Quốc tịch", lg: 2, options: nations },
    { name: "email", label: "Email cá nhân", lg: 4 },
    {
      name: "schoolEmail",
      label: "Email liên lạc khác",
      lg: 4,
      editable: true,
    },
    { name: "soDienThoai", label: "Số điện thoại", lg: 2 },
    {
      name: "soDienThoaiKhac",
      label: "SĐT liên lạc khác",
      lg: 2,
      editable: true,
    },
  ];
  return (
    <Container>
      <Paper
        elevation={14}
        sx={{
          borderRadius: "10px",
          padding: { xs: "5px", lg: "20px" },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            margin: "15px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Divider
              orientation="vertical"
              sx={{
                color: "red",
                border: "3px solid",
                height: "20px",
                marginRight: "5px",
              }}
            />
            <Typography
              sx={{ color: "#008588", fontWeight: "700", fontSize: "16px" }}
            >
              Phiếu đăng ký xét tốt nghiệp
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box>
            <FormControl variant="outlined">
              <Select
                value={semester}
                onChange={handleChange}
                displayEmpty
                sx={{
                  "& .MuiSelect-select": {
                    padding: "10px",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  "& .MuiSvgIcon-root": {
                    width: "20px",
                    height: "20px",
                  },
                }}
              >
                <MenuItem value="null" disabled>
                  Chọn học kỳ
                </MenuItem>
                <MenuItem value="0" sx={{ fontSize: "18px" }}>
                  Tất cả
                </MenuItem>
                {select?.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                    sx={{ fontSize: "18px" }}
                  >
                    {item.tenDot}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ padding: "10px 20px" }}>
            {profile && (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  {personalFields.map((field, index) => (
                    <Grid item xs={12} lg={field.lg} key={index}>
                      {field.name === "schoolEmail" ? (
                        <TextFieldWrapper
                          name="schoolEmail"
                          value={email} // Sử dụng state `email`
                          label="Email liên lạc khác"
                          successAccess={true} // Luôn cho phép chỉnh sửa
                          onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị của state `email`
                        />
                      ) : field.name === "soDienThoaiKhac" ? (
                        <TextFieldWrapper
                          name="soDienThoaiKhac"
                          value={phone} // Sử dụng state `phone`
                          label="SĐT liên lạc khác"
                          successAccess={true} // Luôn cho phép chỉnh sửa
                          onChange={(e) => setPhone(e.target.value)} // Cập nhật giá trị của state `phone`
                        />
                      ) : (
                        <TextFieldWrapper
                          name={field.name}
                          value={profile[field.name] || ""} // Giá trị từ `profile`
                          label={field.label}
                          successAccess={false}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>

                <Paper
                  elevation={12}
                  sx={{
                    padding: "10px",
                  }}
                >
                  <TableContainer
                    sx={{
                      "&::-webkit-scrollbar": {
                        width: "10px",
                        height: "10px",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#008689",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#008950",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f1f1f1",
                        borderRadius: "10px",
                      },
                    }}
                    variant="outlined"
                  >
                    <Table stickyHeader sx={{}}>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: "700",
                              border: "1px solid rgb(221, 221, 221)",
                              fontSize: "14px",
                              textAlign: "center",
                              backgroundColor: "#008689",
                              color: "white",
                            }}
                          >
                            STT
                          </TableCell>
                          {columnsDK.map((column) => (
                            <TableCell
                              key={column.field}
                              sx={{
                                fontWeight: "700",
                                border: "1px solid rgb(221, 221, 221)",
                                fontSize: "14px",
                                textAlign: "center",
                                minWidth: column.minWidth,
                                backgroundColor: "#008689",
                                color: "white",
                              }}
                            >
                              {column.headerName}
                            </TableCell>
                          ))}
                          {!receipts && (
                            <TableCell
                              // key={}
                              sx={{
                                fontWeight: "700",
                                border: "1px solid rgb(221, 221, 221)",
                                fontSize: "14px",
                                textAlign: "center",
                                // minWidth: column.minWidth,
                                backgroundColor: "#008689",
                                color: "white",
                              }}
                            >
                              Chứng chỉ ngoài
                            </TableCell>
                          )}
                        </TableRow>
                      </TableHead>
                      {loading ? (
                        <Spinner />
                      ) : (
                        <TableBody>
                          {cert?.map((c, index) => (
                            <React.Fragment key={c.idChungChi}>
                              <TableRow
                                key={c.idChungChi}
                                sx={{ backgroundColor: "#ffffff" }}
                              >
                                <TableCell
                                  sx={{
                                    border: "1px solid rgb(221, 221, 221)",
                                    color: "rgb(102, 117, 128)",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textAlign: "center",
                                  }}
                                >
                                  {index + 1}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    border: "1px solid rgb(221, 221, 221)",
                                    color: "rgb(102, 117, 128)",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textAlign: "center",
                                  }}
                                >
                                  {c.tenLChungChi}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    border: "1px solid rgb(221, 221, 221)",
                                    color: "rgb(102, 117, 128)",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textAlign: "center",
                                  }}
                                >
                                  {c.tenChungChi}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    border: "1px solid rgb(221, 221, 221)",
                                    color: "rgb(102, 117, 128)",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textAlign: "center",
                                  }}
                                >
                                  {c.isCompleted ? (
                                    <CheckCircle
                                      sx={{
                                        color: "green",
                                      }}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    border: "1px solid rgb(221, 221, 221)",
                                    color: "rgb(102, 117, 128)",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textAlign: "center",
                                  }}
                                >
                                  {c.isCompleted ? "Hoàn thành" : ""}
                                </TableCell>{" "}
                                {!receipts && c.isCompleted && (
                                  <TableCell
                                    sx={{
                                      border: "1px solid rgb(221, 221, 221)",
                                      color: "rgb(102, 117, 128)",
                                      fontSize: "14px",
                                      fontWeight: "500",
                                      textAlign: "center",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <IconButton
                                      onClick={() =>
                                        handleOpenModal(c.chungChiList)
                                      }
                                      variant="contained"
                                      sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "15px",
                                        backgroundColor: "#008588",
                                        color: "white",
                                        borderRadius: "8px",
                                        border: "3px solid #0085885a",
                                        transition: "all ease 0.4s",
                                        "&:hover": {
                                          borderColor: "#008689",
                                          backgroundColor: "white",
                                          color: "red",
                                          boxShadow: "0 0 10px #008689",
                                        },
                                      }}
                                    >
                                      <CloudUpload
                                        sx={{
                                          fontSize: {
                                            xs: "15px",
                                            lg: "20px",
                                          },
                                        }}
                                      />
                                    </IconButton>
                                  </TableCell>
                                )}
                              </TableRow>
                            </React.Fragment>
                          ))}
                          <AddCert
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            handleSubmit1={handleAddCert}
                            chungChiList={selectedChungChiList} // Truyền danh sách chứng chỉ vào modal
                          />
                          <UpdateCert
                            open={openModalUpdateCert}
                            onClose={() => setOpenModalUpdateCert(false)}
                            // handleSubmit1={handleAddCert}
                            idCertUpdate={idCertUpdate} // Truyền danh sách chứng chỉ vào modal
                            semester={semester}
                          />
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                </Paper>
                {!receipts && (
                  <Box
                    sx={{
                      marginTop: "20px",
                      width: "100%",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "15px",
                        backgroundColor: "#008588",
                        color: "white",
                        borderRadius: "8px",
                        border: "3px solid #0085885a",
                        transition: "all ease 0.4s",

                        "&:hover": {
                          borderColor: "#008689",
                          backgroundColor: "white",
                          color: "#008689",
                          bolghadow: "0 0 10px #008689",
                        },
                      }}
                    >
                      ĐĂNG KÝ
                    </Button>
                  </Box>
                )}
              </form>
            )}
          </Box>
          {/* Sử dụng CustomTable để hiển thị danh sách chứng chỉ */}
          <Box
            sx={{
              margin: "15px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Divider
                orientation="vertical"
                sx={{
                  color: "red",
                  border: "3px solid",
                  height: "20px",
                  marginRight: "5px",
                }}
              />
              <Typography
                sx={{ color: "#008588", fontWeight: "700", fontSize: "20px" }}
              >
                Chứng chỉ đã nộp
              </Typography>
            </Box>
          </Box>
          <CustomTable
            columns={columnsCert}
            rows={certUpdated}
            loading={loading}
            customize={
              receipts?.statusId === 1 || receipts?.statusId === 3 ? (
                <TableCell>Cập nhật</TableCell>
              ) : null
            }
            renderRow={(cert, index) => (
              <TableRow key={index}>
                <TableCell sx={tableCellBody}>{index + 1}</TableCell>
                <TableCell sx={tableCellBody}>{cert.tenChungChi}</TableCell>
                <TableCell sx={tableCellBody}>
                  {formatDate(cert.ngayCap)}
                </TableCell>
                <TableCell sx={tableCellBody}>{cert.nguoiCap}</TableCell>
                <TableCell sx={tableCellBody}>{cert.soHieu}</TableCell>
                <TableCell sx={tableCellBody}>{cert.soVaoSo}</TableCell>
                <TableCell sx={tableCellBody}>{cert.noiCap}</TableCell>
                <TableCell sx={tableCellBody}>{cert.soSeri}</TableCell>
                <TableCell sx={tableCellBody}>
                  <IconButton onClick={() => handleOpenCertModal(cert.id)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
                {receipts?.statusId === 1 || receipts?.statusId === 3 ? (
                  <TableCell sx={tableCellBody}>
                    <IconButton
                      onClick={() => handleOpenModalUpdateCert(cert.id)}
                      variant="contained"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "15px",
                        backgroundColor: "#008588",
                        color: "white",
                        borderRadius: "8px",
                        border: "3px solid #0085885a",
                        transition: "all ease 0.4s",
                        "&:hover": {
                          borderColor: "#008689",
                          backgroundColor: "white",
                          color: "red",
                          boxShadow: "0 0 10px #008689",
                        },
                      }}
                    >
                      <CloudUpload
                        sx={{
                          fontSize: { xs: "15px", lg: "20px" },
                        }}
                      />
                    </IconButton>
                  </TableCell>
                ) : null}
              </TableRow>
            )}
          />

          <Grid
            sx={{
              padding: "10px 5px",
              backgroundColor: "white",
              margin: "20px 0",
            }}
            container
          >
            <Box
              sx={{
                margin: "15px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Divider
                  orientation="vertical"
                  sx={{
                    color: "red",
                    border: "3px solid",
                    height: "20px",
                    marginRight: "5px",
                  }}
                />
                <Typography
                  sx={{ color: "#008588", fontWeight: "700", fontSize: "20px" }}
                >
                  Lịch sử đăng ký
                </Typography>
              </Box>
            </Box>
            <CustomTable
              columns={columnsHistory}
              rows={receipts ? [receipts] : []}
              loading={loading}
              renderRow={(receipt, index) => (
                <TableRow key={index}>
                  <TableCell sx={tableCellBody}>{index + 1}</TableCell>
                  <TableCell sx={tableCellBody}>{receipt.tenDot}</TableCell>
                  <TableCell sx={tableCellBody}>
                    {formatDate(receipt.createdAt)}
                  </TableCell>
                  <TableCell sx={tableCellBody}>{receipt.status}</TableCell>
                  <TableCell sx={tableCellBody}>
                    {formatDate(receipt.updatedAt)}
                  </TableCell>
                  <TableCell sx={tableCellBody}>{receipt.note}</TableCell>
                </TableRow>
              )}
            />
          </Grid>
        </Box>
      </Paper>
      <ViewDetailCer
        open={openModalDetail}
        onClose={handleCloseModal}
        certId={selectedCertId}
      />
    </Container>
  );
};

export default Graduation;
