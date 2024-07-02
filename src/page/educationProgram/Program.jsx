import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProgram } from "../../features/programSlice/ProgramSlice";

const columns = [
  {
    field: "tenHocPhan",
    headerName: "Tên học phần",
    align: "center",
    width: "20%",
  },
  {
    field: "maHocPhan",
    headerName: "Mã học phần",
    align: "center",
    width: "15%",
  },
  {
    field: "dieuKien",
    headerName: "Điều kiện đăng ký",
    align: "center",
    width: "15%",
  },
  { field: "soTinChi", headerName: "Số TC", align: "center", width: "10%" },
  {
    field: "soTietLT",
    headerName: "Số tiết LT",
    align: "center",
    width: "10%",
  },
  {
    field: "soTietTH",
    headerName: "Số tiết TH",
    align: "center",
    width: "10%",
  },
  {
    field: "nhomTuChon",
    headerName: "Nhóm tự chọn",
    align: "center",
    width: "5%",
  },
  {
    field: "soTCBBCuaNhom",
    headerName: "Số TC bắt buộc của nhóm",
    align: "center",
    width: "5%",
  },
  { field: "isDat", headerName: "Đạt", align: "center", width: "10%" },
];

const formatConditions = (course) => {
  const conditions = [];

  const addCondition = (items, suffix) => {
    items.forEach((item) => {
      conditions.push(
        <Tooltip
          key={item.maHocPhan}
          title={<h1 style={{ color: "white" }}>{item.tenHocPhan}</h1>}
          placement="top"
          arrow
        >
          <Typography
            sx={{ color: "#da1d2d", fontSize: "15px", fontWeight: "800" }}
          >
            {item.maHocPhan}({suffix})
          </Typography>
        </Tooltip>
      );
    });
  };

  if (course.hocPhanTruocs) addCondition(course.hocPhanTruocs, "a");
  if (course.hocPhanTienQuyets) addCondition(course.hocPhanTienQuyets, "b");
  if (course.hocPhanSongHanhs) addCondition(course.hocPhanSongHanhs, "c");

  return conditions.length > 0
    ? conditions.reduce((prev, curr) => [prev, ", ", curr])
    : "";
};

const Program1 = () => {
  const dispatch = useDispatch();
  const [expandedSemester, setExpandedSemester] = useState(null);

  useEffect(() => {
    dispatch(getProgram());
  }, [dispatch]);

  const program = useSelector((state) => state.program.program);
  const { chitiets, soTCBatBuoc, soTCTuChon, soTCYeuCau } = program;

  const handleToggleSemester = (index) => {
    setExpandedSemester(expandedSemester === index ? null : index);
  };

  return (
    <Box mt={3}>
      <Container>
        <Paper elevation={12}>
          <TableContainer
            sx={{
              padding: "10px",
            }}
          >
            <Table stickyHeader aria-label="curriculum table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      align={column.align}
                      sx={{
                        width: column.width,
                        color: "white",
                        fontSize: "15px",
                        fontWeight: "800",
                        border: "1px solid rgba(224, 224, 224, 1)",
                        background: "#008689",
                      }}
                    >
                      {column.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {chitiets?.map((semester, index) => (
                  <React.Fragment key={index}>
                    <TableRow
                      onClick={() => handleToggleSemester(index)}
                      sx={{
                        cursor: "pointer",

                        backgroundColor: "#bec5c9",
                      }}
                    >
                      <TableCell
                        colSpan={3}
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#da1d2d",
                            fontSize: "15px",
                            fontWeight: "800",
                            textAlign: "center",
                          }}
                        >
                          Học kỳ {semester.hocKy}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        <Typography
                          sx={{
                            color: "#da1d2d",
                            fontSize: "15px",
                            fontWeight: "800",
                            textAlign: "center",
                          }}
                        >
                          {semester.soTCBatBuoc + semester.soTCTuChon}
                        </Typography>
                      </TableCell>
                      <TableCell
                        colSpan={5}
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      ></TableCell>
                    </TableRow>
                    {expandedSemester === index && (
                      <>
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                          >
                            <Typography
                              sx={{
                                color: "#da1d2d",
                                fontSize: "15px",
                                fontWeight: "800",
                              }}
                            >
                              Học phần bắt buộc
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                          >
                            <Typography
                              sx={{
                                color: "#da1d2d",
                                fontSize: "15px",
                                fontWeight: "800",
                                textAlign: "center",
                              }}
                            >
                              {semester.soTCBatBuoc}
                            </Typography>
                          </TableCell>
                          <TableCell
                            colSpan={5}
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                          ></TableCell>
                        </TableRow>
                        {semester.monBatBuoc.map((course) => (
                          <TableRow key={course.maHocPhan}>
                            <TableCell
                              sx={{
                                width: "20%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.tenMonHoc}
                                {course.isKhongTinhTBC && (
                                  <Typography
                                    sx={{
                                      color: "#da1d2d",
                                      fontSize: "15px",
                                      fontWeight: "800",
                                    }}
                                    variant="span"
                                  >
                                    (*)
                                  </Typography>
                                )}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "15%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.maHocPhan}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "15%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {formatConditions(course)}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "10%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.soTC}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "10%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.soTietLT}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "10%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.soTietTH}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "5%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.nhomTuChon ?? 0}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "5%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.soTCBatBuocNhom}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "10%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.isDat}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                          >
                            <Typography
                              sx={{
                                color: "#da1d2d",
                                fontSize: "15px",
                                fontWeight: "800",
                              }}
                            >
                              Học phần tự chọn
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                          >
                            <Typography
                              sx={{
                                color: "#da1d2d",
                                fontSize: "15px",
                                fontWeight: "800",
                                textAlign: "center",
                              }}
                            >
                              {semester.soTCTuChon}
                            </Typography>
                          </TableCell>
                          <TableCell
                            colSpan={5}
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                          ></TableCell>
                        </TableRow>
                        {semester.monTuChon.map((course) => (
                          <TableRow key={course.maHocPhan}>
                            <TableCell
                              sx={{
                                width: "20%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.tenMonHoc}
                                {course.isKhongTinhTBC && (
                                  <Typography
                                    sx={{
                                      color: "#da1d2d",
                                      fontSize: "15px",
                                      fontWeight: "800",
                                    }}
                                    variant="span"
                                  >
                                    (*)
                                  </Typography>
                                )}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "15%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.maHocPhan}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "15%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {formatConditions(course)}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "10%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.soTC}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "10%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.soTietLT}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "10%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.soTietTH}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "5%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.nhomTuChon ?? 0}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "5%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.soTCBatBuocNhom}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "10%",
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.isDat}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default Program1;
