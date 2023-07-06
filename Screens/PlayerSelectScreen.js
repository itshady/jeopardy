import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Icon, VStack, HStack, Divider, IconButton } from 'native-base';
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { PLAYERS } from '../players'

const addButton = () => {
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
    }} />
  );
}

const removeButton = () => {
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
    }} />
  );
}

function PlayerSelectScreen({ route, navigation }) {
  const { numOfTeams, currTeam } = route.params;
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
          })}
        />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: '10px', marginVertical: 20 }}>
        {/* <Button leftIcon={<Ionicons name="md-person-add" size={24} color="white" />}
          onPress={() => setNumPlayers(c => c + 1)}
          size="lg" 
          alignSelf="center" 
          variant="solid" primary>
          Add Player
        </Button> */}
        <VStack space={0} divider={<Divider />} w="90%">
          {PLAYERS.map((player) => (
            <HStack justifyContent="space-between" key={player.id} backgroundColor="green.100">
              <Text size="lg" alignSelf="center" style={{fontWeight: "bold"}}>{player.name}</Text>
              <HStack style={{ gap: '10px' }}>
                {addButton()}
                {removeButton()}
              </HStack>
            </HStack>
          ))}
        </VStack>
      </View>
    </ScrollView>
  );
}

export default PlayerSelectScreen;
