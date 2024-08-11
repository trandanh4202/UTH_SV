import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { uploadAvatar } from "../../../features/profileSlice/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AvatarInfo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const studentPhoto = useSelector(
    (state) => state.profile.profile.body?.image
  ); // Lấy ảnh hiện tại từ Redux store

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);

  const handleUpload = () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    dispatch(uploadAvatar(formData));
    setIsAvatarChanged(true);
  };

  const status = useSelector((state) => state.profile.avatar?.status);
  const message = useSelector((state) => state.profile.avatar?.message);

  useEffect(() => {
    if (isAvatarChanged && message) {
      if (status === 200) {
        toast.success(message);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (status === 400) {
        toast.error(message);
      }
      setIsAvatarChanged(false);
    }
  }, [isAvatarChanged, message, status]);

  return (
    <Box
      sx={{
        padding: "10px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
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
              ẢNH HIỆN TẠI
            </Typography>
          </Box>
          <Box>
            {studentPhoto ? (
              <img
                src={studentPhoto}
                alt="Current Student Photo"
                width="200"
                style={{
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  maxHeight: "400px",
                }}
              />
            ) : (
              <Typography
                sx={{
                  textAlign: "center",
                }}
              >
                Không có ảnh hiện tại
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
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
              ẢNH CẬP NHẬT
            </Typography>
          </Box>
          <Box>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  marginBottom: "20px",
                  textAlign: "center",
                  width: "100%",
                  maxHeight: "400px",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} lg={6}></Grid>
        <Grid item xs={12} lg={6}>
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
      <Grid container>
        <Grid item xs={12} lg={6}></Grid>
        <Grid item xs={12} lg={6}>
          <Button
            variant="contained"
            onClick={handleUpload}
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
            CẬP NHẬT
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AvatarInfo;
