import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [localValue, setValue] = useState(defaultValue);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const item = localStorage.getItem(key);

    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue))
    }

    setValue(item ? JSON.parse(item) : defaultValue)
  }, [])

  const setLocalValue = (value: T) => {
    try {
      setValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      let message = t("error_unknown");
      if (error instanceof Error) message = error.message;
      toast({
        variant: "default",
        title: t("error_toast_title"),
        description: message,
      });
    }
  }

  return [localValue, setLocalValue]
}
