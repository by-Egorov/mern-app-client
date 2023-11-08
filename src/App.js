import React, { useState } from 'react'
import Home from './Pages/Home/Home.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Profile from './Pages/Profile/Profile.jsx'
import Form from './Pages/Form/Form.jsx'
import Catalog from './Pages/Catalog/Catalog.jsx'
import Favorite from './Pages/Favorite/Favorite.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import User from './components/User/User.jsx'

function App() {
	const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem('user')
		return storedUser ? JSON.parse(storedUser) : null
	})
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/profile"
					element={<Profile user={user} setUser={setUser} />}
				/>
				<Route path="/user-info" element={<User />} />
				<Route path="/catalog" element={<Catalog />} />
				<Route path="/favorite" element={<Favorite />} />
				<Route path="/cart" element={<Cart />} />
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
