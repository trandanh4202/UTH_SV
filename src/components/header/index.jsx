import {
  KeyboardArrowDown,
  NotificationImportant,
  Search,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "white", color: "black", marginBottom: "40px" }}
    >
      <Container>
        <Toolbar>
          <Box component={Link} to="#" sx={{ flexGrow: 1 }}>
            <img src="./images/sv_logo_dashboard.png" alt="" />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
            }}
          >
            {/* Thanh search */}
            <Box
              sx={{
                display: "flex",
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
            <Box
              sx={{
                display: "flex",
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
            </Box>

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
                src="./images/avatar.png"
                sx={{ marginRight: 1 }}
              >
                Danh
              </Avatar>

              {/* Tên người dùng */}
              <Typography sx={{ fontSize: "14px" }}>Trần Trọng Danh</Typography>

              <KeyboardArrowDown />

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
              <MenuItem onClick={handleClose}>
                <Typography variant="body2" sx={{ fontSize: "14px" }}>
                  Đăng xuất
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
