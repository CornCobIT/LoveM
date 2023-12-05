import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { STYLES } from '../theme/style'
import Button from '../components/Button'

export default function Home({navigation}) {
  return (
    <View style={STYLES.container}>
      <Text style={STYLES.title}>Home</Text>
      <Button text="Come back intro" handlePress={()=> navigation.navigate('IntroSlide')} />
    </View>
  )
}
