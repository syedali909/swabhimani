import React from 'react';
import { View } from 'react-native';
import Constants from 'expo-constants';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

const app = () =>(
        <View style={{  flex: 1 }}>
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data.description);
      }}
      query={{
        key: 'AIzaSyAKAVBlJZ2lM73pZAvCi8STTZ_8vOo9pOI',
        language: 'en',
        components: 'country:in',
      }}
      currentLocation={true}
      currentLocationLabel='Current location'
    />
      </View>
    );
export default app