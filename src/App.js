import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/home';
import Contact from './pages/contact';
import Pricing from './pages/pricing';
import About from './pages/about';
import Header from './components/header';
import Footer from './components/footer';
import Booking from './pages/booking';
import Services from './pages/services';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About title="About Us"/>} />
        <Route path="/services" element={<Services title="Services"/>} />
        <Route path="/pricing" element={<Pricing title="Pricing"/>} />
        <Route path="/contact" element={<Contact title="Contact Us"/>} />
        <Route path="/book-a-tour" element={<Booking title="Book a Tour"/>} />
      </Routes>
     <Footer />
    </div>
  );
}

export default App;
