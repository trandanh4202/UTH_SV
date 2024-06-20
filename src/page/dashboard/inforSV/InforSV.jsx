import { Box, Divider, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../features/profileSlice/ProfileSlice";

const InforSV = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]); // Thêm dependency array để chỉ chạy một lần khi component mount

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
      <Divider sx={{ margin: "10px 0 15px 0" }} />
      <Grid container sx={{ textAlign: "center" }} spacing={5}>
        <Grid item xs={3}>
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
            <Box>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "red",
                }}
              >
                Xem chi tiết
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Box
            sx={{
              display: "flex",
              // justifyContent:
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography sx={{ fontSize: "13px", color: "rgb(102, 117, 128)" }}>
              MSSV:
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "750",
                color: "rgb(102, 117, 128)",
              }}
            >
              {profile?.maSinhVien}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              // justifyContent:
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography sx={{ fontSize: "13px", color: "rgb(102, 117, 128)" }}>
              Họ tên:
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "750",
                color: "rgb(102, 117, 128)",
              }}
            >
              {profile?.hoDem} {profile?.ten}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              // justifyContent:
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography sx={{ fontSize: "13px", color: "rgb(102, 117, 128)" }}>
              Giới tính:
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "750",
                color: "rgb(102, 117, 128)",
              }}
            >
              {profile?.gender ? profile?.gender : ""}
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              // justifyContent:
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography sx={{ fontSize: "13px", color: "rgb(102, 117, 128)" }}>
              Ngày sinh:
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "750",
                color: "rgb(102, 117, 128)",
              }}
            >
              {profile?.ngaySinh2}
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              // justifyContent:
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography sx={{ fontSize: "13px", color: "rgb(102, 117, 128)" }}>
              Nơi sinh:
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "750",
                color: "rgb(102, 117, 128)",
              }}
            >
              {profile?.noiSinhText}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Box
            sx={{
              display: "flex",
              // justifyContent:
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography sx={{ fontSize: "13px", color: "rgb(102, 117, 128)" }}>
              Lớp học:
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "750",
                color: "rgb(102, 117, 128)",
              }}
            >
              {profile?.lopHoc}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              // justifyContent:
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography sx={{ fontSize: "13px", color: "rgb(102, 117, 128)" }}>
              Khoá học:
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "750",
                color: "rgb(102, 117, 128)",
              }}
            >
              {profile?.khoaHoc}
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              // justifyContent:
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography sx={{ fontSize: "13px", color: "rgb(102, 117, 128)" }}>
              Bậc đào tạo:
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "750",
                color: "rgb(102, 117, 128)",
              }}
            >
              {profile?.heDaoTao}
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              // justifyContent:
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography sx={{ fontSize: "13px", color: "rgb(102, 117, 128)" }}>
              Loại hình đào tạo:
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "750",
                color: "rgb(102, 117, 128)",
              }}
            >
              {profile?.loaiHinhDT}
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              // justifyContent:
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography sx={{ fontSize: "13px", color: "rgb(102, 117, 128)" }}>
              Ngành:
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "750",
                color: "rgb(102, 117, 128)",
              }}
            >
              {profile?.nganh}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default InforSV;
