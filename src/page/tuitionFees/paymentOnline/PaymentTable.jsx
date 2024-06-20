/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import { useState } from "react";
import PaymentTab from "./PaymentTab2";

const data = [
  {
    STT: 1,
    MaNhomHocPhan: "M001",
    TenMonHocPhan: "Học phí",
    HocPhi: 354,
    TinChi: 3,
    BatBuoc: true,
    SoTien: "3,000,000",
    LoaiHocPhi: "Học phí Khác",
  },
  {
    STT: 1,
    MaNhomHocPhan: "M002",
    TenMonHocPhan: "Phí thư viện",
    HocPhi: 354,
    TinChi: 1,
    BatBuoc: true,
    SoTien: "500,000",
    LoaiHocPhi: "Học phí Trung tâm tiếng Anh",
  },
  {
    STT: 2,
    MaNhomHocPhan: "M003",
    TenMonHocPhan: "Phí phòng thí nghiệm",
    HocPhi: 354,
    TinChi: 2,
    BatBuoc: true,
    SoTien: "1,500,000",
    LoaiHocPhi: "Học phí ngành",
  },
];
const PaymentTable = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [semester, setSemester] = useState("");

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleChange = (event) => {
    setSemester(event.target.value);
  };

  // Tách dữ liệu vào ba mảng dựa trên loại học phí
  const hocPhiNganh = data.filter(
    (item) => item.LoaiHocPhi === "Học phí ngành"
  );
  const hocPhiTrungTamTiengAnh = data.filter(
    (item) => item.LoaiHocPhi === "Học phí Trung tâm tiếng Anh"
  );
  const hocPhiKhac = data.filter((item) => item.LoaiHocPhi === "Học phí Khác");

  return (
    <Container sx={{ backgroundColor: "white" }}>
      <Box sx={{ padding: "10px 5px" }}>
        <Box>
          <Box
            sx={{
              margin: "15px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex" }}>
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
                sx={{ color: "#0c6fbe", fontWeight: "700", fontSize: "16px" }}
              >
                Thanh toán công nợ
              </Typography>
            </Box>
            <Box>
              <FormControl variant="outlined" sx={{ minWidth: "400px" }}>
                <Select
                  value={semester}
                  onChange={handleChange}
                  displayEmpty
                  sx={{
                    "& .MuiSelect-select": {
                      padding: "15px 25px",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                    "& .MuiSvgIcon-root": {
                      width: "20px",
                      height: "20px",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Chọn học kỳ
                  </MenuItem>
                  <MenuItem value="semester1" sx={{ fontSize: "18px" }}>
                    Học kỳ 1 năm học 2023 - 2024
                  </MenuItem>
                  <MenuItem value="semester2" sx={{ fontSize: "18px" }}>
                    Học kỳ 2 năm học 2023 - 2024
                  </MenuItem>
                  <MenuItem value="summerSemester" sx={{ fontSize: "18px" }}>
                    Học kỳ hè năm học 2023 - 2024
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            textColor="primary"
            indicatorColor="primary"
            aria-label="tabs"
          >
            <Tab
              sx={{
                fontSize: "15px",
                fontWeight: "500",
                "&.Mui-selected": {
                  border: "1px solid #1976d2",
                  backgroundColor: "#rgb(221, 221, 221)",
                  color: "#rgb(29, 161, 242)",
                },
              }}
              label="Học phí ngành"
            />
            <Tab
              sx={{
                fontSize: "15px",
                fontWeight: "500",
                "&.Mui-selected": {
                  border: "1px solid #1976d2",
                  backgroundColor: "rgb(221, 221, 221)",
                  color: "#rgb(29, 161, 242)",
                },
              }}
              label="Học phí Trung tâm tiếng Anh"
            />
            <Tab
              sx={{
                fontSize: "15px",
                fontWeight: "500",
                "&.Mui-selected": {
                  border: "1px solid rgb(221, 221, 221)",
                  backgroundColor: "rgb(221, 221, 221)",
                  color: "#rgb(29, 161, 242)",
                },
              }}
              label="Học phí Khác"
            />
          </Tabs>
          {selectedTab === 0 && <PaymentTab data2={hocPhiNganh} />}
          {selectedTab === 1 && <PaymentTab data2={hocPhiTrungTamTiengAnh} />}
          {selectedTab === 2 && <PaymentTab data2={hocPhiKhac} />}
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#333333",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                Chọn hình thức thanh toán
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{
                  backgroundColor: "#ff6600", // Màu cam
                  color: "white", // Màu chữ trắng
                  "&:hover": {
                    backgroundColor: "#ff4d00", // Màu cam đậm hơn khi hover
                  },
                  padding: "20px 35px",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                Thanh toán
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PaymentTable;
