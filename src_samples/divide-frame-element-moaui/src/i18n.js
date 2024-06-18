// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend) // 웹 서버에서 다국어 리소스 파일 로드를 위한 미들웨어
  .use(LanguageDetector) // 브라우저 언어 설정 감지
  .use(initReactI18next) // react-i18next 바인딩
  .init({
    lng: "en",
    fallbackLng: "en", // 기본 언어 설정
    debug: true, // 개발 중 true로 설정하여 디버깅 정보를 볼 수 있음
    interpolation: {
      escapeValue: false, // React에서는 이미 안전함
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // 언어 리소스 파일 위치
    },
  });

export default i18n;
