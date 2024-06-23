/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Divider,
  FormControl,
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../../../features/profileSlice/ProfileSlice";

const Courses = () => {
  const [semester, setSemester] = useState("");
  const select = useSelector((state) => state.profile.select);
  const handleChange = (event) => {
    setSemester(event.target.value);
  };
  const courses = useSelector((state) => state.profile.courses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses({ semester }));
  }, [dispatch, semester]);

  return (
    <Box
      component={Paper}
      sx={{
        padding: "10px",
        height: "100%",
        minHeight: "300px",
        marginBottom: "40px",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "between",
          }}
        >
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
                    padding: "5px 10px",
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Chọn học kỳ
                </MenuItem>

                {select.map((item, index) => (
                  <MenuItem
                    value={item.id}
                    index={index}
                    sx={{ fontSize: "13px" }}
                  >
                    {item.tenDot}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Divider sx={{ width: "100%", margin: "10px 0 " }} />
        <Box sx={{ height: "100%" }}>
          <TableContainer
            sx={{ height: "100%", maxHeight: 200, overflowY: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "16px", fontWeight: "700" }}>
                    Khóa học
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px", fontWeight: "700" }}>
                    Tín chỉ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course, index) => (
                  <TableRow
                    key={course.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                    }}
                  >
                    <TableCell sx={{ fontSize: "14px", fontWeight: "500" }}>
                      {course.tenMonHoc}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px", fontWeight: "500" }}>
                      {course.soTinChi}
                    </TableCell>
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
