import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Overview from "./Components/Overview";
import KeyHighlights from "./Components/KeyHighlights";
import Events from "./Components/Events";
import Results from "./Components/Results";
import Gallery from "./Components/Gallery";
import Contactus from "./Components/Contactus";

// Admin panel

import Dashboard from "./Components/Admin/Dashboard";
import Main from "./Components/Admin/Main";
import AdminBanner from "./Components/Admin/AdminBanner";
import AdminPartners from "./Components/Admin/AdminPartners";
import Testimonials from "./Components/Admin/Testimonials";
import AdminOverview from "./Components/Admin/AdminOverview";
import AdminKeyhighlight from "./Components/Admin/AdminKeyhighlight";
import AdminEvents from "./Components/Admin/AdminEvents";
import AdminGallery from "./Components/Admin/AdminGallery";
import AdminContactus from "./Components/Admin/AdminContactus";
import GeneralEnquiry from "./Components/Admin/GeneralEnquiry";
import RegistrationList from "./Components/Admin/RegistrationList";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDoubleResult from "./Components/Admin/AdminDoubleResult";
import AdminSingleResult from "./Components/Admin/AdminSingleResult";
import AdminCategory from "./Components/Admin/AdminCategory";
import AdminAchivers from "./Components/Admin/AdminAchivers";
import Registration from "./Components/Registration";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />

          <Route
            path="/overview"
            element={
              <>
                <Header />
                <Overview />
                <Footer />
              </>
            }
          />

          <Route
            path="/keyhighlights"
            element={
              <>
                <Header />
                <KeyHighlights />
                <Footer />
              </>
            }
          />

          <Route
            path="/events"
            element={
              <>
                <Header />
                <Events />
                <Footer />
              </>
            }
          />
          <Route
            path="/registration"
            element={
              <>
                <Header />
                <Registration />
                <Footer />
              </>
            }
          />

          <Route
            path="/results"
            element={
              <>
                <Header />
                <Results />
                <Footer />
              </>
            }
          />

          <Route
            path="/gallery"
            element={
              <>
                <Header />
                <Gallery />
                <Footer />
              </>
            }
          />

          <Route
            path="/contactus"
            element={
              <>
                <Header />
                <Contactus />
                <Footer />
              </>
            }
          />

          {/* Admin panel  */}
          <Route
            path="/admin"
            element={
              <>
                <AdminLogin />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Main
                children={
                  <>
                    <Dashboard />
                  </>
                }
              />
            }
          />
          <Route
            path="/admin_banner"
            element={
              <Main
                children={
                  <>
                    <AdminBanner />
                  </>
                }
              />
            }
          />
          <Route
            path="/admin_partners"
            element={
              <Main
                children={
                  <>
                    <AdminPartners />
                  </>
                }
              />
            }
          />
          <Route
            path="/admin_testimonial"
            element={
              <Main
                children={
                  <>
                    <Testimonials />
                  </>
                }
              />
            }
          />
          <Route
            path="/admin_overview"
            element={
              <Main
                children={
                  <>
                    <AdminOverview />
                  </>
                }
              />
            }
          />
          <Route
            path="/admin_keyhighlight"
            element={
              <Main
                children={
                  <>
                    <AdminKeyhighlight />
                  </>
                }
              />
            }
          />
          <Route
            path="/admin_category"
            element={
              <Main
                children={
                  <>
                    <AdminCategory />
                  </>
                }
              />
            }
          />
          <Route
            path="/admin_events"
            element={
              <Main
                children={
                  <>
                    <AdminEvents />
                  </>
                }
              />
            }
          />

          <Route
            path="/admin_singleresults"
            element={
              <Main
                children={
                  <>
                    <AdminSingleResult />
                  </>
                }
              />
            }
          />

          <Route
            path="/admin_doubleresults"
            element={
              <Main
                children={
                  <>
                    <AdminDoubleResult />
                  </>
                }
              />
            }
          />

          <Route
            path="/admin_achivers"
            element={
              <Main
                children={
                  <>
                    <AdminAchivers />
                  </>
                }
              />
            }
          />

          <Route
            path="/admin_gallery"
            element={
              <Main
                children={
                  <>
                    <AdminGallery />
                  </>
                }
              />
            }
          />

          <Route
            path="/admin_contactus"
            element={
              <Main
                children={
                  <>
                    <AdminContactus />
                  </>
                }
              />
            }
          />
          <Route
            path="/registration-list"
            element={
              <Main
                children={
                  <>
                    <RegistrationList />
                  </>
                }
              />
            }
          />
          <Route
            path="/general_enquiry"
            element={
              <Main
                children={
                  <>
                    <GeneralEnquiry />
                  </>
                }
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


// https://shuttlesmash.shop/api//
