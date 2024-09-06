/* eslint-disable react/jsx-key */
import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllToApprove,
  getCampus,
  getPeriod,
  getRoom,
  getStatusDorm,
  setApprove,
} from "../../../features/adminSlice/AdminSlice";
import { CheckCircle, Cancel } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Container,
  Paper,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import useDebounce from "../../../components/hooks/UseDebounce";

const sortDorm = [
  {
    statusCode: "1",
    status: "Thời gian đăng ký tăng dần",
  },
  {
    statusCode: "2",
    status: "Số lượng đối tượng giảm dần",
  },
];

function QuickSearchToolbar({ searchValue, onSearchChange }) {
  return (
    <Box sx={{ p: 0.5, pb: 0 }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Tìm kiếm..."
        value={searchValue}
        onChange={onSearchChange}
        sx={{ width: "100%" }}
      />
    </Box>
  );
}

export default function QuickFilteringCustomLogic() {
  const [openDialog, setOpenDialog] = useState(false);
  const [isApproveAction, setIsApproveAction] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [denyReason, setDenyReason] = useState("");
  const [approveNote, setApproveNote] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("WAIT_APPROVE");
  const [selectedSort, setSelectedSort] = useState(2);
  const [selectedCampus, setSelectedCampus] = useState(1);
  const loading = useSelector((state) => state.admin?.loading);
  const message = useSelector((state) => state.admin?.message);
  const timestamp = useSelector((state) => state.admin?.timestamp);
  const success = useSelector((state) => state.admin?.success);
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

  const approve = useSelector(
    (state) => state.admin.getAllToApprove?.body || {}
  );
  const statusDorm = useSelector(
    (state) => state.admin.getStatusDorm?.body || []
  );
  const campusDorm = useSelector((state) => state.admin.getCampus?.body);
  const handleOpenDialog = (id, isApprove) => {
    setSelectedId(id);
    setIsApproveAction(isApprove);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDenyReason("");
    setApproveNote("");
  };
  const dataSearch = useDebounce(search, 1000);
  const handleApprove = () => {
    const formDataAprove = {
      reason: isApproveAction ? approveNote : denyReason,
      isApprove: isApproveAction,
    };
    const formDataGetAll = {
      pageIndex: 1,
      pageSize: 300,
      search,
      status: selectedStatus,
      sortOption: selectedSort,
    };
    dispatch(setApprove({ formDataAprove, formDataGetAll, id: selectedId }));
    handleCloseDialog();
  };

  const fetchData = () => {
    const formData = {
      pageIndex: 1,
      pageSize: 300,
      search: dataSearch,
      status: selectedStatus,
      sortOption: selectedSort,
      campusId: selectedCampus,
    };
    dispatch(getAllToApprove(formData));
  };

  useEffect(() => {
    fetchData();
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    search,
    selectedStatus,
    selectedSort,
    selectedCampus,
  ]);

  useEffect(() => {
    dispatch(getPeriod());
    dispatch(getStatusDorm());
    dispatch(getCampus());
  }, [dispatch]);

  const rows = approve.content?.map((item) => ({
    id: item.id,
    studentId: item.student?.code,
    name: item.student?.name,
    class: item.student?.className,
    ngaySinh: item.student?.ngaySinh,
    phoneNumber: item.student?.phone || "N/A",
    email: item.student?.email || "N/A",
    dormitory: item.campus?.name,
    priorityNumber: item.objects?.length,
    priorityDescription:
      item.objects?.map((obj) => obj.name).join(", ") || "N/A",
    registrationDate: item.createdAt
      ? new Date(item.createdAt).toLocaleDateString()
      : "N/A",
    status: item.status,
    reason: item.reason,
    processDate: item.updatedAt
      ? new Date(item.updatedAt).toLocaleDateString()
      : "N/A",
  }));

  const columns = [
    { field: "studentId", headerName: "MSSV", width: 100 },
    { field: "name", headerName: "Họ và tên", width: 200 },
    { field: "class", headerName: "Lớp", width: 150 },
    { field: "ngaySinh", headerName: "Ngày sinh", width: 150 },
    { field: "phoneNumber", headerName: "Số điện thoại", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "dormitory", headerName: "KTX đăng ký", width: 150 },
    { field: "priorityNumber", headerName: "Số đối tượng ưu tiên", width: 150 },
    {
      field: "priorityDescription",
      headerName: "Đối tượng ưu tiên dạng chữ",
      width: 250,
    },
    { field: "registrationDate", headerName: "Ngày đăng ký", width: 150 },
    { field: "status", headerName: "Trạng thái", width: 150 },
    { field: "processDate", headerName: "Ngày xử lý", width: 150 },
    { field: "reason", headerName: "Ghi chú", width: 150 },
    {
      field: "actions",
      headerName: "Hành động",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<CheckCircle sx={{ fontSize: "20px" }} />}
          label="Duyệt"
          onClick={() => handleOpenDialog(params.id, true)}
          disabled={params.row.status !== "Chờ duyệt"}
          sx={{ color: "#008689", fontWeight: "bold", fontSize: "13px" }}
        />,
        <GridActionsCellItem
          icon={<Cancel sx={{ fontSize: "20px" }} />}
          label="Từ chối"
          onClick={() => handleOpenDialog(params.id, false)}
          disabled={params.row.status !== "Chờ duyệt"}
          sx={{ color: "red", fontWeight: "bold", fontSize: "13px" }}
        />,
      ],
    },
  ];

  return (
    <Container>
      <Paper
        elevation={4}
        sx={{ padding: "20px", borderRadius: "10px", mb: 2 }}
      >
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
            Chọn cách sắp xếp danh sách
          </FormLabel>
          <RadioGroup
            aria-label="sortMethod"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            row
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {sortDorm?.map((status) => (
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
            value={selectedCampus}
            onChange={(e) => setSelectedCampus(e.target.value)}
            row
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {campusDorm?.map((campus) => (
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
                label={campus.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper elevation={4} sx={{ padding: "20px", borderRadius: "10px" }}>
        <Box sx={{ height: "50vh", width: "100%" }}>
          <QuickSearchToolbar
            searchValue={search}
            onSearchChange={(e) => setSearch(e.target.value)}
          />
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            hideFooter
            localeText={{
              noRowsLabel: "Không có dữ liệu để xử lý",
              MuiTablePagination: {
                labelRowsPerPage: "Số dòng mỗi trang",
              },
            }}
            sx={{
              "& .MuiDataGrid-cell": {
                color: "black",
                fontWeight: "bold",
                fontSize: "13px",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "red",
                fontWeight: "bold",
                fontSize: "15px",
              },
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
                width: "10px",
                height: "10px",
                borderRadius: "10px",
              },
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
                backgroundColor: "#008689",
                borderRadius: "10px",
              },
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#008950",
                borderRadius: "10px",
              },
              "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
                borderRadius: "10px",
              },
            }}
          />

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
        </Box>
      </Paper>
    </Container>
  );
}
