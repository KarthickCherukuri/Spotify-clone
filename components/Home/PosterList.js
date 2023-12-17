import { FlatList, Text } from "react-native";
import Poster from "./Poster";
import posterStyles from "./Poster/styles";
const PosterList = ({ data, heading }) => {
  if (heading == '"Recently Played Tracks') {
    console.log("recent", data);
    return <Text>Loading</Text>;
  }
  return (
    <>
      {data && (
        <>
          <Text style={posterStyles.headingText}>{heading}</Text>
          <FlatList
            data={data.items}
            horizontal={true}
            renderItem={({ item }) => <Poster {...item} />}
            keyExtractor={(item) => item.id}
            style={{ Height: posterStyles.posterContainer.height }}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </>
  );
};

export default PosterList;
