import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Icon, VStack, HStack, Divider, IconButton } from 'native-base';
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
       
const addButton = (id, team, players, updatePlayerTeam) => {
  return (
    <IconButton icon={<Icon as={Entypo} name="circle-with-plus" />} borderRadius="full" _icon={{
      color: "green.500",
      size: "md"
    }} _pressed={{
      bg: "green.600:alpha.20",
      _icon: {
        name: "emoji-flirt"
      },
      _ios: {
        _icon: {
          size: "lg"
        }
      }
    }} _ios={{
      _icon: {
        size: "lg"
      }
    }} 
    onPress={() => {
      updatePlayerTeam(id, team)
      console.log(players[id])
      console.log("here")
    }}
    />
  );
}

const removeButton = (id, team, players, updatePlayerTeam) => {
  return (
    <IconButton icon={<Icon as={Entypo} name="circle-with-minus" />} borderRadius="full" _icon={{
      color: "red.500",
      size: "md"
    }} _pressed={{
      bg: "red.600:alpha.20",
      _icon: {
        name: "emoji-flirt"
      },
      _ios: {
        _icon: {
          size: "lg"
        }
      }
    }} _ios={{
      _icon: {
        size: "lg"
      }
    }} 
    onPress={() => {
      if (players[id].team == team) updatePlayerTeam(id, null)
    }}
    />
  );
}

function PlayerSelectScreen({ route, navigation }) {
  // players, updatePlayerTeam
  const { numOfTeams, currTeam, players, updatePlayerTeam } = route.params;
  const [numPlayers, setNumPlayers] = React.useState(0);
  
  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      title: `Team ${currTeam}`,
      headerRight: () => ( currTeam == numOfTeams ? 
        <Button title="Confirm"
          onPress={() =>
            navigation.push('FinalTeams', {
              numOfTeams: numOfTeams,
              currTeam: currTeam + 1,
            })}
        />
        :
        <Button title="Next Team"
          onPress={() =>
            navigation.push('PlayerSelect', {
            numOfTeams: numOfTeams,
            currTeam: currTeam + 1,
            players: players,
            updatePlayerTeam: updatePlayerTeam,
          })}
        />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: '10px', marginVertical: 20 }}>
        <VStack space={0} divider={<Divider />} w="90%">
          {players.map((player) => (
            <HStack justifyContent="space-between" key={player.id} backgroundColor={player.team == currTeam ? "green.100" : null}>
              <Text size="lg" alignSelf="center" style={{fontWeight: "bold"}}>{player.name}</Text>
              <HStack style={{ gap: '10px' }}>
                {addButton(player.id, currTeam, players, updatePlayerTeam)}
                {removeButton(player.id, currTeam, players, updatePlayerTeam)}
              </HStack>
            </HStack>
          ))}
        </VStack>
          {players.map((player) => (
            <Text key={player.id}>{player.name} - {player.team}</Text>
          ))}
      </View>
    </ScrollView>
  );
}

export default PlayerSelectScreen;
