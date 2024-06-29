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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../../features/profileSlice/ProfileSlice";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getProfile());
    }, [dispatch]);

  const navigate = useNavigate();
  const token = localStorage.getItem("account");
  useEffect(() => {
    const token = localStorage.getItem("account");
    console.log("Token in useEffect:", token); // Log token
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
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
              {/* Thanh search */}
              <Box
                sx={{
                  display: { lg: "flex", xs: "none" },
                  alignItems: "center",
                  border: "1px solid #ccc", // Border màu xám nhạt
                  borderRadius: "20px", // Bo tròn viền
                  backgroundColor: "#f0f0f0", // Màu nền hơi xám
                  paddingLeft: "10px", // Khoảng cách từ biểu tượng search đến lề trái
                  paddingRight: "10px", // Khoảng cách từ biểu tượng search đến lề phải
                  "&:focus-within": {
                    outline: "2px solid #66afe9", // Đường viền màu xanh khi focus
                  },
                }}
              >
                <InputBase
                  placeholder="Tìm kiếm..."
                  style={{
                    flex: 1,
                    fontSize: "14px", // Cỡ chữ là 14px
                    border: "none", // Bỏ border của InputBase
                    backgroundColor: "transparent", // Nền trong suốt
                    paddingLeft: "5px", // Lề trái để cách biểu tượng search
                    outline: "none", // Bỏ outline mặc định của InputBase
                  }}
                />
                <Divider orientation="vertical" flexItem />
                <IconButton sx={{ p: "8px" }} aria-label="search">
                  <Search />
                </IconButton>
              </Box>

              {/* Tin tức - Thông báo */}
              {/* <Box
                sx={{
                  display: { lg: "flex", xs: "none" },
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
                component={Link}
                to="#"
              >
                <Box>
                  <Badge badgeContent={4} color="error">
                    <NotificationImportant color="action" fontSize="large" />
                  </Badge>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "14px" }}>
                    Tin tức - Thông báo
                  </Typography>
                </Box>
              </Box> */}

              {/* Avatar với menu */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "#f0f0f0", // Màu nền xám khi hover
                    "& .MuiAvatar-root": {
                      backgroundColor: "#3f51b5", // Màu nền xanh của Avatar khi hover
                      color: "#ffffff", // Màu chữ của Avatar khi hover
                    },
                    "& .MuiTypography-root": {
                      color: "#3f51b5", // Màu chữ của Typography khi hover
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#3f51b5", // Màu của mũi tên khi hover
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
                {/* Popover Menu */}
              </Box>
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
                    minWidth: "200px", // Độ rộng tối thiểu của menu
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Typography variant="body2" sx={{ fontSize: "14px" }}>
                    Thông tin cá nhân
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
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
                          >
                            <Typography
                              sx={{ fontWeight: "500", fontSize: "16px" }}
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
                              sx={{ fontSize: "14px" }}
                            >
                              Thông tin sinh viên
                            </Typography>
                            <Typography
                              component={Link}
                              sx={{ fontSize: "14px" }}
                            >
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
                              to="/transcript"
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
                              to="/calendar"
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
                      </Box>
                    )}
                  </Box>
                </Drawer>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
