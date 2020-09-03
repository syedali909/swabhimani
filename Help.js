import React from "react";
import { View, Text ,Button} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { actionofbody } from "./store/action/newsAction";
var i=1;
export default function Help() {
  const bodyState = useSelector((state) => state);
  console.log('bodyState', bodyState)
  const dispatch = useDispatch();

   
  return (
    <View style={{marginTop:100}}> 
    <Button
          title="Order Now"
          onPress={() => {
            dispatch(actionofbody(i))
            i = i==4 ? i==0 :i=i+1
        }}
        />
        <Text>{bodyState}</Text>
    </View>
  );
}
