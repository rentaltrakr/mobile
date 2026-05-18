import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

// English
import commonEN from '../../public/locales/en/common.json';
import authEN from '../../public/locales/en/auth.json';
import homeEN from '../../public/locales/en/home.json';
import profileEN from '../../public/locales/en/profile.json';
import settingsEN from '../../public/locales/en/settings.json';
import rentalEN from '../../public/locales/en/rental.json';

// French
import commonFR from '../../public/locales/fr/common.json';
import authFR from '../../public/locales/fr/auth.json';
import homeFR from '../../public/locales/fr/home.json';
import profileFR from '../../public/locales/fr/profile.json';
import settingsFR from '../../public/locales/fr/settings.json';
import rentalFR from '../../public/locales/fr/rental.json';

const resources = {
  en: {
    common: commonEN,
    auth: authEN,
    home: homeEN,
    profile: profileEN,
    settings: settingsEN,
    rental: rentalEN,
  },
  fr: {
    common: commonFR,
    auth: authFR,
    home: homeFR,
    profile: profileFR,
    settings: settingsFR,
    rental: rentalFR,
  },
};

const LANGUAGE_KEY = 'user-language';

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      if (typeof window !== 'undefined') {
        const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (storedLanguage) {
          return callback(storedLanguage);
        }
      }
      
      const bestLng = Localization.getLocales()[0]?.languageCode;
      return callback(bestLng === 'fr' ? 'fr' : 'en');
    } catch (error) {
      console.log('Error reading language', error);
      return callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      if (typeof window !== 'undefined') {
        await AsyncStorage.setItem(LANGUAGE_KEY, lng);
      }
    } catch (error) {
      console.log('Error saving language', error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    compatibilityJSON: 'v4', // Required for React Native
  });

export default i18n;
