import {
  ArrowBackIosNew,
  ArrowForwardIos,
  CalendarMonth,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
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
import React, { useState } from "react";
import { Link } from "react-router-dom";

const timetableData = {
  days: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
  dates: [
    "17/06/2024",
    "18/06/2024",
    "19/06/2024",
    "20/06/2024",
    "21/06/2024",
    "22/06/2024",
    "23/06/2024",
  ],
  slots: [
    { time: "Sáng", periods: ["Ca 1", "Ca 2"] },
    { time: "Chiều", periods: ["Ca 3", "Ca 4"] },
    { time: "Tối", periods: ["Ca 5", "Ca 6"] },
  ],
  data: [
    [null, null, null, null, null, null, null],
    [null, "Subject A", null, "Subject B", null, "Subject C", null],
    // Add more rows for other time slots
  ],
};

const Calendar = () => {
  const { days, dates, slots, data } = timetableData;
  const [currentDate, setCurrentDate] = useState(new Date());

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

  // Adjust the following rendering logic to display dates relative to `currentDate`
  return (
    <>
      <Container>
        <Box sx={{ marginBottom: "5px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              gap: "15px",
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
            <Button
              variant="outlined"
              onClick={handlePrevWeek}
              sx={{
                backgroundColor: "rgb(51, 181, 229)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgb(41, 161, 209)",
                },
                "& .MuiButton-label": {
                  display: "flex",
                  alignItems: "center",
                },
                gap: "10px",
              }}
            >
              <ArrowBackIosNew />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
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
                "& .MuiButton-label": {
                  display: "flex",
                  alignItems: "center",
                },
                gap: "10px",
              }}
            >
              <CalendarMonth />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
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
                "& .MuiButton-label": {
                  display: "flex",
                  alignItems: "center",
                },
                gap: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Tuần kế tiếp
              </Typography>
              <ArrowForwardIos />
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "rgb(51, 181, 229)" }}>
              <TableRow sx={{}}>
                <TableCell
                  sx={{
                    border: "1px solid rgba(224, 224, 224, 1)",
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "600",
                    textAlign: "center",
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
                    }}
                  >
                    {day}
                    <br />
                    {dates[index]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                border: "1px solid rgba(224, 224, 224, 1)",
              }}
            >
              {slots.map((slot, slotIndex) => (
                <React.Fragment key={slotIndex}>
                  <TableRow sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
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
                    <TableRow
                      key={periodIndex}
                      sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                    >
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
                      {data[periodIndex]?.map((subject, dayIndex) => (
                        <TableCell
                          key={dayIndex}
                          align="center"
                          sx={{
                            border: "1px solid rgba(224, 224, 224, 1)",
                            padding: "5px",
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: "rgb(51, 181, 229)",
                              padding: "5px",
                              display: "flex",
                              flexDirection: "column",
                              // justifyContent: "start",
                              alignItems: "start",
                            }}
                          >
                            <Typography
                              component={Link}
                              sx={{
                                fontSize: "14px",
                                color: "rgb(240,240,240)",
                                fontWeight: "700",
                              }}
                            >
                              English B2.3
                            </Typography>
                            <Typography
                              component={Link}
                              sx={{
                                fontSize: "13px",
                                color: "white",
                                fontWeight: "500",
                              }}
                            >
                              062303 - 062303163
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                color: "white",
                                fontWeight: "500",
                              }}
                            >
                              Tiết: 8 - 9
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                color: "white",
                                fontWeight: "500",
                              }}
                            >
                              Giờ: 13:00 - 14:40
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                color: "white",
                                fontWeight: "500",
                              }}
                            >
                              Phòng: C109
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                color: "white",
                                fontWeight: "500",
                              }}
                            >
                              GV:Trần Trọng Danh
                            </Typography>
                          </Box>
                        </TableCell>
                      ))}
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
