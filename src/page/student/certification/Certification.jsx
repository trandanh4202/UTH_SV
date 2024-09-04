/* eslint-disable react/jsx-key */
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCertification } from "../../../features/certificationSlice/CertificationSlice";
import { useNavigate } from "react-router-dom";
import { getCheckCourse } from "../../../features/profileSlice/ProfileSlice";

const Certification = () => {
  const dispatch = useDispatch();
  // const courses = useSelector((state) => state.profile.profile.body?.khoaHoc);
  const navigate = useNavigate();
  const isCheck = useSelector((state) => state.profile.getCheckCourse?.body);

  useEffect(() => {
    if (!isCheck) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 500); // Thời gian chờ là 1 giây
    }
  }, [navigate, isCheck]);
  useEffect(() => {
    dispatch(getCertification());
    dispatch(getCheckCourse());
  }, [dispatch]);
  const certification = useSelector(
    (state) => state.certification.certification
  );

  return (
    <Box>
      <Box>
        <Typography
          sx={{
            fontSize: "15px",
            color: "red",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Các loại giấy cấp cho sinh viên đang được cập nhật thêm tới khi đầy
          đủ, sinh viên theo dõi sau
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          gap: "50px",
          marginTop: "50px",
          flexDirection: { lg: "row", xs: "column" },
        }}
      >
        {certification?.map((c) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Box>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: { xs: "13px", lg: "20px" },
                  fontWeight: "600",
                  whiteSpace: "2",
                  backgroundColor: "#008689",
                  color: "white",
                  boxShadow: "0 0 10px #008689",
                  padding: { xs: "3px", lg: "5px" },
                }}
              >
                {c.name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={c.base64}
                alt={c.name}
                style={{
                  width: "60%",
                  height: "60%",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Certification;
