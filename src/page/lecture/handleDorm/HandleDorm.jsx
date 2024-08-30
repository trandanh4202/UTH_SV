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
  getPeriod,
  getRoom,
  denyApprove,
  setApprove,
} from "../../../features/adminSlice/AdminSlice";
import { HomeMaxOutlined, BlockOutlined } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Container, Paper } from "@mui/material";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
}

export default function QuickFilteringCustomLogic() {
  const [data, setData] = useState({ rows: [], columns: [] });
  const [openDialog, setOpenDialog] = useState(false);
  const [isApproveAction, setIsApproveAction] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [denyReason, setDenyReason] = useState("");
  const dispatch = useDispatch();
  const period = useSelector((state) => state.admin.getPeriod?.body);
  const approve = useSelector((state) => state.admin.getAllToApprove?.body);

  // Hàm mở popup xác nhận
  const handleOpenDialog = (id, isApprove) => {
    setSelectedId(id);
    setIsApproveAction(isApprove);
    setOpenDialog(true);
  };

  // Hàm đóng popup xác nhận
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDenyReason("");
  };

  // Hàm xử lý khi nhấn xác nhận "Duyệt"
  const handleApprove = () => {
    if (isApproveAction) {
      dispatch(setApprove(selectedId)).then(() => {
        dispatch(getAllToApprove());
        handleCloseDialog();
      });
    } else {
      dispatch(denyApprove({ id: selectedId, reason: denyReason })).then(() => {
        dispatch(getAllToApprove());
        handleCloseDialog();
      });
    }
  };

  const rows = approve?.map((item) => ({
    id: item.id,
    campusName: item.campus.name,
    campusAddress: item.campus.address,
    status: item.status,
    createdAt: new Date(item.createdAt).toLocaleDateString(),
    objects: item.objects.map((obj) => obj.name).join(", "),
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "campusName", headerName: "Tên cơ sở", width: 150 },
    { field: "campusAddress", headerName: "Địa chỉ", width: 300 },
    { field: "status", headerName: "Trạng thái", width: 150 },
    { field: "createdAt", headerName: "Ngày tạo", width: 150 },
    { field: "objects", headerName: "Đối tượng", width: 300 },
    {
      field: "actions",
      headerName: "Hành động",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<HomeMaxOutlined />}
          label="Duyệt"
          onClick={() => handleOpenDialog(params.id, true)}
          disabled={params.row.status === "Đã duyệt"}
          sx={{ color: "red", fontWeight: "bold" }}
        />,
        <GridActionsCellItem
          icon={<BlockOutlined />}
          label="Từ chối"
          onClick={() => handleOpenDialog(params.id, false)}
          disabled={
            params.row.status === "Đã duyệt" ||
            params.row.status === "Đã từ chối"
          }
          sx={{ color: "red", fontWeight: "bold" }}
        />,
      ],
    },
  ];

  useEffect(() => {
    dispatch(getRoom());
    dispatch(getAllToApprove());
    dispatch(getPeriod());
  }, [dispatch]);

  return (
    <Container>
      <Paper elevation={4} sx={{ padding: "20px", borderRadius: "10px" }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            slots={{ toolbar: QuickSearchToolbar }}
            sx={{
              "& .MuiDataGrid-cell": {
                color: "red",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "red",
                fontWeight: "bold",
              },
            }}
          />
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle sx={{ color: "red", fontWeight: "bold" }}>
              {isApproveAction ? "Xác nhận duyệt" : "Xác nhận từ chối"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ color: "red", fontWeight: "bold" }}>
                {isApproveAction
                  ? "Bạn có chắc chắn muốn duyệt đơn đăng ký này không?"
                  : "Vui lòng nhập lý do từ chối."}
              </DialogContentText>
              {!isApproveAction && (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Lý do từ chối"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={denyReason}
                  onChange={(e) => setDenyReason(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": {
                      color: "red",
                      fontWeight: "bold",
                    },
                  }}
                />
              )}
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
                disabled={!isApproveAction && !denyReason.trim()}
                sx={{ color: "red", fontWeight: "bold" }}
              >
                Xác nhận
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Paper>
    </Container>
  );
}
