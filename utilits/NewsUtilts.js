import { API } from "aws-amplify";
import { Alert } from "react-native";
import { createLike } from "../src/graphql/mutations";


export const likeResponse = (likeDetails, setisLike, user, setVisible)=> {
    return (async () => {
        try {
        const newTodo = await API.graphql({
          query: createLike,
          variables: { input: likeDetails },
        });
        setisLike(true);
      } catch (error) {
        user
          ? Alert.alert("There is eroor in sign in")
          : setVisible(true);
      }
    });
  }