/* eslint-disable react/jsx-key */
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCertification } from "../../../features/certificationSlice/CertificationSlice";
import { useNavigate } from "react-router-dom";

const Certification = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.profile.profile.body?.khoaHoc);
  console.log(courses);
  const navigate = useNavigate();
  useEffect(() => {
    if (courses !== 2024) {
      navigate("/dashboard");
    }
  }, [navigate, courses]);
  useEffect(() => {
    dispatch(getCertification());
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
          alignItems: "center",
          justifyContent: "center",
          gap: "50px",
          marginTop: "50px",
        }}
      >
        {certification?.map((c) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "600",
                  whiteSpace: "2",
                  backgroundColor: "#008689",
                  color: "white",
                  boxShadow: "0 0 10px #008689",
                  padding: "5px",
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
