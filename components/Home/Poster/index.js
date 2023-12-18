import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import styles from "./styles";
import globalstyles from "../../../globalstyles";
import { useNavigation } from "@react-navigation/native";
export default ImageWithSkeleton = ({ images, name, href }) => {
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
          console.log(href);
          navigation.navigate("Songs", {
            exchangeData: { href, name },
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
          <Image
            source={{
              uri: imageSource.url,
            }}
            style={isLoaded ? styles.imageStyle : { width: 1, height: 1 }}
            onLoad={() => {
              setIsLoaded(true);
              if (!imageSource.highRes) {
                setImageSource({ url: images[0].url, highRes: true });
              }
            }}
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
