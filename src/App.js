import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import Contact from "./pages/contact";
import Pricing from "./pages/pricing";
import About from "./pages/about";
import Booking from "./pages/booking";
import Services from "./pages/services";
import Privacy from "./pages/privacy";
import TermsConditions from "./pages/terms-conditions";
import NotFound from "./pages/not-found";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Layout from "./components/layout";
import UserDashboard from "./pages/user/UserDashboard";
import Register from "./pages/register";
import Login from "./pages/login";
import Bio from "./pages/user/user-tabs/Bio";
import Experience from "./pages/user/user-tabs/Experience";
import Education from "./pages/user/user-tabs/Education";
import Cv from "./pages/user/user-tabs/Cv";
import AdvanceBooking from "./pages/user/user-tabs/AdvanceBooking";
import BookingHistory from "./pages/user/user-tabs/BookingHistory";
import CVUpload from "./pages/user/user-tabs/CVUpload";
import Employees from "./pages/user/user-tabs/Employees";
import Hiring from "./pages/user/user-tabs/Hiring";
import Members from "./pages/user/user-tabs/Members";
import JobAds from "./pages/user/user-tabs/JobAds";

function App() {
  const { isAuthenticated, userType } = useContext(AuthContext);

  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About title="About Us" />
            </Layout>
          }
        />
        <Route
          path="/pricing"
          element={
            <Layout>
              <Pricing title="Pricing" />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <Services title="Services" />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact title="Contact Us" />
            </Layout>
          }
        />
        <Route
          path="/book-a-tour"
          element={
            <Layout>
              <Booking title="Book a Tour" />
            </Layout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <Layout>
              <Privacy title="Privacy Policy" />
            </Layout>
          }
        />
        <Route
          path="/terms-and-conditions"
          element={
            <Layout>
              <TermsConditions title="Terms & Conditions" />
            </Layout>
          }
        />
        <Route path="*" element={<NotFound title="Page Not Found" />} />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Layout>
                <Register />
              </Layout>
            )
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Layout><Login /></Layout>}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <UserDashboard userType={userType} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="" element={<Bio />}/>
          <Route path="education" element={<Education />}/>
          <Route path="experience" element={<Experience />}/>
          <Route path="cv" element={<Cv />}/>
          <Route path="cvupload" element={<CVUpload />}/>
          <Route path="advance-booking" element={<AdvanceBooking />}/>
          <Route path="booking-history" element={<BookingHistory />}/>
          <Route path="employees" element={<Employees />}/>
          <Route path="hirings" element={<Hiring />}/>
          <Route path="members" element={<Members />}/>
          <Route path="job-advertisements" element={<JobAds />}/>

        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
