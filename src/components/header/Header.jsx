/* eslint-disable react/jsx-key */
import {
  Article,
  ContactEmergency,
  ExpandMore,
  KeyboardArrowDown,
  ReceiptLong,
  School,
  ShoppingCart,
  SupportAgent,
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
import logoHome from "/images/sv_logo_dashboard.png";
import { getProfile } from "~/features/profileSlice/ProfileSlice";
import { getMenu } from "~/features/menuSlice/MenuSlice";
import ChangePasswordPopup from "../changePassword/ChangePasswordPopup";
import { getCart } from "../../features/cartSlice/CartSlice";
import Cart from "./Cart";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const token = localStorage.getItem("account");
  const role = localStorage.getItem("role");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const handleClick = (event) => {
    event.preventDefault();
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
    if (role === "gv") {
      dispatch(getMenu());
    }
  }, [dispatch, role]);

  const profile = useSelector((state) => state.profile?.profile.body);
  const menuFromStore = useSelector((state) => state.menu.menu);

  const studentMenu = [
    {
      name: "Thông tin chung",
      icon: <ContactEmergency sx={{ fontSize: "25px" }} />,
      children: [
        {
          name: "Thông tin chi tiết",
          route: "/infordetail",
        },
        {
          name: "Đề xuất cập nhật thông tin",
          route: "/editprofile",
        },
        {
          name: "Tin tức",
          route: "/newfeeds/368",
        },
      ],
    },
    {
      name: "Học tập",
      icon: <School sx={{ fontSize: "25px" }} />,
      children: [
        {
          name: "Kết quả học tập",
          route: "/transcript",
        },
        {
          name: "Chương trình khung",
          route: "/educationprogram",
        },
        {
          name: "Trang học trực tuyến",
          route: `https://courses.ut.edu.vn/login/index.php?token=${token}`,
        },
      ],
    },
    {
      name: "Công nợ học phí",
      icon: <ReceiptLong sx={{ fontSize: "25px" }} />,
      children: [
        {
          name: "Tra cứu công nợ",
          route: "/tuition",
        },
        {
          name: "Phiếu thu tổng hợp",
          route: "/generalreceipts",
        },
        {
          name: "Thanh toán trực tuyến",
          route: "https://payment.ut.edu.vn/",
        },
      ],
    },
    {
      name: "Hỗ trợ trực tuyến",
      icon: <SupportAgent sx={{ fontSize: "25px" }} />,
      children: [
        {
          name: "Giấy báo tân sinh viên",
          route: `/certification`,
        },
        {
          name: "Trang hỗ trợ trực tuyến",
          route: `https://support.ut.edu.vn/login.php?token=${token}`,
        },
        {
          name: "Đăng ký Ký túc xá",
          route: `/dormitory`,
        },
        {
          name: "Đăng ký Đồng phục",
          route: `/uniform`,
        },
      ],
    },
  ];

  const menu = role === "gv" ? menuFromStore : studentMenu;

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
        padding: "10px",
      }}
    >
      <Container sx={{ padding: "0" }}>
        <Grid container>
          <Grid item lg={profile ? 3 : 12} xs={profile ? 9 : 12}>
            <Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {profile && (
                    <Box>
                      <Box>
                        <Box
                          onClick={toggleDrawer(true)}
                          sx={{
                            cursor: "pointer",
                            color: "#008689",
                          }}
                        >
                          <ViewHeadlineRounded sx={{ fontSize: "35px" }} />
                        </Box>
                        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
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
                            {menu.map((menuItem, index) =>
                              menuItem.children !== null ? (
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
                                      fontWeight: "600",
                                      "&:hover": {
                                        backgroundColor: "#e0f7fa",
                                      },
                                      "& .MuiAccordionSummary-content": {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "15px",
                                      },
                                    }}
                                  >
                                    <Box>{menuItem.icon}</Box>
                                    <Typography
                                      sx={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                      }}
                                    >
                                      {menuItem.name}
                                    </Typography>
                                  </AccordionSummary>
                                  <Divider />
                                  <AccordionDetails
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "15px",
                                    }}
                                  >
                                    {menuItem.children &&
                                      menuItem.children.map(
                                        (child, childIndex) => (
                                          <Typography
                                            key={childIndex}
                                            component={Link}
                                            to={child.route}
                                            sx={{
                                              fontSize: "14px",
                                              fontWeight: "500",
                                              color: "black",
                                              "&:hover": {
                                                color: "#da1d2d",
                                              },
                                            }}
                                            onClick={toggleDrawer(false)}
                                          >
                                            {child.name}
                                          </Typography>
                                        )
                                      )}
                                  </AccordionDetails>
                                </Accordion>
                              ) : (
                                <Box
                                  key={index}
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "15px",
                                    padding: "10px 0",
                                    "&:hover": {
                                      backgroundColor: "#e0f7fa",
                                    },
                                  }}
                                >
                                  <Box>{menuItem.icon}</Box>
                                  <Typography
                                    component={Link}
                                    to={menuItem.route}
                                    target={
                                      menuItem?.route?.includes("https")
                                        ? "_blank"
                                        : "_self"
                                    }
                                    sx={{
                                      fontSize: "16px",
                                      fontWeight: "500",
                                      color: "#008689",
                                      "&:hover": {
                                        color: "#ff5722",
                                      },
                                    }}
                                    onClick={toggleDrawer(false)}
                                  >
                                    {menuItem.name}
                                  </Typography>
                                </Box>
                              )
                            )}
                          </Box>
                        </Drawer>
                      </Box>
                    </Box>
                  )}
                  <Box>
                    <Box component={Link} to="/">
                      <img src={logoHome} alt="sv_logo_dashboard.png" />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          {profile && (
            <Grid item lg={9} xs={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: { xs: "0px", lg: "40px" },
                }}
              >
                {location.pathname === "/uniform" && <Cart />}

                {/* Avatar with Menu */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                      // "& .MuiAvatar-root": {
                      //   backgroundColor: "#3f51b5",
                      //   color: "#ffffff",
                      // },
                      "& .MuiTypography-root": {
                        color: "#008689",
                        fontWeight: "600",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#008689",
                        fontWeight: "600",
                      },
                    },
                  }}
                  id="user-button"
                  aria-controls={anchorEl ? "user-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorEl ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Avatar
                    alt="User Avatar"
                    src={
                      profile?.image
                        ? profile?.image
                        : "./images/avatarDashboard.png"
                    }
                    sx={{
                      marginRight: 1,
                      display: { lg: "flex", xs: "none" },
                    }}
                  >
                    {profile?.Ten ? profile.Ten : profile.hoTen}
                  </Avatar>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "600",
                      display: { lg: "flex", xs: "none" },
                    }}
                  >
                    {profile?.hoDem ? (
                      <>
                        {profile.hoDem} {""}
                      </>
                    ) : (
                      profile.hoTen
                    )}
                    {profile?.ten}
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
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
