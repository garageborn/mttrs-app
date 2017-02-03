import React from 'react'
import { Image } from 'react-native'

const mttrs = require('../../assets/onboarding/mttrs-brand.png')
const welcome = require('../../assets/onboarding/01-welcome.png')
const highlights = require('../../assets/onboarding/02-highlights.png')
const editorial = require('../../assets/onboarding/03-editorial.png')
const publishers = require('../../assets/onboarding/04-publishers.png')
const categories = require('../../assets/onboarding/05-categorias.png')

module.exports = [
  {
    icon: <Image source={mttrs} />,
    iconStyle: {marginLeft: 10, position: 'relative', top: 2},
    image: welcome,
    imageStyle: {marginTop: 20},
    title: 'Bem vindo ao',
    description: 'Seu tempo é precioso. Leia as notícias que realmente importam no dia a dia.'
  },
  {
    image: highlights,
    imageStyle: {marginTop: 40},
    title: 'Notícias em destaque',
    description: 'Encontre as principais notícias do dia, ordenadas pelos índices sociais da Internet. Se está na boca do povo, você encontra aqui.'
  },
  {
    image: editorial,
    imageStyle: {marginTop: 80},
    title: 'Resumo do editor',
    description: 'Escritos cuidadosamente por nossa equipe. Muito úteis para a compreensão rápida da informação essencial de cada notícia.'
  },
  {
    image: publishers,
    imageStyle: {marginTop: 80},
    title: 'Mantenha o foco',
    description: 'Concentre-se na informação e não perca tempo lendo várias vezes a mesma notícia. Se desejar, encontre o seu veículo de mídia preferido.'
  },
  {
    image: categories,
    imageStyle: {marginTop: 40},
    title: 'Seu interesse a um clique',
    description: 'Todas as notícias são separadas em categorias. Encontre tudo organizado e leia sobre os assuntos que mais lhe interessam.'
  }
]
