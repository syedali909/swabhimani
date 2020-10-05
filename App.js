import * as React from 'react';
import * as Localization from 'expo-localization'; // or whatever library you want
import i18n from 'i18n-js'; // or whatever library you want
import {MainNavigation} from './navigation/MainNavigation';
import Amplify, { API, graphqlOperation, Auth ,Analytics} from 'aws-amplify';
import config from './aws-exports'
import { LocalizationContext} from './constant/localName'

import { createNews, updateNews, deleteNews } from './src/graphql/mutations';
import {Provider, useDispatch} from 'react-redux' 
import {createStore,combineReducers, applyMiddleware} from 'redux'
import { createNewsReduce, userAuthState } from './store/reducer/newsReducer';
import {mr,en} from './constant/localName'
import * as WebBrowser from 'expo-web-browser';
import thunk from 'redux-thunk';
import { AppLoading } from 'expo';
import { useFonts, NotoSans_400Regular } from '@expo-google-fonts/noto-sans';

const reducer = combineReducers({
  CreateNews: createNewsReduce,
  UserInfo: userAuthState
   })
const store = createStore(reducer,applyMiddleware(thunk))


i18n.fallbacks = true;
i18n.translations = { mr, en };

async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
      url,
      redirectUrl
  );

  if (type === 'success' && Platform.OS === 'ios') {
      WebBrowser.dismissBrowser();
      return Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...config,
  // Analytics: { 
  //   disabled: fa
  // },
  oauth: {
    ...config.oauth,
    urlOpener,
},
})

 const App = ()=> {

  const [locale, setLocale] = React.useState(Localization.locale);
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  );

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  return (
    <LocalizationContext.Provider value={localizationContext}>
    <Provider store={store}>
      <MainNavigation/>
    </Provider>
    </LocalizationContext.Provider>

  );
}




export default App;