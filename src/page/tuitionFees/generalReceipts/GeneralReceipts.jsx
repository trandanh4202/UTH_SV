/* eslint-disable react/jsx-key */
import { CloudDownload, EditNote, ReceiptLong } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
const data = [
  {
    STT: 1,
    SoPhieu: 508411,
    MaHoaDon: 8804,
    NgayThu: "21/03/2024 17:35",
    SoTien: "5.310.000",
    DonViThu: "VNPay Đại trà",
    LoaiHDDT: "Cá nhân",
    HDDT: false,
    ChiTiet: true,
    NhatKy: true,
  },
  {
    STT: 2,
    SoPhieu: 478066,
    MaHoaDon: 13808,
    NgayThu: "10/01/2024 10:39",
    SoTien: "708.000",
    DonViThu: "Dương Linh Chi",
    LoaiHDDT: "Cá nhân",
    HDDT: true,
    ChiTiet: true,
    NhatKy: false,
  },
  {
    STT: 3,
    SoPhieu: 444124,
    MaHoaDon: 25708,
    NgayThu: "10/10/2023 14:53",
    SoTien: "2.124.000",
    DonViThu: "Dương Linh Chi",
    LoaiHDDT: "Cá nhân",
    HDDT: true,
    ChiTiet: false,
    NhatKy: true,
  },
  // Thêm dữ liệu tương tự cho các dòng khác
];
const tableCell = [
  "STT",
  "Số phiếu",
  "Mã hoá đơn",
  "Ngày thu",
  "Số tiền",
  "Đơn vị thu",
  "Loại HĐĐT",
  "HĐĐT",
  "Chi tiết",
  "Nhật ký",
];
const GeneralReceipts = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  return (
    <Box>
      <Container sx={{ backgroundColor: "white", height: "500px" }}>
        <Box sx={{ padding: "10px 5px" }}>
          <Box sx={{ margin: "15px 0" }}>
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
                sx={{ color: "#0c6fbe", fontWeight: "700", fontSize: "16px" }}
              >
                Phiếu thu tổng hợp
              </Typography>
            </Box>
          </Box>
          <Box>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650, borderCollapse: "collapse" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    {tableCell.map((item) => (
                      <TableCell
                        sx={{
                          border: "2px solid rgb(221, 221, 221)",
                          textAlign: "center",
                          fontSize: "15px",
                          fontWeight: "600",
                          color: "rgb(29, 161, 242)",
                        }}
                      >
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow
                      key={row.STT}
                      sx={{
                        // "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                        backgroundColor:
                          selectedRow === index ? "lightblue" : "inherit",
                      }}
                      onClick={() => handleRowClick(index)}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid rgb(221, 221, 221)",
                          fontWeight: "500",
                          fontSize: "14px",
                          color:
                            selectedRow === index
                              ? "rgb(12, 111, 190)"
                              : "rgb(102, 117, 128)",
                        }}
                      >
                        {row.STT}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                          color:
                            selectedRow === index
                              ? "rgb(12, 111, 190)"
                              : "rgb(102, 117, 128)",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        {row.SoPhieu}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                          color:
                            selectedRow === index
                              ? "rgb(12, 111, 190)"
                              : "rgb(102, 117, 128)",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        {row.MaHoaDon}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                          color:
                            selectedRow === index
                              ? "rgb(12, 111, 190)"
                              : "rgb(102, 117, 128)",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        {row.NgayThu}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                          color:
                            selectedRow === index
                              ? "rgb(12, 111, 190)"
                              : "rgb(102, 117, 128)",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        {row.SoTien}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                          color:
                            selectedRow === index
                              ? "rgb(12, 111, 190)"
                              : "rgb(102, 117, 128)",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        {row.DonViThu}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                          color:
                            selectedRow === index
                              ? "rgb(12, 111, 190)"
                              : "rgb(102, 117, 128)",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        {row.LoaiHDDT}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                          color:
                            selectedRow === index
                              ? "rgb(12, 111, 190)"
                              : "rgb(102, 117, 128)",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        {row.HDDT ? <CloudDownload /> : ""}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                          color:
                            selectedRow === index
                              ? "rgb(12, 111, 190)"
                              : "rgb(102, 117, 128)",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        {row.ChiTiet ? <EditNote /> : ""}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                          color:
                            selectedRow === index
                              ? "rgb(12, 111, 190)"
                              : "rgb(102, 117, 128)",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        {row.NhatKy ? <ReceiptLong /> : ""}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default GeneralReceipts;
