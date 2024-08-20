/* eslint-disable no-dupe-else-if */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { getInforDorm, registerDorm } from "../../features/dormSlice/DormSlice";
import { categoryFamily } from "../../features/familySlice/FamilySlice";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    padding: "9px 14px",
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
  const [campusId, setCampusId] = useState("2");

  useEffect(() => {
    dispatch(categoryFamily());
  }, [dispatch]);

  const campusChange = (e) => {
    setCampusId(e.target.value);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (open) {
      dispatch(getInforDorm());
    }
  }, [dispatch, open]);
  const selectCampus = useSelector(
    (state) => state.dorm.getInforDorm?.body?.campuses
  );
  const priority = useSelector((state) => state.dorm.getInforDorm?.body);

  const handleRegisterDorm = () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    dispatch(registerDorm({ campusId, formData }));
  };
  const loading = useSelector((state) => state.dorm.loading);
  const registerDormMessage = useSelector(
    (state) => state.dorm.registerDormMessage?.message
  );
  const registerDormSuccess = useSelector(
    (state) => state.dorm.registerDormsuccess?.success
  );

  useEffect(() => {
    if (!loading && registerDormMessage) {
      if (registerDormMessage && registerDormSuccess) {
        toast.success(registerDormMessage);
      } else if (!registerDormSuccess) {
        toast.error(registerDormMessage);
      }
    }
  }, [loading, registerDormMessage, registerDormSuccess]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Modal open={open} onClose={onClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "20px",
              width: { lg: "40%", xs: "80%" },
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                marginBottom: "20px",
                color: "black",
                fontWeight: "600",
                fontSize: "20px",
              }}
            >
              Thông tin đăng ký Ký túc xá
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                margin: "40px 0",
              }}
            >
              <Grid container spacing={{ xs: 2, lg: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    width: "100%",
                    flexDirection: { xs: "column", lg: "row" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "15px",
                      }}
                    >
                      Đối tượng:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "red",
                      }}
                    >
                      {" "}
                      {priority && priority.doiTuong
                        ? priority.doiTuong
                        : "Không thuộc ĐTƯT"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "600",
                      }}
                    >
                      Đối tượng:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        color: "red",
                      }}
                    >
                      {priority && priority.khuVuc
                        ? priority.khuVuc
                        : "Không thuộc KVƯT"}
                    </Typography>
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

                    {selectCampus?.map((campus, index) => (
                      <MenuItem
                        key={campus.id}
                        value={campus.id}
                        index={index}
                        sx={{ fontSize: "13px" }}
                      >
                        {campus.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <Grid item xs={12} lg={12}>
                  <TextField
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginBottom: "20px" }}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      "& .MuiInputBase-input": {
                        fontSize: "15px",
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "8px",
                        border: "3px solid #0085885a",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "all ease 0.4s",

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
                </Grid>
              </Grid>
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
                  "&:hover": {
                    borderColor: "#008689",
                    backgroundColor: "white",
                    color: "#008689",
                    boxShadow: "0 0 10px #008689",
                  },
                }}
              >
                Đăng ký Ký túc xá
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default AddKTX;
