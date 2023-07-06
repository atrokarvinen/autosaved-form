import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Blocker from "../core/blocker";
import { ProgressIcon } from "../core/progressIcon";
import { useAutosave } from "../core/useAutosave";
import { usePromptUnsavedChanges } from "../core/usePromptUnsavedChanges";
import { Account, emptyValues } from "./account";

type AccountFormProps = { defaultValues?: Account };

export const AccountForm = ({ defaultValues }: AccountFormProps) => {
  const navigate = useNavigate();
  const methods = useForm<Account>({
    defaultValues: defaultValues ?? emptyValues,
  });
  const { register, handleSubmit } = methods;
  const { saving, clearSavedData } = useAutosave({ ...methods });
  const { isDirty, isSubmitSuccessful } = methods.formState;
  const shouldBlock = isDirty && !isSubmitSuccessful;

  usePromptUnsavedChanges({ isDirty: methods.formState.isDirty });

  const onSubmit = (data: Account) => {
    console.log("values submitted:", data);
    clearSavedData();
  };

  const onHandleSubmit = async () => {
    const handler = handleSubmit((data) => onSubmit(data));
    await handler();
    navigate("/");
  };

  return (
    <form>
      <Stack direction="column" spacing={2}>
        <Blocker when={shouldBlock} onConfirm={clearSavedData} />
        <TextField id="username" label="Username" {...register("username")} />
        <TextField id="email" label="Email" {...register("email")} />
        <Button variant="contained" onClick={onHandleSubmit} disabled={saving}>
          Submit
        </Button>
        {saving && <ProgressIcon />}
      </Stack>
    </form>
  );
};
