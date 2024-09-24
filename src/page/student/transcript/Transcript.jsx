/* eslint-disable react/jsx-key */
import { Cancel, CheckCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTranscript } from "~/features/transcriptSlice/TranscriptSlice";
import Spinner from "../../../components/Spinner/Spinner";
import {
  getCert,
  getKetQuaDauVao,
} from "../../../features/transcriptSlice/TranscriptSlice";

const columns = [
  {
    field: "maLopHocPhan",
    headerName: "Mã lớp học phần",
    align: "center",
    minWidth: "220px",
  },
  {
    field: "tenMonHoc",
    headerName: "Tên môn học/học phần",
    align: "left",
    minWidth: "200px",
  },
  { field: "soTinChi", headerName: "Số tín chỉ", align: "center" },
  { field: "diemTBThuongKy", headerName: "Điểm quá trình", align: "center" },
  { field: "diemThi", headerName: "Điểm cuối kỳ", align: "center" },
  { field: "diemTongKet", headerName: "Điểm tổng kết", align: "center" },
  { field: "diemTinChi", headerName: "Điểm 4", align: "center" },
  { field: "diemChu", headerName: "Điểm chữ", align: "center" },
  { field: "xepLoai", headerName: "Xếp loại", align: "center" },
  { field: "isDat", headerName: "Đạt", align: "center" },
  { field: "ghiChu", headerName: "Ghi chú", align: "center" },
];
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
];
const columnsAV = [
  {
    field: "tenDot",
    headerName: "Tên đợt",
    align: "center",
    minWidth: "220px",
  },
  {
    field: "tenNhom",
    headerName: "Tên nhóm",
    align: "left",
    minWidth: "200px",
  },
  { field: "diemSo", headerName: "Điểm số", align: "center" },
  { field: "ghiChu", headerName: "Ghi chú", align: "center" },
];
const formatNumberFields = [
  "diemTBThuongKy",
  "diemThi",
  "diemTongKet",
  "diemTinChi",
];

const Transcript = () => {
  const formatNumber = (num) => {
    if (num !== null && num !== undefined) {
      return new Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num);
    }
    return num;
  };

  const transcript = useSelector((state) => state.transcript?.transcript);
  const cert = useSelector((state) => state.transcript?.getCert);
  const ketQuaDauVao = useSelector(
    (state) => state.transcript?.getKetQuaDauVao
  );

  const loading = useSelector((state) => state.transcript?.loading);

  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const [semester, setSemester] = useState("");

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleChange = (event) => {
    setSemester(event.target.value);
  };
  useEffect(() => {
    dispatch(getTranscript());
    dispatch(getCert());
    dispatch(getKetQuaDauVao());
  }, [dispatch]);

  return (
    <Box>
      <Container sx={{ backgroundColor: "white" }}>
        <Box sx={{ padding: "10px 5px" }}>
          <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
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
              sx={{ color: "#008689", fontWeight: "700", fontSize: "20px" }}
            >
              Kết quả học tập
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={selectedTab}
              onChange={handleChangeTab}
              textColor="primary"
              indicatorColor="primary"
              aria-label="tabs"
            >
              <Tab
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                  "&.Mui-selected": {
                    backgroundColor: "#1D999D",
                    color: "white",
                  },
                }}
                label="Bảng điểm học tập"
              />
              <Tab
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                  "&.Mui-selected": {
                    backgroundColor: "#1D999D",
                    color: "white",
                  },
                }}
                label="Kết quả môn học điều kiện"
              />
              <Tab
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                  "&.Mui-selected": {
                    backgroundColor: "#1D999D",
                    color: "white",
                  },
                }}
                label="Chuẩn đầu ra"
              />
            </Tabs>
            {selectedTab === 0 && (
              <Paper
                elevation={12}
                sx={{
                  padding: "10px",
                }}
              >
                <TableContainer
                  sx={{
                    height: "80vh",

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
                        {columns.map((column) => (
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
                        {transcript?.map((hocKy, hocKyIndex) => (
                          <React.Fragment key={hocKyIndex}>
                            <TableRow>
                              <TableCell
                                colSpan={12}
                                sx={{
                                  backgroundColor: "rgb(231, 236, 240)",
                                  color: "rgb(87, 142, 190)",
                                  padding: "5px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    color: "#f15253",
                                    padding: "0 10px",
                                  }}
                                >
                                  {hocKy.tenDot}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            {hocKy.diems?.map((row, rowIndex) => (
                              <TableRow
                                key={rowIndex}
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
                                  {rowIndex + 1}
                                </TableCell>
                                {columns.map((column) => (
                                  <TableCell
                                    key={column.field}
                                    sx={{
                                      border: "1px solid rgb(221, 221, 221)",
                                      color: "rgb(102, 117, 128)",
                                      fontSize: "14px",
                                      fontWeight: "500",
                                    }}
                                    align={column.align}
                                  >
                                    {column.field === "isDat" ? (
                                      row[column.field] ? (
                                        <CheckCircle
                                          style={{ color: "green" }}
                                        />
                                      ) : (
                                        <Cancel style={{ color: "red" }} />
                                      )
                                    ) : formatNumberFields.includes(
                                        column.field
                                      ) ? (
                                      formatNumber(row[column.field])
                                    ) : (
                                      row[column.field]
                                    )}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell colSpan={2} sx={cellStyle}>
                                Tổng số tín chỉ đã đăng ký:{" "}
                                {hocKy.tongKetDot?.stcdangKyHocKy}
                              </TableCell>
                              <TableCell colSpan={3} sx={cellStyle}>
                                Điểm trung bình học kỳ hệ 4:{" "}
                                {formatNumber(hocKy.tongKetDot?.diemTBTinChi)}
                              </TableCell>
                              <TableCell
                                colSpan={7}
                                sx={cellBorderStyle}
                              ></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={2} sx={cellStyle}>
                                Tổng số tín chỉ đạt:{" "}
                                {hocKy.tongKetDot?.stcdatHocKy}
                              </TableCell>
                              <TableCell colSpan={3} sx={cellStyle}>
                                Điểm trung bình học kỳ hệ 10:{" "}
                                {formatNumber(hocKy.tongKetDot?.diemTBHocLuc)}
                              </TableCell>
                              <TableCell
                                colSpan={7}
                                sx={cellBorderStyle}
                              ></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={2} sx={cellStyle}>
                                Số tín chỉ tích lũy của sinh viên:{" "}
                                {hocKy.tongKetDot?.soTCTichLuy}
                              </TableCell>
                              <TableCell colSpan={3} sx={cellStyle}>
                                Xếp loại học lực học kỳ:{" "}
                                {hocKy.tongKetDot?.xepLoaiHocLuc}
                              </TableCell>
                              <TableCell
                                colSpan={7}
                                sx={cellBorderStyle}
                              ></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={2} sx={cellStyle}>
                                Điểm trung bình tích lũy (hệ 4):{" "}
                                {formatNumber(
                                  hocKy.tongKetDot?.diemTBTinChiTichLuy
                                )}
                              </TableCell>
                              <TableCell colSpan={3} sx={cellStyle}>
                                Điểm trung bình tích lũy (hệ 10):{" "}
                                {formatNumber(
                                  hocKy.tongKetDot?.diemTBHocLucTichLuy
                                )}
                              </TableCell>
                              <TableCell
                                colSpan={7}
                                sx={cellBorderStyle}
                              ></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={2} sx={cellStyle}>
                                Tổng số tín chỉ nợ tính đến hiện tại:{" "}
                                {hocKy.tongKetDot?.soTCKhongDat}
                              </TableCell>
                              <TableCell colSpan={3} sx={cellStyle}>
                                Xếp loại học lực tích lũy:{" "}
                                {hocKy.tongKetDot?.xepLoaiHocLucTichLuy}
                              </TableCell>
                              <TableCell
                                colSpan={7}
                                sx={cellBorderStyle}
                              ></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={2} sx={cellStyle}>
                                Điểm rèn luyện học kỳ:{" "}
                                {formatNumber(hocKy.tongKetDot?.soDiemRenLuyen)}
                              </TableCell>
                              <TableCell colSpan={3} sx={cellStyle}>
                                Xếp loại điểm rèn luyện:{" "}
                                {hocKy.tongKetDot?.xepLoaiDiemRenLuyen}
                              </TableCell>
                              <TableCell
                                colSpan={7}
                                sx={cellBorderStyle}
                              ></TableCell>
                            </TableRow>
                          </React.Fragment>
                        ))}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Paper>
            )}
            {selectedTab === 1 && (
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
                          colSpan={12}
                          sx={{
                            fontWeight: "700",
                            border: "1px solid rgb(221, 221, 221)",
                            fontSize: "14px",
                            textAlign: "center",
                            backgroundColor: "#008689",
                            color: "white",
                          }}
                        >
                          KẾT QUẢ MÔN HỌC ĐIỀU KIỆN
                        </TableCell>
                      </TableRow>
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
                        {columnsAV.map((column) => (
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
                        {ketQuaDauVao?.map((c, idC) => (
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
                                {c.tenDot}
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
                                {c.tenNhom}
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
                                {c.diemSo}
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
                                {c.ghiChu}
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        ))}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Paper>
            )}
            {selectedTab === 2 && (
              <Paper
                elevation={12}
                sx={{
                  margin: { xs: "20px 0", lg: "50px 0" },
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
                          colSpan={12}
                          sx={{
                            fontWeight: "700",
                            border: "1px solid rgb(221, 221, 221)",
                            fontSize: "14px",
                            textAlign: "center",
                            backgroundColor: "#008689",
                            color: "white",
                          }}
                        >
                          CHUẨN ĐẦU RA
                        </TableCell>
                      </TableRow>
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
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        ))}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Paper>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const cellStyle = {
  border: "1px solid rgb(221, 221, 221)",
  color: "rgb(117, 117, 117)",
  fontSize: "14px",
  fontWeight: "500",
  padding: "0 10px",
  backgroundColor: "#ffffff",
};

const cellBorderStyle = {
  border: "1px solid rgb(221, 221, 221)",
  backgroundColor: "#ffffff",
};

export default Transcript;
