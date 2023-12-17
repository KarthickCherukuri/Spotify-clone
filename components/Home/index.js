import { View, Text, FlatList, ScrollView } from "react-native";
import styles from "./styles";
import Poster from "./Poster";
import posterStyles from "./Poster/styles";
import spotifyCredentials from "../../spotifyConfig";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import PosterList from "./PosterList";
import { authorize } from "react-native-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const dummyData = [
  {
    id: "1",
    imgUrl: "https://source.unsplash.com/random/500x500",
    name: 1,
  },
  {
    id: "2",
    imgUrl: "https://source.unsplash.com/random/500x500",
    name: 2,
  },
  {
    id: "3",
    imgUrl: "https://source.unsplash.com/random/500x500",
    name: 3,
  },
  {
    id: "4",
    imgUrl: "https://source.unsplash.com/random/500x500",
    name: 4,
  },
  {
    id: "5",
    imgUrl: "https://source.unsplash.com/random/500x500",
    name: 5,
  },
  {
    id: "6",
    imgUrl: "https://source.unsplash.com/random/500x500",
    name: 6,
  },
];
const Home = () => {
  const [newReases, setNewReleases] = useState(null);
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null);
  const [usersPlaylists, setUsersPlaylists] = useState(null);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState(null);
  const [recomended, setRecomended] = useState(null);
  const accessTokenFetcherCustom = async () => {
    const config = {
      clientId: spotifyCredentials.clientId,
      clientSecret: spotifyCredentials.clientSecret,
      redirectUrl: "spotify-clone://oauthredirect",
      scopes: [
        "user-read-email",
        "playlist-read-private",
        "playlist-read-collaborative",
      ],
      serviceConfiguration: {
        authorizationEndpoint: "https://accounts.spotify.com/authorize",
        tokenEndpoint: "https://accounts.spotify.com/api/token",
        revocationEndpoint: "https://accounts.spotify.com/api/token",
      },
    };
    try {
      const response = await authorize(config);
      console.log("getting");
      console.log("response:", response);
    } catch (e) {
      console.log(`authorization error: ${e}`);
    }
  };

  const accessTokenFetcher = async () => {
    // var client_id = spotifyCredentials.clientId;
    // var client_secret = spotifyCredentials.clientSecret;
    try {
      //   const authOptions = {
      //     method: "POST",
      //     url: "https://accounts.spotify.com/api/token",
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded",
      //       Authorization:
      //         "Basic " +
      //         new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      //     },
      //     body: `grant_type=client_credentials&scope=playlist-read-private playlist-read-collaborative`,
      //   };
      //   const response = await fetch(authOptions.url, authOptions);
      //   const data = await response.json();
      const accessToken = await AsyncStorage.getItem("@accessToken");
      fetchNewReleases(accessToken);
      fetchPlaylists(accessToken);
      fetchUsersPlaylists(accessToken);
      fetchRecentPlayedTracks(accessToken);
      fetchRecomended(accessToken);
    } catch (e) {
      console.log("error in fetching token:", e);
    }
  };

  const fetchNewReleases = async (accessToken) => {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/browse/new-releases?country=in",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const { albums } = data;

        setNewReleases(albums);
      }
    } catch (e) {
      console.log("error while fetching new releases:", e);
    }
  };

  const fetchPlaylists = async (accessToken) => {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/browse/featured-playlists?country=IN&limit=10&offset=5",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setFeaturedPlaylists(data.playlists);
      }
    } catch (e) {
      console.log("error while fetching playlists:", e);
    }
  };

  const fetchUsersPlaylists = async (accessToken) => {
    if (null == accessToken) return;
    try {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setUsersPlaylists(data);
    } catch (e) {
      console.log("error while fetching playlists:", e);
    }
  };

  const fetchRecentPlayedTracks = async (accessToken) => {
    if (null == accessToken) return;
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) return;
      const { items } = data;
      const tracks = items.map(({ track }) => {
        const { id, name } = track;
        return {
          ...track.album,
          id,
          name,
        };
      });
      data.items = tracks;

      setRecentlyPlayedTracks(data);
    } catch (e) {
      console.log("error while fetching recently played tracks:", e);
    }
  };

  const fetchRecomended = async (accessToken) => {
    if (null == accessToken) return;
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/recommendations?limit=10&market=IN&seed_genres=indian&seed_tracks=4NHQUGzhtTLFvgF5SZesLK",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) return;
      const { tracks } = data;
      const items = tracks.map((track) => {
        const { images } = track.album;
        return {
          ...track,
          images,
        };
      });
      data.items = items;
      setRecomended(data);
    } catch (e) {
      console.log("error while fetching recently played tracks:", e);
    }
  };

  useEffect(() => {
    accessTokenFetcher();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <PosterList
        heading="New Releases"
        data={newReases}
        horizontal={true}
        renderItem={({ item }) => <Poster {...item} />}
        keyExtractor={(item) => item.id}
        style={{ maxHeight: posterStyles.posterContainer.height }}
        showsHorizontalScrollIndicator={false}
      />

      <PosterList
        heading="Featured"
        data={featuredPlaylists}
        horizontal={true}
        renderItem={({ item }) => <Poster {...item} />}
        keyExtractor={(item) => item.id}
        style={{ maxHeight: posterStyles.posterContainer.height }}
        showsHorizontalScrollIndicator={false}
      />

      <PosterList
        heading="Recomended"
        data={recomended}
        horizontal={true}
        renderItem={({ item }) => <Poster {...item} />}
        keyExtractor={(item) => item.id}
        style={{ maxHeight: posterStyles.posterContainer.height }}
        showsHorizontalScrollIndicator={false}
      />
      <PosterList
        heading="Playlists"
        data={usersPlaylists}
        horizontal={true}
        renderItem={({ item }) => <Poster {...item} />}
        keyExtractor={(item) => item.id}
        style={{ maxHeight: posterStyles.posterContainer.height }}
        showsHorizontalScrollIndicator={false}
      />

      <PosterList
        heading="Recently Played Tracks" //requires tweeking
        data={recentlyPlayedTracks}
        horizontal={true}
        renderItem={({ item }) => <Poster {...item} />}
        keyExtractor={(item) => item.id}
        style={{ maxHeight: posterStyles.posterContainer.height }}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default Home;
