/* eslint-disable react/jsx-key */
import { EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Swiper, SwiperSlide } from "swiper/react";
import AddAddress from "../../../components/addAddress/AddAddress";
import { getAddress } from "../../../features/addressSlice/AddressSlice";
import { addToCart } from "../../../features/cartSlice/CartSlice";
import {
  finishOrder,
  getAllOrder,
} from "../../../features/orderSlice/OrderSlice";
import { getAllProduct } from "../../../features/productSlice/ProductSlice";
import StudentCertificatePopUp from "./StudentCertificatePopUp";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import DeleteStudentService from "../../../components/DeleteStudentService/DeleteStudentService";
import FinishService from "../../../components/FinishService/FinishService";
import Spinner from "../../../components/Spinner/Spinner";
import DeleteAddress from "../../../components/deleteAddress/DeleteAddress";
import EditAddress from "../../../components/editAddress/EditAddress";

const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle null or undefined dateString
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid date strings
  return format(date, "dd/MM/yyyy");
};

const tableCell = [
  "STT",
  "Số phiếu",
  "Nơi nhận",
  "Ngày yêu cầu",
  "Trạng thái",
  "Ngày xử lý",
  "Ghi chú",
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
  const [openModalFinish, setOpenModalFinish] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleFinishClick = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenModal(true);
  };
  const handleConfirmFinish = () => {
    // Call API with the order ID
    dispatch(finishOrder());
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(getAllOrder());
    dispatch(getAllProduct());
    dispatch(getAddress());
  }, [dispatch]);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState("");

  const handleCloseDetailPopUp = (row) => {
    setOpenModal(true);
    setId(row.id);
  };

  const receipts = useSelector((state) => state.order.order?.body);

  const products = useSelector((state) => state.product.product?.body);

  const address = useSelector((state) => state.address.address?.body);
  const loadingAddress = useSelector((state) => state.address?.loading);
  const messageAddress = useSelector((state) => state.address?.message);
  const successAddress = useSelector((state) => state.address?.success);
  const timestampAddress = useSelector((state) => state.address?.timestamp);
  const [modalAddressOpen, setModalAddressOpen] = useState(false);
  const handleModalAddressOpen = () => {
    setModalAddressOpen(true);
  };
  const handleModalAddressClose = () => {
    setModalAddressOpen(false);
  };
  useEffect(() => {
    if (!modalAddressOpen) {
      if (!loadingAddress && timestampAddress) {
        if (messageAddress && successAddress === true) {
          toast.success(messageAddress);
        } else if (successAddress === false) {
          toast.error(messageAddress);
        }
      }
    }
  }, [
    loadingAddress,
    messageAddress,
    successAddress,
    modalAddressOpen,
    timestampAddress,
  ]);

  const loadingCart = useSelector((state) => state.cart?.loading);
  const messageCart = useSelector((state) => state.cart?.message);
  const successCart = useSelector((state) => state.cart?.success);
  const timestampCart = useSelector((state) => state.cart?.timestamp);

  const addCombo = (item) => {
    dispatch(addToCart({ productId: item.id, quantity: 1 }));
  };
  useEffect(() => {
    if (!loadingCart && timestampCart) {
      if (messageCart && successCart === true) {
        toast.success(messageCart);
      } else if (successCart === false) {
        toast.error(messageCart);
      }
    }
  }, [loadingCart, messageCart, successCart, timestampCart]);

  return (
    <Box>
      <Container sx={{}}>
        <Grid container>
          <Grid container spacing={5}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <iframe
                width="1048"
                height="590"
                src="https://www.youtube.com/embed/CdABTFMe8bM"
                title="Hướng dẫn chọn size đồng phục cho tân sinh viên UTH"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </Grid>
            <Grid item xs={12}>
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                }}
              >
                <SwiperSlide>
                  <img
                    src="/images/AnhSize.png"
                    alt=""
                    style={{
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/images/AnhSize2.png"
                    alt=""
                    style={{
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/images/AnhSize3.png"
                    alt=""
                    style={{
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/images/AnhSize4.png"
                    alt=""
                    style={{
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/images/AnhSize5.png"
                    alt=""
                    style={{
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/images/AnhSize6.png"
                    alt=""
                    style={{
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/images/AnhSize7.png"
                    alt=""
                    style={{
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </SwiperSlide>
              </Swiper>
            </Grid>
            {products?.map((product) => (
              <Grid item lg={3} xs={6}>
                <Paper
                  elevation={4}
                  sx={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    transition: "ease all 0.5s",
                    display: "flex",
                    justifyContent: "space-between",
                    // alignItems: "center",
                    flexDirection: "column",
                    height: "100%",
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
                      onClick={() => addCombo(product)} // Truyền product vào hàm addCombo
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
          <Grid
            sx={{
              padding: "10px 5px",
              backgroundColor: "white",
              margin: "20px 0",
            }}
            container
          >
            <Grid
              item
              xs={12}
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
                  sx={{ color: "#008588", fontWeight: "700", fontSize: "20px" }}
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
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    Thêm địa chỉ
                  </Typography>
                </Button>
              </Box>
            </Grid>
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
                    {tableCell2?.map((item) => (
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
                  {loadingAddress ? (
                    <Spinner />
                  ) : (
                    address?.map((item, index) => (
                      <TableRow
                        key={item.soPhieu}
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
                          {item.PROVINCE_NAME}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: "14px",
                          }}
                        >
                          {item.DISTRICT_NAME}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: "14px",
                          }}
                        >
                          {item.WARDS_NAME}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: "14px",
                          }}
                        >
                          {item.detail}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: "14px",
                          }}
                        >
                          {item.phoneNumber ? item.phoneNumber : "Chưa có"}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: "14px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "10px",
                            }}
                          >
                            <DeleteAddress item={item} />
                            <EditAddress editData={item} />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid
            sx={{
              padding: "10px 5px",
              backgroundColor: "white",
              margin: "20px 0",
            }}
            container
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
                  sx={{ color: "#008588", fontWeight: "700", fontSize: "20px" }}
                >
                  Lịch sử đăng ký
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
                    {tableCell?.map((item) => (
                      <TableCell
                        key={item}
                        align="center"
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                          backgroundColor: "#008689",
                          color: "white",
                          fontWeight: "600",
                          fontSize: { xs: "13px", lg: "15px" },
                        }}
                      >
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receipts &&
                    receipts?.map((row, index) => (
                      <TableRow
                        key={row.id}
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
                            fontSize: { xs: "11px", lg: "14px" },
                          }}
                        >
                          {row.id}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: { xs: "11px", lg: "14px" },
                          }}
                        >
                          {row.address}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: { xs: "11px", lg: "14px" },
                          }}
                        >
                          {formatDate(row.createdAt)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: { xs: "11px", lg: "14px" },
                          }}
                        >
                          {row.status}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: { xs: "11px", lg: "14px" },
                          }}
                        >
                          {formatDate(row.updatedAt)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",

                            fontWeight: "500",
                            fontSize: { xs: "11px", lg: "14px" },
                          }}
                        >
                          {row.reason}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "5px",
                            fontWeight: "500",
                            fontSize: { xs: "11px", lg: "14px" },
                          }}
                        >
                          {row?.statusCode === "NEW" && (
                            <DeleteStudentService item={row} />
                          )}
                          {row?.statusCode === "WAIT_SHIPPING" && (
                            <FinishService item={row} />
                          )}
                          <IconButton
                            onClick={() => handleCloseDetailPopUp(row)} // Sử dụng callback để truyền tham số
                            variant="contained"
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
                                color: "red",
                                boxShadow: "0 0 10px #008689",
                              },
                            }}
                          >
                            <EditOutlined
                              sx={{ fontSize: { xs: "15px", lg: "20px" } }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}

                  <StudentCertificatePopUp
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    id={id}
                    // onClose={handleCloseDetailPopUp}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <AddAddress open={modalAddressOpen} onClose={handleModalAddressClose} />
      </Container>
    </Box>
  );
};

export default StudentCertificate;
