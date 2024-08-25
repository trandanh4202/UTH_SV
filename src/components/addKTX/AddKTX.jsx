/* eslint-disable react/prop-types */
import { ClearOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getInforDorm, registerDorm } from "../../features/dormSlice/DormSlice";

const selectStyles = {
  "&:focus": {
    borderRadius: "8px",
  },
  borderRadius: "8px",
  "& .MuiInputBase-input": {
    fontSize: "15px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "8px",
    border: "3px solid #0085885a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: { xs: "1px 14px", lg: "9px 14px" },
    transition: "all ease 0.4s",
  },
  "& .MuiSvgIcon-root": {
    color: "#0085885a",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0085885a",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0085885a",
  },
  "& .MuiSelect-select:focus": {
    borderRadius: "8px",
    borderColor: "#008588",
  },
};
const AddKTX = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [campusId, setCampusId] = useState("0");
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedPriorities((prev) => [...prev, value]);
    } else {
      setSelectedPriorities((prev) =>
        prev.filter((priority) => priority !== value)
      );
    }
  };
  const priority = useSelector(
    (state) => state.dorm.getInforDorm?.body?.objects
  );
  const campuses = useSelector(
    (state) => state.dorm.getInforDorm?.body?.campuses
  );

  const campusChange = (e) => {
    setCampusId(e.target.value);
  };

  useEffect(() => {
    if (open) {
      dispatch(getInforDorm());
    }
  }, [dispatch, open]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRegisterDorm = () => {
    const validObjectIds = selectedPriorities
      .map(Number)
      .filter((id) => !isNaN(id));

    // Tạo payload JSON
    const jsonPayload = JSON.stringify({
      campusId: parseInt(campusId, 10),
      objectIds: validObjectIds,
    });

    // Tạo FormData và thêm JSON vào như một Blob
    const formData = new FormData();
    formData.append(
      "form",
      new Blob([jsonPayload], { type: "application/json" })
    );

    // Thêm file vào FormData
    if (selectedFile) {
      formData.append("proof", selectedFile);
    }

    // Gửi FormData qua Redux action
    dispatch(registerDorm(formData));
  };

  const loading = useSelector((state) => state.dorm?.loading);
  const message = useSelector((state) => state.dorm?.message);
  const success = useSelector((state) => state.dorm?.success);
  const timestamp = useSelector((state) => state.dorm?.timestamp);
  useEffect(() => {
    if (!loading && timestamp) {
      if (message && success) {
        toast.success(message);
      } else if (!success) {
        toast.error(message);
        setSelectedFile(null);
      }
    }
  }, [loading, message, success, timestamp]);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            padding: { xs: "10px", lg: "20px" },
            borderRadius: "20px",
            width: { lg: "40%", xs: "100%" },
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              color: "black",
              fontWeight: "600",
              fontSize: "20px",
              marginBottom: { xs: "5px", lg: "15px" },
            }}
          >
            Thông tin đăng ký Ký túc xá
          </Typography>
          <Box
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
            }}
            onClick={onClose}
          >
            <IconButton
              sx={{
                backgroundColor: "#ff00001f",
              }}
            >
              <ClearOutlined
                sx={{
                  color: "red",
                }}
              />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  flexDirection: { xs: "column", lg: "row" },
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      textAlign: "center",
                      fontSize: "15px",
                    }}
                  >
                    Đối tượng ưu tiên xem xét duyệt:
                  </Typography>
                  <FormGroup
                    sx={{
                      "& .MuiFormControlLabel-root": {
                        display: "flex",
                        marginBottom: "2px",
                        alignItems: "center",
                      },
                    }}
                  >
                    {priority?.map((item) => (
                      <FormControlLabel
                        key={item.id}
                        control={
                          <Checkbox
                            id={`checkbox-${item.id}`}
                            checked={selectedPriorities.includes(
                              String(item.id)
                            )}
                            onChange={handleCheckboxChange}
                            name={item.name}
                            value={item.id}
                          />
                        }
                        label={item.name}
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: { xs: "11px", lg: "15px" }, // Kích thước chữ cho Label
                          },

                          marginBottom: "10px", // Giãn cách dưới mỗi checkbox
                          "& span.Mui-checked": {
                            color: "red",
                          },
                          "&x.MuiFormControlLabel-root": {
                            display: "block",
                          },
                          // justifyContent: "center",
                          // alignItems: "start",
                        }}
                      />
                    ))}
                  </FormGroup>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  // justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Typography
                  sx={{
                    color: "#333333",
                    fontWeight: "700",
                    fontSize: {
                      xs: "11px",
                      lg: "16px",
                    },
                  }}
                >
                  Chọn cơ sở
                </Typography>
                <Select
                  value={campusId}
                  onChange={campusChange}
                  displayEmpty
                  sx={selectStyles}
                  defaultValue="0"
                >
                  <MenuItem value="0" disabled>
                    Chọn cơ sở
                  </MenuItem>

                  {campuses?.map((campus, index) => (
                    <MenuItem
                      key={campus.id}
                      value={campus.id}
                      index={index}
                      sx={{ fontSize: "15px" }}
                    >
                      {campus.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#333333",
                    fontWeight: "700",
                    fontSize: {
                      xs: "11px",
                      lg: "16px",
                    },
                  }}
                >
                  Sinh viên tải minh chứng đối tượng ưu tiên tương ứng
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <TextField
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      "& .MuiInputBase-input": {
                        fontSize: { xs: "11px", lg: "15px" },
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "8px",
                        border: "3px solid #0085885a",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "all ease 0.4s",
                        padding: { xs: "7px 14px", lg: "9px 14px" },

                        "&:hover": {
                          borderColor: "#008588",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "green",
                        backgroundSize: "cover",
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "5px",
                  margin: "10px 0",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: "#333333",
                    fontWeight: "700",
                    fontSize: {
                      xs: "11px",
                      lg: "16px",
                    },
                    textAlign: "center",
                  }}
                >
                  Cơ sở Ký túc xá
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} lg={6}>
                    <Typography
                      component={Link}
                      to="https://maps.app.goo.gl/8EDsaSgKmqXZFCqF6"
                      target="_blank"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: { xs: "11px", lg: "15px" },
                        color: "#008588",
                        borderRadius: "8px",
                        border: "3px solid #0085885a",
                        transition: "all ease 0.4s",
                        padding: { xs: "3px 14px", lg: "9px 14px" },
                        "&:hover": {
                          borderColor: "#008689",
                          backgroundColor: "white",
                          color: "red",
                          boxShadow: "0 0 10px #008689",
                        },
                      }}
                    >
                      Cơ sở 2 - KTX: Số 10, Đường số 12, KP3, P. An Khánh, TP.
                      Thủ Đức, TP. HCM
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography
                      component={Link}
                      target="_blank"
                      to="https://maps.app.goo.gl/vmQMjHXWWb5xgKQF9"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: { xs: "11px", lg: "15px" },
                        color: "#008588",
                        borderRadius: "8px",
                        border: "3px solid #0085885a",
                        transition: "all ease 0.4s",
                        padding: { xs: "3px 14px", lg: "9px 14px" },
                        "&:hover": {
                          borderColor: "#008689",
                          backgroundColor: "white",
                          color: "red",
                          boxShadow: "0 0 10px #008689",
                        },
                      }}
                    >
                      Cơ sở 3 - KTX: Số 70, Đường Tô Ký, P. Tân Chánh Hiệp, Q.
                      12, TP. HCM
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Button
              onClick={handleRegisterDorm}
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "15px",
                backgroundColor: "#008588",
                color: "white",
                borderRadius: "8px",
                border: "3px solid #0085885a",
                transition: "all ease 0.4s",
                padding: { xs: "3px 14px", lg: "9px 14px" },

                "&:hover": {
                  borderColor: "#008689",
                  backgroundColor: "white",
                  color: "#008689",
                  boxShadow: "0 0 10px #008689",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "11px", lg: "15px" },
                  fontWeight: "700px",
                }}
              >
                Đăng ký Ký túc xá
              </Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddKTX;
