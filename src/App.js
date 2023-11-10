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
import Privacy from './pages/privacy';
import TermsConditions from './pages/terms-conditions';
import MultiStepForm from './pages/multi-step-form';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About title="About Us"/>} />
        <Route path="/pricing" element={<Pricing title="Pricing"/>} />
        <Route path="/services" element={<Services title="Services"/>} />
        <Route path="/contact" element={<Contact title="Contact Us"/>} />
        <Route path="/book-a-tour" element={<Booking title="Book a Tour"/>} />
        <Route path="/privacy-policy" element={<Privacy title="Privacy Policy"/>} />
        <Route path="/terms-and-conditions" element={<TermsConditions title="Terms & Conditions"/>} />
        <Route path="/multi-step-form" element={<MultiStepForm title="Terms & Conditions"/>} />
      </Routes>
     <Footer />
    </div>
  );
}

export default App;
