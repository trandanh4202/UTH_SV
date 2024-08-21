/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Divider,
  Modal,
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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailOrder } from "../../../features/orderSlice/OrderSlice";
const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle null or undefined dateString
  const date = new Date(dateString);
  if (isNaN(date?.getTime())) return ""; // Handle invalid date strings
  return format(date, "dd/MM/yyyy");
};

const formatCurrency = (number) => {
  return (
    number &&
    number?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })
  );
};
const tableCell = ["STT", "Mã", "Nội dung thu", "Thanh toán", "Số lượng"];
const StudentCertificatePopUp = ({
  open,
  onClose,
  id,
  soPhieu,
  maHoaDon,
  ngayThu,
}) => {
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (open) dispatch(getDetailOrder(id));
  }, [dispatch, open, id]);
  const item = useSelector((state) => state.order.getDetailOrder?.body);

  return (
    <Modal open={open} onClose={onClose} sx={{ padding: "10px" }}>
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: 24,
          maxWidth: "1000px",
          width: "90%",
          p: 4,
          borderRadius: "20px",
        }}
      >
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
              sx={{ color: "#0c6fbe", fontWeight: "700", fontSize: "20px" }}
            >
              Chi tiết đăng ký
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "start", lg: "center" },
          }}
        >
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
                Tổng cộng: {formatCurrency(item?.productFee)}
              </Typography>
            </Box>
          </Box>
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
                Ngày đăng ký: {formatDate(item?.orderDate)}
              </Typography>
            </Box>
          </Box>
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
                Trạng thái: {item?.lastHistoryOrder?.status}
              </Typography>
            </Box>
          </Box>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "50vh",
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
          <Table sx={{ minWidth: 500 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                {tableCell?.map((cell) => (
                  <TableCell
                    key={cell}
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      backgroundColor: "#008689",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {item?.orderDetails?.map((row, index) => (
                <TableRow key={row.maKhoanThuKhac}>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                  >
                    {row?.id}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                  >
                    {row?.product?.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                  >
                    {formatCurrency(row?.product?.price)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                  >
                    {row?.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            textAlign: "right",
            width: "100%",
          }}
        >
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              padding: "10px",
              marginTop: "20px",
              backgroundColor: "#008689",
              "&:hover": {
                backgroundColor: "#008981",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "15px",
                width: "100%",
              }}
            >
              Đóng
            </Typography>
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default StudentCertificatePopUp;
