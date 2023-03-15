import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Form from './pages/Form'
import AnaSayfa from './pages/AnaSayfa'
import Success from './pages/Success'
import NotFound from './pages/NotFound'
import Layout from './layouts/Layout'

const App = () => {
  const [siparis, setSiparis] = useState({})

  const siparisSonucu = (e) => {
    setSiparis(e)
    console.log(siparis)
  }

  return (
    <div className="main-Container">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AnaSayfa />} />
          <Route
            path="/pizza"
            element={<Form siparisSonucu={siparisSonucu} />}
          />
          <Route path="/success" element={<Success siparis={siparis} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}
export default App
