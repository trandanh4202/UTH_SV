import { AddCardOutlined, ClearOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
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
  return number?.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

const selectStyles = {
  "&:focus": {
    borderRadius: "8px",
  },
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .MuiInputBase-input": {
    fontSize: "15px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "8px",
    border: "3px solid #0085885a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: { lg: "9px 14px", xs: "2px" },
    transition: "all ease 0.4s",
  },
  "& .MuiSvgIcon-root": {
    color: "#0085885a",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0085885a",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0085885a",
  },
  "& .MuiSelect-select:focus": {
    borderRadius: "8px",
    borderColor: "#008588",
  },
};
const inputStyles = {
  "& .MuiInputBase-root": {
    borderRadius: "8px",
  },
  "& .MuiInputLabel-root": {
    fontStyle: "italic",
    color: "grey",
    fontSize: "14px",
    "&.Mui-focused": {
      color: "#008588",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "15px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    border: "3px solid #0085885a",
    alignItems: "center",
    transition: "all ease 0.4s",
    padding: { lg: "9px 14px", xs: "2px" },
    textAlign: "center",
    "&:hover": {
      borderColor: "#008588",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#008588 !important",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "2px solid #008588",
  },

  "& .MuiSvgIcon-root": {
    color: "green",
    backgroundSize: "cover",
  },
};
const Cart = () => {
  const [openDrawerCart, setOpenDrawerCart] = useState(false);
  const [size, setSize] = useState("");
  const [campus, setCampus] = useState(1);
  const dispatch = useDispatch();
  const [isShip, setIsShip] = useState(false);

  const toggleDrawerCart = (newOpen) => () => {
    setOpenDrawerCart(newOpen);
    if (newOpen) {
      dispatch(getCart());
      dispatch(getAddress());
    }
  };
  const loadingOrder = useSelector((state) => state.order?.loading);
  const messageOrder = useSelector((state) => state.order?.message);
  const successOrder = useSelector((state) => state.order?.success);
  const timestampOrder = useSelector((state) => state.order?.timestamp);
  useEffect(() => {
    if (!loadingOrder) {
      if (timestampOrder && successOrder) {
        toast.success(messageOrder);
      } else if (!successOrder) {
        toast.error(messageOrder);
      }
    }
  }, [loadingOrder, messageOrder, successOrder, timestampOrder]);
  const carts = useSelector((state) => state.cart.cart?.body?.carts);
  const address = useSelector((state) => state.address.address?.body);
  const loadingCart = useSelector((state) => state.cart?.loading);
  const timestampCart = useSelector((state) => state.cart?.timestamp);
  useEffect(() => {
    if (!loadingCart && timestampCart) {
      setOpenDrawerCart(true);
    }
  }, [loadingCart, timestampCart]);

  const deleleAllCart = () => {
    dispatch(deleteCart());
  };

  const handleChange = (item) => (event) => {
    const newSize = event.target.value;
    handleSizeChange(item, newSize);
  };
  const handleSizeChange = (item, newSize) => {
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
    }
  };

  const addCombo1 = () => {
    dispatch(addToCart({ productId: 6 }));
  };

  const addCombo2 = () => {
    dispatch(addToCart({ productId: 7 }));
  };

  const changeCampus = (e) => {
    const selectedValue = e.target.value;
    setCampus(selectedValue);
    // Kiểm tra nếu chọn id là 1, 2, hoặc 3 thì không tính phí và không giao hàng
    if (selectedValue === 1 || selectedValue === 2 || selectedValue === 3) {
      setIsShip(false); // Không giao hàng
    } else {
      setIsShip(true); // Giao hàng
    }
  };

  const [selectedShipping, setSelectedShipping] = useState(null); // State để lưu lựa chọn dịch vụ vận chuyển
  const total = useSelector(
    (state) => state.order.getEstimateTotalAmount?.body
  );
  const handleShippingChange = (event) => {
    setSelectedShipping(event.target.value);
  };

  const handleCreateOrder = async () => {
    // Kiểm tra nếu campus là 1, 2, hoặc 3
    if (campus === 1 || campus === 2 || campus === 3) {
      // Lấy giá trị từ API getEstimateTotalAmount cho đơn hàng tại các campus 1, 2, hoặc 3
      const estimatedTotal = total?.[0]?.total; // Giả định lấy giá đầu tiên, bạn có thể điều chỉnh logic lấy giá trị này nếu cần

      // Tạo formData sử dụng estimatedTotal
      const formData = {
        addressId: campus,
        isShip: false,
        shipServiceCode: null, // Không cần mã dịch vụ vận chuyển khi không có giao hàng
      };

      try {
        await dispatch(createOrder(formData));
        dispatch(getCart());
      } catch (error) {
        toast.error("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } else {
      // Trường hợp không phải campus 1, 2, hoặc 3
      if (!selectedShipping) {
        toast.error("Vui lòng chọn dịch vụ vận chuyển.");
        return;
      }

      // Tạo formData sử dụng selectedShipping
      const formData = {
        addressId: campus,
        isShip: true,
        shipServiceCode: selectedShipping, // Sử dụng serviceCode từ lựa chọn
      };

      try {
        await dispatch(createOrder(formData));
        dispatch(getCart());
      } catch (error) {
        toast.error("Đăng ký thất bại. Vui lòng thử lại.");
      }
    }
  };

  // Tính tổng tiền từ dịch vụ vận chuyển đã chọn
  const selectedTotal = total?.find(
    (item) => item.serviceCode === selectedShipping
  )?.total;

  useEffect(() => {
    // Chỉ gọi API khi Drawer được mở lần đầu tiên và hasFetchedEstimate là false
    if (openDrawerCart && !loadingCart) {
      const formData = {
        addressId: campus,
        isShip: isShip,
        shipServiceCode: isShip ? null : "1",
      };

      dispatch(getEstimateTotalAmount(formData));
    }
  }, [dispatch, openDrawerCart, campus, isShip, loadingCart]);

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
              lg: "60%",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#008588",
                  fontWeight: "700",
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                Danh sách đăng ký
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                right: "10px",
                top: "10px",
              }}
              onClick={() => setOpenDrawerCart()}
            >
              <IconButton
                sx={{
                  backgroundColor: "#ff00001f",
                }}
              >
                <ClearOutlined
                  sx={{
                    color: "red",
                  }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "5px",
              margin: "15px 0",
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
              sx={selectStyles}
            >
              <MenuItem value="0" disabled>
                <Typography disabled> Vui lòng chọn </Typography>
              </MenuItem>

              {address?.map((item, index) => (
                <MenuItem value={item.id} index={index} key={item.id}>
                  <Typography variant="span">{item.detail}</Typography>
                  <Typography variant="span">, {item.WARDS_NAME}</Typography>
                  <Typography variant="span">, {item.DISTRICT_NAME}</Typography>
                  <Typography variant="span">, {item.PROVINCE_NAME}</Typography>
                </MenuItem>
              ))}
            </Select>
          </Box>
          {loadingCart ? (
            <Spinner />
          ) : (
            <Box>
              <Grid container sx={{ marginBottom: "30px" }}>
                <Grid item xs={4} lg={5}>
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
                <Grid item xs={2} lg={1}>
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
                    Lựa chọn
                  </Typography>
                </Grid>

                <Grid item xs={2} lg={2}>
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
                <Grid item xs={2} lg={1}>
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
                <Grid item xs={2} lg={3}>
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
              <Grid
                container
                spacing={{ xs: "1", lg: "4" }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {carts?.map((item) => (
                  <>
                    <Grid item xs={4} lg={5}>
                      <Box
                        sx={{
                          textAlign: "left",
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
                            textAlign: "left",
                          }}
                        >
                          {item?.product.name}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={2} lg={1}>
                      <Select
                        value={item?.option?.id || size || ""}
                        onChange={handleChange(item)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={selectStyles}
                        defaultValue={item?.option?.id || size || ""}
                      >
                        <MenuItem value="">
                          <Typography>None</Typography>
                        </MenuItem>
                        {item?.product.options?.map((option) => (
                          <MenuItem value={option.id} key={option.id}>
                            <Typography>{option.name}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={2} lg={2}>
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
                        {formatCurrency(item?.product.price)}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} lg={1}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <TextField value={item?.quantity} sx={inputStyles} />
                      </Box>
                    </Grid>

                    <Grid item xs={2} lg={3}>
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
                        {formatCurrency(item?.product.price * item?.quantity)}
                      </Typography>
                    </Grid>
                  </>
                ))}
              </Grid>

              <Grid container sx={{ margin: "20px 0" }} spacing={2}>
                <Grid item xs={8}>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontWeight: "700",
                      fontSize: {
                        xs: "14px",
                        lg: "16px",
                      },
                      textAlign: "right",
                    }}
                  >
                    Tổng cộng:
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  {campus === 1 || campus === 2 || campus === 3 ? (
                    // Hiển thị giá trực tiếp cho campus 1, 2, 3
                    <Typography
                      sx={{
                        color: "#333333",
                        fontWeight: "700",
                        fontSize: {
                          xs: "14px",
                          lg: "16px",
                        },
                        textAlign: "center",
                      }}
                    >
                      {formatCurrency(total?.[0]?.total || 0)}{" "}
                      {/* Hiển thị giá đầu tiên từ API */}
                    </Typography>
                  ) : (
                    // Hiển thị chọn phương thức vận chuyển Viettel Post cho các campus khác
                    <FormControl
                      component="fieldset"
                      sx={{ marginTop: "20px" }}
                    >
                      <FormLabel
                        component="legend"
                        sx={{
                          color: "red",
                          fontSize: "15px",
                        }}
                      >
                        Chọn phương thức vận chuyển Viettel Post
                      </FormLabel>
                      <RadioGroup
                        value={selectedShipping}
                        onChange={handleShippingChange}
                      >
                        {total?.map((item) => (
                          <FormControlLabel
                            key={item.serviceCode}
                            value={item.serviceCode}
                            control={
                              <Radio
                                sx={{
                                  width: 30,
                                  height: 30,
                                  "&.Mui-checked": { color: "#008689" },
                                  "&.Mui-checked + .MuiFormControlLabel-label":
                                    {
                                      color: "#008689",
                                      fontSize: "14px",
                                      fontWeight: "700",
                                    },
                                }}
                              />
                            }
                            sx={{
                              "& .MuiFormControlLabel-label": {
                                fontSize: "15px",
                                color: "rgb(102, 117, 128)",
                                fontWeight: "500",
                              },
                            }}
                            label={`${formatCurrency(item.total)} 
              (Đã bao gồm phí dịch vụ ${formatCurrency(
                item.additionalFee
              )}) - ${item.service}`}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  )}
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {/* {carts.product.} */}
                <Grid item lg={5} xs={6}>
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
                        bolghadow: "0 0 10px #008689",
                      },
                    }}
                    onClick={addCombo1}
                  >
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: { xs: "11px", lg: "15px" },
                        textAlign: "center",
                      }}
                    >
                      Thêm combo Đồng phục 1
                    </Typography>
                  </Button>
                </Grid>
                <Grid item lg={5} xs={6}>
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
                        bolghadow: "0 0 10px #008689",
                      },
                    }}
                    onClick={addCombo2}
                  >
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: { xs: "11px", lg: "15px" },
                        textAlign: "center",
                      }}
                    >
                      Thêm combo Đồng phục 2
                    </Typography>
                  </Button>
                </Grid>
                <Grid item lg={2} xs={6}>
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
                        bolghadow: "0 0 10px #008689",
                      },
                    }}
                    onClick={deleleAllCart}
                  >
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: { xs: "11px", lg: "15px" },
                        textAlign: "center",
                      }}
                    >
                      Xóa hết
                    </Typography>
                  </Button>
                </Grid>
                <Grid item lg={12} xs={6}>
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
                        fontSize: { xs: "11px", lg: "15px" },
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
