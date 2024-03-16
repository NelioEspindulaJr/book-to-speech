import React, { useState, useEffect } from "react";
import { Dimensions, Text, View, TouchableOpacity } from "react-native";
import {
  useCameraDevice,
  useFrameProcessor,
  Camera,
} from "react-native-vision-camera";

const { width } = Dimensions.get("window");

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [words, setWords] = useState([]);
  const device = useCameraDevice("back");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermission();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    console.log(words);
  }, [words]);

  const handleBarCodeScanned = ({ data }) => {
    setWords((prevWords) => [...prevWords, data]);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ width: width, height: width }}
        device={device}
        isActive={true}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        ></View>
      </Camera>
      <View>
        <Text>{words}</Text>
      </View>
    </View>
  );
}
