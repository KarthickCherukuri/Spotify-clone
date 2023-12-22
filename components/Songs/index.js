import { View, Text, Button, FlatList } from "react-native";
import styles from "./styles";
import Element from "./Element";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Songs = ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.title);
  const [data, setData] = useState(null);
  const { exchangeData } = route.params;
  const { type, likedSongs = false } = exchangeData;

  const fetchNewReleases = async (url, accessToken) => {
    if (accessToken == null) return;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        const { items } = data.tracks;
        data.tracks.items = items.map((each) => {
          {
            const { artists } = each;
            const names = artists.map((each) => each.name);
            return { ...each, artists: names };
          }
        });

        setData(data.tracks);
      }
    } catch (e) {
      console.log("error while fetching new Releases", e);
    }
  };

  const fetchPlaylists = (data) => {
    const { tracks } = data;

    tracks.items = tracks.items.map((item) => {
      const { track } = item;
      const { artists } = track;

      const names = artists.map((each) => each.name);
      const newImages = item.images ? item.images : data.images;

      return { ...item.track, images: newImages, artists: names };
    });
    setData(tracks);
  };

  const fetchData = async () => {
    const accessToken = await AsyncStorage.getItem("@accessToken");

    if (accessToken == null) return;
    try {
      const response = await fetch(exchangeData.href, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      const { name } = data;

      if (likedSongs) {
        fetchPlaylists({ tracks: { items: data.items } });
        navigation.setOptions({ title: "Liked Songs" });
        return;
      }
      navigation.setOptions({ title: name });
      if (response.ok) {
        switch (type) {
          case "album":
            fetchNewReleases(data.href, accessToken);
            break;
          case "playlist":
            fetchPlaylists(data);
            break;
          case "track":
            fetchNewReleases(data.album.href, accessToken);
        }

        // fetchNewReleases(data.href, accessToken);
      }
    } catch (e) {
      console.log("error while fetching new releases:", e);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: exchangeData.name });
    fetchData();
  }, [title]);
  return (
    <View style={styles.container}>
      {data && (
        <FlatList
          data={data.items}
          key={(item) => item.id}
          renderItem={({ item }) => <Element {...item} />}
        />
      )}
    </View>
  );
};

export default Songs;
