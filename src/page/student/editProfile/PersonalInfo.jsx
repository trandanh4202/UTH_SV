import {
  Box,
  Grid,
  Paper,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProvince,
  getDistrict,
  getWard,
} from "~/features/profileSlice/ProfileSlice";
import { getNation } from "~/features/nationSlice/NationSlice";
import { getReligion } from "~/features/religionSlice/ReligionSlice";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const province = useSelector((state) => state.profile.province) || [];
  const district = useSelector((state) => state.profile.district) || [];
  const ward = useSelector((state) => state.profile.ward) || [];
  const nations = useSelector((state) => state.nation.nations) || [];
  const religions = useSelector((state) => state.religion.religions) || [];
  console.log(religions);
  const [gender, setGender] = useState("nam");
  const [ethnicity, setEthnicity] = useState("");
  const [religion, setReligion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    dispatch(getProvince());
    dispatch(getNation());
    dispatch(getReligion());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProvince) {
      dispatch(getDistrict(selectedProvince));
      setSelectedDistrict("");
      setSelectedWard("");
    }
  }, [dispatch, selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      dispatch(getWard(selectedDistrict));
      setSelectedWard("");
    }
  }, [dispatch, selectedDistrict]);

  return (
    <Paper elevation={16}>
      <Box sx={{ padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Họ đệm
              </Typography>
              <TextField sx={inputStyles} />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Tên
              </Typography>
              <TextField
                hiddenLabel
                InputLabelProps={{
                  shrink: true,
                }}
                sx={inputStyles}
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Giới tính
              </Typography>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                displayEmpty
                sx={selectStyles}
              >
                <MenuItem value="">
                  <em>Chọn giới tính</em>
                </MenuItem>
                <MenuItem value="male">Nam</MenuItem>
                <MenuItem value="female">Nữ</MenuItem>
                <MenuItem value="other">Khác</MenuItem>
              </Select>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Ngày sinh
              </Typography>
              <TextField
                id="date-picker"
                type="date"
                displayEmpty
                sx={inputStyles}
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Dân tộc
              </Typography>
              <Select
                value={ethnicity}
                onChange={(e) => setEthnicity(e.target.value)}
                displayEmpty
                sx={selectStyles}
              >
                <MenuItem value="">
                  <em>Chọn dân tộc</em>
                </MenuItem>
                {nations.map((nation) => (
                  <MenuItem key={nation.id} value={nation.maDanToc}>
                    {nation.tenDanToc}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Tôn giáo
              </Typography>
              <Select
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                displayEmpty
                sx={selectStyles}
              >
                <MenuItem value="">
                  <em>Chọn tôn giáo</em>
                </MenuItem>
                {religions.map((religion) => (
                  <MenuItem key={religion.id} value={religion.maTonGiao}>
                    {religion.tenTonGiao}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Nơi sinh Tỉnh
              </Typography>
              <Select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                displayEmpty
                sx={selectStyles}
              >
                <MenuItem value="">
                  <em>Chọn Tỉnh</em>
                </MenuItem>
                {province.map((tinh) => (
                  <MenuItem key={tinh.id} value={tinh.id}>
                    {tinh.tenTinh}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Nơi sinh Huyện
              </Typography>
              <Select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                displayEmpty
                disabled={!selectedProvince}
                sx={selectStyles}
              >
                <MenuItem value="">
                  <em>Chọn Huyện</em>
                </MenuItem>
                {district.map((huyen) => (
                  <MenuItem key={huyen.id} value={huyen.id}>
                    {huyen.tenHuyen}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Nơi sinh Phường/Xã
              </Typography>
              <Select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                displayEmpty
                disabled={!selectedDistrict}
                sx={selectStyles}
              >
                <MenuItem value="">
                  <em>Chọn Phường/Xã</em>
                </MenuItem>
                {ward.map((px) => (
                  <MenuItem key={px.id} value={px.id}>
                    {px.tenPhuongXa}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Ghi chú cụ thể
              </Typography>
              <TextField sx={inputStyles} />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Địa chỉ thường trú Tỉnh
              </Typography>
              <Select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                displayEmpty
                sx={selectStyles}
              >
                <MenuItem value="">
                  <em>Chọn Tỉnh</em>
                </MenuItem>
                {province.map((tinh) => (
                  <MenuItem key={tinh.id} value={tinh.id}>
                    {tinh.tenTinh}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Địa chỉ thường trú Huyện
              </Typography>
              <Select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                displayEmpty
                disabled={!selectedProvince}
                sx={selectStyles}
              >
                <MenuItem value="">
                  <em>Chọn Huyện</em>
                </MenuItem>
                {district.map((huyen) => (
                  <MenuItem key={huyen.id} value={huyen.id}>
                    {huyen.tenHuyen}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Địa chỉ thường trú Phường/Xã
              </Typography>
              <Select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                displayEmpty
                disabled={!selectedDistrict}
                sx={selectStyles}
              >
                <MenuItem value="">
                  <em>Chọn Phường/Xã</em>
                </MenuItem>
                {ward.map((px) => (
                  <MenuItem key={px.id} value={px.id}>
                    {px.tenPhuongXa}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Ghi chú cụ thể
              </Typography>
              <TextField sx={inputStyles} />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Căn cước công dân
              </Typography>
              <TextField sx={inputStyles} />
            </Box>
          </Grid>

          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Ngày cấp
              </Typography>
              <TextField
                id="date-picker"
                type="date"
                displayEmpty
                sx={inputStyles}
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Tỉnh
              </Typography>
              <Select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                displayEmpty
                sx={selectStyles}
              >
                <MenuItem value="">
                  <em>Chọn Tỉnh</em>
                </MenuItem>
                {province.map((tinh) => (
                  <MenuItem key={tinh.id} value={tinh.maTinh}>
                    {tinh.tenTinh}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Quốc tịch
              </Typography>
              <TextField sx={inputStyles} />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Ngày vào Đảng
              </Typography>
              <TextField
                id="date-picker"
                type="date"
                displayEmpty
                sx={inputStyles}
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Ngày vào Đoàn
              </Typography>
              <TextField
                id="date-picker"
                type="date"
                displayEmpty
                sx={inputStyles}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Email cá nhân
              </Typography>
              <TextField
                hiddenLabel
                InputLabelProps={{
                  shrink: true,
                }}
                sx={inputStyles}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Email sinh viên
              </Typography>
              <TextField
                hiddenLabel
                InputLabelProps={{
                  shrink: true,
                }}
                sx={inputStyles}
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Số điện thoại 1
              </Typography>
              <TextField
                hiddenLabel
                InputLabelProps={{
                  shrink: true,
                }}
                sx={inputStyles}
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                Số điện thoại 2
              </Typography>
              <TextField
                hiddenLabel
                InputLabelProps={{
                  shrink: true,
                }}
                sx={inputStyles}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

const inputStyles = {
  "& .MuiInputBase-input": {
    fontSize: "15px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "8px",
    border: "3px solid #0085885a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSvgIcon-root": {
    color: "green",
    backgroundSize: "cover",
  },
};

const selectStyles = {
  "&:focus": {
    borderRadius: "8px",
  },
  borderRadius: "8px",
  "& .MuiInputBase-input": {
    fontSize: "15px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "8px",
    border: "3px solid #0085885a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "& .MuiSvgIcon-root": {
    color: "#0085885a",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0085885a",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0085885a",
  },
  "& .MuiSelect-select:focus": {
    borderRadius: "8px",
  },
};

export default PersonalInfo;
