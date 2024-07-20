/* eslint-disable react/jsx-key */
import {
  CloudDownload,
  Receipt
} from "@mui/icons-material";
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
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReceiptDetail,
  getReceipts,
} from "~/features/tuitionSlice/TuitionSlice";
import ReceiptDetailPopup from "./ReceiptDetailPopup"; // Import component mới
const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle null or undefined dateString
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid date strings
  return format(date, "dd/MM/yyyy");
};

const tableCell = [
  "STT",
  "Số phiếu",
  "Mã hoá đơn",
  "Ngày thu",
  "Số tiền",
  "Đơn vị thu",
  "HĐĐT",
  "Chi tiết",
];

const GeneralReceipts = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSoPhieu, setSelectedSoPhieu] = useState(null);
  const [selectedMaHoaDon, setSelectedMaHoaDon] = useState(null);
  const [selectedNgayThu, setSelectedNgayThu] = useState(null);

  const dispatch = useDispatch();

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  useEffect(() => {
    dispatch(getReceipts());
  }, [dispatch]);

  const receipts = useSelector((state) => state.tuition?.receipts);

  const handleReceiptClick = (soPhieu, maHoaDon, ngayThu) => {
    setSelectedSoPhieu(soPhieu);
    setSelectedMaHoaDon(maHoaDon);
    setSelectedNgayThu(ngayThu);

    dispatch(getReceiptDetail({ soPhieu }));
    setOpenModal(true);
  };

  const receiptDetail = useSelector((state) => state.tuition?.receiptDetail);

  return (
    <Box>
      <Container sx={{ backgroundColor: "white" }}>
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
                  {tableCell.map((item) => (
                    <TableCell
                      key={item}
                      align="center"
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",
                        backgroundColor: "#008689",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "18px",
                      }}
                    >
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {receipts?.map((row, index) => (
                  <TableRow
                    key={row.soPhieu}
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedRow === index ? "#006b89x" : "inherit",
                    }}
                    onClick={() => handleRowClick(index)}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgb(221, 221, 221)",

                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",

                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {row.soPhieu}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",

                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {row.maHoaDon}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",

                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {formatDate(row.ngayThu)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",

                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {row.daNop}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",

                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {row.nguoiTao}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",

                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {row.hoaDonDienTu ? <CloudDownload /> : ""}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",

                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      <Receipt
                        onClick={() =>
                          handleReceiptClick(
                            row.soPhieu,
                            row.maHoaDon,
                            row.ngayThu
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <ReceiptDetailPopup
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                  receiptDetail={receiptDetail}
                  soPhieu={selectedSoPhieu}
                  maHoaDon={selectedMaHoaDon}
                  ngayThu={formatDate(selectedNgayThu)}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default GeneralReceipts;
