import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useRef, useState } from "react";
import Constants from "expo-constants";

import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
  User,
} from "@react-native-google-signin/google-signin";
import TestDownload from "./TestDownload";

const GOOGLE_CLIENT_ID = Constants?.expoConfig?.extra?.googleClientId;

GoogleSignin.configure({
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.appfolder",
  ], // what API you want to access on behalf of the user, default is email and profile
  iosClientId: GOOGLE_CLIENT_ID, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  forceCodeForRefreshToken: true,
});

//-- -----------------------
const GoogleAuthContainer = () => {
  // const [validToken, setValidToken] = useState<string | undefined>(undefined);
  // const [userInfo, setUserInfo] = useState<User>();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  const signUserOut = async () => {
    try {
      await GoogleSignin.signOut();
      setIsSignedIn(false);
    } catch (err) {
      console.log("SignOut ERR", err);
    }
  };
  // // ----------------------------------
  // // Function to call on component mount to check if token
  // // is valid.
  const checkLoginStatus = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    console.log("IS SIGNED IN", isSignedIn);
    if (!isSignedIn) {
      setIsSignedIn(false);
    } else {
      setIsSignedIn(true);
    }
  };

  React.useEffect(() => {
    // checkLoginStatus();
  }, []);

  return (
    <SafeAreaView style={{ marginTop: 50 }}>
      {isSignedIn && (
        <View style={{ flexDirection: "row" }}>
          <TestDownload />
          {/* win */}
        </View>
      )}

      {!isSignedIn && (
        <GoogleSigninButton
          onPress={async () => {
            try {
              const userInfo = await GoogleSignin.signIn();
              // console.log("USERINFO", userInfo);
              // const tokens = await GoogleSignin.getTokens();
              // storeGoogleAccessToken(tokens.accessToken);
              setIsSignedIn(true);
            } catch (error) {
              console.log("Error Signing in-> ", error.code);
              setIsSignedIn(false);
            }
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  revokeButton: {
    backgroundColor: "#9f170d",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "black",
    marginRight: 12,
  },
  authButton: {
    backgroundColor: "#0261fe",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#213ec6",
  },
});

export default GoogleAuthContainer;
