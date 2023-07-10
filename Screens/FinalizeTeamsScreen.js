import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { getPlayers } from '../queries';
import { Col, Grid, Row } from "react-native-easy-grid";

function FinalizeTeamsScreen({ navigation }) {
  const [players, setPlayers] = React.useState([])
  const [teams, setTeams] = React.useState({})

  React.useEffect(() => {
    getPlayers(setPlayers);
    console.log("hi")
  }, [navigation]); 
  
  React.useEffect(() => {
    const groupedTeams = players.reduce((groups, player) => {
      const key = player.team;
      if (key !== null) {
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(player);
      }
      return groups;
    }, {});
  
    setTeams(groupedTeams);
    console.log("hi2")
  }, [players]);

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 20, marginTop: 20, /* flex: 1, justifyContent: 'center', alignItems: 'center' */ }}>
      {Object.entries(teams).map(([team, players], index) => (
        <View key={index} style={{ width: '50%', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Team {team}</Text>
          {players.map(player => (
            <Text key={player.id}>{player.fname} {player.lname}</Text>
          ))}
        </View>
      ))}
    </View>
  );
}

export default FinalizeTeamsScreen;
