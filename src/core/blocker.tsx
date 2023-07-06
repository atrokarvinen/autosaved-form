import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { unstable_useBlocker } from "react-router-dom";

type BlockerProps = {
  when: boolean;
  onConfirm(): void;
};

// Prompts when navigating inside app to another route
const Blocker = ({ when, onConfirm }: BlockerProps) => {
  // In react-router-dom version 6.14.1, Blocker is not currently fully supported.
  // It should be officially added to the package later in the development.
  // This is a workaround for time being.
  const blocker = unstable_useBlocker(when);
  const open = blocker.state === "blocked";

  const handleConfirm = () => {
    onConfirm();
    if (blocker.proceed) {
      console.log("unblocking...");
      blocker.proceed();
      blocker.reset();
    }
  };

  console.log("blocker state:", blocker.state);

  if (!open) return null;
  return (
    <Dialog open={open}>
      <DialogTitle>Unsaved changes</DialogTitle>
      <DialogContent>
        There are unsaved changes. Are you sure you want to leave?
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button variant="contained" onClick={blocker.reset}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Blocker;
