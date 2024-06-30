import { Box } from "@mui/material";
import TabsPanel from "../login/tabPanel/TabsPanel";

const Newfeeds = () => {
  console.log(process.env.VITE_API_BASE_URL);
  console.log(process.env);
  console.log(import.meta.env);
  return (
    <Box>
      <TabsPanel />
    </Box>
  );
};

export default Newfeeds;
