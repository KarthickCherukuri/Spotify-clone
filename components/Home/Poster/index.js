import { View, Image, Text } from "react-native";
import styles from "./styles";
const Poster = ({ imgUrl, name }) => {
  return (
    <View>
      <Image source={{ url: imgUrl }} style={{ height: 150, width: 150 }} />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

export default Poster;
