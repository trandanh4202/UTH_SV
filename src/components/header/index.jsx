import {
  ExpandMore,
  KeyboardArrowDown,
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
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile } from "../../features/profileSlice/ProfileSlice";
import ChangePasswordPopup from "../changePassword/ChangePasswordPopup";

const menu = [
  {
    title: "Thông tin chung",
    children: [
      {
        title: "Thông tin chi tiết",
        link: "/infordetail",
      },
      {
        title: "Tin tức",
        link: "/newfeeds",
      },
    ],
  },
  {
    title: "Học tập",
    children: [
      {
        title: "Kết quả học tập",
        link: "/transcript",
      },
      {
        title: "Chương trình khung",
        link: "/educationprogram",
      },
      {
        title: "Trang học trực tuyến",
        link: "https://courses.ut.edu.vn/",
      },
    ],
  },
  {
    title: "Công nợ học phí",
    children: [
      {
        title: "Tra cứu công nợ",
        link: "/tuition",
      },
      {
        title: "Thanh toán trực tuyến",
        link: "https://payment.ut.edu.vn/",
      },
    ],
  },
  {
    title: "Hỗ trợ trực tuyến",
    link: "https://support.ut.edu.vn/",
  },
];

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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  const profile = useSelector((state) => state.profile.profile.body);

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
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Container>
        <>
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item lg={3} xs={8}>
              <Box>
                <Box component={Link} to="/" sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box>
                      <img
                        src="../images/sv_logo_dashboard.png"
                        alt="sv_logo_dashboard.png"
                      />
                    </Box>
                    <Box>
                      <Box>
                        <Box
                          onClick={toggleDrawer(true)}
                          sx={{ padding: "15px 10px" }}
                        >
                          <ViewHeadlineRounded sx={{ fontSize: "35px" }} />
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
                                {menu.map((menuItem, index) => (
                                  <Accordion
                                    key={index}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)}
                                    sx={{
                                      border: "none",
                                      boxShadow: "none",
                                    }}
                                  >
                                    <AccordionSummary
                                      expandIcon={<ExpandMore />}
                                      aria-controls={`panel${index}bh-content`}
                                      id={`panel${index}bh-header`}
                                      sx={{
                                        color: "#008689",
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
                                        {menuItem.title}
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
                                      {menuItem.children ? (
                                        menuItem.children.map(
                                          (child, childIndex) => (
                                            <Typography
                                              key={childIndex}
                                              component={Link}
                                              to={child.link}
                                              sx={{
                                                fontSize: "14px",
                                                color: "black",
                                                "&:hover": {
                                                  color: "#da1d2d", // Màu chữ khi hover
                                                },
                                              }}
                                            >
                                              {child.title}
                                            </Typography>
                                          )
                                        )
                                      ) : (
                                        <Typography
                                          component={Link}
                                          to={menuItem.link}
                                          sx={{
                                            fontSize: "14px",
                                            "&:hover": {
                                              color: "#ff5722", // Màu chữ khi hover
                                            },
                                          }}
                                        >
                                          {menuItem.title}
                                        </Typography>
                                      )}
                                    </AccordionDetails>
                                  </Accordion>
                                ))}
                              </Box>
                            )}
                          </Box>
                        </Drawer>
                      </Box>
                    </Box>
                  </Box>
                </Box>
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
                  // eslint-disable-next-line no-extra-boolean-cast
                  aria-controls={Boolean(anchorEl) ? "user-menu" : undefined}
                  aria-haspopup="true"
                  // eslint-disable-next-line no-extra-boolean-cast
                  aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                  onClick={handleClick}
                >
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

                {/* Change Password Modal */}
                <ChangePasswordPopup
                  open={openChangePassword}
                  onClose={handleCloseChangePassword}
                />
              </Box>
            </Grid>
          </Grid>
        </>
      </Container>
    </Box>
  );
};

export default Header;
