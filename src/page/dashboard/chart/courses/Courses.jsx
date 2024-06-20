/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
const data = [
  { course: "Trí tuệ nhân tạo", credits: 3 },
  { course: "Khai thác dữ liệu", credits: 3 },
  { course: "OOP", credits: 3 },
  { course: "Trí tuệ nhân tạo", credits: 3 },
  { course: "Khai thác dữ liệu", credits: 3 },
  { course: "OOP", credits: 3 },
];

const Courses = () => {
  const [semester, setSemester] = useState("");

  const handleChange = (event) => {
    setSemester(event.target.value);
  };
  return (
    <Box
      component={Paper}
      sx={{
        padding: "10px",
        height: "100%",
      }}
    >
      <Box>
        <Box sx={{ textAlign: "left", width: "100%" }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "700",
              color: "rgb(102, 117, 128)",
            }}
          >
            Lớp học phần
          </Typography>
        </Box>
        <Box>
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <Select
              value={semester}
              onChange={handleChange}
              displayEmpty
              sx={{
                "& .MuiSelect-select": {
                  padding: "10px",
                },
              }}
            >
              <MenuItem value="" disabled>
                Chọn học kỳ
              </MenuItem>
              <MenuItem value="semester1" sx={{ fontSize: "13px" }}>
                Học kỳ 1 năm học 2023 - 2024
              </MenuItem>
              <MenuItem value="semester2" sx={{ fontSize: "13px" }}>
                Học kỳ 2 năm học 2023 - 2024
              </MenuItem>
              <MenuItem value="summerSemester" sx={{ fontSize: "13px" }}>
                Học kỳ hè năm học 2023 - 2024
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Divider sx={{ width: "100%", margin: "10px 0 " }} />
        <Box sx={{ height: "100%" }}>
          <TableContainer
            sx={{ height: "100%", maxHeight: 200, overflowY: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Khóa học</TableCell>
                  <TableCell>Tín chỉ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow
                    key={row.course}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                    }}
                  >
                    <TableCell>{row.course}</TableCell>
                    <TableCell>{row.credits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Courses;
