import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Blocker from "../core/blocker";
import { ProgressIcon } from "../core/progressIcon";
import { useAutosave } from "../core/useAutosave";
import { usePromptUnsavedChanges } from "../core/usePromptUnsavedChanges";
import { ErrorToast } from "./errorToast";
import FailSwitch from "./failSwitch";
import { PersonInfo, emptyValues } from "./personInfo";

type PersonInfoFormProps = { defaultValues?: PersonInfo };

const PersonInfoForm = ({ defaultValues }: PersonInfoFormProps) => {
  const navigate = useNavigate();
  const methods = useForm<PersonInfo>({
    defaultValues: defaultValues ?? emptyValues,
  });
  const { register, handleSubmit } = methods;
  const { isDirty, isSubmitSuccessful } = methods.formState;
  const shouldBlock = isDirty && !isSubmitSuccessful;

  const { saving, clearSavedData } = useAutosave({ ...methods });

  const [submitFails, setSubmitFails] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);

  // Prompts when leaving page
  usePromptUnsavedChanges({ isDirty });

  const onSubmit = (data: PersonInfo) => {
    console.log("values submitted:", data);

    if (submitFails) {
      setSubmitFailed(true);
      console.log("submission failed!");
      throw new Error("fail");
    }

    clearSavedData();
  };

  const onSubmitClicked = async () => {
    try {
      const handler = handleSubmit((data) => onSubmit(data));
      await handler();
      navigate("/");
    } catch (error) {}
  };

  return (
    <form>
      <Stack direction="column" spacing={2}>
        <Blocker when={shouldBlock} onConfirm={clearSavedData} />
        <TextField id="name" label="Name" {...register("name")} />
        <TextField id="address" label="Address" {...register("address")} />
        <TextField id="age" label="Age" {...register("age")} />
        <Button variant="contained" onClick={onSubmitClicked} disabled={saving}>
          Submit
        </Button>
        <FailSwitch value={submitFails} onChange={setSubmitFails} />
        <ErrorToast
          open={submitFailed}
          onClose={() => setSubmitFailed(false)}
        />
        {saving && <ProgressIcon />}
      </Stack>
    </form>
  );
};

export default PersonInfoForm;
