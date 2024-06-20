import { ExpandMore } from "@mui/icons-material";
import AppsIcon from "@mui/icons-material/Apps";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box sx={{ position: "relative" }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            exit={{ x: -200 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{
              position: "absolute",
              transform: "translateY(100%)",
              backgroundColor: "#ffffff",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              top: "35px",
              zIndex: 1000,
              minWidth: "200px",
            }}
          >
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              sx={{
                border: "none",
                boxShadow: "none",
              }}
            >
              {/* <Divider /> */}
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                  Thông tin chung
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails
                sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
              >
                <Typography component={Link} sx={{ fontSize: "14px" }}>
                  Thông tin sinh viên
                </Typography>
                <Typography component={Link} sx={{ fontSize: "14px" }}>
                  Ghi chú nhắc nhở
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              sx={{
                border: "none",
                boxShadow: "none",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                sx={{
                  "&:hover": {
                    backgroundColor: "#e0f7fa", // Màu nền khi hover
                  },
                }}
              >
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                  Học tập
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails
                sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
              >
                <Typography
                  component={Link}
                  sx={{
                    fontSize: "14px",
                    "&:hover": {
                      color: "#ff5722", // Màu chữ khi hover
                    },
                  }}
                >
                  Kết quả học tập
                </Typography>
                <Typography
                  component={Link}
                  sx={{
                    fontSize: "14px",
                    "&:hover": {
                      color: "#ff5722", // Màu chữ khi hover
                    },
                  }}
                >
                  Lịch theo tuần
                </Typography>
              </AccordionDetails>
            </Accordion>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen ? 200 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(100%)",
            bgcolor: "white",
            borderRadius: "0",
            border: "1px solid black",
          }}
          onClick={toggleSidebar}
        >
          <AppsIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </motion.div>
    </Box>
  );
};

export default Sidebar;
