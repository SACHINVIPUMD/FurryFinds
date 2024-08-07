import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import men_banner from './Components/Assets/banner_pets.png'
import women_banner from './Components/Assets/banner_foods.png'
import kid_banner from './Components/Assets/banner_products.png'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import PaymentPage from './Components/Payment/PaymentPage';
import Contact from './Components/Contact/Contact';
import AboutUs from './Components/About/AboutUs';
import UserProfile from './Components/UserProfile/UserProfile';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/pets' element={<ShopCategory banner={men_banner} category="Pets"/>}/>
        <Route path='/foods' element={<ShopCategory banner={women_banner} category="foods"/>}/>
        <Route path='/products' element={<ShopCategory banner={kid_banner} category="products"/>}/>
        <Route path="/product" element={<Product/>}>
        <Route path=":productId" element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/payment' element={<PaymentPage />}/>
        <Route path='/about' element={<AboutUs />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/profile' element={<UserProfile />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
