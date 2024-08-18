/* eslint-disable react/jsx-key */
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCertification } from "../../../features/certificationSlice/CertificationSlice";
import { useNavigate } from "react-router-dom";

const Certification = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.profile.profile.body?.khoaHoc);
  const navigate = useNavigate();
  useEffect(() => {
    if (courses !== "2024") {
      navigate("/dashboard");
    }
  }, [navigate, courses]);
  useEffect(() => {
    dispatch(getCertification());
  }, [dispatch]);
  const certification = useSelector(
    (state) => state.certification?.certification
  );

  return (
    <Box>
      <Box>
        <Typography
          sx={{
            fontSize: "15px",
            color: "red",
            fontWeight: "600",
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
            <Box>
              <img src={c.base64} alt={c.name} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Certification;
