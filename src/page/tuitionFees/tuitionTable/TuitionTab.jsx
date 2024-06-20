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

const tableCell = [
  "STT",
  "Học kỳ",
  "Mã nhóm HP",
  "Tên HP",
  "TC",
  "Học phí",
  "Mức nộp",
  "Trạng thái ĐK",
  "Ngày xử lý",
  "Số tiền nộp",
  "Khấu trừ (+)",
  "Trừ nợ (-)",
  "Công nợ",
  "Trạng thái",
  "Không truy cứu công nợ",
];

// eslint-disable-next-line react/prop-types
const TuitionTab = ({ data2 }) => {
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
                    {row.HocKy}
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
                    {row.MaNhomHP}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      color: "rgb(102, 117, 128)",
                      minWidth: "300px", // Độ rộng tối thiểu cho cột Học kỳ
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    {row.TenHP}
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
                    {row.SoTC}
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
                    {row.MucNop}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: "1px solid rgba(224, 224, 224, 1)",
                      color: "rgb(102, 117, 128)",
                      minWidth: "120px", // Độ rộng tối thiểu cho cột Học kỳ
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    {row.TrangThaiDK}
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
                    {row.NgayXuLy}
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
                    {row.SoTienNop}
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
                    {row.KhauTru}
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
                    {row.TruNo}
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
                    {row.CongNo}
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
                    {row.TrangThai ? (
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
                    {row.KhongTruyCuuCongNo ? (
                      <Cancel sx={{ color: "red" }} />
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
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "rgb(29, 161, 242)",
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
                  color: "rgb(29, 161, 242)",
                }}
              >
                {data2.reduce((acc, row) => acc + row.SoTC, 0)}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "1px solid rgba(224, 224, 224, 1)",
                  color: "rgb(29, 161, 242)",
                }}
              >
                {data2.reduce((acc, row) => acc + row.HocPhi, 0)}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "1px solid rgba(224, 224, 224, 1)",
                  color: "rgb(29, 161, 242)",
                }}
              >
                {data2.reduce((acc, row) => acc + row.MucNop, 0)}
              </TableCell>
              <TableCell colSpan={3}></TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "1px solid rgba(224, 224, 224, 1)",
                  color: "rgb(29, 161, 242)",
                }}
              >
                {data2.reduce((acc, row) => acc + row.KhauTru, 0)}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "1px solid rgba(224, 224, 224, 1)",
                  color: "rgb(29, 161, 242)",
                }}
              >
                {data2.reduce((acc, row) => acc + row.TruNo, 0)}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "1px solid rgba(224, 224, 224, 1)",
                  color: "rgb(29, 161, 242)",
                }}
              >
                {data2.reduce((acc, row) => acc + row.CongNo, 0)}
              </TableCell>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TuitionTab;
