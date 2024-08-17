/* eslint-disable react/jsx-key */
import { CloudDownload, Receipt } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
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
import ReceiptDetailPopup from "../tuitionFees/generalReceipts/ReceiptDetailPopup";
import AddFamily from "../../../components/addFamily/AddFamily";
import AddKTX from "../../../components/addKTX/AddKTX";
import { getAllOrder } from "../../../features/orderSlice/OrderSlice";
import { getAllProduct } from "../../../features/productSlice/ProductSlice";
import { addToCart } from "../../../features/cartSlice/CartSlice";
import { getAddress } from "../../../features/addressSlice/AddressSlice";
import AddAddress from "../../../components/addAddress/AddAddress";
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
  "Cơ sở",
  "Ngày yêu cầu",
  "Trạng thái",
  "Ngày xử lý",
  "Chi tiết",
];

const tableCell2 = [
  "STT",
  "Tỉnh",
  "Huyện",
  "Phường/ Xã",
  "Địa chỉ cụ thể",
  "Số điện thoại",
  "Thao tác",
];

const StudentCertificate = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const dispatch = useDispatch();

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  useEffect(() => {
    dispatch(getAllOrder());
    dispatch(getAllProduct());
    dispatch(getAddress());
  }, [dispatch]);

  const receipts = useSelector((state) => state.order.order?.body);
  const products = useSelector((state) => state.product.product?.body);
  const address = useSelector((state) => state.address.address?.body);

  const [modalKTXOpen, setModalKTXOpen] = useState(false);

  const handleModalKTXOpen = () => {
    setModalKTXOpen(true);
  };

  const handleModalKTXClose = () => {
    setModalKTXOpen(false);
  };
  const handleAddToCart = (product) => {
    // Kiểm tra nếu options rỗng thì đặt là []
    const options =
      product.options && product.options.length > 0
        ? product.options[0].id
        : null;

    // Tạo formData cho việc thêm vào giỏ hàng
    const formData = {
      productId: product.id,
      quantity: 1, // Mặc định là 1
      optionId: options,
    };

    // Gọi action để thêm vào giỏ hàng
    dispatch(addToCart(formData));
  };
  const [modalAddressOpen, setModalAddressOpen] = useState(false);

  const handleModalAddressOpen = () => {
    setModalAddressOpen(true);
  };

  const handleModalAddressClose = () => {
    setModalAddressOpen(false);
  };
  return (
    <Box>
      <Container sx={{}}>
        <Grid container spacing={3}>
          {products?.map((product) => (
            <Grid item xs={3} sx={{}}>
              <Paper
                elevation={4}
                sx={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  transition: "ease all 0.5s",
                  "&:hover": {
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "600",
                    whiteSpace: "2",
                    backgroundColor: "#008689",
                    color: "white",
                    boxShadow: "0 0 10px #008689",
                    padding: "5px",
                    "& .product-name": {
                      color: "white",
                    },
                  },
                }}
              >
                <Box>
                  <img
                    src="/images/giayxacnhan.png"
                    alt={product.name}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "300x",
                      borderTopRightRadius: "10px",
                      borderTopLeftRadius: "10px",
                    }}
                  />
                </Box>
                <Divider />
                <Box>
                  <Typography
                    sx={{
                      color: "#008588",
                      fontWeight: "700",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    className="product-name"
                  >
                    {product.name}
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => handleAddToCart(product)} // Gọi hàm khi nhấn nút
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#008588",
                      borderRadius: "8px",
                      border: "3px solid #0085885a",
                      transition: "all ease 0.4s",
                      padding: "4px",
                      width: "100%",
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
                        fontWeight: "700",
                        fontSize: "16px",
                        textAlign: "center",
                      }}
                    >
                      Đăng ký nhận
                    </Typography>
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            padding: "10px 5px",
            backgroundColor: "white",
            margin: "20px 0",
          }}
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
                sx={{ color: "#008588", fontWeight: "700", fontSize: "16px" }}
              >
                Địa chỉ nhận hàng
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                onClick={handleModalAddressOpen}
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
                Đăng ký KTX
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
                  {tableCell2.map((item) => (
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
                {address?.map((row, index) => (
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
                    ></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          sx={{
            padding: "10px 5px",
            backgroundColor: "white",
            margin: "20px 0",
          }}
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
                sx={{ color: "#008588", fontWeight: "700", fontSize: "16px" }}
              >
                Giấy xác nhận sinh viên
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
                    ></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <AddAddress open={modalAddressOpen} onClose={handleModalAddressClose} />
      </Container>
    </Box>
  );
};

export default StudentCertificate;
