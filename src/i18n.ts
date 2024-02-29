import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LocalsType } from "./lib/types/LocalsType";

const resources = {
  [LocalsType.EN]: {
    translation: {
      "loginHeader": "Login to your account",
      "username": "Username",
      "loginDescription": "Enter your username and password below to authorize",
      "password": "Password",
      "login": "Login",
      "my_account": "My Account",
      "profile": "Profile",
      "setting": "Setting",
      "log_out": "Log out",
      "dashboard": "Dashboard",
      "persons": "Persons",
      "user_dashboard": "User Dashboard",
      "person_management": "Person Management",
      "sunday": "Sunday",
      "monday": "Monday",
      "tuesday": "Tuesday",
      "wednesday": "Wednesday",
      "thursday": "Thursday",
      "friday": "Friday",
      "saturday": "Saturday",
      "user_logout_toast_title": "Your are successfully logged out",
      "user_logout_toast_description": "All session data has been deleted from the local system",
      "error_toast_title": "An error occurred",
      "error_unknown": "Unknown error",
      "user_login_toast_title": "successfully logged in",
      "add_pseudonym_toast_title": "Person Pseudonym successfully created",
      "no_results": "No results.",
    }
  },
  [LocalsType.UA]: {
    translation: {
      "loginHeader": "Увійдіть до свого облікового запису",
      "username": "Ім'я користувача",
      "loginDescription": "Введіть своє ім'я користувача та пароль для авторизації",
      "password": "Пароль",
      "login": "Вхід",
      "my_account": "Mій обліковий запис",
      "profile": "Профіль",
      "setting": "Налаштування",
      "log_out": "Вихід",
      "dashboard": "Дашборд",
      "persons": "Особи",
      "user_dashboard": "Користувацька панель",
      "person_management": "Управління особами",
      "sunday": "Hеділя",
      "monday": "Понеділок",
      "tuesday": "Вівторок",
      "wednesday": "Середа",
      "thursday": "Четверг",
      "friday": "П'ятниця",
      "saturday": "Субота",
      "user_logout_toast_title": "Ви успішно вийшли з системи",
      "user_logout_toast_description": "Усі дані сеансу видалено з локальної системи",
      "error_toast_title": "Виникла помилка",
      "error_unknown": "Невідома помилка",
      "user_login_toast_title": "успішно ввійшов в систему",
      "add_pseudonym_toast_title": "Псевдонім особи успішно створено",
      "no_results": "Немає результатів.",
    }
  }
};

const value = localStorage.getItem("language");

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: !value ? LocalsType.UA : value.replaceAll('"', ''),
    interpolation: {
      escapeValue: false
    },
    resources,
  });

  export default i18n;
