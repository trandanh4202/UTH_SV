// styles.js

const commonStyles = {
  paper: { padding: "10px 5px 20px 10px" },
  divider: {
    color: "red",
    border: "3px solid",
    height: "20px",
    marginRight: "5px",
  },
  typographyTitle: { color: "#008689", fontWeight: "700", fontSize: "20px" },
  tableContainer: {
    maxHeight: "82vh",
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
  },
  tableCellHeader: {
    border: "1px solid rgba(224, 224, 224, 1)",
    background: "#008689",
  },
  tableCellContent: { border: "1px solid rgba(224, 224, 224, 1)" },
  typographyTableHeader: {
    fontSize: { xs: "15px", lg: "15px" },
    fontWeight: "800",
    color: "white",
  },
  typographyTableContent: {
    color: "#da1d2d",
    fontSize: { xs: "10px", lg: "15px" },
    fontWeight: "800",
  },
  typographyTableSubContent: {
    color: "black",
    fontSize: { xs: "10px", lg: "15px" },
    fontWeight: "500",
  },
  typographyTableSubContentBold: {
    color: "#da1d2d",
    fontSize: { xs: "10px", lg: "15px" },
    fontWeight: "700",
  },
};

export default commonStyles;
