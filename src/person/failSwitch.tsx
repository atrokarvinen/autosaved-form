import { FormControlLabel, Switch } from "@mui/material";
import { ChangeEvent } from "react";

type FailSwitchProps = {
  value: boolean;
  onChange(value: boolean): void;
};

// For testing form behaviour when submission fails and forcing
// the failure.
const FailSwitch = ({ value, onChange }: FailSwitchProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <FormControlLabel
      label="Fail submission"
      control={<Switch value={value} onChange={handleOnChange} />}
    />
  );
};

export default FailSwitch;
