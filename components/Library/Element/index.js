import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import styles from "./styles";
import globalstyles from "../../../globalstyles";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
export default ImageWithSkeleton = ({
  likedSongs = false,
  name = "",
  number = 0,
  images = null,
  owner = null,
  artist = false,
  type = "",
  href = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          console.log("elemenet", likedSongs);
          navigation.navigate("Songs", {
            exchangeData: {
              href: likedSongs ? "https://api.spotify.com/v1/me/tracks" : href,
              name,
              type,
              likedSongs,
            },
          });
        }}>
        <>
          {!isLoaded && (
            <SkeletonPlaceholder
              backgroundColor={globalstyles.headerBackgroundColor}
              highlightColor="#696969">
              <SkeletonPlaceholder.Item {...styles.container} />
            </SkeletonPlaceholder>
          )}
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
            resizeMode={FastImage.resizeMode.contain}
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
