import { BrowserRouter as Router } from "react-router-dom";
import Routes from './application/Router/components';
import Header from './components/Header';
import React from "react";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import store from "./Redux/store/store";
import { Provider } from "react-redux";
import MobileFooter from './components/mobileFooter';
import FooterMobileVersion from "./components/FooterMobileVersion";
import NavBarBackground from "./components/navBarbackground";
function App() {
  
  const [screen, setscreen] = React.useState(window.innerWidth)
  React.useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setscreen(newWidth);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions)
  }, []);
  // console.log("@@@@", location.pathname);

  return (
    <Provider store={store}>
      <React.Fragment>
        <ErrorBoundary>
          <Router>
            <Header />
            <div className="containerMargin">
              <NavBarBackground />
              <Routes />
            </div>

            {screen > 500 ? <Footer /> :  <FooterMobileVersion />}
            <MobileFooter />
          </Router>
        </ErrorBoundary>
      </React.Fragment>
    </Provider>
  );
}

export default App;
