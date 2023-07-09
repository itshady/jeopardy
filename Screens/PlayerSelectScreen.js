import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Icon, VStack, HStack, Divider, IconButton } from 'native-base';
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { dropTable, getPlayerTeam, getPlayers, updateTeam } from '../queries';

function PlayerSelectScreen({ route, navigation }) {
  const { numOfTeams, currTeam } = route.params;
  const [numPlayers, setNumPlayers] = React.useState(0);
  const [players, setPlayers] = React.useState([])

  React.useEffect(() => {
    console.log(players)
  }, [players]);
  
  React.useEffect(() => {
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
          })}
        />
      ),
    });

    getPlayers(setPlayers)
  }, [navigation]);

  const addButton = (player) => {
    return (
      <IconButton isDisabled={player.team !== null && player.team !== currTeam}
        icon={<Icon as={Entypo} name="circle-with-plus" />} borderRadius="full" _icon={{
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
        // way to use Promises to return data from SQL queries
        // getPlayerTeam(id)
        //   .then(team => {
        //     if (team === null) updateTeam(currTeam, id, players, setPlayers)
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   })
        if (player.team === null) updateTeam(currTeam, player.id, players, setPlayers)
      }}
      />
    );
  }
  
  const removeButton = (player) => {
    return (
      <IconButton isDisabled={player.team !== null && player.team !== currTeam}
        icon={<Icon as={Entypo} name="circle-with-minus" />} borderRadius="full" _icon={{
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
        if (player.team === currTeam) updateTeam(null, player.id, players, setPlayers)
      }}
      />
    );
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: 30 }}>
        <VStack space={0} divider={<Divider />} w="90%">
          {players.map((player) => (
            <HStack justifyContent="space-between" key={player.id} backgroundColor={player.team == currTeam ? "green.100" : player.team != null ? "red.100" : null}>
              <Text size="lg" alignSelf="center" style={{fontWeight: "bold"}}>{player.fname} {player.lname}</Text>
              <HStack style={{ gap: '10px' }}>
                {addButton(player)}
                {removeButton(player)}
              </HStack>
            </HStack>
          ))}
        </VStack>
      </View>
    </ScrollView>
  );
}

export default PlayerSelectScreen;
