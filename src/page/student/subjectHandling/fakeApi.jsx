// data.js

// Sample data// data.js
export const data = [
  {
    maHocPhan: 123456,
    tenHocPhan: "Toán logic",
    soTC: 3,
    dieuKienDangKy: "Toan 1(a)",
    semesterId: 70, // Thêm thuộc tính semesterId để lọc theo học kỳ
  },
  {
    maHocPhan: 234567,
    tenHocPhan: "Toán 2",
    soTC: 3,
    dieuKienDangKy: "Toan 1(a)",
    semesterId: 70, // Thêm thuộc tính semesterId để lọc theo học kỳ
  },
  // ...
];

export const data2 = [
  {
    tenHocPhan: "Toán logic",
    maLopHocPhan: 12345601,
    tenLopLopPhan: "KT20A",
    trangThai: 4,
    daDangKy: 40,
    siSoToiDa: 60,
  },
  {
    tenHocPhan: "Toán logic",
    maLopHocPhan: 12345602,
    tenLopLopPhan: "KT20B",
    trangThai: 4,
    daDangKy: 40,
    siSoToiDa: 60,
  },
];

export const data3 = [
  {
    lichHoc: "TH - Thứ 3 (Tiết 1 -> 3 )",
    coSo: "ĐH GTVT HCM",
    dayNha: "Online",
    phong: "courses.ut.edu.vn",
    giangVien: "THS Hồ Văn Lừng",
    batDau: "09/07/2024",
    ketThuc: "09/07/2024",
  },
  {
    lichHoc: "TH - Thứ 3 (Tiết 1 -> 3 )",
    coSo: "ĐH GTVT HCM",
    dayNha: "N - CS2",
    phong: "GYM - CS2",
    giangVien: "THS Hồ Văn Lừng",
    batDau: "16/07/2024",
    ketThuc: "10/09/2024",
  },
  {
    lichHoc: "TH - Thứ 3 (Tiết 1 -> 3 )",
    coSo: "ĐH GTVT HCM",
    dayNha: "Online",
    phong: "courses.ut.edu.vn",
    giangVien: "THS Hồ Văn Lừng",
    batDau: "11/07/2024",
    ketThuc: "11/07/2024",
  },
];

export const columns = [
  { field: "maHocPhan", headerName: "Mã học phần", width: "150px" },
  { field: "tenHocPhan", headerName: "Tên học phần", width: "400px" },
  { field: "soTC", headerName: "Số TC", width: "50px" },
  { field: "dieuKienDangKy", headerName: "Điều kiện đăng ký", width: "100px" },
];

export const columns2 = [
  {
    field: "tenLopLopPhan",
    headerName: "Tên lớp học phần",
  },
  { field: "trangThai", headerName: "Trạng thái" },
];

export const columns3 = [
  { field: "lichHoc", headerName: "Lịch học" },
  { field: "giangVien", headerName: "Giáo viên" },
];
