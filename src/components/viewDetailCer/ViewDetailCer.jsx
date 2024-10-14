import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getFileCert } from "../../features/graduationSlice/GraduationSlice";
import { useDispatch, useSelector } from "react-redux";

const ViewDetailCer = ({ open, onClose, certId }) => {
  const [certInfo, setCertInfo] = useState(null);
  console.log(certId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (open && certId) {
      // Gọi API để lấy thông tin chứng chỉ
      dispatch(getFileCert(certId));
    }
  }, [dispatch, open, certId]);
  const file = useSelector((state) => state.graduation?.getFileCert);
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

export default ViewDetailCer;
