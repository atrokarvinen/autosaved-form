import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { AccountForm } from "./account/accountForm";
import LocalStorageBackupProvider from "./core/localStorageBackupProvider";
import PersonInfoForm from "./person/personInfoForm";

function App() {
  const [tabValue, setTabValue] = useState(0);
  return (
    <Box>
      <Tabs value={tabValue} onChange={(_, tabIndex) => setTabValue(tabIndex)}>
        <Tab label="Home" />
        <Tab label="Person info" />
        <Tab label="Account info" />
      </Tabs>
      {tabValue === 0 && <Typography variant="h1">Home</Typography>}
      {tabValue === 1 && (
        <LocalStorageBackupProvider storeKey="PersonInfoForm">
          <PersonInfoForm onSuccess={() => setTabValue(0)} />
        </LocalStorageBackupProvider>
      )}
      {tabValue === 2 && (
        <LocalStorageBackupProvider storeKey="AccountForm">
          <AccountForm onSuccess={() => setTabValue(0)} />
        </LocalStorageBackupProvider>
      )}
    </Box>
  );
}

export default App;
