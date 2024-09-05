/* eslint-disable react/prop-types */
import { TaskAltOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { finishOrder } from "../../features/orderSlice/OrderSlice";

const FinishService = ({ item }) => {
  const [deleteStudentServicePopUpOpen, setDeleteStudentServicePopUpOpen] =
    useState(false);
  // const [selectedAddress, setSelectedAddress] = useState(null);

  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    setDeleteStudentServicePopUpOpen(true);
    // setSelectedAddress(item); // Đảm bảo selectedAddress được thiết lập
  };
  const handleDeleteCancel = () => {
    setDeleteStudentServicePopUpOpen(false);
  };

  const handleDeleteConfirm = () => {
    // if (selectedAddress) {
    dispatch(finishOrder(item?.id));
    setDeleteStudentServicePopUpOpen(false); // Đóng pop-up sau khi xác nhận
    // }
  };

  return (
    <>
      <IconButton
        onClick={handleDeleteClick}
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
        <TaskAltOutlined sx={{ fontSize: { xs: "15px", lg: "20px" } }} />
      </IconButton>

      <Modal open={deleteStudentServicePopUpOpen} onClose={handleDeleteCancel}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "50%", lg: "40%" },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "20px",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "20px",
              color: "black",
              fontWeight: "600",
              fontSize: { xs: "11px", lg: "15px" },
            }}
          >
            Xác nhận hoàn thành đăng ký
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "20px",
              color: "black",
              fontWeight: "600",
              fontSize: { xs: "11px", lg: "13px" },
            }}
          >
            Sinh viên xác nhận hoàn thành khi nhận đủ danh sách đăng ký
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Button
              onClick={handleDeleteCancel}
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
                "&:hover": {
                  borderColor: "#008689",
                  backgroundColor: "white",
                  color: "#008689",
                  boxShadow: "0 0 10px #008689",
                },
              }}
            >
              <Typography>Trở lại</Typography>
            </Button>
            <Button
              onClick={handleDeleteConfirm}
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
                "&:hover": {
                  borderColor: "#008689",
                  backgroundColor: "white",
                  color: "#008689",
                  boxShadow: "0 0 10px #008689",
                },
              }}
            >
              <Typography>Đồng ý</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default FinishService;
