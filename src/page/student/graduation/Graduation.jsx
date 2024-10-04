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
import { CheckCircle, EditOutlined, UploadFile } from "@mui/icons-material";

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
  {
    field: "chungChiNgoai",
    headerName: "Tải Chứng chỉ ngoài",
    align: "center",
  },
];
// Component TextFieldWrapper

const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle null or undefined dateString
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid date strings
  return format(date, "dd/MM/yyyy");
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
  const receipts = useSelector((state) => state.graduation?.xetTotNghiep?.body);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const cert = useSelector((state) => state.graduation?.getCert);
  const [semester, setSemester] = useState(0);
  const [formDataFile, setFormDataFile] = useState([]); // Lưu trữ file chứng chỉ ngoài
  const [ids, setIds] = useState([]); // Khởi tạo ids là mảng rỗng
  const [selectedChungChiList, setSelectedChungChiList] = useState([]);

  const successAccess = false;

  const handleOpenModal = (chungChiList) => {
    setSelectedChungChiList(chungChiList); // Truyền danh sách chứng chỉ vào modal
    setOpenModal(true);
  };
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

  useEffect(() => {
    dispatch(getCert());
    dispatch(xetTotNghiep());
    dispatch(xetTotNghiepInfo());
    dispatch(getDotXetTotNghiep());
  }, [dispatch]);
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

  console.log(certificates);
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
      chungChi: {
        email,
        phone,
        chungChiList: chungchiList, // Danh sách thông tin chứng chỉ
      },
      proofs: proofs,
    });

    // Tạo FormData và thêm JSON vào như một Blob
    const formData = new FormData();
    formData.append(
      "form",
      new Blob([jsonPayload], { type: "application/json" })
    );

    console.log("danh", formData);

    // console.log(formData); // Xử lý gửi form qua API
    dispatch(dangKyXetTotNghiep({ formData, semester }));
    // toast.success("Đăng ký thành công");
  };
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
                  <Grid item xs={12} lg={2}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <TextFieldWrapper
                        name="maSinhVien"
                        value={profile.maSinhVien}
                        // onChange={handleChange}
                        successAccess={successAccess}
                        label="Mã số sinh viên"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <TextFieldWrapper
                        name="hoDem"
                        value={profile?.hoDem}
                        // onChange={handleChange}
                        label="Họ đệm"
                        successAccess={successAccess}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <TextFieldWrapper
                        name="ten"
                        value={profile.ten}
                        // onChange={handleChange}
                        successAccess={successAccess}
                        label="Tên"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={1.5}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <TextFieldWrapper
                        name="lopHoc"
                        value={profile.lopHoc}
                        // onChange={handleChange}
                        successAccess={successAccess}
                        label="Lớp"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={1.5}>
                    <TextFieldWrapper
                      label="Giới tính"
                      name="gioiTinh"
                      value={profile.gioiTinh ? "Nam" : "Nữ"}
                      // onChange={handleChange}
                      successAccess={successAccess}
                      sx={selectStyles}
                      options={genders}
                    />
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <TextFieldWrapper
                        name="ngaySinh2"
                        value={profile.ngaySinh2} // Ensure this is in 'YYYY-MM-DD' format
                        // onChange={handleChange}
                        label="Ngày sinh"
                        // type="date"
                        placeholder="Ví dụ: 04/02/2006"
                        successAccess={successAccess}
                        id="date-picker"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <TextFieldWrapper
                      name="iddanToc"
                      value={profile.danToc}
                      // onChange={handleChange}
                      label="Dân tộc"
                    />
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <TextFieldWrapper
                      name="idtonGiao"
                      value={profile.tonGiao}
                      // onChange={handleChange}
                      label="Tôn giáo"
                    />
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <TextFieldWrapper
                        name="idtinh"
                        value={profile.queQuanTinh || ""}
                        // onChange={handleChange}
                        // options={provinces}
                        label="Quê quán Tỉnh (CCCD)"
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} lg={2}>
                    <TextFieldWrapper
                      name="noiSinh"
                      value={profile.noiSinhTinh || ""}
                      // onChange={handleChange}
                      // options={provinces}
                      label="Nơi sinh Tỉnh"
                      successAccess={successAccess}
                      optionType="province"
                    />
                  </Grid>

                  <Grid item xs={12} lg={2}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                        Căn cước công dân
                      </Typography>
                      <TextFieldWrapper
                        name="soCMND"
                        value={profile.soCMND || ""}
                        // onChange={handleChange}
                        successAccess={successAccess}
                        sx={inputStyles}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} lg={2}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <TextFieldWrapper
                        name="quocTich"
                        value={profile.quocTich || ""}
                        // onChange={handleChange}
                        options={nations}
                        label="Quốc tịch"
                        successAccess={successAccess}
                        optionType="quocTich"
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} lg={4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                        Email cá nhân
                      </Typography>
                      <TextFieldWrapper
                        name="email"
                        value={profile.email}
                        // onChange={handleChange}
                        successAccess={successAccess}
                        sx={inputStyles}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                        Email liên lạc khác
                      </Typography>
                      <TextFieldWrapper
                        name="schoolEmail"
                        value={email}
                        // onChange={handleChange}
                        onChange={(e) => setEmail(e.target.value)}
                        successAccess={!successAccess}
                        sx={inputStyles}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                        Số điện thoại
                      </Typography>
                      <TextFieldWrapper
                        name="soDienThoai"
                        value={profile.soDienThoai}
                        // onChange={handleChange}

                        successAccess={successAccess}
                        sx={inputStyles}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                        SĐT liên lạc khác
                      </Typography>
                      <TextFieldWrapper
                        name="soDienThoaiKhac"
                        value={phone}
                        // onChange={handleChange}
                        successAccess={!successAccess}
                        onChange={(e) => setPhone(e.target.value)}
                        sx={inputStyles}
                      />
                    </Box>
                  </Grid>
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
                                <TableCell
                                  sx={{
                                    border: "1px solid rgb(221, 221, 221)",
                                    color: "rgb(102, 117, 128)",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    textAlign: "center",
                                  }}
                                >
                                  {/* {c.isCompleted ? (
                                    ""
                                  ) : (
                                    <TextField
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) =>
                                        handleFileChange(e, c.idChungChi)
                                      } // Truyền idChungChi vào
                                      style={{ marginBottom: "20px" }}
                                      sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
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
                                      }}
                                    />
                                  )} */}
                                  {c.isCompleted ? (
                                    ""
                                  ) : (
                                    <UploadFile
                                      onClick={() =>
                                        handleOpenModal(c.chungChiList)
                                      }
                                    />
                                  )}
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))}
                          <AddCert
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            handleSubmit1={handleAddCert}
                            chungChiList={selectedChungChiList} // Truyền danh sách chứng chỉ vào modal
                          />
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                </Paper>
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
              </form>
            )}
          </Box>
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
            <TableContainer
              component={Paper}
              sx={{
                maxHeight: "78vh",
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
            >
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    {tableCell?.map((item) => (
                      <TableCell
                        key={item}
                        align="center"
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                          backgroundColor: "#008689",
                          color: "white",
                          fontWeight: "600",
                          fontSize: { xs: "13px", lg: "15px" },
                        }}
                      >
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receipts &&
                    receipts?.map((row, index) => (
                      <TableRow
                        key={row.id}
                        // sx={{
                        //   cursor: "pointer",
                        //   backgroundColor:
                        //     selectedRow === index ? "#006b89x" : "inherit",
                        // }}
                        // onClick={() => handleRowClick(index)}
                      >
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgb(221, 221, 221)",

                            fontWeight: "500",
                            fontSize: { xs: "11px", lg: "14px" },
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: { xs: "11px", lg: "14px" },
                          }}
                        >
                          {row.tenDot}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: { xs: "11px", lg: "14px" },
                          }}
                        >
                          {formatDate(row.createdAt)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: { xs: "11px", lg: "14px" },
                          }}
                        >
                          {row.status}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: { xs: "11px", lg: "14px" },
                          }}
                        >
                          {formatDate(row.updatedAt)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: { xs: "11px", lg: "14px" },
                          }}
                        ></TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: { xs: "11px", lg: "14px" },
                          }}
                        >
                          {row.note}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Graduation;
