import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import {RouterProvider, Route, createBrowserRouter, createRoutesFromElements} from "react-router"
import Layout from './Layout.jsx'
import TelehealthLandingPage from './components/HealthcareLandingPage.jsx'
import Register from './pages/Auth/Register.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route path='' element={<TelehealthLandingPage />} />
            <Route path='home' element={<App />} />
            <Route path='register' element={<Register />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
    </RouterProvider>

)
