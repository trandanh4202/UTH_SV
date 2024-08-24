/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "~/features/profileSlice/ProfileSlice";

const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle null or undefined dateString
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid date strings
  return format(date, "dd/MM/yyyy");
};

const Section = ({ title, children }) => (
  <Box>
    <Typography
      sx={{
        fontSize: "20px",
        fontWeight: "750",
        color: "rgb(102, 117, 128)",
        padding: "10px",
      }}
    >
      {title}
    </Typography>
    <Divider sx={{ margin: "5px 0 10px 0" }} />
    {children}
    <Divider />
  </Box>
);

const InfoField = ({ label, value, column }) => (
  <Grid item xs={column ? column : 4}>
    <Box
      sx={{
        display: "block",
        textAlign: "left",
        padding: "5px",
        wordBreak: "break-word",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "14px", lg: "15px" },
          color: "rgb(102, 117, 128)",
          fontWeight: "750",
        }}
        variant="span"
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "14px", lg: "15px" },
          color: "rgb(102, 117, 128)",
          fontWeight: "500",
        }}
        variant="span"
      >
        {value}
      </Typography>
    </Box>
  </Grid>
);

const InforDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  const profile = useSelector((state) => state.profile?.profile?.body);
  const family = useSelector(
    (state) => state.profile?.profile?.body?.quanHeGiaDinhs
  );

  return (
    <Box>
      <Container>
        <Paper elevation={6} sx={{ padding: "10px" }}>
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", padding: "10px" }}
            >
              <Divider
                orientation="vertical"
                sx={{
                  color: "red",
                  border: "3px solid",
                  height: "20px",
                  marginRight: "5px",
                }}
              />
              <Typography
                sx={{ color: "#008689", fontWeight: "700", fontSize: "20px" }}
              >
                Thông tin học vấn
              </Typography>
            </Box>
            <Box>
              <Grid
                container
                sx={{ textAlign: "center" }}
                spacing={{ xs: 1, lg: 4 }}
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
                    <Box
                      sx={{
                        borderRadius: "50%",
                        width: "200px",
                        height: "200px",
                      }}
                    >
                      <img
                        src={profile?.image || "./images/avatarDashboard.png"}
                        alt="avatar"
                        style={{
                          width: "100%",
                          height: "100%",
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
                    <InfoField
                      label="MSSV: "
                      value={profile?.maSinhVien}
                      column={6}
                    />
                    <InfoField
                      label="Lớp: "
                      value={profile?.lopHoc}
                      column={6}
                    />
                  </Grid>
                  <Grid container>
                    <InfoField
                      label="Họ tên: "
                      value={`${profile?.hoDem} ${profile?.ten}`}
                      column={6}
                    />
                    <InfoField
                      label="Khoá: "
                      value={profile?.khoaHoc}
                      column={6}
                    />
                  </Grid>
                  <Grid container>
                    <InfoField
                      label="Ngày nhập học: "
                      value={formatDate(profile?.ngayNhapHoc)}
                      column={6}
                    />
                    <InfoField
                      label="Bậc đào tạo: "
                      value={profile?.heDaoTao}
                      column={6}
                    />
                  </Grid>
                  <Grid container>
                    <InfoField
                      label="Trạng thái sinh viên: "
                      value={profile?.trangThaiText}
                      column={6}
                    />
                    <InfoField
                      label="Loại hình đào tạo: "
                      value={profile?.loaiHinhDT}
                      column={6}
                    />
                  </Grid>
                  <Grid container>
                    <InfoField
                      label="Nơi sinh: "
                      value={profile?.noiSinhTinh}
                      column={6}
                    />
                    <InfoField
                      label="Khoa: "
                      value={profile?.khoa}
                      column={6}
                    />
                  </Grid>
                  <Grid container>
                    <InfoField
                      label="Ngành: "
                      value={profile?.nganh}
                      column={6}
                    />
                    <InfoField
                      label="Chuyên ngành: "
                      value={profile?.chuyenNganh}
                      column={6}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Divider
            sx={{ margin: "10px 0 10px 0", backgroundColor: "#008689" }}
          />

          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", padding: "10px" }}
            >
              <Divider
                orientation="vertical"
                sx={{
                  color: "red",
                  border: "3px solid",
                  height: "20px",
                  marginRight: "5px",
                }}
              />
              <Typography
                sx={{ color: "#008689", fontWeight: "700", fontSize: "20px" }}
              >
                Thông tin cá nhân
              </Typography>
            </Box>
            <Box>
              <Grid
                container
                sx={{ textAlign: "center" }}
                spacing={{ xs: 1, lg: 4 }}
              >
                <Grid
                  item
                  lg={12}
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Grid container>
                    <InfoField
                      label="Giới tính "
                      value={profile?.gioiTinh ? "Nữ" : "Nam"}
                    />
                    <InfoField label="Ngày sinh: " value={profile?.ngaySinh2} />
                    <InfoField
                      label="Nguyên quán: "
                      value={profile?.nguyenQuan}
                    />
                  </Grid>
                  <Grid container>
                    <InfoField label="Dân tộc: " value={profile?.danToc} />
                    <InfoField label="Tôn giáo: " value={profile?.tonGiao} />
                    <InfoField label="Quốc tịch: " value={profile?.quocTich} />
                  </Grid>
                  <Grid container>
                    <InfoField label="Khu vực: " value={profile?.khuVuc} />
                    <InfoField label="Đối tượng: " value={profile?.doiTuong} />
                    <InfoField
                      label="Đối tượng chính sách: "
                      value={profile?.doiTuongChinhSach}
                    />
                  </Grid>
                  <Grid container>
                    <InfoField
                      label="Ngày vào Đoàn: "
                      value={formatDate(profile?.ngayVaoDoan)}
                    />
                    <InfoField
                      label="Ngày vào Đảng: "
                      value={formatDate(profile?.ngayVaoDang)}
                    />
                    <InfoField
                      label="Số điện thoại cá nhân: "
                      value={profile?.soDienThoai}
                    />
                  </Grid>
                  <Grid container>
                    <InfoField
                      label="Số điện thoại khẩn cấp: "
                      value={profile?.soDienThoai2}
                    />
                    <InfoField label="Email cá nhân: " value={profile?.email} />
                    <InfoField
                      label="Email sinh viên: "
                      value={profile?.schoolEmail}
                    />
                  </Grid>
                  <Grid container>
                    <InfoField label="Số CCCD: " value={profile?.soCMND} />
                    <InfoField
                      label="Ngày cấp: "
                      value={formatDate(profile?.ngayCap)}
                    />
                    <InfoField label="Nơi cấp: " value={profile?.tinhCapCMND} />
                  </Grid>
                  <Grid container>
                    <InfoField
                      label="Nơi sinh: "
                      value={` ${profile?.noiSinhPhuongXa || ""}, ${
                        profile?.noiSinhHuyen || ""
                      }, ${profile?.noiSinhTinh || ""}`}
                      column={12}
                    />
                  </Grid>
                  <Grid container>
                    <InfoField
                      label="Quê quán: "
                      value={` ${profile?.queQuanPhuongXa || ""}, ${
                        profile?.queQuanHuyen || ""
                      }, ${profile?.queQuanTinh || ""}`}
                      column={12}
                    />
                  </Grid>
                  <Grid container>
                    <InfoField
                      label="Hộ khẩu thường trú: "
                      value={` ${profile?.hkttPhuongXa || ""}, ${
                        profile?.hkttHuyen || ""
                      }, ${profile?.hkttTinh || ""}`}
                      column={12}
                    />
                  </Grid>
                  <Grid container>
                    <InfoField
                      label="Địa chỉ liên lạc: "
                      value={` ${profile?.hkttPhuongXa || ""}, ${
                        profile?.dcllHuyen || ""
                      }, ${profile?.dcllTinh || ""}`}
                      column={12}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Divider
            sx={{ margin: "10px 0 10px 0", backgroundColor: "#008689" }}
          />

          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", padding: "10px" }}
            >
              <Divider
                orientation="vertical"
                sx={{
                  color: "red",
                  border: "3px solid",
                  height: "20px",
                  marginRight: "5px",
                }}
              />
              <Typography
                sx={{ color: "#008689", fontWeight: "700", fontSize: "20px" }}
              >
                Thông tin gia đình
              </Typography>
            </Box>
            <Box>
              <Grid
                container
                sx={{ textAlign: "center" }}
                spacing={{ xs: 1, lg: 4 }}
              >
                <Grid
                  item
                  lg={12}
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  {family?.map((item, index) => (
                    <Box key={index}>
                      <Grid container>
                        <InfoField
                          label={`Họ tên ${
                            item?.quanHe === "Cha" ? "Cha" : "Mẹ"
                          }: `}
                          value={item?.hoTen}
                          column="4"
                        />
                        <InfoField
                          label="Ngày sinh: "
                          value={formatDate(item?.namSinh)}
                          column="4"
                        />
                        <InfoField
                          label="Quốc tịch: "
                          value={item?.quocTich}
                          column="4"
                        />
                      </Grid>
                      <Grid container>
                        <InfoField
                          label="Dân tộc: "
                          value={item?.danToc}
                          column="4"
                        />
                        <InfoField
                          label="Tôn giáo: "
                          value={item?.tonGiao}
                          column="4"
                        />
                        <InfoField
                          label="Hộ khẩu: "
                          value={item?.hoKhau}
                          column="4"
                        />
                      </Grid>
                      <Grid container>
                        <InfoField
                          label="Nghề nghiệp: "
                          value={item?.ngheNghiep}
                          column="4"
                        />
                        <InfoField
                          label="Số điện thoại: "
                          value={item?.soDienThoai}
                          column="4"
                        />
                        <InfoField
                          label="Nơi ở hiện tại: "
                          value={item?.hienNay}
                          column="4"
                        />
                      </Grid>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default InforDetail;
