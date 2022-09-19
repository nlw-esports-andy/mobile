import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'

import { GameParams } from '../../@types/navigation';

import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

import { styles } from './styles';
import { THEME } from '../../theme';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')
  
  const route = useRoute()
  const navigation = useNavigation()
  const game = route.params as GameParams

  useEffect(() => {
    fetch(`http://192.168.0.121:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => {
      setDuos(data)
    })
  }, [])

  function handleReturn() {
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.0.121:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => {
      setDiscordDuoSelected(data.discord)
    })
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleReturn}>
            <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading 
          title={game.title}
          subtitle="Connect and start playing!" 
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard 
              data={item}
              onConnect={() => {getDiscordUser(item.id)}}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              No published ads for this game yet
            </Text>
          )}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}