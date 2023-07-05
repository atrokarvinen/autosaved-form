import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ProgressIcon } from "../core/progressIcon";
import { useAutosave } from "../core/useAutosave";
import { PersonInfo } from "./personInfo";

type PersonInfoFormProps = {
  defaultValues?: PersonInfo;
  onSuccess(): void;
};

const PersonInfoForm = ({ defaultValues, onSuccess }: PersonInfoFormProps) => {
  const methods = useForm<PersonInfo>({
    defaultValues,
  });
  const { register, handleSubmit } = methods;
  const { saving, clearSavedData } = useAutosave({ ...methods });

  const onSubmit = (data: PersonInfo) => {
    console.log("values submitted:", data);
    clearSavedData();
    onSuccess();
  };

  return (
    <form>
      <Stack direction="column" spacing={2}>
        <TextField id="name" label="Name" {...register("name")} />
        <TextField id="address" label="Address" {...register("address")} />
        <TextField id="age" label="Age" {...register("age")} />
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

export default PersonInfoForm;
