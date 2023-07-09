import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('example.db')

export const getPlayers = (setPlayers) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * from players', null, 
      (txObj, resultSet) => setPlayers(resultSet.rows._array),
      (txObj, error) => console.log(error)
    )
  })
} 

export const deletePlayer = (id, players, setPlayers) => {
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

export const updateTeam = (team, id, players, setPlayers) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE players SET team = ? WHERE id = ?', [team, id], 
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          let existingPlayers = [...players]
          const indexToUpdate = existingPlayers.findIndex(player => player.id === id)
          existingPlayers[indexToUpdate].team = team
          setPlayers(existingPlayers)
        }
      },
      (txObj, error) => console.log(error)
    )
  })
}

export const getPlayerTeam = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT team from players WHERE id = ?', 
        [id], 
        (txObj, resultSet) => resolve(resultSet.rows._array),
        (txObj, error) => reject(error)
      )
    })
  })
} 

export const dropTable = () => {
  db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS players', [], 
      () => console.log('Table deleted successfully'),
      (_, error) => console.log('Error deleting table', error)
    )
  })
}