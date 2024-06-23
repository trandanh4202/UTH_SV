import { Box, Divider, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getLearningProgress } from "../../../../features/profileSlice/ProfileSlice";

const LearningProgress = () => {
  const learningProgress = useSelector(
    (state) => state.profile.learningProgress
  );

  console.log(learningProgress);
  const dispatch = useDispatch();
  useEffect(() => dispatch(getLearningProgress()), [dispatch]);
  const innerData = {
    labels: "",
    datasets: [
      {
        label: ["Tổng số tín chỉ "],
        data: [
          learningProgress.canDat,
          learningProgress.canDat - learningProgress.canDat,
        ],
        backgroundColor: ["rgb(255, 99, 132)", "rgba(0, 0, 0, 0.1)"],
      },
      {
        label: ["Tín chỉ tích luỹ"],
        data: [
          learningProgress.hienTai,
          learningProgress.canDat - learningProgress.hienTai,
        ],
        backgroundColor: ["rgb(255, 99, 132)", "rgba(0, 0, 0, 0.1)"],
      },
    ],
  };

  const innerOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "70%", // Khoảng cách giữa 2 vòng tròn
    responsive: true,
  };
  return (
    <Box
      component={Paper}
      sx={{
        padding: "10px",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ textAlign: "left", width: "100%" }}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "700",
            color: "rgb(102, 117, 128)",
          }}
        >
          Tiến độ học tập
        </Typography>
      </Box>
      <Divider sx={{ width: "100%", margin: "10px 0 " }} />
      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
        <Doughnut data={innerData} options={innerOptions} />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography
            style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}
          >
            {learningProgress.canDat}
          </Typography>
          <Typography style={{ fontSize: 16 }}>Tổng số tín chỉ</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LearningProgress;
