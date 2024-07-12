/* eslint-disable react/prop-types */
import {
  Box,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelect } from "../../../features/profileSlice/ProfileSlice";
import TuitionTab from "./TuitionTab";
import {
  getTuitionFee,
  getTuitionOther,
} from "../../../features/tuitionSlice/TuitionSlice";
import TuitionOther from "./TuitionOther";

const TuitionTable = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [semester, setSemester] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleChange = (event) => {
    setSemester(event.target.value);
  };

  // Filter data into three arrays based on LoaiHocPhi

  const dispatch = useDispatch();
  const select = useSelector((state) => state.profile?.select);

  useEffect(() => {
    dispatch(getSelect());
    dispatch(getTuitionOther());
  }, [dispatch]);
  useEffect(() => {
    if (select.length > 0 && !semester) {
      setSemester(select[0]?.id);
    }
  }, [select, semester]);

  useEffect(() => {
    if (semester) {
      dispatch(getTuitionFee({ semester }));
    }
  }, [dispatch, semester]);
  const tuition = useSelector((state) => state.tuition);
  const { tuitionFee, tuitionOther } = tuition;

  return (
    <Box sx={{ padding: { xs: "0 10px 0", lg: "0 40px 0" } }}>
      <Paper sx={{ padding: "20px", borderRadius: "10px" }} elevation={4}>
        <Box>
          <Grid
            container
            sx={{
              margin: "15px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid item xs={12}>
              <Box
                sx={{ display: "flex", alignItems: "center", padding: "10px" }}
              >
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
                  sx={{ color: "#008689", fontWeight: "700", fontSize: "20px" }}
                >
                  Tra cứu công nợ
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <FormControl variant="outlined">
                  <Select
                    value={semester}
                    onChange={handleChange}
                    displayEmpty
                    sx={{
                      "& .MuiSelect-select": {
                        padding: "15px 25px",
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                      "& .MuiSvgIcon-root": {
                        width: "20px",
                        height: "20px",
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Chọn học kỳ
                    </MenuItem>
                    <MenuItem value="0" sx={{ fontSize: "18px" }}>
                      Tất cả
                    </MenuItem>
                    {select.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        sx={{ fontSize: "18px" }}
                      >
                        {item.tenDot}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            aria-label="tabs"
            // textColor="secondary"
            // indicatorColor="secondary"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#008689",
              },
            }}
          >
            <Tab
              sx={{
                fontSize: "17px",
                fontWeight: "600",
                "&.Mui-selected": {
                  backgroundColor: "#1D999D",
                  color: "white",
                },
              }}
              label="Học phí ngành"
            />

            <Tab
              sx={{
                fontSize: "18px",
                fontWeight: "700",
                "&.Mui-selected": {
                  backgroundColor: "#1D999D",
                  color: "white",
                },
              }}
              label="Học phí Khác"
            />
          </Tabs>
          {selectedTab === 0 && <TuitionTab data={tuitionFee} />}
          {selectedTab === 1 && <TuitionOther data={tuitionOther} />}
        </Box>
      </Paper>
    </Box>
  );
};

export default TuitionTable;
