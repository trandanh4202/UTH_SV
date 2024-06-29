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
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    dates.push(new Intl.DateTimeFormat("vi-VN", options).format(date));
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

  return (
    <>
      <Container>
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
                backgroundColor: "rgb(51, 181, 229)",
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
                backgroundColor: "rgb(51, 181, 229)",
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
                backgroundColor: "rgb(51, 181, 229)",
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
            <TableHead sx={{ backgroundColor: "rgb(51, 181, 229)" }}>
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
                        backgroundColor: "#3B5998",
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
                          backgroundColor: "#3B5998",
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
                              padding: "5px",
                              minHeight: "150px",
                              minWidth: "135px",
                            }}
                          >
                            {relevantData && (
                              <Box
                                sx={{
                                  backgroundColor:
                                    relevantData.isTamNgung === 1
                                      ? "red"
                                      : "rgb(51, 181, 229)",
                                  padding: "5px",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "start",
                                }}
                              >
                                {relevantData.isTamNgung && (
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      top: 0,
                                      right: 0,
                                      backgroundColor: "yellow",
                                      color: "red",
                                      padding: "2px 4px",
                                      borderRadius: "0 0 0 5px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Tạm ngưng
                                  </Box>
                                )}
                                <Typography
                                  component={Link}
                                  sx={{
                                    fontSize: "14px",
                                    color: "rgb(240,240,240)",
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
                                  Tiết: {relevantData.tuTiet} -{" "}
                                  {relevantData.denTiet}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "13px",
                                    color: "white",
                                    fontWeight: "500",
                                  }}
                                >
                                  Thời gian: {relevantData.tuGio} -{" "}
                                  {relevantData.denGio}
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
