import { View, Image, FlatList } from 'react-native';
import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Heading } from '../../components/Heading';
import { GameCard } from '../../components/GameCard';

import { GAMES } from '../../utils/games';

export function Home() {
  return (
    <View style={styles.container}>
      <Image 
        source={logoImg} 
        style={styles.logo}
      />

      <Heading
        title="Find your duo!"
        subtitle="Select the game you want to play..."
      />

      <FlatList
        data={GAMES}
        keyExtractor={ item => item.id }
        renderItem={({ item }) => (
          <GameCard
            id={item.id}
            name={item.name}
            ads={item.ads}
            cover={item.cover}
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}