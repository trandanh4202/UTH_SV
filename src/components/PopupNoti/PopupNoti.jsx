import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopup } from "../../features/notificationSlice/NotificationSlice";

const PopupNoti = ({ open }) => {
  const dispatch = useDispatch();

  // Fetch popup data from API on component mount
  useEffect(() => {
    dispatch(getPopup());
  }, [dispatch]);

  // Selector to get success status and content from Redux state
  const { success, body: content = [] } = useSelector(
    (state) => state.notification.getPopup || {}
  );

  // State to control each popup's open status
  const [openModals, setOpenModals] = useState([]);

  // Get read popups from localStorage
  useEffect(() => {
    const readPopups = JSON.parse(localStorage.getItem("readPopups")) || [];
    if (success && content.length >= 1) {
      // Initialize modals based on read status from localStorage
      const initialOpenModals = content.map(
        (item) => !readPopups.includes(item.id) // Assuming each item has a unique 'id'
      );
      setOpenModals(initialOpenModals);
    } else {
      setOpenModals([]);
    }
  }, [success, content]);

  // Handle popup close for each modal by index
  const handleModalClose = (index, id) => {
    setOpenModals((prev) =>
      prev.map((isOpen, i) => (i === index ? false : isOpen))
    );

    // Save the read popup id to localStorage
    const readPopups = JSON.parse(localStorage.getItem("readPopups")) || [];
    if (!readPopups.includes(id)) {
      readPopups.push(id);
      localStorage.setItem("readPopups", JSON.stringify(readPopups));
    }
  };

  return (
    <>
      {content.map((item, index) => (
        <Modal
          key={index}
          open={openModals[index] || false} // Use state from openModals array
          onClose={() => handleModalClose(index, item.id)} // Pass item id to handleModalClose
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", lg: "40%" },
              bgcolor: "background.paper",
              boxShadow: 24,
              paddingBottom: "10px",
              borderRadius: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#008689",
                  boxShadow: "0 0 10px #008689",
                  padding: { xs: "3px", lg: "5px" },
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: "13px", lg: "20px" },
                    fontWeight: "600",
                    whiteSpace: "2",
                    color: "white",
                  }}
                >
                  Thông báo sinh viên
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: "13px", lg: "20px" },
                    fontWeight: "600",
                    whiteSpace: "2",
                    color: "red",
                  }}
                >
                  Tiêu đề thông báo: {item.tieuDe}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: "13px", lg: "20px" },
                    fontWeight: "600",
                    whiteSpace: "2",
                  }}
                >
                  {item.noiDung}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <Button
                  onClick={() => handleModalClose(index, item.id)} // Close specific modal
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
                  <Typography
                    sx={{
                      fontSize: { xs: "11px", lg: "13px" },
                    }}
                  >
                    Trở lại
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      ))}
    </>
  );
};

export default PopupNoti;
