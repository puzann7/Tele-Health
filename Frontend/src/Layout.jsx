import React from 'react'
import Navbar from './components/Landing_page/Navbar'
import { Outlet } from 'react-router'
import Footer from './components/Landing_page/Footer'

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default Layout
