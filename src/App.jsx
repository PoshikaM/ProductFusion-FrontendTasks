import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import Dashboard from './DashBoard';
import Navbar from './Navbar';

function App() {
  return(
    <div>
      <CartProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/Dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </Router>
    </CartProvider>
    </div>
  )
}

export default App
