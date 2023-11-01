import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PokemonList from './components/PokemonList'
import PokemonDetail from './components/PokemonDetail'
import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Text } from 'react-native'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='PokemonList'
          component={PokemonList}
          options={{
            headerTitle: () => (
              <React.Fragment>
                <Entypo name='list' size={24} color='black' />
                <Text style={{ marginLeft: 8, fontSize: 18 }}>
                  Pokemon List
                </Text>
              </React.Fragment>
            ),
          }}
        />

        <Stack.Screen name='PokemonDetail' component={PokemonDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
