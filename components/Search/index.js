import {
  View,
  Text,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "./styles";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import globalstyles from "../../globalstyles";

const Search = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isFocused, setIsFocused] = useState(false);
  const fetchData = async (querySting) => {
    // console.log(querySting);
    // return;
    const accessToken = await AsyncStorage.getItem("@accessToken");
    if (accessToken === null) return;
    try {
      const url = `https://api.spotify.com/v1/search?q=${querySting}&type=album%2Cplaylist%2Cartist%2Ctrack%2Cshow&market=in`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log("search data:", data);
    } catch (e) {
      console.log("searching error");
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      fetchData(debouncedQuery);
    }
  }, [debouncedQuery]);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,

      headerTitle: () => (
        <View style={(styles.container, { flex: 1 })}>
          {!isFocused ||
            (query && (
              <View style={styles.headerBox}>
                <Text style={styles.text}>Search</Text>
                <Text style={styles.text}>Camera</Text>
              </View>
            ))}

          <TextInput
            style={isFocused ? styles.TextInputActive : styles.TextInput}
            placeholder="What do you want to listen to?"
            placeholderTextColor={isFocused ? globalstyles.TextColor : "black"}
            value={query}
            onChangeText={(text) => {
              setQuery(text);
            }}
            clearButtonMode="while-editing"
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
        </View>
      ),
    });
  }, [navigation, query, isFocused]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsFocused(false);
        console.log(isFocused);
      }}>
      <View style={styles.container}>
        {/* <View style={styles.headerBox}>
          <Text style={styles.text}>Search</Text>
          <Text style={styles.text}>Camera</Text>
        </View>
        <TextInput
          style={isFocused ? styles.TextInputActive : styles.TextInput}
          placeholder="What do you want to listen to?"
          placeholderTextColor={isFocused ? globalstyles.TextColor : "black"}
          value={query}
          onChangeText={(text) => {
            setQuery(text);
          }}
          clearButtonMode="while-editing"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        /> */}
        <Text>Hello</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Search;
