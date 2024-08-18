/* eslint-disable react/jsx-key */
import {
  Box,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
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
import { data, data2, data3, columns, columns2, columns3 } from "./fakeApi"; // Import dữ liệu từ file data.js
import commonStyles from "./style";
import { getSelect } from "../../../features/programSlice/ProgramSlice";

const SubjectHandling = () => {
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [classSections, setClassSections] = useState([]);
  const [selectedClassDetails, setSelectedClassDetails] = useState(null);
  const [status, setStatus] = useState(1); // 1 corresponds to "Học mới"
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const dispatch = useDispatch();
  const token = localStorage.getItem("account");
  const select = useSelector((state) => state.profile?.select);

  useEffect(() => {
    if (token) {
      dispatch(getSelect());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (select.length > 0 && !semester) {
      setSemester(select[0].id);
    }
  }, [select, semester]);

  useEffect(() => {
    if (semester) {
      // Load subjects based on selected semester

      setSubjects(data);
      setClassSections([]); // Clear class sections when semester changes
      setSelectedClassDetails(null); // Clear class details when semester changes
    }
  }, [semester]);

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const handleSubjectClick = () => {
    // Lọc dựa trên maHocPhan từ data2

    setClassSections(data2);
    setSelectedClassDetails(null); // Clear class details when subject changes
  };

  const handleClassSectionClick = () => {
    setSelectedClassDetails(data3);
  };

  return (
    <Box>
      <Container>
        <Box>
          <Paper sx={commonStyles.paper} elevation={4}>
            <Box
              sx={{ display: "flex", alignItems: "center", padding: "10px" }}
            >
              <Divider orientation="vertical" sx={commonStyles.divider} />
              <Typography sx={commonStyles.typographyTitle}>
                Xử lý học phần
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                <Select
                  value={semester}
                  onChange={handleSemesterChange}
                  displayEmpty
                  sx={{
                    "& .MuiSelect-select": {
                      padding: "5px 40px 5px 20px",
                      fontSize: { xs: "13px", lg: "15px" },
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Chọn học kỳ
                  </MenuItem>
                  {select.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                      sx={{ fontSize: "13px" }}
                    >
                      {item.tenDot}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="statusSubjectHandling"
                  name="row-radio-buttons-group"
                  value={status} // Set default value
                  onChange={handleStatusChange}
                >
                  {["Học mới", "Học cải thiện", "Học lại"].map(
                    (label, index) => (
                      <FormControlLabel
                        key={index}
                        value={index + 1}
                        control={
                          <Radio
                            sx={{
                              width: 30,
                              height: 30,
                              "&.Mui-checked": { color: "#008689" },
                              "&.Mui-checked + .MuiFormControlLabel-label ": {
                                color: "#008689",
                                fontWeight: "700",
                              },
                            }}
                          />
                        }
                        label={label}
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "14px",
                            color: "rgb(102, 117, 128)",
                            fontWeight: "500",
                          },
                        }}
                      />
                    )
                  )}
                </RadioGroup>
              </FormControl>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ margin: "20px 0" }}>
          <Paper sx={commonStyles.paper} elevation={4}>
            <Box
              sx={{ display: "flex", alignItems: "center", padding: "10px" }}
            >
              <Divider orientation="vertical" sx={commonStyles.divider} />
              <Typography sx={commonStyles.typographyTitle}>
                Học phần đang chờ đăng ký
              </Typography>
            </Box>
            <TableContainer sx={commonStyles.tableContainer}>
              <Table stickyHeader aria-label="curriculum table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={commonStyles.tableCellHeader}>
                      <Typography sx={commonStyles.typographyTableHeader}>
                        STT
                      </Typography>
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell
                        key={column.field}
                        align="center"
                        sx={commonStyles.tableCellHeader}
                      >
                        <Typography sx={commonStyles.typographyTableHeader}>
                          {column.headerName}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.map((item, index) => (
                    <TableRow
                      key={item.maHocPhan}
                      sx={{ cursor: "pointer", transition: "all 1s ease" }}
                      onClick={() => handleSubjectClick(item.maHocPhan)}
                    >
                      <TableCell sx={commonStyles.tableCellContent}>
                        <Typography sx={commonStyles.typographyTableContent}>
                          {index + 1}
                        </Typography>
                      </TableCell>

                      <TableCell sx={commonStyles.tableCellContent}>
                        <Typography sx={commonStyles.typographyTableContent}>
                          {item.maHocPhan}
                        </Typography>
                      </TableCell>
                      <TableCell sx={commonStyles.tableCellContent}>
                        <Typography sx={commonStyles.typographyTableContent}>
                          {item.tenHocPhan}
                        </Typography>
                      </TableCell>
                      <TableCell sx={commonStyles.tableCellContent}>
                        <Typography sx={commonStyles.typographyTableContent}>
                          {item.soTC}
                        </Typography>
                      </TableCell>
                      <TableCell sx={commonStyles.tableCellContent}>
                        <Typography sx={commonStyles.typographyTableContent}>
                          {item.dieuKienDangKy}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        <Box sx={{ margin: "20px 0" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <Paper sx={commonStyles.paper} elevation={4}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <Divider orientation="vertical" sx={commonStyles.divider} />
                    <Typography sx={commonStyles.typographyTitle}>
                      Lớp học phần đang chờ đăng ký
                    </Typography>
                  </Box>
                  <TableContainer sx={commonStyles.tableContainer}>
                    <Table stickyHeader aria-label="class sections table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="center"
                            sx={commonStyles.tableCellHeader}
                          >
                            <Typography sx={commonStyles.typographyTableHeader}>
                              STT
                            </Typography>
                          </TableCell>
                          {columns2.map((column) => (
                            <TableCell
                              key={column.field}
                              align="center"
                              sx={commonStyles.tableCellHeader}
                            >
                              <Typography
                                sx={commonStyles.typographyTableHeader}
                              >
                                {column.headerName}
                              </Typography>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {classSections.map((item, index) => (
                          <TableRow
                            key={item.maLopHocPhan}
                            sx={{
                              cursor: "pointer",
                              transition: "all 1s ease",
                              backgroundColor: "rgba(72, 128, 255, 0.05)",
                            }}
                            onClick={() =>
                              handleClassSectionClick(item.maLopHocPhan)
                            }
                          >
                            <TableCell sx={commonStyles.tableCellContent}>
                              <Typography
                                sx={commonStyles.typographyTableContent}
                              >
                                {index + 1}
                              </Typography>
                            </TableCell>
                            <TableCell sx={commonStyles.tableCellContent}>
                              <Box>
                                <Typography
                                  sx={
                                    commonStyles.typographyTableSubContentBold
                                  }
                                >
                                  {item.tenHocPhan}
                                </Typography>
                                <Typography
                                  sx={commonStyles.typographyTableSubContent}
                                >
                                  {item.maLopHocPhan}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell sx={commonStyles.tableCellContent}>
                              <Typography
                                sx={commonStyles.typographyTableContent}
                              >
                                {item.daDangKy}/{item.siSoToiDa}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Paper sx={commonStyles.paper} elevation={4}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <Divider orientation="vertical" sx={commonStyles.divider} />
                    <Typography sx={commonStyles.typographyTitle}>
                      Chi tiết lớp học phần
                    </Typography>
                  </Box>
                  <TableContainer sx={commonStyles.tableContainer}>
                    <Table stickyHeader aria-label="class details table">
                      <TableHead>
                        <TableRow>
                          {columns3.map((column) => (
                            <TableCell
                              key={column.field}
                              align="center"
                              sx={commonStyles.tableCellHeader}
                            >
                              <Typography
                                sx={commonStyles.typographyTableHeader}
                              >
                                {column.headerName}
                              </Typography>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedClassDetails ? (
                          <>
                            {data3.map((item, index) => (
                              <TableRow
                                key={index}
                                sx={{
                                  cursor: "pointer",
                                  transition: "all 1s ease",
                                  backgroundColor: "rgba(72, 128, 255, 0.05)",
                                }}
                              >
                                <TableCell sx={commonStyles.tableCellContent}>
                                  <Box>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          color: "black",
                                          fontSize: { xs: "10px", lg: "15px" },
                                          fontWeight: "500",
                                        }}
                                      >
                                        Lịch học:
                                      </Typography>
                                      <Typography
                                        sx={{
                                          color: "#da1d2d",
                                          fontSize: { xs: "10px", lg: "15px" },
                                          fontWeight: "700",
                                        }}
                                      >
                                        {item.lichHoc}
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          color: "black",
                                          fontSize: { xs: "10px", lg: "15px" },
                                          fontWeight: "500",
                                        }}
                                      >
                                        Cơ sở:
                                      </Typography>
                                      <Typography
                                        sx={{
                                          color: "#da1d2d",
                                          fontSize: { xs: "10px", lg: "15px" },
                                          fontWeight: "700",
                                        }}
                                      >
                                        {item.coSo}
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          color: "black",
                                          fontSize: { xs: "10px", lg: "15px" },
                                          fontWeight: "500",
                                        }}
                                      >
                                        Dãy nhà:
                                      </Typography>
                                      <Typography
                                        sx={{
                                          color: "#da1d2d",
                                          fontSize: { xs: "10px", lg: "15px" },
                                          fontWeight: "700",
                                        }}
                                      >
                                        {item.dayNha}
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          color: "black",
                                          fontSize: { xs: "10px", lg: "15px" },
                                          fontWeight: "500",
                                        }}
                                      >
                                        Phòng:
                                      </Typography>
                                      <Typography
                                        sx={{
                                          color: "#da1d2d",
                                          fontSize: { xs: "10px", lg: "15px" },
                                          fontWeight: "700",
                                        }}
                                      >
                                        {item.phong}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </TableCell>
                                <TableCell sx={commonStyles.tableCellContent}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        color: "black",
                                        fontSize: { xs: "10px", lg: "15px" },
                                        fontWeight: "500",
                                      }}
                                    >
                                      GV:
                                    </Typography>
                                    <Typography
                                      sx={{
                                        color: "#da1d2d",
                                        fontSize: { xs: "10px", lg: "15px" },
                                        fontWeight: "700",
                                      }}
                                    >
                                      {item.giangVien}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        color: "black",
                                        fontSize: { xs: "10px", lg: "15px" },
                                        fontWeight: "500",
                                      }}
                                    >
                                      {item.batDau} -
                                    </Typography>
                                    <Typography
                                      sx={{
                                        color: "black",
                                        fontSize: { xs: "10px", lg: "15px" },
                                        fontWeight: "500",
                                      }}
                                    >
                                      {item.ketThuc}
                                    </Typography>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        ) : (
                          <TableRow>
                            <TableCell colSpan={columns3.length} align="center">
                              <Typography
                                sx={commonStyles.typographyTableContent}
                              >
                                Chọn lớp học phần để xem chi tiết
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default SubjectHandling;
