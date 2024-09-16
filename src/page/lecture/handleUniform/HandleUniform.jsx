import Box from "@mui/material/Box";
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  TablePagination,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookmarkAddOutlined,
  Cancel,
  CheckCircle,
  EditOutlined,
  PrintOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import useDebounce from "../../../components/hooks/UseDebounce";
import {
  getAllAdmin,
  getCampus,
  getStatusUniform,
  handleOrder,
  printToShip,
  setApprove,
} from "../../../features/orderSlice/OrderSlice";
import StudentCertificatePopUp from "./StudentCertificatePopUp";

const HandleUniform = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isApproveAction, setIsApproveAction] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [denyReason, setDenyReason] = useState("");
  const [approveNote, setApproveNote] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10, // Số phần tử mỗi trang
    page: 0, // Trang bắt đầu
  });

  const [search, setSearch] = useState(""); // State cho giá trị tìm kiếm
  const dataSearch = useDebounce(search, 1000); // Debounce giá trị tìm kiếm
  const [selectedStatus, setSelectedStatus] = useState("NEW");
  const [selectedSort, setSelectedSort] = useState(2);
  const [selectedCampus, setSelectedCampus] = useState(1);
  const loading = useSelector((state) => state.order?.loading);
  const message = useSelector((state) => state.order?.message);
  const timestamp = useSelector((state) => state.order?.timestamp);
  const success = useSelector((state) => state.order?.success);
  const totalElements = useSelector(
    (state) => state.order?.getAllAdmin?.body?.totalElements || 0
  ); // Tổng số phần tử cho phân trang
  const dispatch = useDispatch();
  const link = useSelector((state) => state.order.printToShip?.body);

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

  const approve = useSelector((state) => state.order.getAllAdmin?.body || []);
  const statusDorm = useSelector(
    (state) => state.order.getStatusUniform?.body || []
  );
  const campusUni = useSelector((state) => state.order.getCampus?.body);

  const handleOpenDialog = (id, isApprove) => {
    setSelectedId(id);
    setIsApproveAction(isApprove);
    setOpenDialog(true);
  };

  const handleOpenDetailPopUp = (id) => {
    setId(id);
    setOpenModal(true);
  };

  const handlePrintToShip = (id) => {
    if (id) {
      dispatch(printToShip(id));
    } else {
      console.error("ID is undefined!");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDenyReason("");
    setApproveNote("");
  };

  const [selectedIsShip, setSelectedIsShip] = useState(false);

  const handleApprove = () => {
    const formDataAprove = {
      reason: isApproveAction ? approveNote : denyReason,
      isApprove: isApproveAction,
    };
    const formDataGetAll = {
      pageIndex: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      search: dataSearch,
      status: selectedStatus,
      campusId: selectedIsShip ? null : selectedCampus,
      isShip: selectedIsShip,
    };
    dispatch(setApprove({ formDataAprove, formDataGetAll, id: selectedId }));
    handleCloseDialog();
  };

  const handleCampusChange = (event) => {
    const value = event.target.value;
    if (value === "true") {
      setSelectedIsShip(true);
      setSelectedCampus(null);
    } else {
      setSelectedIsShip(false);
      setSelectedCampus(value);
    }
  };

  // Gọi API getAllAdmin khi giá trị tìm kiếm thay đổi
  useEffect(() => {
    const formData = {
      pageIndex: paginationModel.page + 1, // Thêm 1 nếu API sử dụng index bắt đầu từ 1
      pageSize: paginationModel.pageSize,
      search: dataSearch, // Sử dụng giá trị tìm kiếm đã debounce
      status: null,
      campusId: null,
      isShip: null,
    };
    dispatch(getAllAdmin(formData));
  }, [dispatch, paginationModel.page, paginationModel.pageSize, dataSearch]);

  useEffect(() => {
    dispatch(getStatusUniform());
    dispatch(getCampus());
  }, [dispatch]);

  const rows = approve?.content?.map((item) => ({
    id: item.id,
    studentId: item.student?.code,
    name: item.student?.name,
    class: item.student?.className,
    ngaySinh: item.student?.ngaySinh,
    phoneNumber: item.student?.phone || "N/A",
    groupProductDto: item.groupProductDto?.name,
    email: item.student?.email || "N/A",
    registrationDate: item.createdAt
      ? new Date(item.createdAt).toLocaleDateString()
      : "N/A",
    status: item.status,
    statusCode: item.statusCode,
    reason: item.reason,
    processDate: item.updatedAt
      ? new Date(item.updatedAt).toLocaleDateString()
      : "N/A",
    isShip: item.isShip,
  }));

  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState("");

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
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmOrderId, setConfirmOrderId] = useState(null);

  const handleConfirmOpen = (id) => {
    setConfirmOrderId(id);
    setOpenConfirmDialog(true);
  };

  const handleConfirmClose = () => {
    setOpenConfirmDialog(false);
    setConfirmOrderId(null);
  };

  const handleConfirmOrder = () => {
    const formDataGetAll = {
      pageIndex: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      search: dataSearch,
      status: selectedStatus,
      campusId: selectedIsShip ? null : selectedCampus,
      isShip: selectedIsShip,
    };
    dispatch(handleOrder({ formDataGetAll, id: confirmOrderId }));
    handleConfirmClose();
  };

  return (
    <>
      <StudentCertificatePopUp
        open={openModal}
        onClose={() => setOpenModal(false)}
        id={id}
      />
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
              {statusDorm?.map((status) => (
                <FormControlLabel
                  key={status.statusCode}
                  value={status.statusCode}
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
                  label={status.status}
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
              Chọn cơ sở duyệt
            </FormLabel>
            <RadioGroup
              aria-label="campusMethod"
              value={selectedIsShip ? "true" : selectedCampus}
              onChange={handleCampusChange}
              row
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {campusUni?.map((campus) => (
                <FormControlLabel
                  key={campus.id}
                  value={campus.id}
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
                  label={`Cơ sở ${campus.id}`}
                />
              ))}
              <FormControlLabel
                value="true"
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
                label="Ship"
              />
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
                  Loại đăng ký
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
                      {row.groupProductDto}
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
                      {row.registrationDate}
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
                      {row.processDate}
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
                      {row.reason}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {/* Nút "Hủy" chỉ có ở trạng thái NEW */}
                    {row.statusCode === "NEW" && (
                      <Button
                        startIcon={<Cancel />}
                        onClick={() => handleOpenDialog(row.id, false)}
                        sx={{
                          color: "#008689",
                          fontWeight: "bold",
                          fontSize: "13px",
                        }}
                      ></Button>
                    )}
                    {/* Nút "Xác nhận" có ở trạng thái NEW và Đã duyệt */}
                    {(row.statusCode === "NEW" ||
                      row.statusCode === "APPROVE") && (
                      <Button
                        startIcon={<CheckCircle />}
                        onClick={() => handleOpenDialog(row.id, true)}
                        sx={{
                          color: "#008689",
                          fontWeight: "bold",
                          fontSize: "13px",
                        }}
                      ></Button>
                    )}
                    {row.statusCode === "APPROVED" && (
                      <Button
                        startIcon={<BookmarkAddOutlined />}
                        onClick={() => handleConfirmOpen(row.id)}
                        sx={{
                          color: "#008689",
                          fontWeight: "bold",
                          fontSize: "13px",
                        }}
                      >
                        Xác nhận bước 2
                      </Button>
                    )}
                    {/* Nút "In vận đơn" có ở trạng thái Đăng ký thành công và isShip = true */}
                    {row.statusCode === "WAIT_SHIPPING" && row.isShip && (
                      <Button
                        startIcon={<PrintOutlined />}
                        onClick={() => handlePrintToShip(row.id)}
                        sx={{
                          color: "#008689",
                          fontWeight: "bold",
                          fontSize: "13px",
                        }}
                      ></Button>
                    )}
                    {/* Nút "Chi tiết" cho tất cả các trạng thái */}
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

        <Dialog open={openConfirmDialog} onClose={handleConfirmClose}>
          <DialogTitle
            sx={{ color: "#008689", fontWeight: "bold", fontSize: "15px" }}
          >
            Xác nhận chuyển trạng thái
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "red", fontWeight: "bold" }}>
              Bạn có chắc chắn muốn chuyển trạng thái đơn hàng này không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleConfirmClose}
              sx={{ color: "red", fontWeight: "bold" }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleConfirmOrder}
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#008588",
                color: "white",
                borderRadius: "8px",
                border: "3px solid #0085885a",
                transition: "all ease 0.4s",
                padding: "0px",
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
                  padding: "5px",
                }}
              >
                Xác nhận
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle
            sx={{ color: "#008689", fontWeight: "bold", fontSize: "15px" }}
          >
            {isApproveAction ? "Xác nhận duyệt" : "Xác nhận từ chối"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "red", fontWeight: "bold" }}>
              {isApproveAction
                ? "Bạn có chắc chắn muốn duyệt đơn đăng ký này không?"
                : "Vui lòng nhập lý do từ chối."}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label={isApproveAction ? "Ghi chú" : "Lý do từ chối"}
              type="text"
              fullWidth
              variant="outlined"
              value={isApproveAction ? approveNote : denyReason}
              onChange={(e) =>
                isApproveAction
                  ? setApproveNote(e.target.value)
                  : setDenyReason(e.target.value)
              }
              sx={{
                "& .MuiInputBase-input": {
                  color: "red",
                  fontWeight: "bold",
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              sx={{ color: "red", fontWeight: "bold" }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleApprove}
              disabled={
                (!isApproveAction && !denyReason.trim()) ||
                (isApproveAction && !approveNote.trim())
              }
              variant="contained"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#008588",
                color: "white",
                borderRadius: "8px",
                border: "3px solid #0085885a",
                transition: "all ease 0.4s",
                padding: "0px",
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
                  padding: "5px",
                }}
              >
                Xác nhận
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  );
};

export default HandleUniform;
