import React, { useState, useEffect } from 'react'
import Home from './Pages/Home/Home.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { $authHost } from './axios.js'
import Profile from './Pages/Profile/Profile.jsx'
import Form from './Pages/Form/Form.jsx'
import Catalog from './Pages/Catalog/Catalog.jsx'
import Favorite from './Pages/Favorite/Favorite.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import ProductPage from './Pages/ProductPage/ProductPage.jsx'
import User from './components/User/User.jsx'

function App() {
	const [user, setUser] = useState(null)
	
	useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await $authHost.get('/user/me')
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [])
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home user={user}/>} />
				<Route
					path="/profile"
					element={<Profile user={user} setUser={setUser} />}
				/>
				<Route path="/user-info" element={<User user={user}/>} />
				<Route path="/catalog" element={<Catalog user={user}/>} />
				<Route path="/favorite" element={<Favorite user={user}/>} />
				<Route path="/cart" element={<Cart user={user}/>} />
				<Route path=":id" element={<ProductPage />} />
				<Route
					path="/register"
					element={<Form user={user} setUser={setUser} />}
				/>
				<Route path="/login" element={<Form user={user} setUser={setUser} />} />
			</Routes>
		</Router>
	)
}

export default App
