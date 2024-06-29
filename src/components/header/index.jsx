import {
  ExpandMore,
  KeyboardArrowDown,
  Search,
  ViewHeadlineRounded,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ChangePasswordPopup from "../changePassword/ChangePasswordPopup";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
    handleClose();
  };

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("account");
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  const profile = useSelector((state) => state.profile?.profile?.body);

  return (
    <Box
      sx={{
        bgcolor: "white",
        color: "black",
        position: "sticky",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "1000",
      }}
    >
      <Container>
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid item lg={3} xs={8}>
            <Box component={Link} to="/dashboard" sx={{ flexGrow: 1 }}>
              <img
                src="./images/sv_logo_dashboard.png"
                alt="sv_logo_dashboard.png"
              />
            </Box>
          </Grid>
          <Grid item lg={9} xs={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: { xs: "0px", lg: "40px" },
              }}
            >
              {/* Search Bar */}
              <Box
                sx={{
                  display: { lg: "flex", xs: "none" },
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                  backgroundColor: "#f0f0f0",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  "&:focus-within": {
                    outline: "2px solid #66afe9",
                  },
                }}
              >
                <InputBase
                  placeholder="Tìm kiếm..."
                  style={{
                    flex: 1,
                    fontSize: "14px",
                    border: "none",
                    backgroundColor: "transparent",
                    paddingLeft: "5px",
                    outline: "none",
                  }}
                />
                <Divider orientation="vertical" flexItem />
                <IconButton sx={{ p: "8px" }} aria-label="search">
                  <Search />
                </IconButton>
              </Box>

              {/* Avatar with Menu */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    "& .MuiAvatar-root": {
                      backgroundColor: "#3f51b5",
                      color: "#ffffff",
                    },
                    "& .MuiTypography-root": {
                      color: "#3f51b5",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#3f51b5",
                    },
                  },
                }}
                id="user-button"
                aria-controls={open ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {/* Avatar */}
                <Avatar
                  alt="User Avatar"
                  src={profile?.image}
                  sx={{ marginRight: 1, display: { lg: "flex", xs: "none" } }}
                >
                  {profile?.Ten}
                </Avatar>
                <Typography
                  sx={{
                    fontSize: "14px",
                    display: { lg: "flex", xs: "none" },
                  }}
                >
                  {profile?.hoDem} {profile?.ten}
                </Typography>
                <Box sx={{ padding: "15px 10px" }}>
                  <KeyboardArrowDown sx={{ fontSize: "20px" }} />
                </Box>
              </Box>
              {/* User Menu */}
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "user-button",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    minWidth: "200px",
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "14px" }}
                    component={Link}
                    to="/inforDetail"
                  >
                    Thông tin cá nhân
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleOpenChangePassword}>
                  <Typography variant="body2" sx={{ fontSize: "14px" }}>
                    Đổi mật khẩu
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <Typography variant="body2" sx={{ fontSize: "14px" }}>
                    Đăng xuất
                  </Typography>
                </MenuItem>
              </Menu>
              {/* Responsive Drawer */}
              <Box sx={{ display: { xs: "block", lg: "none" } }}>
                <Box onClick={toggleDrawer(true)} sx={{ padding: "15px 10px" }}>
                  <ViewHeadlineRounded sx={{ fontSize: "20px" }} />
                </Box>
                <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
                  <Box>
                    {openDrawer && (
                      <Box
                        sx={{
                          backgroundColor: "#ffffff",
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          zIndex: 1000,
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
                            sx={{
                              "&:hover": {
                                backgroundColor: "#e0f7fa", // Màu nền khi hover
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: "500",
                                fontSize: "16px",
                              }}
                            >
                              Thông tin chung
                            </Typography>
                          </AccordionSummary>
                          <Divider />
                          <AccordionDetails
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "30px",
                            }}
                          >
                            <Typography
                              component={Link}
                              to="/inforDetail"
                              sx={{
                                fontSize: "14px",
                                "&:hover": {
                                  color: "#ff5722", // Màu chữ khi hover
                                },
                              }}
                            >
                              Thông tin sinh viên
                            </Typography>
                            {/* <Typography component={Link} sx={{ fontSize: "14px" }}>
                  Ghi chú nhắc nhở
                </Typography> */}
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
                            <Typography
                              sx={{ fontWeight: "500", fontSize: "16px" }}
                            >
                              Học tập
                            </Typography>
                          </AccordionSummary>
                          <Divider />
                          <AccordionDetails
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "30px",
                            }}
                          >
                            <Typography
                              component={Link}
                              sx={{
                                fontSize: "14px",
                                "&:hover": {
                                  color: "#ff5722", // Màu chữ khi hover
                                },
                              }}
                              to="/transcript"
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
                              to="/calendar"
                            >
                              Lịch theo tuần
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </Box>
                    )}
                  </Box>
                </Drawer>
              </Box>
              {/* Change Password Modal */}
              <ChangePasswordPopup
                open={openChangePassword}
                onClose={handleCloseChangePassword}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
