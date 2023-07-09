import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { Icon, VStack, HStack, Divider, IconButton } from 'native-base';
import { Entypo } from "@expo/vector-icons";
import * as SQLite from 'expo-sqlite'

function StartScreen({ }) { 
  const db = SQLite.openDatabase('example.db')
  const [players, setPlayers] = React.useState([])
  const [currFname, setCurrFname] = React.useState(undefined)
  const [currLname, setCurrLname] = React.useState(undefined)

  React.useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * from players', null, 
        (txObj, resultSet) => setPlayers(resultSet.rows._array),
        (txObj, error) => console.log(error)
      )
    })
  }, [])

  const removeButton = (id) => {
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
        deletePlayer(id)
      }}
      />
    );
  }

  const addPlayer = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO players (fname, lname) values (?, ?)', [currFname, currLname], 
        (txObj, resultSet) => {
          let existingPlayers = [...players]
          existingPlayers.push({ id: resultSet.insertId, fname: currFname, lname: currLname })
          setPlayers(existingPlayers)
          setCurrFname(undefined)
          setCurrLname(undefined)
        },
        (txObj, error) => console.log(error)
      )
    })
  }

  const deletePlayer = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM players WHERE id = ?', [id], 
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingPlayers = [...players].filter(player => player.id !== id)
            setPlayers(existingPlayers)
          }
        },
        (txObj, error) => console.log(error)
      )
    })
  }

  const showPlayers = () => {
    return (
      <VStack space={0} divider={<Divider />} w="90%">
        {players.map((player) => (
          <HStack justifyContent="space-between" key={player.id} >
            <Text size="lg" alignSelf="center" style={{fontWeight: "bold"}}>{player.fname} {player.lname}</Text>
            <HStack style={{ gap: '10px' }}>
              {removeButton(player.id)}
            </HStack>
          </HStack>
        ))}
      </VStack>
    )
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Text>Start Screen</Text>
        <HStack>
          <TextInput style={{ margin: 10, fontSize: 20 }} value={currFname} placeholder="First Name" onChangeText={setCurrFname} />
          <TextInput style={{ margin: 10, fontSize: 20 }} value={currLname} placeholder="Last Name" onChangeText={setCurrLname} />
        </HStack>
        <Button title='Add Player' onPress={addPlayer}></Button>
        {showPlayers()}
      </View>
    </ScrollView>
  );
}

export default StartScreen;
