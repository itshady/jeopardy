import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View } from 'react-native';
import { FormControl, WarningOutlineIcon, Center, Select, CheckIcon } from "native-base";

function TeamsScreen({ navigation }) {
  const [value, setValue] = React.useState("");

  const handleChange = text => setValue(text);

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button title="Next" 
          onPress={() => value === "" ? null :
            navigation.push('PlayerSelect', {
            numOfTeams: value,
          })}
        />
      ),
    });
  }, [navigation, value]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Center>
        <FormControl w="3/4" maxW="300" isRequired isInvalid={value === ""}>
          <FormControl.Label>Enter Number of Teams</FormControl.Label>
          <Select minWidth="200" accessibilityLabel="Enter Number of Teams" placeholder="Enter Number of Teams" onValueChange={handleChange} 
          _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size={5} />
        }} mt="1">
            <Select.Item label="2" value="2" />
            <Select.Item label="3" value="3" />
            <Select.Item label="6" value="6" />
          </Select>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
          </FormControl.ErrorMessage>
        </FormControl>
      </Center>
    </View>
  );
}

export default TeamsScreen;