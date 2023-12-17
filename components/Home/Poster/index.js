import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import styles from "./styles";
import globalstyles from "../../../globalstyles";

export default ImageWithSkeleton = ({ images, name }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.posterContainer}>
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
              uri: images[0].url,
            }}
            style={isLoaded ? styles.imageStyle : { width: 1, height: 1 }}
            onLoad={() => {
              setIsLoaded(true);
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
