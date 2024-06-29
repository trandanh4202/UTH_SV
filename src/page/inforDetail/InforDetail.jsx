import React, { useEffect } from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { getProfile } from "../../features/profileSlice/ProfileSlice";

const formatDate = (dateString) => {
  if (!dateString) return "";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const InfoField = ({ column, label, value }) => (
  <Grid item xs={4}>
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

const InforDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  const profile = useSelector((state) => state.profile.profile.body);
  const family = useSelector(
    (state) => state.profile.profile.body?.quanHeGiaDinhs
  );
  console.log(family)
  return (
    <Box>
      <Container>
        <Paper elevation={4} sx={{ padding: "10px" }}>
          <Section title="Thông tin học vấn">
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
                  <Box sx={{ borderRadius: "50%" }}>
                    <img
                      src={profile?.image || "./images/avatarDashboard.png"}
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
                    label="Ngày nhập học: "
                    value={formatDate(profile?.ngayNhapHoc)}
                  />
                  <InfoField label="Bậc đào tạo: " value={profile?.heDaoTao} />
                </Grid>
                <Grid container>
                  <InfoField
                    label="Trạng thái sinh viên: "
                    value={profile?.trangThaiText}
                  />
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
                    value={profile?.chuyenNganh}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Section>

          <Section title="Thông tin cá nhân">
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
                    column="6"
                  />
                  <InfoField
                    label="Ngày sinh: "
                    value={formatDate(profile?.ngaySinh2)}
                    column="6"
                  />
                  <InfoField
                    label="Nơi sinh: "
                    value={profile?.noiSinhText}
                    column="6"
                  />
                </Grid>
                <Grid container>
                  <InfoField label="Dân tộc: " value={profile?.danToc} />
                  <InfoField label="Tôn giáo: " value={profile?.tonGiao} />
                  <InfoField
                    label="Diện chính sách: "
                    value={profile?.doiTuongChinhSach}
                  />
                </Grid>
                <Grid container>
                  <InfoField label="Khu vực: " value={profile?.khuVuc} />
                  <InfoField label="Đối tượng: " value={profile?.doiTuong} />
                  <InfoField
                    label="Ngày vào Đoàn: "
                    value={formatDate(profile?.ngayVaoDoan)}
                  />
                </Grid>
                <Grid container>
                  <InfoField
                    label="Ngày vào Đảng: "
                    value={formatDate(profile?.ngayVaoDang)}
                  />
                  <InfoField
                    label="Số điện thoại: "
                    value={profile?.soDienThoai}
                  />
                  <InfoField label="Email: " value={profile?.email} />
                </Grid>
                <Grid container>
                  <InfoField label="Số CCCD: " value={profile?.soCMND} />
                  <InfoField
                    label="Ngày cấp: "
                    value={formatDate(profile?.ngayCap)}
                  />
                  <InfoField label="Nơi cấp: " value={profile?.noiCap} />
                </Grid>
                <Grid container>
                  <InfoField
                    label="Địa chỉ thường trú: "
                    value={profile?.diaChiThuongTru}
                  />
                  <InfoField
                    label="Địa chỉ liên lạc: "
                    value={profile?.diaChiLienLac}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Section>

          <Section title="Thông tin gia đình">
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
                {
                  family?.map((item, index) => (
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
                      <Grid container>
                        <InfoField
                          label="Cơ quan công tác: "
                          value={item?.coQuanCongTac}
                          column="4"
                        />
                        <InfoField
                          label="Chức vụ: "
                          value={item?.chucVu}
                          column="4"
                        />
                      </Grid>
                    </Box>
                  ))}
              </Grid>
            </Grid>
          </Section>
        </Paper>
      </Container>
    </Box>
  );
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

export default InforDetail;
