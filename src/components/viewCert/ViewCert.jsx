import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFile,
  getXTNDetail,
} from "../../features/graduationAdminSlice/GraduationAdminSlice";
import { Visibility } from "@mui/icons-material";
import Spinner from "../Spinner/Spinner";
import { format } from "date-fns";
import ViewCertAdmin from "./ViewCertAdmin";

const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle null or undefined dateString
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid date strings
  return format(date, "dd/MM/yyyy");
};
const tableCellBody = {
  border: "1px solid rgb(221, 221, 221)",
  color: "rgb(102, 117, 128)",
  fontSize: "14px",
  fontWeight: "500",
  textAlign: "center",
};
const CustomTable = ({ columns, rows, renderRow, loading }) => {
  const tableCellStyle = {
    fontWeight: "700",
    border: "1px solid rgba(224, 224, 224, 1)",
    fontSize: { xs: "13px", lg: "15px" },
    textAlign: "center",
    backgroundColor: "#008689", // Màu nền cho header
    color: "white",
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} sx={tableCellStyle}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {loading ? (
          <Spinner />
        ) : (
          <TableBody>
            {rows?.map((row, index) => renderRow(row, index))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};
const Viewcert = ({ open, onClose, id }) => {
  const [certInfo, setCertInfo] = useState(null);
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (open && id) {
      // Gọi API để lấy thông tin chứng chỉ
      dispatch(getXTNDetail(id));
    }
  }, [dispatch, open, id]);
  const file = useSelector((state) => state.graduation?.getFileCert);
  const loading = useSelector((state) => state.graduation?.loading);
  const certUpdated = useSelector(
    (state) => state.graduationAdmin.getXTNDetail?.body?.chungChi
  );
  const columnsCert = [
    "STT",
    "Tên chứng chỉ",
    "Trạng thái",
    "Ngày cấp",
    "Người cấp",
    "Số hiệu",
    "Số vào sổ",
    "Nơi cấp",
    "Số seri",
    "Xem chi tiết",
  ];
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [selectedCertId, setSelectedCertId] = useState(null);
  const handleOpenCertModal = (id) => {
    setSelectedCertId(id); // Lưu id của phiếu đăng ký thành công
    setOpenModalDetail(true); // Mở modal
  };

  const handleCloseModal = () => {
    setOpenModalDetail(false); // Đóng modal
    setSelectedCertId(null); // Xóa id khi đóng modal
  };
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Thông tin chứng chỉ</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              margin: "15px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
                sx={{ color: "#008588", fontWeight: "700", fontSize: "20px" }}
              >
                Chứng chỉ đã nộp
              </Typography>
            </Box>
          </Box>
          <CustomTable
            columns={columnsCert}
            rows={certUpdated}
            loading={loading}
            renderRow={(cert, index) => (
              <TableRow key={index}>
                <TableCell sx={tableCellBody}>{index + 1}</TableCell>
                <TableCell sx={tableCellBody}>{cert.tenChungChi}</TableCell>
                <TableCell sx={tableCellBody}>
                  {cert.isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}
                </TableCell>

                <TableCell sx={tableCellBody}>
                  {formatDate(cert.ngayCap)}
                </TableCell>
                <TableCell sx={tableCellBody}>{cert.nguoiCap}</TableCell>
                <TableCell sx={tableCellBody}>{cert.soHieu}</TableCell>
                <TableCell sx={tableCellBody}>{cert.soVaoSo}</TableCell>
                <TableCell sx={tableCellBody}>{cert.noiCap}</TableCell>
                <TableCell sx={tableCellBody}>{cert.soSeri}</TableCell>
                <TableCell sx={tableCellBody}>
                  {cert.isCompleted ? (
                    ""
                  ) : (
                    <IconButton
                      onClick={() => handleOpenCertModal(cert.fileId)}
                    >
                      <Visibility />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            )}
          />
        </DialogContent>
      </Dialog>
      <ViewCertAdmin
        open={openModalDetail}
        onClose={handleCloseModal}
        certId={selectedCertId}
      />
    </>
  );
};

export default Viewcert;
