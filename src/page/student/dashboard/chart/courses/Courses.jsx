import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "~/features/programSlice/ProgramSlice";

const Courses = () => {
  const select = useSelector((state) => state.program?.select);
  const courses = useSelector((state) => state.program?.courses);
  const [semester, setSemester] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (select.length > 0 && !semester) {
      setSemester(select[0].id);
    }
  }, [select, semester]);

  useEffect(() => {
    if (semester) {
      dispatch(getCourses({ semester }));
    }
  }, [dispatch, semester]);

  const handleChange = (event) => {
    setSemester(event.target.value);
  };
  return (
    <Paper
      sx={{ padding: "10px", height: "100%", minHeight: "300px" }}
      elevation={3}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#008689",
              }}
            >
              Lớp học phần
            </Typography>
          </Box>
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
                  key={item.id}
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
        <Divider sx={{ width: "100%", margin: "10px 0 " }} />
        <TableContainer
          sx={{
            maxHeight: "20vh",
            "&::-webkit-scrollbar": {
              width: "10px",
              height: "10px",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#008689",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#008950",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: "10px",
            },
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "15px", fontWeight: "700" }}>
                  Khóa học
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: "700" }}>
                  Tín chỉ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course, index) => (
                <TableRow
                  key={course.id}
                  sx={{
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
    </Paper>
  );
};

export default Courses;
