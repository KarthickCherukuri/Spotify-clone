import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import styles from "./styles";
import globalstyles from "../../../globalstyles";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
export default ImageWithSkeleton = ({ images, name, href, type = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigation = useNavigation();
  const [imageSource, setImageSource] = useState({
    url: images[images.length - 1].url,
    highRes: false,
  });
  //add custom functions for playlist types

  return (
    <>
      <TouchableOpacity
        style={styles.posterContainer}
        onPress={() => {
          console.log(type);
          navigation.navigate("Songs", {
            exchangeData: { href, name, type },
          });
        }}>
        <>
          {!isLoaded && (
            <SkeletonPlaceholder
              backgroundColor={globalstyles.headerBackgroundColor}
              highlightColor="#696969">
              <SkeletonPlaceholder.Item {...styles.imageStyle} />
            </SkeletonPlaceholder>
          )}
          <FastImage
            source={{
              uri: imageSource.url,
              priority: FastImage.priority.normal,
            }}
            style={isLoaded ? styles.imageStyle : { width: 1, height: 1 }}
            onLoad={() => {
              setIsLoaded(true);
              if (!imageSource.highRes) {
                setImageSource({ url: images[0].url, highRes: true });
              }
            }}
            resizeMode={FastImage.resizeMode.contain}
            onError={() => {
              console.log("error while loading image");
            }}
          />
          <Text style={isLoaded ? styles.text : { display: "none" }}>
            {name}
          </Text>
        </>
      </TouchableOpacity>
    </>
  );
};
