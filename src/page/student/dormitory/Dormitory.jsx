/* eslint-disable react/jsx-key */
import {
  Box,
  Button,
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
import AddKTX from "../../../components/addKTX/AddKTX";
import { getDorm, getInforDorm } from "../../../features/dormSlice/DormSlice";
import { toast } from "react-toastify";

const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle null or undefined dateString
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid date strings
  return format(date, "dd/MM/yyyy");
};

const tableCell = [
  "STT",
  "Mã đăng ký",
  "Học kỳ đăng ký",
  "Cơ sở",
  "Ngày yêu cầu",
  "Trạng thái",
  "Ngày xử lý",
  "Thao tác",
];

const Dormitory = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const dispatch = useDispatch();

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const [modalKTXOpen, setModalKTXOpen] = useState(false);

  const handleModalKTXOpen = () => {
    setModalKTXOpen(true);
  };

  const handleModalKTXClose = () => {
    setModalKTXOpen(false);
  };
  useEffect(() => {
    dispatch(getDorm());
  }, [dispatch]);
  const dorms = useSelector((state) => state.dorm.dorms?.body);
  const loading = useSelector((state) => state.dorm?.loading);
  const message = useSelector((state) => state.dorm?.message);
  const success = useSelector((state) => state.dorm?.success);
  const timestamp = useSelector((state) => state.dorm?.timestamp);
  useEffect(() => {
    if (!loading && timestamp) {
      if (message && success) {
        toast.success(message);
      } else if (!success) {
        toast.error(message);
      }
    }
  }, [loading, message, success, timestamp]);
  return (
    <Box>
      <Container sx={{ backgroundColor: "white" }}>
        <Box sx={{ padding: "10px 5px" }}>
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
                sx={{ color: "#008588", fontWeight: "700", fontSize: "16px" }}
              >
                Đăng ký Ký túc xá
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                onClick={handleModalKTXOpen}
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
                    boxShadow: "0 0 10px #008689",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "11px", lg: "15px" },
                    fontWeight: "700",
                  }}
                >
                  Đăng ký KTX
                </Typography>
              </Button>
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
                        fontSize: { xs: "13px", lg: "18px" },
                      }}
                    >
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dorms?.map((row, index) => (
                  <TableRow
                    key={row?.soPhieu}
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
                        fontSize: "14px",
                      }}
                    >
                      KTX{row?.id}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",

                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {row?.period?.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",

                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {row?.campus?.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",

                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {formatDate(row?.createdAt)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",

                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {row?.status}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",

                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {formatDate(row?.updatedAt)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",

                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {/* <Receipt
                        onClick={() =>
                          handleReceiptClick(
                            row?.soPhieu,
                            row?.maHoaDon,
                            row?.ngayThu
                          )
                        }
                      /> */}
                      {row?.status !== "Hủy" ? <DeleteKTX item={row} /> : ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <AddKTX open={modalKTXOpen} onClose={handleModalKTXClose} />
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default Dormitory;
