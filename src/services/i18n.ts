import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import es from "../locales/es.json";
import pt from "../locales/pt.json";

i18n.use(initReactI18next).init({
  lng: "pt",
  fallbackLng: "en",
  resources: {
    pt: { translation: pt },
    en: { translation: en },
    es: { translation: es },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
