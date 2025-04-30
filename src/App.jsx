import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
// import ProductPage from './components/ProductPage';

function App() {
  return(
    <div>
      {/* <Router>
        <Link to='/product'>
        <button>Product</button>
        </Link>
        <Routes>
          <Route path='/product' element={<ProductPage/>}></Route>
        </Routes>
      </Router> */}
      <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          {/* <Route path="/cart" element={<CartPage />} /> */}
        </Routes>
      </Router>
    </CartProvider>
    </div>
  )
}

export default App
