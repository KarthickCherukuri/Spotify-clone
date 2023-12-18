import { View, Text, Button, FlatList } from "react-native";
import styles from "./styles";
import Element from "./Element";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Songs = ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.title);
  const [data, setData] = useState(null);
  const { exchangeData } = route.params;

  function getSecondPathSegment(url) {
    const path = new URL(url).pathname;
    const segments = path.split("/");
    return segments[2]; // segments[0] will be an empty string because the path starts with a slash
  }

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
      console.log(data);
      if (response.ok) {
        if (data.tracks) {
          console.log(data);
          const { items } = data.tracks;

          const tracks1 = items.map((track) => {
            return { ...track, images: data.images };
          });
          setData({ ...data.tracks, items: tracks1 });
          navigation.setOptions({ title: data.name });
        } else {
          exchangeData.href = data.album.href;
          fetch(data);
        }
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
