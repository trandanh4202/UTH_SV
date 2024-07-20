import { useEffect, useMemo } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getLearningProgress } from "~/features/profileSlice/ProfileSlice";

const LearningProgress = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLearningProgress());
  }, [dispatch]);

  const learningProgress = useSelector(
    (state) => state.profile?.learningProgress
  );

  const innerData = useMemo(() => {
    if (!learningProgress) return {};

    return {
      labels: "",
      datasets: [
        {
          label: ["Tổng số tín chỉ"],
          data: [learningProgress.canDat, 0],
          backgroundColor: ["rgba(44, 175, 254,0.85)"],
        },
        {
          label: ["Tín chỉ tích luỹ"],
          data: [
            learningProgress.hienTai,
            learningProgress.canDat - learningProgress.hienTai,
          ],
          backgroundColor: ["rgba(0, 226, 114,0.8)", "rgba(0, 0, 0, 0.1)"],
        },
      ],
    };
  }, [learningProgress]);

  const innerOptions = useMemo(() => {
    return {
      plugins: {
        legend: {
          display: false,
        },
      },
      cutout: "60%", // Adjust the cutout radius percentage here
      responsive: true,
      elements: {
        arc: {
          borderWidth: 0, // Adjust the thickness of the outer circle (doughnut ring)
        },
      },
    };
  }, []);

  if (!learningProgress) {
    return (
      <Paper
        sx={{
          padding: "10px",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        elevation={3}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#008689",
          }}
        >
          Tiến độ học tập
        </Typography>
        <Divider sx={{ width: "100%", margin: "10px 0 " }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
            Đang tải...
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        padding: "10px",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      elevation={3}
    >
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "700",
          color: "#008689",
        }}
      >
        Tiến độ học tập
      </Typography>
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
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Đã đạt: {learningProgress.hienTai}/{learningProgress.canDat}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default LearningProgress;
