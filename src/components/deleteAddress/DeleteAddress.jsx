import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress } from "../../features/addressSlice/AddressSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteAddress = ({ item }) => {
  const [deleteAddressPopUpOpen, setDeleteAddressPopUpOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    setDeleteAddressPopUpOpen(true);
    setSelectedAddress(item); // Đảm bảo selectedAddress được thiết lập
  };
  const handleDeleteCancel = () => {
    setDeleteAddressPopUpOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedAddress) {
      dispatch(deleteAddress(selectedAddress.id));
      setDeleteAddressPopUpOpen(false); // Đóng pop-up sau khi xác nhận
    }
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
        <DeleteOutline sx={{ fontSize: "30px" }} />
      </IconButton>

      <Modal open={deleteAddressPopUpOpen} onClose={handleDeleteCancel}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "20%",
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
              fontSize: "20px",
            }}
          >
            Hủy địa chỉ giao hàng
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

export default DeleteAddress;
