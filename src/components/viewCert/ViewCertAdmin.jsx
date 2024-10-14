import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFile } from "../../features/graduationAdminSlice/GraduationAdminSlice";

const ViewCertAdmin = ({ open, onClose, certId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (open && certId) {
      // Gọi API để lấy thông tin chứng chỉ
      dispatch(getFile(certId));
    }
  }, [dispatch, open, certId]);

  const file = useSelector((state) => state.graduationAdmin.getFile?.body);
  const loading = useSelector((state) => state.graduation?.loading);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Thông tin chứng chỉ</DialogTitle>
      <DialogContent>
        {loading ? (
          <p>Đang tải...</p> // Hiển thị khi đang tải dữ liệu
        ) : (
          file && (
            <img
              src={file}
              alt="Chứng chỉ"
              style={{ width: "100%", height: "auto" }} // Điều chỉnh kích thước ảnh
            />
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewCertAdmin;
