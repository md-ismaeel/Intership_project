import React from 'react'
import Hero from '../../Components/Hero/Hero'
import Contacts from '../Contacts/Contacts'
import Deals from '../../Components/Deals/Deals'
import Products from '../Products/Products'
import EcoDrive from '../../Components/EcoDrive/EcoDrive'
import Discover from '../../Components/DiscoverIngredients/Discover'
import FanFavorites from '../../Components/Deals/FanFavorite'
import SweetDeals from '../../Components/Deals/SweetDeals'

export default function Home() {
  return (
    <main className='w-full overflow-x-hidden'>
      <Hero />
      {/* <Deals/> */}
      <FanFavorites />
      <SweetDeals />
      <EcoDrive />
      <Discover />
    </main>
  )
}
