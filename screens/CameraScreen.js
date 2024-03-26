import React from "react";
import { Camera, FlashMode } from "expo-camera";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default class CameraScreen extends React.Component {
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode,
    uri: null,
  };

  componentDidMount() {
    this.useEffect();
  }

  async useEffect() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });
  }

  handleCameraType = () => {
    const { type } = this.state;
    this.setState({
      type:
        type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  };

  handleSnap = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      this.setState({ photo: photo.uri });
    }
  };

  handleFlashMode = () => {
    const { flashMode } = this.state;
    const newFlashMode =
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off;
    this.setState({ flashMode: newFlashMode });
  };

  render() {
    const { hasCameraPermission, type, photo } = this.state;
    console.log(this.state.flashMode);
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => {
              this.camera = ref;
            }}
            flashMode={this.state.flashMode}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleCameraType}
              >
                <Text style={styles.text}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSnap}
                onPress={this.handleSnap}
              >
                <Text style={styles.text}> Snap </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  this.state.flashMode === Camera.Constants.FlashMode.on
                    ? styles.buttonOnFlash
                    : styles.buttonOffFlash
                }
                onPress={this.handleFlashMode}
              >
                <Text style={styles.text}>
                  Flash{" "}
                  {this.state.flashMode === Camera.Constants.FlashMode.on
                    ? "On"
                    : "Off"}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          {photo && (
            <Image
              source={{ uri: photo }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
    height: 60,
    width: 60,
    backgroundColor: "blue",
    borderRadius: 50,
  },
  buttonOnFlash: {
    flex: 0.1,
    alignSelf: "flex-start",
    alignItems: "center",
    height: 60,
    width: 60,
    backgroundColor: "blue",
    borderRadius: 50,
  },
  buttonOffFlash: {
    flex: 0.1,
    alignSelf: "flex-start",
    alignItems: "center",
    height: 60,
    width: 60,
    backgroundColor: "red",
    borderRadius: 50,
  },
  buttonSnap: {
    alignSelf: "flex-end",
    alignItems: "center",
    height: 60,
    width: 60,
    backgroundColor: "blue",
    borderRadius: 50,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
