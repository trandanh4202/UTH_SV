import { ArrowBack, ArrowForward, CalendarMonth } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { addDays, format, startOfWeek } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCalendar } from "~/features/calendarSlice/CalendarSlice";
import Spinner from "../../../components/Spinner/Spinner";
import { getCalendarDemo } from "../../../features/calendarSlice/CalendarSlice";

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
  const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Thứ hai là ngày bắt đầu tuần

  for (let i = 0; i <= 7; i++) {
    const date = addDays(startOfWeekDate, i);
    dates.push(format(date, "dd/MM/yyyy"));
  }

  return dates;
};
const Calendar = () => {
  const { days, slots } = timetableData;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [splitData, setSplitData] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null); // State to hold the timeout ID
  const dispatch = useDispatch();
  const formattedDate = format(currentDate, "yyyy-MM-dd");

  // Function to handle debounce for API calls
  const debounceFetch = (date) => {
    // Clear existing timeout if exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set new timeout for 1 second
    const newTimeoutId = setTimeout(() => {
      dispatch(getCalendar({ date: format(date, "yyyy-MM-dd") }));
    }, 500); // 1000 milliseconds = 1 second
    dispatch(getCalendarDemo({ date: format(date, "yyyy-MM-dd") }));
    // Update the state with the new timeout ID
    setTimeoutId(newTimeoutId);
  };

  // Handle changing to next week
  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
    debounceFetch(nextWeek); // Call debounce function
  };

  // Handle changing to previous week
  const handlePrevWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentDate(prevWeek);
    debounceFetch(prevWeek); // Call debounce function
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    debounceFetch(new Date()); // Call debounce function
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    if (!isNaN(selectedDate.getTime())) {
      setCurrentDate(selectedDate);
      debounceFetch(selectedDate); // Call debounce function
    }
  };

  useEffect(() => {
    debounceFetch(currentDate); // Initial fetch when component mounts
  }, [currentDate]); // Only call when currentDate changes

  const calendar = useSelector((state) => state.calendar.calendarDemo) || [];
  // const calendar = useSelector((state) => state.calendar.calendar) || [];

  useEffect(() => {
    const updatedData = splitIntoSlots(calendar);
    setSplitData(updatedData);
  }, [calendar]);

  const dates = generateDatesForCurrentWeek(currentDate);
  const formatTime = (time) => {
    return time?.slice(0, 5);
  };
  const loading = useSelector((state) => state.calendar.loading);
  return (
    <>
      <Container>
        {/* Watermark */}

        <Paper elevation={4} sx={{ padding: "20px", borderRadius: "10px" }}>
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
              type="date"
              value={format(currentDate, "yyyy-MM-dd")} // Sử dụng `date-fns` để định dạng lại
              onChange={handleDateChange}
              // InputLabelProps={{
              //   shrink: true,
              // }}
              sx={{
                "& .MuiInputBase-input": {
                  borderBottom: "2px solid rgb(51, 181, 229)",
                  padding: "7px 25px",
                  fontSize: "15px",
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "20px",
                  border: "3px solid #008588",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSvgIcon-root": {
                  color: "green", // Đổi màu icon thành màu xanh lá cây
                  backgroundSize: "cover",
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
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#006b89",
                  },
                }}
              >
                <ArrowBack
                  sx={{
                    fontSize: "20px",
                  }}
                />
              </Button>
              <Button
                variant="outlined"
                onClick={handleToday}
                sx={{
                  backgroundColor: "#008689",
                  color: "white",
                  borderRadius: "10px",
                  padding: "5px",
                  gap: "5px",
                  "&:hover": {
                    backgroundColor: "#006b89",
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
                  borderRadius: "10px",
                  padding: "0",
                  "&:hover": {
                    backgroundColor: "#006b89",
                  },
                }}
              >
                <ArrowForward
                  sx={{
                    fontSize: "20px",
                  }}
                />
              </Button>
            </Box>
          </Box>

          <TableContainer
            sx={{
              borderTopLeftRadius: "20px",
              // overflow: "hidden",
              borderTopRightRadius: "20px",
              maxHeight: "75vh",
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
              position: "relative",
            }}
          >
            {loading ? (
              <Box
                sx={{
                  background: "#c1d3d3",
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              >
                <Spinner />
              </Box>
            ) : (
              <Table
                sx={{
                  minWidth: 650,
                }}
                stickyHeader
                aria-label="curriculum table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        border: "1px solid rgba(224, 224, 224, 1)",
                        fontSize: "15px",
                        // fontWeight: "600",
                        textAlign: "center",
                        width: "12.5%",
                        borderTopLeftRadius: "20px",
                        color: "white",
                        background: "#008689",
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
                          fontSize: "15px",
                          fontWeight: "600",
                          // width: "12.5%",
                          ...(index === days.length - 1 && {
                            borderTopRightRadius: "20px",
                          }),
                          color: "white",
                          background: "#008689",
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
                        <TableRow
                          key={periodIndex}
                          sx={{
                            verticalAlign: "top",
                          }}
                        >
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
                            const relevantData = splitData.filter(
                              (d) =>
                                d.thu === dayIndex + 2 &&
                                getPeriodSlot(d.tuTiet) === period
                            );
                            return (
                              <TableCell
                                key={dayIndex}
                                sx={{
                                  order: "1px solid rgba(224, 224, 224, 1)",
                                  padding: "5px",
                                  minHeight: "150px",
                                  // minWidth: "135px",
                                  border: "1px solid rgba(224, 224, 224, 1)",
                                  // display: "flex",
                                }}
                              >
                                {relevantData.length > 0 &&
                                  relevantData.map((data, idx) => (
                                    <Box
                                      key={idx}
                                      sx={{
                                        display: "flex",
                                        backgroundColor: data.isTamNgung
                                          ? "rgba(234, 70, 67, 0.05)"
                                          : "rgba(72, 128, 255, 0.05)",
                                        marginBottom: "5px", // Khoảng cách giữa các môn học trong cùng ca
                                      }}
                                    >
                                      {/* Nội dung hiển thị chi tiết môn học */}
                                      <Box
                                        sx={{
                                          borderRadius: "5px",
                                          borderLeft: `10px solid ${
                                            data.isTamNgung
                                              ? "rgba(234, 70, 67, 1)"
                                              : "rgba(72, 128, 255, 1)"
                                          }`,

                                          padding: "5px",
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "start",
                                          position: "relative",
                                          gap: "5px",
                                        }}
                                      >
                                        {data.isTamNgung && (
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
                                                WebkitTransform:
                                                  "rotate(-45deg)",
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
                                                  borderBottom:
                                                    "3px solid transparent",
                                                  borderTop:
                                                    "3px solid #a3362a",
                                                  content: "''",
                                                  position: "absolute",
                                                  top: "100%",
                                                  zIndex: -1,
                                                  borderLeft:
                                                    "3px solid #a3362a",
                                                  borderRight:
                                                    "3px solid transparent",
                                                  left: "0",
                                                },
                                                "&::after": {
                                                  right: "0",
                                                  borderLeft:
                                                    "3px solid transparent",
                                                  borderRight:
                                                    "3px solid #a3362a",
                                                  borderBottom:
                                                    "3px solid transparent",
                                                  borderTop:
                                                    "3px solid #a3362a",
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
                                          // component={Link}
                                          sx={{
                                            fontSize: "14px",
                                            color: "#037C7F",
                                            fontWeight: "700",
                                          }}
                                        >
                                          {data.tenMonHoc}
                                        </Typography>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "5px",
                                          }}
                                        >
                                          <Typography
                                            // component={Link}
                                            sx={{
                                              fontSize: "13px",
                                              fontWeight: "600",
                                              color: "black",
                                            }}
                                          >
                                            {data.maLopHocPhan}
                                          </Typography>
                                        </Box>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "5px",
                                          }}
                                        >
                                          <img
                                            src="./images/book-blank.svg"
                                            alt="time"
                                            style={{ color: "#008689" }}
                                          />
                                          <Typography
                                            sx={{
                                              fontSize: "13px",
                                              fontWeight: "600",
                                              color: "black",
                                            }}
                                          >
                                            Tiết:{""} {data.tuTiet} -{" "}
                                            {data.denTiet}
                                          </Typography>
                                        </Box>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "5px",
                                          }}
                                        >
                                          <img
                                            src="./images/clock-desk.svg"
                                            alt="time"
                                          />
                                          <Typography
                                            sx={{
                                              fontSize: "13px",
                                              fontWeight: "600",
                                              color: "black",
                                            }}
                                          >
                                            {formatTime(data.tuGio)} -{" "}
                                            {formatTime(data.denGio)}
                                          </Typography>
                                        </Box>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "5px",
                                          }}
                                        >
                                          <img
                                            src="./images/door-closed.svg"
                                            alt="phong"
                                          />
                                          <Typography
                                            sx={{
                                              fontSize: "13px",
                                              color: "black",
                                              fontWeight: "600",
                                            }}
                                          >
                                            Phòng: {data.tenPhong}
                                          </Typography>
                                        </Box>

                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "5px",
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              fontSize: "15px",
                                              fontWeight: "600",
                                              color: "#da1d2d",
                                              "&:hover": {
                                                color: "#037C7F",
                                                // transform:''
                                                transition: "all 0.3s ease",
                                              },
                                            }}
                                            target={"_blank"}
                                            to={data.link}
                                            component={Link}
                                          >
                                            Link Học liệu số
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  ))}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default Calendar;
