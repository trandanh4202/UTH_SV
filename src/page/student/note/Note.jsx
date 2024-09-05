import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNote } from "../../../features/notificationSlice/NotificationSlice";

const Note = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNote());
  }, [dispatch]);

  const note = useSelector((state) => state.notification?.getNote.body || []);

  return (
    <Container>
      <Paper
        elevation={14}
        sx={{
          borderRadius: "10px",
          padding: { xs: "5px", lg: "20px" },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            margin: "15px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Divider
              orientation="vertical"
              sx={{
                color: "red",
                border: "3px solid",
                height: "20px",
                marginRight: "5px",
              }}
            />
            <Typography
              sx={{ color: "#008588", fontWeight: "700", fontSize: "16px" }}
            >
              Ghi chú, nhắc nhở
            </Typography>
          </Box>
        </Box>
        <Box>
          {note.map((item, index) => (
            <Box key={index} sx={{ marginBottom: "10px" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "13px", lg: "17px" },
                }}
              >
                {index + 1}. {item.tieuDe}
              </Typography>
              <Typography
                sx={{
                  color: "#555",

                  fontSize: { xs: "11px", lg: "15px" },
                }}
              >
                {item.noiDung}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default Note;
