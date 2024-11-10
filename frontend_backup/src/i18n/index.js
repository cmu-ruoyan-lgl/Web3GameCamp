import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhTranslations from './zh.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh: {
        translation: zhTranslations
      }
    },
    lng: 'zh', // 默认语言设置为中文
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 