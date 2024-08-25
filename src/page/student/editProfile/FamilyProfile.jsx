import { ModeEdit } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddFamily from "../../../components/addFamily/AddFamily";
import EditFamily from "../../../components/editFamily/EditFamily";
import {
  deleteFamily,
  getFamily,
} from "../../../features/familySlice/FamilySlice";
import { getNation } from "../../../features/nationSlice/NationSlice";
import { getReligion } from "../../../features/religionSlice/ReligionSlice";

const FamilyProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFamily());
    dispatch(getNation());
    dispatch(getReligion());
  }, [dispatch]);

  const family = useSelector((state) => state.family.family);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleModalOpenEdit = (member) => {
    setSelectedMember(member);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleModalOpenAdd = () => {
    setSelectedMember(null);
    setAddMode(true);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedMember(null);
    setEditMode(false);
    setAddMode(false);
  };

  const removeFamilyMember = (id) => {
    dispatch(deleteFamily({ id }));
  };

  const handleChange = (id, field, value) => {};
  const successAccess = useSelector(
    (state) => state.profile.getCheckUpdateProfile?.success
  );
  const message = useSelector(
    (state) => state.profile.getCheckUpdateProfile?.message
  );
  return (
    <>
      <Box>
        <Box>
          <Typography
            sx={{
              fontSize: "13px",
              color: "red",
              fontWeight: "600",
            }}
          >
            {message}
          </Typography>
        </Box>
        {family.map((member) => (
          <Paper
            key={member.id}
            elevation={8}
            sx={{ position: "relative", marginBottom: 2, borderRadius: "8px" }}
          >
            <IconButton
              onClick={() => removeFamilyMember(member.id)}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "red",
              }}
              disabled={!successAccess}
            >
              <CloseIcon
                sx={{
                  fontSize: "30px",
                }}
              />
            </IconButton>
            <IconButton
              onClick={() => handleModalOpenEdit(member)}
              sx={{
                position: "absolute",
                top: 50,
                right: 10,
                color: "red",
              }}
              disabled={!successAccess}
            >
              <ModeEdit
                sx={{
                  fontSize: "30px",
                }}
              />
            </IconButton>

            <Box sx={{ padding: { lg: "10px 20px", xs: "5px 10px" } }}>
              <Grid
                container
                spacing={{ xs: 2, lg: 3 }} // Adjust spacing based on screen size
              >
                <Grid item xs={6} lg={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Mối quan hệ
                    </Typography>
                    <TextField
                      name={`${member.id}`}
                      value={member.quanHe || ""}
                      onChange={(e) =>
                        handleChange(member.id, "quanHe", e.target.value)
                      }
                      sx={inputStyles}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={3}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Họ tên
                    </Typography>
                    <TextField
                      name={`${member.id}`}
                      value={member.hoTen || ""}
                      onChange={(e) =>
                        handleChange(member.id, "hoTen", e.target.value)
                      }
                      sx={inputStyles}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} lg={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Năm sinh
                    </Typography>
                    <TextField
                      name={`${member.id}`}
                      value={member.namSinh || ""}
                      onChange={(e) =>
                        handleChange(member.id, "namSinh", e.target.value)
                      }
                      sx={inputStyles}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} lg={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Quốc tịch
                    </Typography>
                    <TextField
                      name={`${member.id}`}
                      value={member.quocTich || ""}
                      onChange={(e) =>
                        handleChange(member.id, "quocTich", e.target.value)
                      }
                      sx={inputStyles}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} lg={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Dân tộc
                    </Typography>
                    <TextField
                      name={`${member.id}`}
                      value={member.danToc || ""}
                      onChange={(e) =>
                        handleChange(member.id, "namSinh", e.target.value)
                      }
                      sx={inputStyles}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} lg={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Tôn giáo
                    </Typography>
                    <TextField
                      name={`${member.id}`}
                      value={member.tonGiao || ""}
                      onChange={(e) =>
                        handleChange(member.id, "namSinh", e.target.value)
                      }
                      sx={inputStyles}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6} lg={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Nghề nghiệp
                    </Typography>
                    <TextField
                      name={`${member.id}`}
                      value={member.ngheNghiep || ""}
                      onChange={(e) =>
                        handleChange(member.id, "ngheNghiep", e.target.value)
                      }
                      sx={inputStyles}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6} lg={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Số điện thoại
                    </Typography>
                    <TextField
                      name={`${member.id}`}
                      value={member.soDienThoai || ""}
                      onChange={(e) =>
                        handleChange(member.id, "soDienThoai", e.target.value)
                      }
                      sx={inputStyles}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Địa chỉ hộ khẩu
                    </Typography>
                    <TextField
                      name={`${member.id}`}
                      value={member.hoKhau || ""}
                      onChange={(e) =>
                        handleChange(member.id, "hoKhau", e.target.value)
                      }
                      sx={inputStyles}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
                      Địa chỉ liên lạc
                    </Typography>
                    <TextField
                      name={`${member.id}`}
                      value={member.hienNay || ""}
                      onChange={(e) =>
                        handleChange(member.id, "hienNay", e.target.value)
                      }
                      sx={inputStyles}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        ))}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={handleModalOpenAdd}
            disabled={!successAccess}
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
              padding: "9px 14px",
              "&:hover": {
                borderColor: "#008689",
                backgroundColor: "white",
                color: "#008689",
                boxShadow: "0 0 10px #008689",
              },
            }}
          >
            Thêm quan hệ
          </Button>
          {/* <Button
            variant="contained"
            onClick={handleSave}
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
              padding: "9px 14px",
              "&:hover": {
                borderColor: "#008689",
                backgroundColor: "white",
                color: "#008689",
                boxShadow: "0 0 10px #008689",
              },
            }}
          >
            Lưu
          </Button> */}
        </Box>
      </Box>
      <AddFamily open={modalOpen && addMode} onClose={handleModalClose} />

      <EditFamily
        open={modalOpen && editMode}
        onClose={handleModalClose}
        editData={selectedMember}
        isEditMode={editMode}
      />
    </>
  );
};

export default FamilyProfile;

const inputStyles = {
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
    padding: "9px 14px",

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
};

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
    transition: "all ease 0.4s",
    padding: "9px 14px",
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
