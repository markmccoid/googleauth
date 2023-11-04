import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { GDrive } from "@robinbobin/react-native-google-drive-api-wrapper";
import * as FileSystem from "expo-file-system";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import RNFS from "react-native-fs";

const gdrive = new GDrive();

const TestDownload = () => {
  const getAccess = async () => {
    try {
      const token = (await GoogleSignin.getTokens()).accessToken;
      gdrive.accessToken = token;
      // const files = await gdrive.files.list();
      // console.log(files);
      console.log("download start");

      const binData = await gdrive.files.getBinary("1rZlpBYMMh6CZBzNkTa7mkGrccFNN8QUX");

      console.log("BIN", binData);
      const filename = `${FileSystem.documentDirectory}test.mp3`;
      //const tempFile = FileSystem.downloadAsync(binData, filename);

      console.log("filewrite");
      //const sample = await FileSystem.getInfoAsync(filename);
    } catch (err) {
      console.log("ERROR ", err.code);
    }
  };
  return (
    <View>
      <Text>TestDownload</Text>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 5,
          paddingVertical: 3,
          paddingHorizontal: 6,
          margin: 10,
          backgroundColor: "lightblue",
        }}
        onPress={async () => await getAccess()}
      >
        <Text>Test Download Binary</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestDownload;
