/* eslint-disable react/jsx-key */
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCertification } from "../../../features/certificationSlice/CertificationSlice";

const Certification = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCertification());
  }, [dispatch]);
  const certification = useSelector(
    (state) => state.certification?.certification
  );
  return (
    <Box>
      {certification.map((c) => (
        <Box>
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
              TITLE
            </Typography>
          </Box>
          <Box>
            <img src="" alt="" />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Certification;
