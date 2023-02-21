import { Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import AnimalDetailPage from './pages/AnimalDetailPage'
import DonatePage from './pages/DonatePage'
import About from './pages/About'
import AnimalList from './components/AnimalList'
import Nav from './components/Nav'
import Footer from './components/Footer'

import './CSS/App.css'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <div>
      <p className="petpurrsuit">PetPurrsuit</p>
        <Routes>
          <Route path='/' element={<SearchPage />}/>
          <Route path="/animal-details/:id" element={<AnimalDetailPage animals />}/>
          <Route path="animal-list" element={<AnimalList/>}/>
          <Route path='/donate' element={<DonatePage />}/>
          <Route path='/about' element={<About />}/>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App