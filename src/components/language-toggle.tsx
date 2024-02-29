import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { LocalsType } from "@/lib/types";
import { useLocalStorage } from "@/lib/hooks";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [ value, setLanguage ] = useLocalStorage("language", i18n.resolvedLanguage);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        i18n.resolvedLanguage === LocalsType.UA
          ? i18n.changeLanguage(LocalsType.EN)
          : i18n.changeLanguage(LocalsType.UA);
        setLanguage(i18n.resolvedLanguage);
      }}
    >
      {i18n.resolvedLanguage === LocalsType.UA ? "EN" : "UA"}
    </Button>
  );
};
