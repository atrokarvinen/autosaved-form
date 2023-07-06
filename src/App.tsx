import { Box, Tab, Tabs, Typography } from "@mui/material";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { AccountForm } from "./account/accountForm";
import LocalStorageBackupProvider from "./core/localStorageBackupProvider";
import { findTabIndex, tabs } from "./core/tabs";
import PersonInfoForm from "./person/personInfoForm";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabValue = findTabIndex(location.pathname);

  return (
    <Box>
      <Tabs value={tabValue}>
        {tabs.map((tab) => (
          <Tab key={tab.label} component={Link} label={tab.label} to={tab.to} />
        ))}
      </Tabs>
      <Routes>
        <Route path="/" element={<Typography variant="h1">Home</Typography>} />
        <Route
          path="/person"
          element={
            <LocalStorageBackupProvider storeKey="PersonInfoForm">
              <PersonInfoForm onSuccess={() => navigate("/")} />
            </LocalStorageBackupProvider>
          }
        />
        <Route
          path="/account"
          element={
            <LocalStorageBackupProvider storeKey="AccountForm">
              <AccountForm onSuccess={() => navigate("/")} />
            </LocalStorageBackupProvider>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
