import React, { useState, useRef } from "react";
import {
  TextInput,
  Button,
  ActivityIndicator,
  Title,
  HelperText,
} from "react-native-paper";
import { Auth } from "aws-amplify";
import { View } from "react-native";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const textInputref = useRef();
  const onPressHandler = async (props) => {
    try {
      setLoading(true);
      const user = await Auth.signIn(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error)
      setError(error);
    }
  };

  const isBlank = (value) => {
    return value !== "" && value !== " ";
  };

  const passwordChecker = () => {
    if (isBlank(password) && password.length < 8) {
      return false;
    }
    return true;
  };

  const emailChecker = () => {
    if (isBlank(email)) {
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      return expression.test(String(email).toLowerCase());
    }
    return true;
  };

  const signInValidator =
    isBlank(email) && isBlank(password) && emailChecker() && passwordChecker();

  return props.authState === "signIn" ? (
    loading ? (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "space-evenly",
          paddingHorizontal: 10,
        }}
      >
        <View>
          <Title>Please Sigin in to your account</Title>
          <HelperText type="error" visible={error !== ""}>
          {error.message}
          </HelperText>
        </View>
        <View>
          <View>
            <TextInput
              ref={textInputref}
              label="Email"
              value={email}
              autoCompleteType={"email"}
              mode="outlined"
              style={{ backgroundColor: "white" }}
              onChangeText={(text) => setEmail(text)}
            />
            <HelperText type="error" visible={!emailChecker()}>
              Email address is invalid!
            </HelperText>
          </View>
          <View>
            <TextInput
              label="Password"
              secureTextEntry={true}
              mode="outlined"
              autoCompleteType={"password"}
              style={{ backgroundColor: "white", marginTop: -10 }}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <HelperText type="error" visible={!passwordChecker()}>
              Password is invalid!
            </HelperText>
          </View>
        </View>
        <View>
          <Button
            icon="camera"
            mode="contained"
            uppercase={false}
            style={
              signInValidator
                ? { backgroundColor: "#036bfc" }
                : { backgroundColor: "skyblue" }
            }
            onPress={() => {
              signInValidator && onPressHandler();
            }}
          >
            Sign In
          </Button>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button
              uppercase={false}
              onPress={() => props.onStateChange("forgotPassword", {})}
            >
              Forgot Password
            </Button>
            <Button
              uppercase={false}
              onPress={() => props.onStateChange("signUp", {})}
            >
              SignUp
            </Button>
          </View>
        </View>
        <View>
          <Button
            icon="google"
            mode="text"
            color="white"
            uppercase={false}
            onPress={props.Social.googleSignIn}
            style={{ backgroundColor: "#036bfc", marginBottom: 5 }}
          >
            Sign With Google
          </Button>
          <Button
            icon="facebook"
            mode="text"
            uppercase={false}
            color="white"
            onPress={props.Social.facebookSignIn}
            style={{ backgroundColor: "#036bfc" }}
          >
            Sign With FaceBook
          </Button>
        </View>
      </View>
    )
  ) : (
    <></>
  );
};

export default SignIn;
