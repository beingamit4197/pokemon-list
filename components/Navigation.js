import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import PokemonList from './PokemonList'

const AppNavigator = createStackNavigator(
  {
    Pokemon: PokemonList,
  },
  {
    initialRouteName: 'Pokemon',
  },
)

export default createAppContainer(AppNavigator)
