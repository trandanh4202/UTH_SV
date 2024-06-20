import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
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

import ChartDataLabels from "chartjs-plugin-datalabels";
import { useState } from "react";
const data = {
  labels: ["Môn 1", "Môn 2", "Môn 3", "Môn 4", "Môn 5"],
  datasets: [
    {
      type: "line",
      label: "Điểm tổng trung bình của lớp",
      data: [10, 7, 8, 8, 6.5],
      backgroundColor: "rgb(253, 205, 86)",
      borderColor: "rgb(253, 205, 86)",
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      datalabels: {
        display: false,
        align: "end",
        anchor: "end",
        color: "rgb(253, 205, 86)",
        font: {
          weight: "bold",
        },
      },
    },
    {
      type: "bar",
      label: "Điểm tổng kết môn của bạn",
      data: [8, 7.5, 9, 8.5, 7],
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
    padding: {
      top: 4,
    },
  },

  scales: {
    y: {
      max: 10, // Giới hạn trục y từ 0 đến 12
    },
  },
  // height: 400, // Thiết lập chiều cao của biểu đồ (vd: 400 pixel)
};
const LearningResults = () => {
  const [semester, setSemester] = useState("");

  const handleChange = (event) => {
    setSemester(event.target.value);
  };
  return (
    <Box component={Paper} sx={{ padding: "10px", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "700",
              color: "rgb(102, 117, 128)",
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
                  padding: "10px",
                },
              }}
            >
              <MenuItem value="" disabled>
                Chọn học kỳ
              </MenuItem>
              <MenuItem value="semester1" sx={{ fontSize: "13px" }}>
                Học kỳ 1 năm học 2023 - 2024
              </MenuItem>
              <MenuItem value="semester2" sx={{ fontSize: "13px" }}>
                Học kỳ 2 năm học 2023 - 2024
              </MenuItem>
              <MenuItem value="summerSemester" sx={{ fontSize: "13px" }}>
                Học kỳ hè năm học 2023 - 2024
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Divider />
      <Bar data={data} plugins={[ChartDataLabels]} options={options} />
    </Box>
  );
};

export default LearningResults;
