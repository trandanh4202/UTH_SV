/* eslint-disable react/jsx-key */
import { Cancel, CheckCircle } from "@mui/icons-material";
import {
  Box,
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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTranscript } from "../../features/transcriptSlice/TranscriptSlice";

const columns = [
  {
    field: "maLopHocPhan",
    headerName: "Mã lớp học phần",
    align: "center",
    minWidth: "200px",
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

const Transcript = () => {
  const transcript = useSelector((state) => state.transcript.transcript);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTranscript());
  }, [dispatch]);
  return (
    <Box>
      <Container sx={{ minHeight: "500px" }}>
        <TableContainer sx={{ padding: "10px" }} component={Paper} variant={4}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "700",
                    color: "rgb(29, 161, 242)",
                    backgroundColor: "rgb(243, 247, 249)",
                    border: "1px solid rgb(221, 221, 221)",
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                >
                  STT
                </TableCell>

                {columns.map((column) => (
                  <>
                    <TableCell
                      key={column.field}
                      sx={{
                        fontWeight: "700",
                        color: "rgb(29, 161, 242)",
                        backgroundColor: "rgb(243, 247, 249)",
                        border: "1px solid rgb(221, 221, 221)",
                        fontSize: "14px",
                        textAlign: "center",
                        minWidth: column.minWidth,
                      }}
                    >
                      {column.headerName}
                    </TableCell>
                  </>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transcript.map((hocKy) => (
                <>
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
                              <Cancel sx={{ color: "red" }} />
                            )
                          ) : (
                            row[column.field]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}{" "}
                  <TableRow>
                    <TableCell colSpan={2} sx={cellStyle}>
                      Tổng số tín chỉ đã đăng ký: {hocKy.stcdangKyHocKy}
                    </TableCell>
                    <TableCell colSpan={3} sx={cellStyle}>
                      Điểm trung bình học kỳ hệ 4: {hocKy.diemTBTinChi}
                    </TableCell>
                    <TableCell colSpan={7} sx={cellBorderStyle}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} sx={cellStyle}>
                      Tổng số tín chỉ đạt: {hocKy.stcdatHocKy}
                    </TableCell>
                    <TableCell colSpan={3} sx={cellStyle}>
                      Điểm trung bình học kỳ hệ 10: {hocKy.diemTBHocLuc}
                    </TableCell>
                    <TableCell colSpan={7} sx={cellBorderStyle}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} sx={cellStyle}>
                      Số tín chỉ tích lũy của sinh viên: {hocKy.soTCTichLuy}
                    </TableCell>
                    <TableCell colSpan={3} sx={cellStyle}>
                      Xếp loại học lực học kỳ: {hocKy.xepLoaiHocLuc}
                    </TableCell>
                    <TableCell colSpan={7} sx={cellBorderStyle}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} sx={cellStyle}>
                      Điểm trung bình tích lũy (hệ 4):{" "}
                      {hocKy.diemTBTinChiTichLuy}
                    </TableCell>
                    <TableCell colSpan={3} sx={cellStyle}>
                      Điểm trung bình tích lũy (hệ 10):{" "}
                      {hocKy.diemTBHocLucTichLuy}
                    </TableCell>
                    <TableCell colSpan={7} sx={cellBorderStyle}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} sx={cellStyle}>
                      Tổng số tín chỉ nợ tính đến hiện tại: {hocKy.soTCKhongDat}
                    </TableCell>
                    <TableCell colSpan={3} sx={cellStyle}>
                      Xếp loại học lực tích lũy: {hocKy.xepLoaiHocLucTichLuy}
                    </TableCell>
                    <TableCell colSpan={7} sx={cellBorderStyle}></TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell colSpan={2} sx={cellStyle}>
                      Điểm rèn luyện học kỳ: {summary.DRLHK}
                    </TableCell>
                    <TableCell colSpan={3} sx={cellStyle}>
                      Xếp loại điểm rèn luyện: {summary.XDLDRLHK}
                    </TableCell>
                    <TableCell colSpan={7} sx={cellBorderStyle}></TableCell>
                  </TableRow> */}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

const cellStyle = {
  border: "1px solid rgb(221, 221, 221)",
  color: "rgb(102, 117, 128)",
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
