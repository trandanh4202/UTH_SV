import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/Spinner/Spinner";
import { CheckCircle } from "@mui/icons-material";
import { getCert } from "../../../features/transcriptSlice/TranscriptSlice";

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
        // onChange={handleChange}
        type={type}
        disabled={!successAccess}
        placeholder={placeholder}
        sx={{ ...inputStyles, width: "100%" }} // Adjust `inputStyles` as needed
      />
    </Box>
  );
};

const Graduation = () => {
  const dispatch = useDispatch();
  const nations = useSelector((state) => state.nation.nations) || [];
  const profile = useSelector((state) => state.profile.summaryProfile?.body);
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

  // const note = useSelector((state) => state.notification?.getNote.body || []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const loading = useSelector((state) => state.transcript?.loading);

  const cert = useSelector((state) => state.transcript?.getCert);

  const successAccess = false;
  useEffect(() => {
    dispatch(getCert());
  }, [dispatch]);
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
                      value={profile.gioiTinh}
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
                      value={profile.iddanToc}
                      // onChange={handleChange}
                      label="Dân tộc"
                    />
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <TextFieldWrapper
                      name="idtonGiao"
                      value={profile.idtonGiao}
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
                        value={profile.idtinh || ""}
                        // onChange={handleChange}
                        // options={provinces}
                        label="Quê quán Tỉnh (CCCD)"
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} lg={2}>
                    <TextFieldWrapper
                      name="noiSinh"
                      value={profile.noiSinh || ""}
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
                        value={profile.schoolEmail}
                        // onChange={handleChange}
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
                        value={profile.soDienThoaiKhac}
                        // onChange={handleChange}
                        successAccess={!successAccess}
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
                          {cert?.map((c, idC) => (
                            <React.Fragment key={idC}>
                              <TableRow
                                key={idC}
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
                                  {idC + 1}
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
                                  <TextField
                                    type="file"
                                    accept="image/*"
                                    // onChange={handleFileChange}
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
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))}
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
                    disabled={!successAccess}
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
        </Box>
      </Paper>
    </Container>
  );
};

export default Graduation;
