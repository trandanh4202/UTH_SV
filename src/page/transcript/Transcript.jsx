/* eslint-disable react/jsx-key */
import { Cancel, CheckCircle } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTranscript } from "../../features/transcriptSlice/TranscriptSlice";

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

  const transcript = useSelector((state) => state.transcript.transcript);
  const loading = useSelector((state) => state.transcript.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTranscript());
  }, [dispatch]);

  return (
    <Box>
      <Container sx={{ minHeight: "500px" }}>
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
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#008689",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#008950",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <TableBody>
                  {transcript.map((hocKy, hocKyIndex) => (
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
                      {hocKy.diems.map((row, rowIndex) => (
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
                                  <CheckCircle style={{ color: "green" }} />
                                ) : (
                                  <Cancel style={{ color: "red" }} />
                                )
                              ) : formatNumberFields.includes(column.field) ? (
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
                          {hocKy.tongKetDot.stcdangKyHocKy}
                        </TableCell>
                        <TableCell colSpan={3} sx={cellStyle}>
                          Điểm trung bình học kỳ hệ 4:{" "}
                          {formatNumber(hocKy.tongKetDot.diemTBTinChi)}
                        </TableCell>
                        <TableCell colSpan={7} sx={cellBorderStyle}></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} sx={cellStyle}>
                          Tổng số tín chỉ đạt: {hocKy.tongKetDot.stcdatHocKy}
                        </TableCell>
                        <TableCell colSpan={3} sx={cellStyle}>
                          Điểm trung bình học kỳ hệ 10:{" "}
                          {formatNumber(hocKy.tongKetDot.diemTBHocLuc)}
                        </TableCell>
                        <TableCell colSpan={7} sx={cellBorderStyle}></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} sx={cellStyle}>
                          Số tín chỉ tích lũy của sinh viên:{" "}
                          {hocKy.tongKetDot.soTCTichLuy}
                        </TableCell>
                        <TableCell colSpan={3} sx={cellStyle}>
                          Xếp loại học lực học kỳ:{" "}
                          {hocKy.tongKetDot.xepLoaiHocLuc}
                        </TableCell>
                        <TableCell colSpan={7} sx={cellBorderStyle}></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} sx={cellStyle}>
                          Điểm trung bình tích lũy (hệ 4):{" "}
                          {formatNumber(hocKy.tongKetDot.diemTBTinChiTichLuy)}
                        </TableCell>
                        <TableCell colSpan={3} sx={cellStyle}>
                          Điểm trung bình tích lũy (hệ 10):{" "}
                          {formatNumber(hocKy.tongKetDot.diemTBHocLucTichLuy)}
                        </TableCell>
                        <TableCell colSpan={7} sx={cellBorderStyle}></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} sx={cellStyle}>
                          Tổng số tín chỉ nợ tính đến hiện tại:{" "}
                          {hocKy.tongKetDot.soTCKhongDat}
                        </TableCell>
                        <TableCell colSpan={3} sx={cellStyle}>
                          Xếp loại học lực tích lũy:{" "}
                          {hocKy.tongKetDot.xepLoaiHocLucTichLuy}
                        </TableCell>
                        <TableCell colSpan={7} sx={cellBorderStyle}></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} sx={cellStyle}>
                          Điểm rèn luyện học kỳ:{" "}
                          {formatNumber(hocKy.tongKetDot.soDiemRenLuyen)}
                        </TableCell>
                        <TableCell colSpan={3} sx={cellStyle}>
                          Xếp loại điểm rèn luyện:{" "}
                          {hocKy.tongKetDot.xepLoaiDiemRenLuyen}
                        </TableCell>
                        <TableCell colSpan={7} sx={cellBorderStyle}></TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Paper>
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
