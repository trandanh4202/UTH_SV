import { Cancel, CheckCircle } from "@mui/icons-material";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

// Dữ liệu mẫu sau khi làm sạch
const rows = [
  {
    id: 1,
    stt: 1,
    maLop: "100000000",
    tenMon: "Giải tích 1",
    soTinChi: 3,
    diemQuaTrinh: 9.5,
    diemCuoiKy: 9.5,
    diemTongKet: 9.5,
    thangDiem4: 4,
    diemChu: "A",
    xepLoai: "Khá",
    dat: false,
  },
  {
    id: 2,
    stt: 2,
    maLop: "20000000",
    tenMon: "Giải tích 2",
    soTinChi: 3,
    diemQuaTrinh: 9.5,
    diemCuoiKy: 9,
    diemTongKet: 9.25,
    thangDiem4: 4,
    diemChu: "A",
    xepLoai: "Gioi",
    dat: true,
  },
];

// Định nghĩa các cột cho DataGrid
const columns = [
  { field: "stt", headerName: "STT", align: "center" },
  {
    field: "maLop",
    headerName: "Mã lớp học phần",
    align: "center",
    minWidth: "200px",
  },
  {
    field: "tenMon",
    headerName: "Tên môn học/học phần",
    align: "left",
    minWidth: "200px",
  },
  { field: "soTinChi", headerName: "Số tín chỉ", align: "center" },
  { field: "diemQuaTrinh", headerName: "Điểm quá trình", align: "center" },
  { field: "diemCuoiKy", headerName: "Điểm cuối kỳ", align: "center" },
  { field: "diemTongKet", headerName: "Điểm tổng kết", align: "center" },
  { field: "thangDiem4", headerName: "Điểm 4", align: "center" },
  { field: "diemChu", headerName: "Điểm chữ", align: "center" },
  { field: "xepLoai", headerName: "Xếp loại", align: "center" },
  { field: "dat", headerName: "Đạt", align: "center" },
];
// Dữ liệu tổng kết
const summary = {
  TSTCDDK: 10,
  TSTCD: 10,
  STCTLCSV: 10,
  DTBHKH4: 4.0,
  DTBHKH10: 10,
  XLHLHK: "Giỏi",
  DTBTLH4: 4.0,
  DTBTLH10: 10.0,
  XLHLTL: "Giỏi",
  TSTCNTDHT: 0,
};

// Tạo component cho bảng
const Transcirpt = () => {
  return (
    <Box>
      <Container sx={{ backgroundColor: "white", height: "500px" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    sx={{
                      fontWeight: "700",
                      color: "rgb(29, 161, 242)",
                      backgroundColor: "rgb(243, 247, 249)",
                      border: "1px solid rgb(221, 221, 221)",
                      fontSize: "15px",
                      textAlign: "center",
                      minWidth: `${column.minWidth}`,
                    }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={11}
                  sx={{
                    backgroundColor: "rgb(245, 245, 245)",
                    color: "rgb(87, 142, 190)",
                    padding: "5px",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "13px", fontWeight: "700" }}>
                      Học kỳ 1 năm học 2023-2024
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: "#ffffff",
                  }}
                >
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
                      {column.field === "dat" ? (
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
              ))}
              <>
                <TableRow>
                  <TableCell
                    colspan={2}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                      color: "rgb(102, 117, 128)",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "0 10px",
                    }}
                  >
                    Tổng số tín chỉ đã đăng ký: {summary.STCDDK}
                  </TableCell>
                  <TableCell
                    colspan={3}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                      color: "rgb(102, 117, 128)",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "0 10px",
                    }}
                  >
                    Điểm trung bình học kỳ hệ 4: {summary.DTBHKH4}
                  </TableCell>
                  <TableCell
                    colSpan={6}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                    }}
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colspan={2}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                      color: "rgb(102, 117, 128)",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "0 10px",
                    }}
                  >
                    Tổng số tín chỉ đạt: {summary.TSTCD}
                  </TableCell>
                  <TableCell
                    colspan={3}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                      color: "rgb(102, 117, 128)",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "0 10px",
                    }}
                  >
                    Điểm trung bình học kỳ hệ 10: {summary.DTBHKH10}
                  </TableCell>
                  <TableCell
                    colSpan={6}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                    }}
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colspan={2}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                      color: "rgb(102, 117, 128)",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "0 10px",
                    }}
                  >
                    Số tín chỉ tích lũy của sinh viên: {summary.STCTLCSV}
                  </TableCell>
                  <TableCell
                    colspan={3}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                      color: "rgb(102, 117, 128)",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "0 10px",
                    }}
                  >
                    Xếp loại học lực học kỳ: {summary.XLHLHK}
                  </TableCell>
                  <TableCell
                    colSpan={6}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                    }}
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colspan={2}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                      color: "rgb(102, 117, 128)",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "0 10px",
                    }}
                  >
                    Điểm trung bình tích lũy (hệ 4) {summary.DTBTLH4}
                  </TableCell>
                  <TableCell
                    colspan={3}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                      color: "rgb(102, 117, 128)",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "0 10px",
                    }}
                  >
                    Điểm trung bình tích lũy (hệ 10): {summary.DTBTLH10}
                  </TableCell>
                  <TableCell
                    colSpan={6}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                    }}
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colspan={2}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                      color: "rgb(102, 117, 128)",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "0 10px",
                    }}
                  >
                    Tổng số tín chỉ nợ tính đến hiện tại: {summary.TSTCNTDHT}
                  </TableCell>
                  <TableCell
                    colspan={3}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                      color: "rgb(102, 117, 128)",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "0 10px",
                    }}
                  >
                    Xếp loại học lực tích lũy: {summary.XLHLTL}
                  </TableCell>
                  <TableCell
                    colSpan={6}
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                    }}
                  ></TableCell>
                </TableRow>
              </>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Transcirpt;
