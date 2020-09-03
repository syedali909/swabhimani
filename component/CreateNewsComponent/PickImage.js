import * as React from 'react'
import { View, Text, Button, Image } from 'react-native'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const PickImage = () => {
    const [image, setimage] = React.useState('')
    const getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        console.log('status', status);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }else{
            imagepick();
        }
      };
    
      const imagepick = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            setimage(result.uri);
          }
          console.log(result);
        }

      React.useEffect(() => {
        getPermissionAsync();
      }, [getPermissionAsync]);
    
  
    return (
        <View >
        </View>
    )
}

export default PickImage;

