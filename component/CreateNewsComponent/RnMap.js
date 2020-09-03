import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, StatusBar } from "react-native";
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MapViewfile = () => {

  const [region, setregion] = useState(null);
  const [loading, setloading] = useState(true);
  const [isMapReady, setisMapReady] = useState(false);
  const [userLocation, setuserLocation] = useState("")
  const [regionChangeProgress, setregionChangeProgress] = useState(false);
  const [marginTop, setmarginTop] = useState(1);

  const onMapReady = () => {
    setisMapReady(true);
    setmarginTop(-10);
  }

  // Update state on region change
  const onRegionChange = async (region) => {

    setregion(region);
    setregionChangeProgress(true)
    let response=  await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + region.latitude + "," + region.longitude + "&key=" + "AIzaSyAKAVBlJZ2lM73pZAvCi8STTZ_8vOo9pOI")
    let jsonresponse =  await response.json();

    setuserLocation(jsonresponse.results[0].formatted_address);
  }

  useEffect( () => {

    navigator.geolocation.getCurrentPosition(
     (position) =>{
      const currentregion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      };
        setregion(currentregion);
     },(error)=>{
       alert(error)
     }
   )
  },[navigator])


  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      { region !==null  ?
           <MapView
        style={{...styles.mapStyle,marginTop:marginTop}}
        initialRegion={region}
        showsUserLocation={true}
        onMapReady={onMapReady}
        onRegionChangeComplete={onRegionChange}
      >

        {/* <MapView.Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title={"Your Location"}
          draggable
        /> */}
      </MapView> : null}

        <View style={styles.mapMarkerContainer}>
        <Icon.Button
          name="map-marker"
          size={50}
          color="red"
          backgroundColor="transparent"
          onPress={() => {
          }}
      />
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapMarkerContainer: {
    position: 'absolute',
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapViewfile;
