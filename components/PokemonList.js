import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

const dimensions = Dimensions.get('window')
const imageWidth = dimensions.width / 2 // Divide by 2 for two cards in a row
const imageHeight = dimensions.height

const PokemonList = () => {
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])
  const [offset, setOffset] = useState(0)

  const navigation = useNavigation()

  const fetchData = newOffset => {
    setLoading(true)
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${newOffset}`)
      .then(response => {
        setPokemonData(response.data.results)
        setLoading(false)
        setOffset(newOffset)
        console.log(response.data)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData(0)
  }, [])

  const getPokemonImage = pokemonName => {
    return `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`
  }

  const handlePrevPress = () => {
    if (offset >= 10) {
      fetchData(offset - 10)
    }
  }

  const handleNextPress = () => {
    fetchData(offset + 10)
  }

  if (loading) {
    return (
      <ActivityIndicator
        size='large'
        color={'grey'}
        style={{ marginTop: 10 }}
      />
    )
  }

  return (
    <View style={{ width: imageWidth * 2, height: imageHeight - 70 }}>
      <View style={styles.mainContainer}>
        {offset >= 10 ? (
          <MaterialIcons
            onPress={handlePrevPress}
            name='navigate-before'
            size={40}
            color='black'
          />
        ) : (
          <MaterialIcons
            onPress={handlePrevPress}
            name='navigate-before'
            size={40}
            color='grey'
            disabled
          />
        )}
        <MaterialIcons
          onPress={handleNextPress}
          name='navigate-next'
          size={40}
          color='black'
        />
      </View>
      <FlatList
        data={pokemonData}
        keyExtractor={item => item.name}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PokemonDetail', { pokemon: item })
            }}
          >
            <View style={styles.card}>
              <Image
                style={styles.cardImage}
                source={{ uri: getPokemonImage(item.name) }}
                resizeMode='center'
              />
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default PokemonList

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
    width: imageWidth - 20,
    height: imageHeight - 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: imageWidth - 20,
    height: imageHeight - 500,
    resizeMode: 'cover',
  },
  cardText: {
    padding: 10,
    fontSize: 18,
    bottom: 30,
  },
  continuationLabel: {
    alignItems: 'center',
  },
  continuationText: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 10,
  },
})
