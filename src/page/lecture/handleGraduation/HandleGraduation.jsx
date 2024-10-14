import { ChangeCircleOutlined, EditOutlined } from "@mui/icons-material";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useDebounce from "../../../components/hooks/UseDebounce";
import {
  approveXTN,
  getAdminDotXTN,
  getXTN,
  getXTNStatus,
} from "../../../features/graduationAdminSlice/GraduationAdminSlice";

import { format } from "date-fns";
import Viewcert from "../../../components/viewCert/ViewCert";

const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle null or undefined dateString
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid date strings
  return format(date, "dd/MM/yyyy");
};
const HandleGraduation = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10, // Số phần tử mỗi trang
    page: 0, // Trang bắt đầu
  });
  const [search, setSearch] = useState(""); // State cho giá trị tìm kiếm
  const dataSearch = useDebounce(search, 1000); // Debounce giá trị tìm kiếm
  const [selectedStatus, setSelectedStatus] = useState(1);
  const [selectedStatusApprove, setSelectedStatusApprove] = useState(1);

  const [id, setId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [note, setNote] = useState("");
  const [openStatusDialog, setOpenStatusDialog] = useState(false);

  const approve = useSelector(
    (state) => state.graduationAdmin.getXTN?.body || []
  );
  const statusGraduation = useSelector(
    (state) => state.graduationAdmin.getXTNStatus?.body || []
  );
  const totalElements = useSelector(
    (state) => state.order?.getAllAdmin?.body?.totalElements || 0
  );
  const link = useSelector((state) => state.order.printToShip?.body);

  const loading = useSelector((state) => state.graduationAdmin?.loading);
  const message = useSelector((state) => state.graduationAdmin?.message);
  const timestamp = useSelector((state) => state.graduationAdmin?.timestamp);
  const success = useSelector((state) => state.graduationAdmin?.success);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && timestamp) {
      if (message && success) {
        toast.success(message);
      } else if (!success) {
        toast.error(message);
      }
    }
  }, [loading, message, success, timestamp]);

  useEffect(() => {
    if (link) {
      window.open(link, "_blank");
    }
  }, [link]);

  const handleOpenDetailPopUp = (id) => {
    setId(id);
    setOpenModal(true);
  };

  const periodXTN = useSelector(
    (state) => state.graduationAdmin.getAdminDotXTN?.body
  );
  const [selectedGroup, setSelectedGroup] = useState(1);
  useEffect(() => {
    // Nếu danh sách đợt xét không rỗng, tự động chọn đợt xét đầu tiên
    if (periodXTN && periodXTN.length > 0) {
      setSelectedGroup(periodXTN[0].id); // Chọn đợt xét đầu tiên trong danh sách
    }
  }, [periodXTN]);
  const handleGroupChange = (event) => {
    const value = event.target.value;
    setSelectedGroup(value);
  };

  useEffect(() => {
    const formData = {
      pageIndex: paginationModel.page + 1, // Thêm 1 nếu API sử dụng index bắt đầu từ 1
      pageSize: paginationModel.pageSize,
      search: dataSearch, // Sử dụng giá trị tìm kiếm đã debounce
      statusId: selectedStatus,
      // groupId: selectedGroup,
      idDot: 59,
    };
    dispatch(getXTN(formData));
  }, [
    dispatch,
    paginationModel.page,
    paginationModel.pageSize,
    dataSearch,
    selectedStatus,
    selectedGroup,
  ]);

  useEffect(() => {
    dispatch(getAdminDotXTN());
    dispatch(getXTNStatus());
  }, [dispatch]);

  const rows = approve?.content?.map((item) => ({
    id: item.id,
    studentId: item.student?.code,
    name: item.student?.name,
    class: item.student?.className,
    ngaySinh: item.student?.ngaySinh,
    phoneNumber: item.student?.phone || "N/A",
    phoneNumber2: item?.phone,
    email: item.student?.email || "N/A",
    email2: item?.email,
    createdAt: item?.createdAt,
    status: item.status,
    updatedAt: item.updatedAt,
    reason: item.reason,
  }));

  // modal xem chi tiet phieu dang ky

  // Hàm xử lý thay đổi trang
  const handlePageChange = (event, newPage) => {
    setPaginationModel((prev) => ({ ...prev, page: newPage }));
  };

  // Hàm xử lý thay đổi số dòng trên mỗi trang
  const handlePageSizeChange = (event) => {
    setPaginationModel({
      pageSize: parseInt(event.target.value, 10),
      page: 0, // Reset về trang đầu khi thay đổi số dòng trên mỗi trang
    });
  };
  // chuyển trạng thái
  const handleOpenStatusDialog = (id) => {
    setId(id);
    setOpenStatusDialog(true);
  };
  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
    setSelectedStatusApprove(1);
    setNote("");
  };
  const handleConfirmChangeStatus = () => {
    const formData = {
      idTrangThai: selectedStatusApprove,
      note: note,
    };
    dispatch(approveXTN({ id, formData }));
    handleCloseStatusDialog();
  };

  return (
    <>
      <Container>
        <Paper
          elevation={4}
          sx={{ padding: "20px", borderRadius: "10px", mb: 2 }}
        >
          {/* Ô tìm kiếm */}

          <FormControl
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormLabel
              sx={{
                fontSize: "15px",
                fontWeight: "600",
                color: "red",
                "&.Mui-focused": { color: "red" },
              }}
            >
              Chọn trạng thái của danh sách
            </FormLabel>
            <RadioGroup
              aria-label="authMethod"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              row
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {statusGraduation?.map((status) => (
                <FormControlLabel
                  key={status.id}
                  value={status.id}
                  control={
                    <Radio
                      sx={{
                        width: 30,
                        height: 30,
                        "&.Mui-checked": { color: "#008689" },
                        "&.Mui-checked + .MuiFormControlLabel-label ": {
                          color: "#008689",
                          fontSize: "15px",
                          fontWeight: "700",
                        },
                      }}
                    />
                  }
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "15px",
                      color: "rgb(102, 117, 128)",
                      fontWeight: "500",
                    },
                  }}
                  label={status.name}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormLabel
              sx={{
                fontSize: "15px",
                fontWeight: "600",
                color: "red",
                "&.Mui-focused": { color: "red" },
              }}
            >
              Chọn đợt xét tốt nghiệp
            </FormLabel>
            <RadioGroup
              aria-label="campusMethod"
              value={selectedGroup}
              onChange={handleGroupChange}
              row
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {periodXTN?.map((gr) => (
                <FormControlLabel
                  key={gr.id}
                  value={gr.id}
                  control={
                    <Radio
                      sx={{
                        width: 30,
                        height: 30,
                        "&.Mui-checked": { color: "#008689" },
                        "&.Mui-checked + .MuiFormControlLabel-label ": {
                          color: "#008689",
                          fontSize: "15px",
                          fontWeight: "700",
                        },
                      }}
                    />
                  }
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "15px",
                      color: "rgb(102, 117, 128)",
                      fontWeight: "500",
                    },
                  }}
                  label={gr.tenDot}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <TextField
            label="Tìm kiếm"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </Paper>
      </Container>
      <Paper elevation={4} sx={{ padding: "20px", borderRadius: "10px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
                >
                  MSSV
                </TableCell>
                <TableCell
                  sx={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
                >
                  Họ và tên
                </TableCell>
                <TableCell
                  sx={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
                >
                  Lớp
                </TableCell>
                <TableCell
                  sx={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
                >
                  Ngày sinh
                </TableCell>
                <TableCell
                  sx={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
                >
                  Số điện thoại
                </TableCell>
                <TableCell
                  sx={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
                >
                  Số điện thoại 2
                </TableCell>
                <TableCell
                  sx={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
                >
                  Ngày đăng ký
                </TableCell>
                <TableCell
                  sx={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
                >
                  Trạng thái
                </TableCell>
                <TableCell
                  sx={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
                >
                  Ngày xử lý
                </TableCell>
                <TableCell
                  sx={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
                >
                  Ghi chú
                </TableCell>
                <TableCell
                  sx={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
                >
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ color: "black" }}>
                    <Typography
                      sx={{
                        color: "rgb(117, 117, 117)",
                        fontSize: { xs: "10px", lg: "15px" },
                        fontWeight: "600",
                      }}
                    >
                      {row.studentId}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "black" }}>
                    <Typography
                      sx={{
                        color: "rgb(117, 117, 117)",
                        fontSize: { xs: "10px", lg: "15px" },
                        fontWeight: "600",
                      }}
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "black" }}>
                    <Typography
                      sx={{
                        color: "rgb(117, 117, 117)",
                        fontSize: { xs: "10px", lg: "15px" },
                        fontWeight: "600",
                      }}
                    >
                      {row.class}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "black" }}>
                    <Typography
                      sx={{
                        color: "rgb(117, 117, 117)",
                        fontSize: { xs: "10px", lg: "15px" },
                        fontWeight: "600",
                      }}
                    >
                      {row.ngaySinh}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "black" }}>
                    <Typography
                      sx={{
                        color: "rgb(117, 117, 117)",
                        fontSize: { xs: "10px", lg: "15px" },
                        fontWeight: "600",
                      }}
                    >
                      {row.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "black" }}>
                    <Typography
                      sx={{
                        color: "rgb(117, 117, 117)",
                        fontSize: { xs: "10px", lg: "15px" },
                        fontWeight: "600",
                      }}
                    >
                      {row.phoneNumber2}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "black" }}>
                    <Typography
                      sx={{
                        color: "rgb(117, 117, 117)",
                        fontSize: { xs: "10px", lg: "15px" },
                        fontWeight: "600",
                      }}
                    >
                      {formatDate(row.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "black" }}>
                    <Typography
                      sx={{
                        color: "rgb(117, 117, 117)",
                        fontSize: { xs: "10px", lg: "15px" },
                        fontWeight: "600",
                      }}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "black" }}>
                    <Typography
                      sx={{
                        color: "rgb(117, 117, 117)",
                        fontSize: { xs: "10px", lg: "15px" },
                        fontWeight: "600",
                      }}
                    >
                      {formatDate(row.createdAt)}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ color: "black" }}>
                    <Typography
                      sx={{
                        color: "rgb(117, 117, 117)",
                        fontSize: { xs: "10px", lg: "15px" },
                        fontWeight: "600",
                      }}
                    >
                      {row.note}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    {/* Nút "Hủy" chỉ có ở trạng thái NEW */}

                    {/* Nút "Chi tiết" cho tất cả các trạng thái */}

                    <Button
                      startIcon={<ChangeCircleOutlined />}
                      onClick={() => handleOpenStatusDialog(row.id)}
                      sx={{
                        color: "#008689",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    ></Button>

                    <Button
                      startIcon={<EditOutlined />}
                      onClick={() => handleOpenDetailPopUp(row.id)}
                      sx={{
                        color: "#008689",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    ></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <Viewcert
              open={openModal}
              onClose={() => setOpenModal(false)}
              id={id}
            />
          </Table>
        </TableContainer>

        {/* Phân trang */}
        <TablePagination
          count={totalElements} // Số lượng tổng các phần tử từ API
          page={paginationModel.page} // Trang hiện tại
          onPageChange={handlePageChange} // Hàm xử lý thay đổi trang
          rowsPerPage={paginationModel.pageSize} // Số dòng trên mỗi trang
          onRowsPerPageChange={handlePageSizeChange} // Hàm xử lý thay đổi số dòng trên mỗi trang
          rowsPerPageOptions={[10, 25, 50]} // Tùy chọn số dòng mỗi trang
          labelRowsPerPage="Số dòng mỗi trang" // Nhãn số dòng mỗi trang
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} trong số ${count !== -1 ? count : `hơn ${to}`}`
          }
          sx={{
            "& .MuiTablePagination-root": {
              fontSize: "16px", // Tăng kích thước font tổng thể
            },
            "& .MuiTablePagination-toolbar": {
              fontSize: "16px", // Tăng kích thước font cho toolbar
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontSize: "16px", // Tăng kích thước font cho các label và số hàng hiển thị
              },
            "& .MuiTablePagination-input": {
              fontSize: "16px", // Tăng kích thước font cho input chọn số dòng trên mỗi trang
            },
          }}
        />

        <Dialog open={openStatusDialog} onClose={handleCloseStatusDialog}>
          <DialogTitle sx={{ color: "#008689", fontWeight: "bold" }}>
            Thay đổi trạng thái
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "black" }}>
              Vui lòng chọn trạng thái và nhập ghi chú nếu cần.
            </DialogContentText>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <Select
                value={selectedStatusApprove}
                onChange={(e) => setSelectedStatusApprove(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Chọn trạng thái</em>
                </MenuItem>
                {statusGraduation.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Ghi chú"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseStatusDialog} sx={{ color: "red" }}>
              Hủy
            </Button>
            <Button
              onClick={handleConfirmChangeStatus}
              variant="contained"
              sx={{ backgroundColor: "#008588", color: "white" }}
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  );
};

export default HandleGraduation;
