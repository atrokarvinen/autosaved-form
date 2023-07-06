import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ProgressIcon } from "../core/progressIcon";
import { useAutosave } from "../core/useAutosave";
import { usePromptUnsavedChanges } from "../core/usePromptUnsavedChanges";
import { Account, emptyValues } from "./account";

type AccountFormProps = {
  defaultValues?: Account;
  onSuccess(): void;
};

export const AccountForm = ({ defaultValues, onSuccess }: AccountFormProps) => {
  const methods = useForm<Account>({
    defaultValues: defaultValues ?? emptyValues,
  });
  const { register, handleSubmit } = methods;
  const { saving, clearSavedData } = useAutosave({ ...methods });
  usePromptUnsavedChanges({ isDirty: methods.formState.isDirty });

  const onSubmit = (data: Account) => {
    console.log("values submitted:", data);
    clearSavedData();
    onSuccess();
  };

  return (
    <form>
      <Stack direction="column" spacing={2}>
        <TextField id="username" label="Username" {...register("username")} />
        <TextField id="email" label="Email" {...register("email")} />
        <Button
          variant="contained"
          onClick={handleSubmit((data) => onSubmit(data))}
        >
          Submit
        </Button>
        {saving && <ProgressIcon />}
      </Stack>
    </form>
  );
};
