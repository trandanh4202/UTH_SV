/* eslint-disable react/prop-types */
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { format, isValid, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const InfoField = ({ label, value }) => (
  <Grid item xs={6}>
    <Box sx={{ display: "block", textAlign: "left", padding: "5px" }}>
      <Typography
        sx={{
          fontSize: { xs: "13px", lg: "14px" },
          color: "rgb(102, 117, 128)",
          fontWeight: "750",
        }}
        variant="span"
      >
        {label}
        {value}
      </Typography>
    </Box>
  </Grid>
);

const InforGV = () => {
  const profile = useSelector((state) => state.profile?.profile?.body);
  const loading = useSelector((state) => state.profile?.loadingUI);

  const formatDate = (date) => {
    if (!date) return "";
    const parsedDate = parseISO(date);
    return isValid(parsedDate) ? format(parsedDate, "dd/MM/yyyy") : "";
  };

  return (
    <>
      <Box>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "750",
            color: "#008689",
            padding: "10px",
          }}
        >
          Thông tin nhân sự
        </Typography>
      </Box>
      <Divider sx={{ margin: "5px 0 10px 0" }} />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container sx={{ textAlign: "center" }} spacing={{ xs: 1, lg: 2 }}>
          <Grid item lg={3} xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ borderRadius: "50%" }}>
                <img
                  src={"./images/avatarDashboard.png"}
                  alt="avatar"
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "contain",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Box>
                <Typography
                  component={Link}
                  to="/inforDetail"
                  sx={{
                    color: "red",
                    fontSize: "13px",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Xem chi tiết
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            lg={9}
            xs={12}
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Grid container>
              <InfoField label="MSSV: " value={profile?.hoTen} />
              <InfoField label="Mã nhân sự: " value={profile?.maNhanSu} />
            </Grid>

            <Grid container>
              <InfoField
                label="Giới tính: "
                value={profile?.gioiTinh ? "Nữ" : "Nam"}
              />

              <InfoField label="Tên phòng ban: " value={profile?.tenPhongBan} />
            </Grid>
            <Grid container>
              <InfoField
                label="Ngày sinh: "
                value={formatDate(profile?.ngaySinh)}
              />

              <InfoField
                label="Loại nhân sự: "
                value={profile?.tenLoaiNhanSu}
              />
            </Grid>

            <Grid container>
              <InfoField label="Nơi sinh: " value={profile?.noiSinh} />

              <InfoField label="Chức vụ: " value={profile?.tenChucVu} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default InforGV;
