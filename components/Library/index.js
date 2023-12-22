import { FlatList, Text, View } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Element from "./Element";
const Library = () => {
  const [likedSongsData, setLikedSongsData] = useState(0);
  const [playLists, setPlaylists] = useState(null);
  const [artists, setArtists] = useState(null);
  const WrapperFunc = async () => {
    const accessToken = await AsyncStorage.getItem("@accessToken");
    const promise1 = fetchUsersPlaylists(accessToken);
    const promise2 = fetchUsersArtists(accessToken);
    const promise3 = fetchLikedSongs(accessToken);
    await Promise.all([promise1, promise2, promise3]);
  };
  const fetchUsersPlaylists = async (accessToken) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setPlaylists(data);
      }
      // This will be an array of the user's playlists

      // Fetch the user's liked songs
    } catch (e) {
      console.log(e);
    }
  };

  const fetchLikedSongs = async (accessToken) => {
    try {
      const likedSongsResponse = await fetch(
        "https://api.spotify.com/v1/me/tracks?limit=1",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const likedSongsData = await likedSongsResponse.json();
      if (likedSongsResponse.ok) {
        setLikedSongsData(likedSongsData);
      }
      fetchUsersArtists(accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUsersArtists = async (accessToken) => {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/following?type=artist",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setArtists({ ...data.artists, items: data.artists.items.reverse() });
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    WrapperFunc();
  }, []);

  return (
    <View style={styles.container}>
      <Element
        likedSongs={true}
        number={likedSongsData.total}
        type="track"
        href={likedSongsData.href}
      />
      <FlatList
        data={playLists?.items}
        key={(item) => item.id}
        renderItem={({ item }) => <Element {...item} />}
      />
      <FlatList
        data={artists?.items}
        key={(item) => item.id}
        renderItem={({ item }) => <Element {...item} artist={true} />}
      />
    </View>
  );
};

export default Library;
