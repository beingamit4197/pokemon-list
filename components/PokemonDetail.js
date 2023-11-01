import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native'
import axios from 'axios'

const dimensions = Dimensions.get('window')
const imageWidth = dimensions.width
const imageHeight = dimensions.height

const PokemonDetail = ({ route }) => {
  const { pokemon } = route.params
  const [details, setDetails] = useState(null)

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then(response => {
        setDetails(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [pokemon.name])

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Image
          style={styles.pokemonImage}
          resizeMode='center'
          source={{
            uri: `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`,
          }}
        />
        <Text style={styles.pokemonName}>Name: {pokemon.name}</Text>
        {details && (
          <Text style={styles.pokemonDetails}>
            Abilities:{' '}
            {details.abilities.map(ability => ability.ability.name).join(', ')}
          </Text>
        )}
      </View>
    </View>
  )
}

export default PokemonDetail

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
    margin: 20,
    backgroundColor: 'white',
    width: '90%',
    height: imageHeight - 400,
    alignSelf: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    alignItems: 'center',
  },
  pokemonImage: {
    width: imageWidth,
    height: imageHeight - 600,
    aspectRatio: 1,
  },
  pokemonName: {
    marginTop: 50,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  pokemonDetails: {
    fontSize: 16,
  },
})
