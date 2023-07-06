import { Alert, Snackbar } from "@mui/material";

type ErrorToastProps = { open: boolean; onClose(): void };

const ErrorToast = ({ open, onClose }: ErrorToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      onClose={onClose}
    >
      <Alert variant="filled" severity="error" onClose={onClose}>
        Submission failed.
      </Alert>
    </Snackbar>
  );
};

export { ErrorToast };
