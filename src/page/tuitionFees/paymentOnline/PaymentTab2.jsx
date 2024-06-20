/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { CheckCircle } from "@mui/icons-material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const tableCell = [
  "STT",
  "Mã nhóm học phần",
  "Tên môn học phần",
  "Tín chỉ",
  "Học phí",
  "Bắt buộc",
  "Số tiền (VND)",
];

// eslint-disable-next-line react/prop-types
const PaymentTab = ({ data2 }) => {
  const calculateTotal = () => {
    return data2
      .reduce((total, item) => {
        const amount = parseInt(item.SoTien.replace(/,/g, ""));
        return total + amount;
      }, 0)
      .toLocaleString();
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableCell.map((item) => (
                <TableCell
                  key={item}
                  sx={{
                    border: "2px solid rgb(221, 221, 221)",
                    textAlign: "center",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "rgb(29, 161, 242)",
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data2 &&
              data2.map((row) => (
                <TableRow key={row.STT}>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {row.STT}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                      fontWeight: "500",
                      minWidth: "250px", // Độ rộng tối thiểu cho cột Học kỳ
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {row.MaNhomHocPhan}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      color: "rgb(102, 117, 128)",
                      minWidth: "250px", // Độ rộng tối thiểu cho cột Học kỳ

                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    {row.TenMonHocPhan}
                  </TableCell>

                  <TableCell
                    align="left"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      color: "rgb(102, 117, 128)",
                      // minWidth: "300px", // Độ rộng tối thiểu cho cột Học kỳ
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    {row.TinChi}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      color: "rgb(102, 117, 128)",
                      // minWidth: "300px", // Độ rộng tối thiểu cho cột Học kỳ
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    {row.HocPhi}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      color: "rgb(102, 117, 128)",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    {row.BatBuoc ? (
                      <CheckCircle sx={{ color: "#66e321" }} />
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      color: "rgb(102, 117, 128)",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    {row.SoTien}
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell
                colSpan={6}
                align="right"
                sx={{
                  border: "1px solid rgba(224, 224, 224, 1)",
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "rgb(29, 161, 242)",
                }}
              >
                Tổng thanh toán
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  border: "1px solid rgba(224, 224, 224, 1)",
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "rgb(29, 161, 242)",
                }}
              >
                {calculateTotal()} VND
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PaymentTab;
