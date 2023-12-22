import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import styles from "./styles";
import globalstyles from "../../../globalstyles";
import FastImage from "react-native-fast-image";
export default ImageWithSkeleton = ({
  likedSongs = false,
  name = "",
  number = 0,
  images = null,
  owner = null,
  artists = null,
}) => {
  const [isLoaded, setIsLoaded] = useState(!images);

  return (
    <>
      <TouchableOpacity style={styles.container}>
        <>
          {!isLoaded && (
            <SkeletonPlaceholder
              backgroundColor={globalstyles.headerBackgroundColor}
              highlightColor="#696969">
              <SkeletonPlaceholder.Item {...styles.container} />
            </SkeletonPlaceholder>
          )}
          {images && (
            <FastImage
              source={{
                priority: FastImage.priority.normal,
                uri: images
                  ? images[0].url
                  : "https://source.unsplash.com/random",
              }}
              style={
                isLoaded
                  ? {
                      ...styles.imageStyle,
                    }
                  : { width: 1, height: 1 }
              }
              onLoad={() => {
                setIsLoaded(true);
              }}
              onError={() => {
                console.log("error while loading image");
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}

          <View style={{ justifyContent: "center", padding: 10 }}>
            <Text style={isLoaded ? styles.text : { display: "none" }}>
              {likedSongs ? "Liked Songs" : name}
            </Text>
            <Text style={styles.smallText}>{artists.join("")}</Text>
          </View>
        </>
      </TouchableOpacity>
    </>
  );
};
