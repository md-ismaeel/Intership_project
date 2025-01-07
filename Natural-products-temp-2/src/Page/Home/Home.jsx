import React from 'react'
import Hero from '../../Components/Hero/Hero'
import Contacts from '../Contacts/Contacts'
import Deals from '../../Components/Deals/Deals'
import Products from '../Products/Products'
import EcoDrive from '../../Components/EcoDrive/EcoDrive'
import Discover from '../../Components/DiscoverIngredients/Discover'

export default function Home() {
  return (
    <>
      <Hero />
      <Deals/>
      <EcoDrive/>
      <Discover/>
    </>
  )
}
