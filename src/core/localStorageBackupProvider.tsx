import React from "react";
import { BackupContext } from "./backupContext";

type Props = {
  children: React.ReactElement;
  storeKey: string;
};

const LocalStorageBackupProvider = ({ children, storeKey }: Props) => {
  const data = localStorage.getItem(storeKey);
  const defaultValues = data ? JSON.parse(data) : undefined;

  console.log("Key '%s' has value in local store: %s", storeKey, defaultValues);

  const destroyBackup = () => {
    console.log("Destroying backup");
    localStorage.removeItem(storeKey);
  };

  const backup = (data: any) => {
    console.log("Backing up data: ", data);
    localStorage.setItem(storeKey, JSON.stringify(data));
  };

  return (
    <BackupContext.Provider
      value={{
        backup: backup,
        destroy: destroyBackup,
      }}
    >
      {React.cloneElement(children, { defaultValues })}
    </BackupContext.Provider>
  );
};

export default LocalStorageBackupProvider;
