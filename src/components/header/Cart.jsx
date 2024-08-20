import { AddCardOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteCart,
  getCart,
  updateCart,
} from "../../features/cartSlice/CartSlice";
import { getAddress } from "../../features/addressSlice/AddressSlice";
import {
  createOrder,
  getEstimateTotalAmount,
} from "../../features/orderSlice/OrderSlice";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const formatCurrency = (number) => {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

const Cart = () => {
  const [openDrawerCart, setOpenDrawerCart] = useState(false);
  const [size, setSize] = useState("");
  const [campus, setCampus] = useState(1);
  const dispatch = useDispatch();

  const toggleDrawerCart = (newOpen) => () => {
    setOpenDrawerCart(newOpen);
    if (newOpen) {
      dispatch(getCart());
      dispatch(getAddress());
    }
  };

  const carts = useSelector((state) => state.cart.cart?.body);
  const address = useSelector((state) => state.address.address?.body);
  const loading = useSelector((state) => state.cart.loading);
  const loadingOrder = useSelector((state) => state.order.loading);
  const updateCartMessage = useSelector(
    (state) => state.cart.updateCartMessage?.message
  );
  const updateCartSuccess = useSelector(
    (state) => state.cart.updateCartMessage?.success
  );
  const total = useSelector(
    (state) => state.order.getEstimateTotalAmount?.body
  );
  const deleleAllCart = () => {
    dispatch(deleteCart());
  };

  const handleChange = (item) => (event) => {
    const newSize = event.target.value;
    handleSizeChange(item, newSize);
  };
  const handleSizeChange = (item, newSize) => {
    // Kiểm tra xem newSize có nằm trong các giá trị hợp lệ không
    const validOptions = item.product.options?.map((option) => option.id);
    if (validOptions.includes(newSize)) {
      setSize(newSize);
      dispatch(
        updateCart({
          cartId: item.id,
          quantity: item.quantity,
          optionId: newSize,
        })
      );
    } else {
      console.warn(`Invalid size selected: ${newSize}`);
    }
  };
  const addCombo1 = () => {
    dispatch(addToCart("6"));
  };

  const addCombo2 = () => {
    dispatch(addToCart("7"));
  };
  const changeCampus = (e) => {
    setCampus(e.target.value);
  };
  const handleCreateOrder = async () => {
    const formData = {
      addressId: null,
      isShip: false,
      shipServiceCode: null,
    };

    try {
      // Tạo đơn hàng
      await dispatch(createOrder(formData));

      // Gọi lại API để cập nhật giỏ hàng sau khi đơn hàng được tạo thành công
      dispatch(getCart());

      // Hiển thị thông báo thành công
      toast.success("Đăng ký thành công!");
    } catch (error) {
      // Hiển thị thông báo lỗi nếu có
      toast.error("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    if (openDrawerCart && !loading) {
      const formData =
        campus === 1
          ? {
              addressId: null,
              isShip: false,
              shipServiceCode: "0",
            }
          : {
              addressId: address?.[0]?.id || null, // Sử dụng addressId từ address nếu có
              isShip: true,
              shipServiceCode: "1", // Bạn có thể điều chỉnh mã dịch vụ này tùy theo nhu cầu
            };

      dispatch(getEstimateTotalAmount(formData));
    }
  }, [dispatch, openDrawerCart, campus, address, loading]);

  useEffect(() => {
    if (!loading) {
      if (updateCartSuccess === true && updateCartMessage) {
        toast.success(updateCartMessage);
      } else if (updateCartSuccess === false) {
        toast.error(updateCartMessage);
      }
    }
  }, [loading, updateCartMessage, updateCartSuccess]);

  return (
    <>
      <Box
        onClick={toggleDrawerCart(true)}
        sx={{
          cursor: "pointer",
          color: "#008689",
        }}
      >
        <AddCardOutlined sx={{ fontSize: "35px" }} />
      </Box>
      <Drawer
        anchor="right"
        open={openDrawerCart}
        onClose={toggleDrawerCart(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: {
              lg: "50%",
              xs: "100%",
            },
          },
        }}
      >
        <Box
          sx={{
            minWidth: { lg: "70%", xs: "100%" },
            padding: "20px",
          }}
        >
          <Typography
            sx={{
              color: "#008588",
              fontWeight: "700",
              fontSize: "20px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Danh sách đăng ký
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography
              sx={{
                color: "#333333",
                fontWeight: "700",
                fontSize: {
                  xs: "11px",
                  lg: "16px",
                },
                textAlign: "center",
              }}
            >
              Nơi nhận
            </Typography>
            <Select
              value={campus}
              onChange={changeCampus}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              defaultValue="0"
            >
              <MenuItem value="0" disabled>
                <Typography disabled> Vui lòng chọn </Typography>
              </MenuItem>

              <MenuItem value="1" key="1">
                <Typography variant="span">Cơ sở 1</Typography>
              </MenuItem>
            </Select>
          </Box>
          {loading || loadingOrder ? (
            <Spinner />
          ) : (
            <Box>
              <Grid container spacing={3} sx={{ marginBottom: "30px" }}>
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      textAlign: "center",
                      fontSize: {
                        xs: "11px",
                        lg: "16px",
                      },
                    }}
                  >
                    Hình ảnh
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      textAlign: "center",
                      fontSize: {
                        xs: "11px",
                        lg: "16px",
                      },
                    }}
                  >
                    Nội dung
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      textAlign: "center",
                      fontSize: {
                        xs: "11px",
                        lg: "16px",
                      },
                    }}
                  >
                    Số lượng
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      textAlign: "center",
                      fontSize: {
                        xs: "11px",
                        lg: "16px",
                      },
                    }}
                  >
                    Đơn giá
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      textAlign: "center",
                      fontSize: {
                        xs: "11px",
                        lg: "16px",
                      },
                    }}
                  >
                    Tổng tiền
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                {carts?.map((item) => (
                  <>
                    <Grid item xs={2}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        style={{
                          width: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#333333",
                            fontWeight: "500",
                            fontSize: {
                              xs: "11px",
                              lg: "16px",
                            },
                            textAlign: "center",
                          }}
                        >
                          {item.product.name}
                        </Typography>
                        <Select
                          value={item.option?.id || size || ""}
                          onChange={handleChange(item)}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          sx={{
                            padding: "0",
                            "& .MuiInputBase-input": {
                              padding: "3px",
                            },
                          }}
                          defaultValue={item.option?.id || size || ""}
                        >
                          <MenuItem value="">
                            <Typography>None</Typography>
                          </MenuItem>
                          {item.product.options?.map((option) => (
                            <MenuItem value={option.id} key={option.id}>
                              <Typography>{option.name}</Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <TextField
                          value={item.quantity}
                          inputProps={{
                            min: 1,
                            max: 20,
                            style: { textAlign: "center" },
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        sx={{
                          color: "#333333",
                          fontWeight: "500",
                          fontSize: {
                            xs: "11px",
                            lg: "16px",
                          },
                          textAlign: "center",
                        }}
                      >
                        {formatCurrency(item.product.price)}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        sx={{
                          color: "#333333",
                          fontWeight: "500",
                          fontSize: {
                            xs: "11px",
                            lg: "16px",
                          },
                          textAlign: "center",
                        }}
                      >
                        {formatCurrency(item.product.price * item.quantity)}
                      </Typography>
                    </Grid>
                  </>
                ))}
              </Grid>

              <Grid
                container
                sx={{
                  margin: "20px 0",
                }}
              >
                <Grid item xs={10}>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontWeight: "700",
                      fontSize: {
                        xs: "11px",
                        lg: "16px",
                      },
                      textAlign: "right",
                    }}
                  >
                    Tổng cộng
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontWeight: "700",
                      fontSize: {
                        xs: "11px",
                        lg: "16px",
                      },
                      textAlign: "center",
                    }}
                  >
                    {total?.map((item) => formatCurrency(item.total))}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Button
                    type="submit"
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
                      padding: "9px 14px",
                      width: "100%",
                      "&:hover": {
                        borderColor: "#008689",
                        backgroundColor: "white",
                        color: "#008689",
                        boxShadow: "0 0 10px #008689",
                      },
                    }}
                    onClick={addCombo1}
                  >
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: "16px",
                        textAlign: "center",
                      }}
                    >
                      Thêm combo Đồng phục 1
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    type="submit"
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
                      width: "100%",
                      padding: "9px 14px",
                      "&:hover": {
                        borderColor: "#008689",
                        backgroundColor: "white",
                        color: "#008689",
                        boxShadow: "0 0 10px #008689",
                      },
                    }}
                    onClick={addCombo2}
                  >
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: "16px",
                        textAlign: "center",
                      }}
                    >
                      Thêm combo Đồng phục 2
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    type="submit"
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
                      width: "100%",
                      padding: "9px 14px",
                      "&:hover": {
                        borderColor: "#008689",
                        backgroundColor: "white",
                        color: "#008689",
                        boxShadow: "0 0 10px #008689",
                      },
                    }}
                    onClick={deleleAllCart}
                  >
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: "16px",
                        textAlign: "center",
                      }}
                    >
                      Xóa hết
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
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
                      width: "100%",
                      padding: "9px 14px",
                      "&:hover": {
                        borderColor: "#008689",
                        backgroundColor: "white",
                        color: "#008689",
                        boxShadow: "0 0 10px #008689",
                      },
                    }}
                    onClick={handleCreateOrder}
                  >
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: "16px",
                        textAlign: "center",
                      }}
                    >
                      Đăng ký
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Cart;
