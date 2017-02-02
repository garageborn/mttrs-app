import React from 'react'
import { Image } from 'react-native'

module.exports = [
  {
    backgroundColor: '#F1F1F1',
    icon: <Image style={{marginLeft: 10, position: 'relative', top: 2}} source={require('../../assets/onboarding/mttrs-brand.png')} />,
    image: <Image style={{marginTop: 20}} resizeMode='contain' source={require('../../assets/onboarding/01-welcome.png')} />,
    title: 'Bem vindo ao',
    subtitle: 'Seu tempo é precioso. Leia as notícias que realmente importam no dia a dia.'
  },
  {
    backgroundColor: '#F1F1F1',
    image: <Image style={{marginTop: 40}} resizeMode='contain' source={require('../../assets/onboarding/02-highlights.png')} />,
    title: 'Notícias em destaque',
    subtitle: 'Encontre as principais notícias do dia, ordenadas pelos índices sociais da Internet. Se está na boca do povo, você encontra aqui.'
  },
  {
    backgroundColor: '#F1F1F1',
    image: <Image style={{marginTop: 80}} resizeMode='contain' source={require('../../assets/onboarding/03-editorial.png')} />,
    title: 'Resumo do editor',
    subtitle: 'Escritos cuidadosamente por nossa equipe. Muito úteis para a compreensão rápida da informação essencial de cada notícia.'
  },
  {
    backgroundColor: '#F1F1F1',
    image: <Image style={{marginTop: 80}} resizeMode='contain' source={require('../../assets/onboarding/04-publishers.png')} />,
    title: 'Mantenha o foco',
    subtitle: 'Concentre-se na informação e não perca tempo lendo várias vezes a mesma notícia. Se desejar, encontre o seu veículo de mídia preferido.'
  },
  {
    backgroundColor: '#F1F1F1',
    image: <Image style={{marginTop: 40}} resizeMode='contain' source={require('../../assets/onboarding/05-categorias.png')} />,
    title: 'Seu interesse a um clique',
    subtitle: 'Todas as notícias são separadas em categorias. Encontre tudo organizado e leia sobre os assuntos que mais lhe interessam.'
  }
]
