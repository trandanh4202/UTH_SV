import React, { useEffect, useState } from "react";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  CalendarMonth,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCalendar } from "../../features/calendarSlice/CalendarSlice";
import { format, parseISO } from "date-fns";

const timetableData = {
  days: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
  slots: [
    { time: "Sáng", periods: ["Ca 1", "Ca 2"] },
    { time: "Chiều", periods: ["Ca 3", "Ca 4"] },
    { time: "Tối", periods: ["Ca 5", "Ca 6"] },
  ],
};

const splitIntoSlots = (data) => {
  let splittedData = [];

  data.forEach((item) => {
    if (item.denTiet - item.tuTiet + 1 > 3) {
      let remainingTiet = item.denTiet - item.tuTiet + 1;
      let currentTuTiet = item.tuTiet;

      while (remainingTiet > 3) {
        const newItem = { ...item };
        newItem.tuTiet = currentTuTiet;
        newItem.denTiet = currentTuTiet + 2;
        splittedData.push(newItem);

        currentTuTiet += 3;
        remainingTiet -= 3;
      }

      const lastItem = { ...item };
      lastItem.tuTiet = currentTuTiet;
      lastItem.denTiet = currentTuTiet + remainingTiet - 1;
      splittedData.push(lastItem);
    } else {
      splittedData.push(item);
    }
  });

  return splittedData;
};

const getPeriodSlot = (period) => {
  if (period >= 1 && period <= 3) return "Ca 1";
  if (period >= 4 && period <= 6) return "Ca 2";
  if (period >= 7 && period <= 9) return "Ca 3";
  if (period >= 10 && period <= 12) return "Ca 4";
  if (period >= 13 && period <= 15) return "Ca 5";
  if (period >= 16 && period <= 18) return "Ca 6";
  return null;
};
const generateDatesForCurrentWeek = (currentDate) => {
  const dates = [];
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() - 6);

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    dates.push(format(date, "dd/MM/yyyy"));
  }

  return dates;
};

const Calendar = () => {
  const { days, slots } = timetableData;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [splitData, setSplitData] = useState([]);

  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const handlePrevWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    if (!isNaN(selectedDate.getTime())) {
      setCurrentDate(selectedDate);
    }
  };

  const dispatch = useDispatch();
  const formattedDate = currentDate.toISOString().substr(0, 10);

  useEffect(() => {
    dispatch(getCalendar({ date: formattedDate }));
  }, [dispatch, formattedDate]);

  const calendar = useSelector((state) => state.calendar.calendar);

  useEffect(() => {
    const updatedData = splitIntoSlots(calendar);
    setSplitData(updatedData);
  }, [calendar]);

  const dates = generateDatesForCurrentWeek(currentDate);
  const formatTime = (time) => {
    return time.slice(0, 5);
  };

  return (
    <>
      <Container>
        {/* Watermark */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            marginBottom: "10px",
            flexWrap: "wrap",
          }}
        >
          <TextField
            id="date-picker"
            label="Chọn ngày"
            type="date"
            value={currentDate.toISOString().substr(0, 10)}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiInputBase-input": {
                borderBottom: "2px solid rgb(51, 181, 229)",
                padding: "7px 25px",
                fontSize: "15px",
                backgroundColor: "white",
                color: "black",
              },
            }}
          />
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              variant="outlined"
              onClick={handlePrevWeek}
              sx={{
                backgroundColor: "#008689",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgb(41, 161, 209)",
                },
              }}
            >
              <ArrowBackIosNew />
              <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                Tuần trước
              </Typography>
            </Button>
            <Button
              variant="outlined"
              onClick={handleToday}
              sx={{
                backgroundColor: "#008689",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgb(41, 161, 209)",
                },
              }}
            >
              <CalendarMonth />
              <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                Hiện tại
              </Typography>
            </Button>
            <Button
              variant="outlined"
              onClick={handleNextWeek}
              sx={{
                backgroundColor: "#008689",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgb(41, 161, 209)",
                },
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                Tuần kế tiếp
              </Typography>
              <ArrowForwardIos />
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: "#008689" }}>
              <TableRow>
                <TableCell
                  sx={{
                    border: "1px solid rgba(224, 224, 224, 1)",
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "600",
                    textAlign: "center",
                    width: "12.5%",
                  }}
                  colSpan={2}
                >
                  Ca học
                </TableCell>
                {days.map((day, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      color: "white",
                      fontSize: "15px",
                      fontWeight: "600",
                      width: "12.5%",
                    }}
                  >
                    {day}
                    <br />
                    {dates[index]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {slots.map((slot, slotIndex) => (
                <React.Fragment key={slotIndex}>
                  <TableRow>
                    <TableCell
                      rowSpan={slot.periods.length + 1}
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",
                        backgroundColor: "#008689",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "15px",
                      }}
                    >
                      {slot.time}
                    </TableCell>
                  </TableRow>
                  {slot.periods.map((period, periodIndex) => (
                    <TableRow key={periodIndex}>
                      <TableCell
                        sx={{
                          border: "1px solid rgba(224, 224, 224, 1)",
                          backgroundColor: "#008689",
                          color: "white",
                          fontWeight: "600",
                          fontSize: "15px",
                        }}
                      >
                        {period}
                      </TableCell>
                      {days.map((day, dayIndex) => {
                        const relevantData = splitData.find(
                          (d) =>
                            d.thu === dayIndex + 2 &&
                            getPeriodSlot(d.tuTiet) === period
                        );
                        return (
                          <TableCell
                            key={dayIndex}
                            sx={{
                              border: "1px solid rgba(224, 224, 224, 1)",
                              padding: "10px",
                              minHeight: "150px",
                              minWidth: "135px",
                            }}
                          >
                            {relevantData && (
                              <Box
                                sx={{
                                  backgroundColor: "rgb(51, 181, 229)",
                                  padding: "5px",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "start",
                                  position: "relative",
                                }}
                              >
                                {relevantData.isTamNgung && (
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      left: "-6px",
                                      top: "-5px",
                                      zIndex: 1,
                                      overflow: "hidden",
                                      width: "100%",
                                      height: "100%",
                                      textAlign: "right",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        fontSize: "16px",
                                        fontWeight: 700,
                                        color: "#fff",
                                        textAlign: "center",
                                        lineHeight: "20px",
                                        transform: "rotate(-45deg)",
                                        WebkitTransform: "rotate(-45deg)",
                                        width: "132px",
                                        padding: "5px 0",

                                        display: "block",
                                        background:
                                          "linear-gradient(#f14f3f 0, #cb4335 100%)",
                                        boxShadow:
                                          "0 3px 10px -5px rgba(0, 0, 0, 1)",
                                        textShadow:
                                          "1px 1px 2px rgba(0, 0, 0, 0.25)",
                                        position: "absolute",
                                        top: "23px",
                                        left: "-28px",
                                        "&::before": {
                                          borderBottom: "3px solid transparent",
                                          borderTop: "3px solid #a3362a",
                                          content: "''",
                                          position: "absolute",
                                          top: "100%",
                                          zIndex: -1,
                                          borderLeft: "3px solid #a3362a",
                                          borderRight: "3px solid transparent",
                                          left: "0",
                                        },
                                        "&::after": {
                                          right: "0",
                                          borderLeft: "3px solid transparent",
                                          borderRight: "3px solid #a3362a",
                                          borderBottom: "3px solid transparent",
                                          borderTop: "3px solid #a3362a",
                                          content: "''",
                                          position: "absolute",
                                          top: "100%",
                                          zIndex: -1,
                                        },
                                      }}
                                    >
                                      Tạm ngưng
                                    </Box>
                                  </Box>
                                )}
                                <Typography
                                  component={Link}
                                  sx={{
                                    fontSize: "14px",
                                    color: "#da1d2d",
                                    fontWeight: "700",
                                  }}
                                >
                                  {relevantData.tenMonHoc}
                                </Typography>
                                <Typography
                                  component={Link}
                                  sx={{
                                    fontSize: "13px",
                                    color: "white",
                                    fontWeight: "500",
                                  }}
                                >
                                  {relevantData.maLopHocPhan}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "13px",
                                    color: "white",
                                    fontWeight: "500",
                                  }}
                                >
                                  Tiết:{""}
                                  {relevantData.tuTiet} - {relevantData.denTiet}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "13px",
                                    color: "white",
                                    fontWeight: "500",
                                  }}
                                >
                                  Thời gian: {formatTime(relevantData.tuGio)} -{" "}
                                  {formatTime(relevantData.denGio)}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "13px",
                                    color: "white",
                                    fontWeight: "500",
                                  }}
                                >
                                  Phòng: {relevantData.tenPhong}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "13px",
                                    color: "white",
                                    fontWeight: "500",
                                  }}
                                >
                                  GV: {relevantData.giangVien}
                                </Typography>
                              </Box>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Calendar;
