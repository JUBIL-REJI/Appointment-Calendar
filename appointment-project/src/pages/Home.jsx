import React from "react";
import Navbar from "../components/Navbar";
import MainLayout from "../layouts/MainLayout";
import Footer from "../components/Footer";
import CardsListing from "../components/CardsListing";
import MobileCalenderview from "./components/MobileCalenderview";

function Home() {
  return (
    <>
      <Navbar />
      <main className="hidden sm:block">
        <MainLayout />
      </main>
      <div className="block sm:hidden">
        <MobileCalenderview />
      </div>
      <CardsListing />
      <Footer />
    </>
  );
}

export default Home;

