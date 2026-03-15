import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "Dashboard_Title": "Khadamati Admin",
            "Home": "Home",
            "Workers": "Workers Management",
            "Welcome": "Welcome to Dashboard"
        }
    },
    ar: {
        translation: {
            "Dashboard_Title": "لوحة تحكم خدماتي",
            "Home": "الرئيسية",
            "Workers": "إدارة العمال",
            "Welcome": "مرحباً بك في لوحة التحكم"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
