import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import "./App.css";
import Offer from "./components/Offer/Offer";
import Offer2 from "./components/Offer/Offer2";
import Cards from "./components/Cards/Cards"; 
import Footer from "./components/Footer/Footer";
import AboutUs from "./components/AboutUs/AboutUs";
function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Offer />
      <Offer2 />
      <AboutUs/>

      <Cards />
      <Footer/>
    </div>
  );
}

export default App;
