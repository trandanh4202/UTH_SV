import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Container,
  Divider,
  Grid,
  Pagination,
  Paper,
  Tab,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { format, differenceInDays } from "date-fns";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getCategoryNoti,
  getNewfeeds,
} from "../../features/notificationSlice/NotificationSlice";

const formatDate = (dateString) => {
  if (!dateString) return "";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const isNewArticle = (dateString) => {
  if (!dateString) return false;
  const articleDate = new Date(dateString);
  const currentDate = new Date();
  return differenceInDays(currentDate, articleDate) <= 7;
};

const Newfeeds = () => {
  const { id: urlId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryNoti());
  }, [dispatch]);

  const categoryTab = useSelector((state) => state.notification.category);
  const newfeedsResponse = useSelector((state) => state.notification.newfeeds);
  const newfeeds = newfeedsResponse.content || [];
  const totalPagesFromApi = newfeedsResponse.totalPages || 1;

  const [selectedTab, setSelectedTab] = useState(urlId || "368");
  const [page, setPage] = useState(1); // Bắt đầu từ 1 để phù hợp với API
  const [pageSize, setPageSize] = useState(10); // Kích thước trang mặc định

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    setPage(1); // Reset lại page về 1 khi chuyển tab
    navigate(`/newfeeds/${newValue}`);
  };

  useEffect(() => {
    // Cập nhật newfeeds khi selectedTab, page hoặc pageSize thay đổi
    dispatch(getNewfeeds({ id: selectedTab, page: page, size: pageSize }));
  }, [dispatch, selectedTab, page, pageSize]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage); // Cập nhật page khi chuyển trang
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10)); // Cập nhật pageSize khi thay đổi lựa chọn
  };

  if (!categoryTab || newfeeds.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <Container>
        <TabContext value={selectedTab}>
          <Paper
            elevation={4}
            sx={{
              borderRadius: "15px",

              padding: "5px 0 15px 5px",
            }}
          >
            <Box
              sx={{
                borderRadius: "15px",
              }}
            >
              <TabList
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                indicatorColor="secondary"
                textColor="primary"
                sx={{
                  "& .MuiTabs-scrollButtons.Mui-disabled": { opacity: 0.3 },
                  "& .MuiTabs-scrollButtons": {
                    "&.Mui-disabled": {
                      color: "rgba(0, 0, 0, 0.26)",
                    },
                    "& .MuiSvgIcon-root": {
                      height: "3rem",
                      width: "3rem",
                    },
                    color: "#333333",
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#da1d2d",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#008689",
                  },
                }}
              >
                {categoryTab.map((item) => (
                  <Tab
                    key={item.id}
                    sx={{
                      fontSize: "17px",
                      fontWeight: "500",
                      "&.Mui-selected": {
                        color: "#008689",
                        fontWeight: "800",
                      },
                    }}
                    label={item.tenDanhMuc}
                    value={item.id.toString()}
                  />
                ))}
              </TabList>

              <TabPanel
                value={selectedTab}
                sx={{
                  padding: "10px 40px",
                  overflowY: "auto",
                  maxHeight: "515px",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#008689",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#008950",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f1f1f1",
                  },
                }}
              >
                {newfeeds.map((item) => (
                  <Box key={item.id}>
                    <Grid container spacing={1} sx={{ padding: "10px 20px" }}>
                      <Grid item xs={12}>
                        <Grid
                          container
                          component={Link}
                          to={`/newfeeds/${item.id}`}
                          sx={{
                            display: "flex",
                          }}
                        >
                          <Grid item lg={2} xs={12}>
                            <Box>
                              <img
                                src="../images/news.png"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </Box>
                          </Grid>
                          <Grid item lg={10} xs={12}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                paddingBottom: "10px",
                              }}
                            >
                              <Typography
                                variant="h4"
                                sx={{
                                  color: "#008689",
                                  fontWeight: "600",
                                  fontSize: "16px",
                                }}
                              >
                                {item.tieuDe}
                              </Typography>
                              {isNewArticle(item.ngayHienThi) && (
                                <Box
                                  component="span"
                                  sx={{
                                    marginLeft: "10px",
                                    "&::after": {
                                      content: "''",
                                      display: "inline-block",
                                      width: "10px",
                                      height: "10px",
                                      borderRadius: "50%",
                                      backgroundColor: "red",
                                      marginLeft: "5px",
                                    },
                                  }}
                                />
                              )}
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: "5px",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                }}
                              >
                                {formatDate(item.ngayHienThi)}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "red",
                                }}
                              >
                                Xem chi tiết
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 1 }} />
                  </Box>
                ))}

                {/* Pagination */}
              </TabPanel>
            </Box>
            <Box
              sx={{
                textAlign: "center",
                marginTop: "20px",
                borderTop: "1px solid #212A37",
                padding: "5px",
              }}
            >
              <Pagination
                count={totalPagesFromApi}
                page={page}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
                sx={{
                  "& .MuiPagination-ul .Mui-selected": {
                    backgroundColor: "#008689",
                    color: "white",
                    fontWeight: "600",
                  },
                  "& .MuiPagination-ul button": {
                    color: "#333333",
                    fontSize: "15px",
                    fontWeight: "500",
                  },
                  "& .MuiPagination-ul button svg": {
                    width: "25px",
                    height: "25px",
                  },
                }}
              />
            </Box>
          </Paper>
        </TabContext>
      </Container>
    </Box>
  );
};

export default Newfeeds;
