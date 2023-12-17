import { View, Text, FlatList } from "react-native";
import styles from "./styles";
import Poster from "./Poster";
import posterStyles from "./Poster/styles";
import spotifyCredentials from "../../spotifyConfig";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import PosterList from "./PosterList";
import { authorize } from "react-native-app-auth";
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

  const accessTokenFetcherCustom = async () => {
    const config = {
      clientId: spotifyCredentials.clientId,
      clientSecret: spotifyCredentials.clientSecret,
      redirectUrl: "com.spotifylogin://oauthredirect",
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
    const response = await authorize(config);
    console.log("getting");
    console.log("response:", response);
  };
  const accessTokenFetcher = async () => {
    var client_id = spotifyCredentials.clientId;
    var client_secret = spotifyCredentials.clientSecret;
    try {
      const authOptions = {
        method: "POST",
        url: "https://accounts.spotify.com/api/token",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            new Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        body: `grant_type=client_credentials&scope=playlist-read-private playlist-read-collaborative`,
      };
      const response = await fetch(authOptions.url, authOptions);
      const data = await response.json();
      fetchNewReleases(data.access_token);
      fetchPlaylists(data.access_token);
      fetchUsersPlaylists(data.access_token);
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
    try {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log("error while fetching playlists:", e);
    }
  };

  useEffect(() => {
    accessTokenFetcher();
    // accessTokenFetcherCustom();
  }, []);
  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default Home;
