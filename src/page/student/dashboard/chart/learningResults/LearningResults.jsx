/* eslint-disable react/jsx-key */
import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLearningResults } from "~/features/profileSlice/ProfileSlice";

const options = {
  plugins: {
    tooltip: {
      callbacks: {
        title: (tooltipItems) => {
          return tooltipItems[0].label;
        },
        label: (tooltipItem) => {
          // const datasetIndex = tooltipItem.datasetIndex;
          const value = tooltipItem.raw;
          const label = tooltipItem.dataset.label;
          // const averageScore = data.datasets[1].data[tooltipItem.dataIndex];
          return [
            `${label}: ${value} điểm`,
            // `Điểm trung bình của lớp: ${averageScore} điểm`,
          ];
        },
      },
      displayColors: true,
    },

    legend: {
      position: "bottom",
      align: "center",
      labels: {
        padding: 10,
      },
    },
  },
  datalabels: {
    display: true,
    anchor: "end",
    align: "end",
    backgroundColor: "rgb(250, 108, 81)",
    borderRadius: 4,
    color: "white",
    formatter: (value) => {
      return value;
    },
    font: {
      weight: "bold",
    },
  },
  layout: {
    padding: 21,
  },
  scales: {
    x: {
      display: false, // Hide X axis labels
    },
    y: {
      ticks: {
        stepSize: 2,
        callback: (value) => {
          return value; // Display the ticks as they are (0, 2, 4, 6, 8)
        },
      },
      min: 0,
      max: 10,
    },
  },
  maintainAspectRatio: false,
};
const LearningResults = () => {
  const select = useSelector((state) => state.profile?.select);
  const [semester, setSemester] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (select.length > 0 && !semester) {
      setSemester(select[0].id);
    }
  }, [select, semester]);

  useEffect(() => {
    if (semester) {
      dispatch(getLearningResults({ semester }));
    }
  }, [dispatch, semester]);

  const handleChange = (event) => {
    setSemester(event.target.value);
  };

  const learningResults = useSelector(
    (state) => state.profile?.learningResults
  );
  const data = {
    labels: learningResults.map((result) => result.lopHocPhan),
    datasets: [
      // {
      //   type: "line",
      //   label: "Điểm tổng trung bình của lớp",
      //   data: learningResults.map((result) => result.classAverage),
      //   backgroundColor: "rgb(253, 205, 86)",
      //   borderColor: "rgb(253, 205, 86)",
      //   borderWidth: 2,
      //   fill: false,
      //   tension: 0.4,
      //   datalabels: {
      //     display: false,
      //     align: "end",
      //     anchor: "end",
      //     color: "rgb(253, 205, 86)",
      //     font: {
      //       weight: "bold",
      //     },
      //   },
      // },
      {
        type: "bar",
        label: "Điểm tổng kết môn của bạn",
        data: learningResults.map((result) => result.diemTongKet),
        backgroundColor: "rgb(250, 108, 81)",
        borderColor: "rgb(250, 108, 81)",
        borderWidth: 1,
        barPercentage: 0.5, // Điều chỉnh độ rộng của cột
        datalabels: {
          align: "end",
          anchor: "end",
          color: "rgb(250, 108, 81)",
          font: {
            weight: "bold",
          },
        },
      },
    ],
  };
  return (
    <Paper sx={{ padding: "10px", height: "100%" }} elevation={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", lg: "row" },
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
            Kết quả học tập
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
      </Box>
      <Divider sx={{ width: "100%", margin: "10px 0 " }} />
      <Box sx={{ height: "" }}>
        <Bar data={data} plugins={[ChartDataLabels]} options={options} />
      </Box>
    </Paper>
  );
};

export default LearningResults;
