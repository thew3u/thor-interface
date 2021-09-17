import i18n from 'i18next'
import languageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import {initReactI18next} from 'react-i18next'

i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    react: {
      useSuspense: false
    },
    fallbackLng: 'en-US',
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })

export default i18n
