import * as React from 'react';
import * as Localization from 'expo-localization'; // or whatever library you want
import i18n from 'i18n-js'; // or whatever library you want
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {MainNavigation} from './navigation/MainNavigation';
import Amplify from 'aws-amplify'
import config from './aws-exports'
import {en,mr} from './constant/localName'

Amplify.configure(config)
export const LocalizationContext = React.createContext();



i18n.fallbacks = true;
i18n.translations = { mr, en };

function MyScreen() {
  console.log(React.useContext(LocalizationContext))

  const { t, locale, setLocale } = React.useContext(LocalizationContext);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Current locale: {locale}. </Text>
      <Text>
        {locale !== 'en' && locale !== 'mr'
          ? 'Translations will fall back to "en" because none available'
          : null}
      </Text>
      <Text>{t('bar', { someValue: Date.now() })}</Text>
      {locale === 'en' ? (
        <Button title="Switch to French" onPress={() => setLocale('mr')} />
      ) : (
        <Button title="Switch to English" onPress={() => setLocale('en')} />
      )}
    </View>
  );
}

function MyStack() {
  const { t } = React.useContext(LocalizationContext);
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MyScreen}
        options={{ title: t('headerName') }}
      />
    </Stack.Navigator>
  );
}

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
   console.log('localizationContext',localizationContext )
  return (
    <LocalizationContext.Provider value={localizationContext}>
      <MainNavigation/>
    </LocalizationContext.Provider>
  );
}
