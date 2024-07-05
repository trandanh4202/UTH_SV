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
import { Cancel, CheckCircle } from "@mui/icons-material";

const columns = [
  {
    field: "tenHocPhan",
    headerName: "Tên học phần",
    align: "center",
    width: "400px",
  },
  {
    field: "maHocPhan",
    headerName: "Mã học phần",
    align: "center",
    width: "150px",
  },
  {
    field: "dieuKien",
    headerName: "Điều kiện đăng ký",
    align: "center",
    width: "150px",
  },
  { field: "soTinChi", headerName: "Số TC", align: "center", width: "50px" },
  {
    field: "soTietLT",
    headerName: "Số tiết LT",
    align: "center",
    width: "50px",
  },
  {
    field: "soTietTH",
    headerName: "Số tiết TH",
    align: "center",
    width: "50px",
  },
  {
    field: "nhomTuChon",
    headerName: "Nhóm tự chọn",
    align: "center",
    width: "50px",
  },
  {
    field: "soTCBBCuaNhom",
    headerName: "Số TC bắt buộc của nhóm",
    align: "center",
    width: "50px",
  },
  { field: "isDat", headerName: "Đạt", align: "center", width: "50px" },
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
    ? conditions.reduce((prev, curr) => [prev, curr])
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
        <Paper
          elevation={12}
          sx={{
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <TableContainer
            sx={{
              // padding: "0 0 10px 10px",
              maxHeight: "80vh",

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
            <Table stickyHeader aria-label="curriculum table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      align={column.align}
                      sx={{
                        minWidth: column.width,
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
                        transition: "all 1s ease", // Hiệu ứng chuyển động
                        backgroundColor: "rgba(72, 128, 255, 0.05)",
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
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.isDat === true ? (
                                  <CheckCircle
                                    sx={{ color: "#008950", fontSize: "20px" }}
                                  />
                                ) : course.isDat === false ? (
                                  <Cancel
                                    sx={{ color: "red", fontSize: "20px" }}
                                  />
                                ) : (
                                  ""
                                )}
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
                                border: "1px solid rgba(224, 224, 224, 1)",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgb(117, 117, 117)",
                                  fontSize: "15px",
                                }}
                              >
                                {course.isDat === true ? (
                                  <CheckCircle
                                    sx={{ color: "#008950", fontSize: "20px" }}
                                  />
                                ) : course.isDat === false ? (
                                  <Cancel
                                    sx={{ color: "red", fontSize: "20px" }}
                                  />
                                ) : (
                                  ""
                                )}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </React.Fragment>
                ))}
                <TableRow
                  sx={{
                    background: "rgba(72, 128, 255, 0.05)",
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
                        textAlign: "left",
                      }}
                    >
                      Số tín chỉ bắt buộc
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
                      {soTCBatBuoc}
                    </Typography>
                  </TableCell>
                  <TableCell
                    colSpan={5}
                    sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                  ></TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    background: "rgba(72, 128, 255, 0.05)",
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
                        textAlign: "left",
                      }}
                    >
                      Số tín chỉ tự chọn
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
                      {soTCTuChon}
                    </Typography>
                  </TableCell>
                  <TableCell
                    colSpan={5}
                    sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                  ></TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    background: "rgba(72, 128, 255, 0.05)",
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
                        textAlign: "left",
                      }}
                    >
                      Tổng số tín chỉ
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
                      {soTCYeuCau}
                    </Typography>
                  </TableCell>
                  <TableCell
                    colSpan={5}
                    sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                  ></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default Program1;
