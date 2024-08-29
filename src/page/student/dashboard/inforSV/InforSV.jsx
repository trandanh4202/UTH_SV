/* eslint-disable react/prop-types */
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Spinner from "../../../../components/Spinner/Spinner";

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

const InforSV = () => {
  const profile = useSelector((state) => state.profile?.summaryProfile?.body);
  const loading = useSelector((state) => state.profile.loading);
  const image = localStorage.getItem("image");
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
          Thông tin sinh viên
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
          <CircularProgress
            sx={{
              color: "#008689",
            }}
          />
        </Box>
      ) : (
        profile && (
          <Grid
            container
            sx={{ textAlign: "center" }}
            spacing={{ xs: 1, lg: 2 }}
          >
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
                    src={image || "./images/avatarDashboard.png"}
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
                <InfoField label="MSSV: " value={profile.maSinhVien} />
                <InfoField label="Bậc đào tạo: " value={profile.heDaoTao} />
              </Grid>

              <Grid container>
                <InfoField
                  label="Họ tên: "
                  value={`${profile.hoDem} ${profile.ten}`}
                />
                <InfoField
                  label="Loại hình đào tạo: "
                  value={profile.loaiHinhDT}
                />
              </Grid>
              <Grid container>
                <InfoField label="Lớp: " value={profile.lopHoc} />
                <InfoField label="Khoa: " value={profile.khoa} />
              </Grid>

              <Grid container>
                <InfoField label="Ngày sinh: " value={profile.ngaySinh2} />
                <InfoField label="Ngành: " value={profile.nganh} />
              </Grid>
              <Grid container>
                <InfoField label="Nơi sinh: " value={profile.noiSinhTinh} />
                <InfoField label="Chuyên ngành: " value={profile.chuyenNganh} />
              </Grid>
            </Grid>
          </Grid>
        )
      )}
    </>
  );
};

export default InforSV;
