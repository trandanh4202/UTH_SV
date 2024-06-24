/* eslint-disable react/prop-types */
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../features/profileSlice/ProfileSlice";

const InfoField = ({ label, value }) => (
  <Grid item xs={6}>
    <Box sx={{ display: "block", textAlign: "left", padding: "5px" }}>
      <Typography
        sx={{
          fontSize: { xs: "12px", lg: "13px" },
          color: "rgb(102, 117, 128)",
        }}
        variant="span"
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "12px", lg: "13px" },
          fontWeight: "750",
          color: "rgb(102, 117, 128)",
        }}
        variant="span"
      >
        {value}
      </Typography>
    </Box>
  </Grid>
);

const InforSV = () => {

  const profile = useSelector((state) => state.profile.profile.body);

  return (
    <>
      <Box>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "750",
            color: "rgb(102, 117, 128)",
            padding: "10px",
          }}
        >
          Thông tin sinh viên
        </Typography>
      </Box>
      <Divider sx={{ margin: "5px 0 10px 0" }} />
      <Grid container sx={{ textAlign: "center" }} spacing={{ xs: 1, lg: 4 }}>
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
                src={profile?.image}
                alt="avatar"
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
              />
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
            <InfoField label="MSSV: " value={profile?.maSinhVien} />
            <InfoField label="Lớp: " value={profile?.lopHoc} />
          </Grid>
          <Grid container>
            <InfoField
              label="Họ tên: "
              value={`${profile?.hoDem} ${profile?.ten}`}
            />
            <InfoField label="Khoá: " value={profile?.khoaHoc} />
          </Grid>
          <Grid container>
            <InfoField
              label="Giới tính: "
              value={profile?.gioiTinh ? "Nữ" : "Nam"}
            />
            <InfoField label="Bậc đào tạo: " value={profile?.heDaoTao} />
          </Grid>
          <Grid container>
            <InfoField label="Ngày sinh: " value={profile?.ngaySinh2} />
            <InfoField
              label="Loại hình đào tạo: "
              value={profile?.loaiHinhDT}
            />
          </Grid>
          <Grid container>
            <InfoField label="Nơi sinh: " value={profile?.noiSinhText} />
            <InfoField label="Khoa: " value={profile?.khoa} />
          </Grid>
          <Grid container>
            <InfoField label="Ngành: " value={profile?.nganh} />
            <InfoField
              label="Chuyên ngành: "
              value={
                [
                  "Công nghệ thông tin",
                  "Mạng máy tính và truyền thông dữ liệu",
                  "Kỹ thuật môi trường",
                ].includes(profile?.chuyenNganh)
                  ? ""
                  : profile?.chuyenNganh
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default InforSV;
