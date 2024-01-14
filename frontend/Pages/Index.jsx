import Footer from "../src/components/footer/Footer";
import Header from "../src/components/header/Header";
import Accueil from "../src/components/index/Accueil";
import Carrousel from "../src/components/carrousel/Carrousel";
import barça from '../src/assets/carrousel/pexels-mihai-vlasceanu-4623974.jpg';
import chaise from '../src/assets/carrousel/pexels-israel-torres-17723966.jpg';
import liverpool from '../src/assets/carrousel/pexels-md-jawadur-rahman-12537022.jpg';
import national from '../src/assets/carrousel/pexels-tembela-bohle-10463646.jpg';
import React from "react";

const Index = () => {
    const images = [barça, chaise, liverpool, national];
  
    return (
      <>
        <Header />
        <Carrousel images={images} />
        <Accueil />
        <Footer />
      </>
    );
  };
  

export default Index;