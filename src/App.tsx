import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { About } from './components/sections/About'
import { Contacts } from './components/sections/Contacts'
import { Hero } from './components/sections/Hero'
import { Services } from './components/sections/Services'
import { WhyUs } from './components/sections/WhyUs'

function LandingPage() {
  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Contacts />
    </Layout>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  )
}

export default App
