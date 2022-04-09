import React from 'react'
import FilterContainer from '../components/FilterContainer'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div>
      <Navbar />
      <FilterContainer />
      <Footer />
    </div>
  )
}

export default Home