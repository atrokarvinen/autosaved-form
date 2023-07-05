import debounce from "lodash/debounce";
import { useCallback, useContext, useEffect, useState } from "react";
import { BackupContext } from "./backupContext";

type AutosaveProps = {
  formState: any;
  watch: any;
  getValues: any;
};

export const useAutosave = ({ watch, getValues, formState }: AutosaveProps) => {
  const isDirty = formState.isDirty;
  const allFields = watch();
  const { backup, destroy } = useContext(BackupContext);
  const [saving, setSaving] = useState(false);

  const clearSavedData = () => {
    destroy();
  };

  const debouncedSave = useCallback(
    debounce(() => {
      // Simulate save time
      setSaving(true);
      setTimeout(() => {
        const data = getValues();
        backup(data);
        setSaving(false);
      }, 2000);
    }, 1000),
    [],
  );

  useEffect(() => {
    if (isDirty) {
      console.log("fields changed: ", allFields);
      debouncedSave();
    }
  }, [JSON.stringify(allFields)]);

  return { saving, clearSavedData };
};
