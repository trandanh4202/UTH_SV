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
  { field: "tenHocPhan", headerName: "Tên học phần", width: "400px" },
  { field: "maHocPhan", headerName: "Mã học phần", width: "150px" },
  { field: "dieuKien", headerName: "Điều kiện đăng ký", width: "100px" },
  { field: "soTinChi", headerName: "Số TC", width: "50px" },
  { field: "soTietLT", headerName: "Số tiết LT", width: "50px" },
  { field: "soTietTH", headerName: "Số tiết TH", width: "50px" },
  { field: "nhomTuChon", headerName: "Nhóm tự chọn", width: "100px" },
  {
    field: "soTCBBCuaNhom",
    headerName: "Số TC bắt buộc của nhóm",
    width: "100px",
  },
  { field: "isDat", headerName: "Đạt", width: "50px" },
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
            sx={{
              color: "#da1d2d",
              fontSize: { xs: "13px", lg: "15px" },
              fontWeight: "800",
            }}
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

  const program = useSelector((state) => state.program?.program);
  const { chitiets, soTCBatBuoc, soTCTuChon, soTCYeuCau } = program;

  const handleToggleSemester = (index) => {
    setExpandedSemester(expandedSemester === index ? null : index);
  };

  return (
    <Box mt={3}>
      <Container>
        <Paper elevation={12} sx={{ borderRadius: "10px", padding: "20px" }}>
          <TableContainer
            sx={{
              maxHeight: "82vh",
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
                      align="center"
                      sx={{
                        minWidth: column.width,
                        border: "1px solid rgba(224, 224, 224, 1)",
                        background: "#008689",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: "15px", lg: "15px" },
                          fontWeight: "800",
                          color: "white",
                        }}
                      >
                        {column.headerName}
                      </Typography>
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
                        transition: "all 1s ease",
                        backgroundColor: "rgba(72, 128, 255, 0.05)",
                      }}
                    >
                      <TableCell
                        colSpan={3}
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        <Typography
                          sx={{
                            color: "#da1d2d",
                            fontSize: { xs: "10px", lg: "15px" },
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
                            fontSize: { xs: "10px", lg: "15px" },
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
                        <TableRow
                          sx={{
                            backgroundColor: "rgba(72, 128, 255, 0.05)",
                          }}
                        >
                          <TableCell
                            colSpan={3}
                            sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                          >
                            <Typography
                              sx={{
                                color: "#da1d2d",
                                fontSize: { xs: "10px", lg: "15px" },
                                fontWeight: "700",
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
                                fontSize: { xs: "10px", lg: "15px" },
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
                          <TableRow
                            key={course.maHocPhan}
                            sx={{
                              backgroundColor: course.isDat
                                ? "#e7ecf0"
                                : "inherit",
                            }}
                          >
                            {[
                              {
                                value: course.tenMonHoc,
                                extra: course.isKhongTinhTBC ? "(*)" : "",
                                align: "left",
                              },
                              { value: course.maHocPhan },
                              { value: formatConditions(course) },
                              { value: course.soTC },
                              { value: course.soTietLT },
                              { value: course.soTietTH },
                              { value: course.nhomTuChon ?? 0 },
                              { value: course.soTCBatBuocNhom },
                              {
                                value:
                                  course.isDat === true ? (
                                    <CheckCircle
                                      sx={{
                                        color: "#008689",
                                        fontSize: "20px",
                                      }}
                                    />
                                  ) : course.isDat === false ? (
                                    <Cancel
                                      sx={{ color: "red", fontSize: "20px" }}
                                    />
                                  ) : (
                                    ""
                                  ),
                              },
                            ].map((cell, cellIndex) => (
                              <TableCell
                                key={cellIndex}
                                align={cell.align || "center"}
                                sx={{
                                  border: "1px solid rgba(224, 224, 224, 1)",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "rgb(117, 117, 117)",
                                    fontSize: { xs: "10px", lg: "15px" },
                                    fontWeight: "600",
                                  }}
                                >
                                  {cell.value}
                                  {cell.extra && (
                                    <Typography
                                      variant="span"
                                      sx={{
                                        color: "#da1d2d",
                                        fontSize: { xs: "10px", lg: "15px" },
                                      }}
                                    >
                                      {cell.extra}
                                    </Typography>
                                  )}
                                </Typography>
                              </TableCell>
                            ))}
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
                                fontSize: { xs: "10px", lg: "15px" },
                                fontWeight: "700",
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
                                fontSize: { xs: "10px", lg: "15px" },
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
                          <TableRow
                            key={course.maHocPhan}
                            sx={{
                              backgroundColor: course.isDat
                                ? "#e7ecf0"
                                : "inherit",
                            }}
                          >
                            {[
                              {
                                value: course.tenMonHoc,
                                extra: course.isKhongTinhTBC ? "(*)" : "",
                                align: "left",
                              },
                              { value: course.maHocPhan },
                              { value: formatConditions(course) },
                              { value: course.soTC },
                              { value: course.soTietLT },
                              { value: course.soTietTH },
                              { value: course.nhomTuChon ?? 0 },
                              { value: course.soTCBatBuocNhom },
                              {
                                value:
                                  course.isDat === true ? (
                                    <CheckCircle
                                      sx={{
                                        color: "#008950",
                                        fontSize: "20px",
                                      }}
                                    />
                                  ) : course.isDat === false ? (
                                    <Cancel
                                      sx={{ color: "red", fontSize: "20px" }}
                                    />
                                  ) : (
                                    ""
                                  ),
                              },
                            ].map((cell, cellIndex) => (
                              <TableCell
                                key={cellIndex}
                                align={cell.align || "center"}
                                sx={{
                                  border: "1px solid rgba(224, 224, 224, 1)",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "rgb(117, 117, 117)",
                                    fontSize: { xs: "10px", lg: "15px" },
                                    fontWeight: "600",
                                  }}
                                >
                                  {cell.value}
                                  {cell.extra && (
                                    <Typography
                                      variant="span"
                                      sx={{
                                        color: "#da1d2d",
                                        fontSize: { xs: "10px", lg: "15px" },
                                      }}
                                    >
                                      {cell.extra}
                                    </Typography>
                                  )}
                                </Typography>
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </>
                    )}
                  </React.Fragment>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    <Typography
                      sx={{
                        color: "#da1d2d",
                        fontSize: { xs: "10px", lg: "15px" },
                        fontWeight: "700",
                      }}
                    >
                      Tổng số tín chỉ yêu cầu
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    <Typography
                      sx={{
                        color: "#da1d2d",
                        fontSize: { xs: "10px", lg: "15px" },
                        fontWeight: "700",
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
                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    <Typography
                      sx={{
                        color: "#da1d2d",
                        fontSize: { xs: "10px", lg: "15px" },
                        fontWeight: "700",
                      }}
                    >
                      Tổng số tín chỉ bắt buộc
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    <Typography
                      sx={{
                        color: "#da1d2d",
                        fontSize: { xs: "13px", lg: "15px" },
                        fontWeight: "700",
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
                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    <Typography
                      sx={{
                        color: "#da1d2d",
                        fontSize: { xs: "13px", lg: "15px" },
                        fontWeight: "700",
                      }}
                    >
                      Tổng số tín chỉ tự chọn
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                  >
                    <Typography
                      sx={{
                        color: "#da1d2d",
                        fontSize: { xs: "13px", lg: "15px" },
                        fontWeight: "700",
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
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default Program1;
