import React from 'react'
import ChefNavbar from './components/ChefNavbar'
import ChefDashBoard from './components/ChefDashBoard'
import ChefFooter from './components/ChefFooter'

function ChefHome() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-slate-200" >
      <ChefNavbar/>
      <ChefDashBoard/>
      <ChefFooter/>

    </div>
  )
}

export default ChefHome
