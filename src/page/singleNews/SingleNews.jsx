import { Box, Container, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNewfeedsById } from "../../features/notificationSlice/NotificationSlice";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const formatDate = (dateString) => {
  if (!dateString) return "";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const SingleNews = () => {
  const { articleId } = useParams(); // Retrieve articleId from URL params
  const dispatch = useDispatch();

  useEffect(() => {
    if (articleId) {
      dispatch(getNewfeedsById({ articleId }));
    }
  }, [dispatch, articleId]); // Fetch data when articleId changes

  const content = useSelector((state) => state.notification?.content);

  if (!content) {
    return null; // or a loading spinner/message
  }

  return (
    <Container>
      <Paper sx={{ padding: "20px" }}>
        <Container >
          <Box mb={2}>
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "600",
              }}
            >
              {content.tieuDe}
            </Typography>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Đã được đăng vào ngày: {formatDate(content.ngayHienThi)}
            </Typography>
          </Box>
          <Box
            dangerouslySetInnerHTML={{ __html: content.noiDung }}
            sx={{
              fontSize: "18px",
            }}
          />
          {/* Render HTML content safely */}
        </Container>
      </Paper>
    </Container>
  );
};

export default SingleNews;
