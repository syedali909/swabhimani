import * as React from 'react';
import * as Localization from 'expo-localization'; // or whatever library you want
import i18n from 'i18n-js'; // or whatever library you want
import {MainNavigation} from './navigation/MainNavigation';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import config from './aws-exports'
import { LocalizationContext} from './constant/localName'

import { createNews, updateNews, deleteNews } from './src/graphql/mutations';
import {Provider} from 'react-redux' 
import {createStore,combineReducers} from 'redux'
import { createNewsReduce } from './store/reducer/newsReducer';
import {mr,en} from './constant/localName'

const reducer = combineReducers({
  CreateNews: createNewsReduce})
const store = createStore(reducer)

i18n.fallbacks = true;
i18n.translations = { mr, en };

Amplify.configure(config)

// graphQL aws amplify


// const todo = { headline: "My first headline" };



// const grphfunc = async()=>{
// await API.graphql(graphqlOperation(createNews, {input: todo}));

// /* update a todo */
// }

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
    <Provider store={store}>
      <MainNavigation/>
    </Provider>
    </LocalizationContext.Provider>

  );
}
