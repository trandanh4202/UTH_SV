/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Cancel, CheckCircle } from "@mui/icons-material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";

const tableCell = [
  "STT",
  "Học kỳ",
  "Mã lớp học phần",
  "Tên môn học",
  "TC",
  "Học phí",
  "Mức nộp",
  "Trạng thái ĐK",
  "Ngày nộp",
  "Số tiền nộp",
  "Khấu trừ (+)",
  "Trừ nợ (-)",
  "Công nợ",
  "Trạng thái",
  // "Không truy cứu công nợ",
];

const TuitionTab = ({ data }) => {
  const formatCurrency = (number) => {
    return number?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        sx={{
          maxHeight: { xs: "60vh", lg: "63vh" },
          "&::-webkit-scrollbar": {
            width: "10px",
            height: "10px",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#008689",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#008950",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableCell.map((item) => (
                <TableCell
                  key={item}
                  sx={{
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "800",
                    border: "1px solid rgba(224, 224, 224, 1)",
                    background: "#008689",
                    textAlign: "center",
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgb(221, 221, 221)",
                      fontWeight: "500",
                      minWidth: "250px",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                      textAlign: "center",
                    }}
                  >
                    {row.tenDot}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {row.maLopHocPhan}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      minWidth: "300px",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {row.noiDung}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {row.soTinChi}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {formatCurrency(row.mucPhiBanDau)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {formatCurrency(row.mucNop)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      minWidth: "120px",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {row.trangThaiDangKy}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {new Date(row.ngayNop).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {formatCurrency(row.soTienNop)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {row.khauTru ? formatCurrency(row.khauTru) : 0}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {row.truNo ? formatCurrency(row.truNo) : 0}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {row.congNo ? formatCurrency(row.congNo) : 0}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "rgb(102, 117, 128)",
                    }}
                  >
                    {row.daDongHocPhi ? (
                      <CheckCircle sx={{ color: "#66e321" }} />
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                sx={{
                  fontWeight: "700",
                  fontSize: "18px",
                  color: "rgb(218, 28, 45)",
                  border: "1px solid rgba(224, 224, 224, 1)",
                }}
              >
                Tổng
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "1px solid rgba(224, 224, 224, 1)",
                  color: "rgb(218, 28, 45)",
                }}
              >
                {data?.reduce((acc, row) => acc + row.soTinChi, 0)}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "1px solid rgba(224, 224, 224, 1)",
                  color: "rgb(218, 28, 45)",
                }}
              >
                {formatCurrency(
                  data.reduce((acc, row) => acc + row.mucPhiBanDau, 0)
                )}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "1px solid rgba(224, 224, 224, 1)",
                  color: "rgb(218, 28, 45)",
                }}
              >
                {formatCurrency(data.reduce((acc, row) => acc + row.mucNop, 0))}
              </TableCell>
              <TableCell colSpan={3}></TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "1px solid rgba(224, 224, 224, 1)",
                  color: "rgb(218, 28, 45)",
                }}
              >
                {formatCurrency(
                  data.reduce((acc, row) => acc + row.khauTru, 0)
                )}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "1px solid rgba(224, 224, 224, 1)",
                  color: "rgb(218, 28, 45)",
                }}
              >
                {formatCurrency(data.reduce((acc, row) => acc + row.truNo, 0))}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "1px solid rgba(224, 224, 224, 1)",
                  color: "rgb(218, 28, 45)",
                }}
              >
                {formatCurrency(data.reduce((acc, row) => acc + row.congNo, 0))}
              </TableCell>
              <TableCell
                sx={{
                  border: "1px solid rgba(224, 224, 224, 1)",
                }}
              ></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TuitionTab;
