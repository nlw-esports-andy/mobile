import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])
  const navigation = useNavigation()
  
  useEffect(() => {
    fetch('http://192.168.0.121:3333/games')
    .then(response => response.json())
    .then(data => {
      setGames(data)
    })
  }, [])

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl })
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
          source={logoImg} 
          style={styles.logo}
        />

        <Heading
          title="Find your duo!"
          subtitle="Select the game you want to play..."
        />

        <FlatList
          data={games}
          keyExtractor={ item => item.id }
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.containerList}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}