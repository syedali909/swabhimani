import * as React from 'react';
import * as Localization from 'expo-localization'; // or whatever library you want
import i18n from 'i18n-js'; // or whatever library you want
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {MainNavigation} from './navigation/MainNavigation';
import Amplify from 'aws-amplify'
import config from './aws-exports'
import {en,mr, LocalizationContext} from './constant/localName'

Amplify.configure(config)



i18n.fallbacks = true;
i18n.translations = { mr, en };


export default function App() {
  const [locale, setLocale] = React.useState(Localization.locale);
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  );
  return (
    <LocalizationContext.Provider value={localizationContext}>
      <MainNavigation/>
    </LocalizationContext.Provider>
  );
}
