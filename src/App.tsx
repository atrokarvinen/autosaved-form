import { Box, Tab, Tabs, Typography } from "@mui/material";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AccountForm } from "./account/accountForm";
import LocalStorageBackupProvider from "./core/localStorageBackupProvider";
import { findTabIndex, tabs } from "./core/tabs";
import PersonInfoForm from "./person/personInfoForm";

function App() {
  const location = useLocation();

  const tabValue = findTabIndex(location.pathname);

  const PersonTab = () => {
    return (
      <LocalStorageBackupProvider storeKey="PersonInfoForm">
        <PersonInfoForm />
      </LocalStorageBackupProvider>
    );
  };

  const AccountTab = () => {
    return (
      <LocalStorageBackupProvider storeKey="AccountForm">
        <AccountForm />
      </LocalStorageBackupProvider>
    );
  };

  return (
    <Box>
      <Tabs value={tabValue}>
        {tabs.map((tab) => (
          <Tab key={tab.label} component={Link} label={tab.label} to={tab.to} />
        ))}
      </Tabs>
      <Routes>
        <Route path="/" element={<Typography variant="h1">Home</Typography>} />
        <Route path="/person" element={<PersonTab />} />
        <Route path="/account" element={<AccountTab />} />
      </Routes>
    </Box>
  );
}

export default App;
