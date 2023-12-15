import { View, Text } from "react-native";
import styles from "./styles";
import Poster from "./Poster";
const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Poster imgUrl="https://source.unsplash.com/random/500x500" name="name" />
    </View>
  );
};

export default Home;
