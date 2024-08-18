import React, { useState } from "react";
import { ShoppingCart } from "@mui/icons-material";
import {
  Box,
  Drawer,
  Typography,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getCart, updateCart } from "../../features/cartSlice/CartSlice";

const Cart = () => {
  const [openDrawerCart, setOpenDrawerCart] = useState(false);
  const dispatch = useDispatch();

  const toggleDrawerCart = (newOpen) => () => {
    setOpenDrawerCart(newOpen);
    if (newOpen) {
      dispatch(getCart());
    }
  };

  const carts = useSelector((state) => state.cart.cart?.body);

  const handleQuantityChange = (item, newQuantity, newOptionsId) => {
    if (newQuantity >= 1 && newQuantity <= 20) {
      // Dispatch action để cập nhật số lượng trong giỏ hàng
      dispatch(
        updateCart({
          productId: item.id,
          quantity: newQuantity ? newQuantity : item.quantity,
          optionsId: newOptionsId ? newOptionsId : item.option.id,
        })
      );
    }
  };

  return (
    <>
      <Box
        onClick={toggleDrawerCart(true)}
        sx={{
          cursor: "pointer",
          color: "#008689",
        }}
      >
        <ShoppingCart sx={{ fontSize: "35px" }} />
      </Box>
      <Drawer
        anchor="right"
        open={openDrawerCart}
        onClose={toggleDrawerCart(false)}
      >
        <Box
          sx={{
            width: "800px",
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
            Giỏ hàng của bạn
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: "700", textAlign: "center" }}>
                Hình ảnh
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: "700", textAlign: "center" }}>
                Nội dung
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: "700", textAlign: "center" }}>
                Số lượng
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: "700", textAlign: "center" }}>
                Đơn giá
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: "700", textAlign: "center" }}>
                Tổng tiền
              </Typography>
            </Grid>
          </Grid>
          {carts?.map((item) => (
            <Grid container spacing={2} alignItems="center" key={item.id}>
              <Grid item xs={2}>
                <img
                  src="/images/giayxacnhan.png"
                  alt={item.product.name}
                  style={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography
                  sx={{
                    color: "#333333",
                    fontWeight: "700",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {item.product.name}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={() =>
                      handleQuantityChange(item, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item,
                        parseInt(e.target.value, 10) || 1
                      )
                    }
                    inputProps={{
                      min: 1,
                      max: 20,
                      style: { textAlign: "center" },
                    }}
                    // type="number"
                    // variant="outlined"
                    // sx={{ width: "100px" }}
                  />
                  <IconButton
                    onClick={() =>
                      handleQuantityChange(item, item.quantity + 1)
                    }
                    disabled={item.quantity >= 20}
                  >
                    <Add />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{
                    color: "#333333",
                    fontWeight: "700",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {item.product.price}₫
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{
                    color: "#333333",
                    fontWeight: "700",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {item.product.price * item.quantity}₫
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Drawer>
    </>
  );
};

export default Cart;
