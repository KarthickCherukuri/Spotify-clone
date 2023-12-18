import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import styles from "./styles";
import globalstyles from "../../../globalstyles";

export default ImageWithSkeleton = ({
  likedSongs = false,
  name = "",
  number = 0,
  images = null,
  owner = null,
  artist = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

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
          <Image
            source={{
              uri: images
                ? images[0].url
                : "https://source.unsplash.com/random",
            }}
            style={
              isLoaded
                ? {
                    ...styles.imageStyle,
                    borderRadius: artist ? styles.imageStyle.width : 0,
                  }
                : { width: 1, height: 1 }
            }
            onLoad={() => {
              setIsLoaded(true);
            }}
            onError={() => {
              console.log("error while loading image");
            }}
          />
          <View style={{ justifyContent: "center", padding: 10 }}>
            <Text style={isLoaded ? styles.text : { display: "none" }}>
              {likedSongs ? "Liked Songs" : name}
            </Text>
            {!artist ? (
              <Text style={styles.smallText}>
                Playlist • {likedSongs ? number : owner && owner.display_name}
              </Text>
            ) : (
              <Text style={styles.smallText}>Artist</Text>
            )}
          </View>
        </>
      </TouchableOpacity>
    </>
  );
};
