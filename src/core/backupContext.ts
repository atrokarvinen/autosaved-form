import { createContext } from "react";

export type BackupContextType = {
  backup: (data: any) => void;
  destroy: () => void;
};

export const BackupContext = createContext<BackupContextType>({
  backup: () => {},
  destroy: () => {},
});
