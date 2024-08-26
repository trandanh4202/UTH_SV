import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { registrations } from "./data"; // Import dữ liệu từ file data.jsx

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

const getApplyQuickFilterFnSameYear = (value) => {
  if (!value || value.length !== 4 || !/\d{4}/.test(value)) {
    // If the value is not a 4-digit string, it cannot be a year so applying this filter is useless
    return null;
  }
  return (cellValue) => {
    if (cellValue instanceof Date) {
      return cellValue.getFullYear() === Number(value);
    }
    return false;
  };
};

export default function QuickFilteringCustomLogic() {
  const [data, setData] = useState({ rows: [], columns: [] });

  useEffect(() => {
    // Use the existing registration data instead of fetching from an API
    const rows = registrations.map((registration) => ({
      ...registration,
      dateCreated: new Date(), // Add a sample date for demonstration purposes
    }));

    const columns = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "RegistrationCode", headerName: "Mã đăng ký", width: 150 },
      { field: "MSSV", headerName: "MSSV", width: 130 },
      { field: "LastName", headerName: "Họ đệm", width: 150 },
      { field: "FirstName", headerName: "Tên", width: 100 },
      { field: "DateOfBirth", headerName: "Ngày sinh", width: 150 },
      { field: "CCCD", headerName: "CCCD", width: 150 },
      { field: "PlaceOfBirth", headerName: "Nơi sinh", width: 150 },
      { field: "Category", headerName: "Đối tượng", width: 180 },
      { field: "Image", headerName: "Hình ảnh", width: 150 },
      { field: "Status", headerName: "Trạng thái", width: 150 },
      // {
      //   field: "dateCreated",
      //   headerName: "Ngày tạo",
      //   width: 180,
      //   valueGetter: (params) =>
      //     params?.row.dateCreated
      //       ? params?.row.dateCreated.toLocaleDateString()
      //       : "", // Check if dateCreated exists
      //   getApplyQuickFilterFn: getApplyQuickFilterFnSameYear,
      // },
    ];

    setData({ rows, columns });
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data.rows}
        columns={data.columns}
        slots={{ toolbar: QuickSearchToolbar }}
      />
    </Box>
  );
}
