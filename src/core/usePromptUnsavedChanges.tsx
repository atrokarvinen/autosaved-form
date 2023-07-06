import { useEffect } from "react";

type Props = {
  isDirty: boolean;
};

const usePromptUnsavedChanges = ({ isDirty }: Props) => {
  console.log("isDirty:", isDirty);

  const onBeforeUnload = (e: BeforeUnloadEvent) => {
    if (isDirty) {
      e.preventDefault();
      e.returnValue = "";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);
};

export { usePromptUnsavedChanges };
