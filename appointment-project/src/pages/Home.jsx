import React from "react";
import Navbar from "../componets/Navbar";
import MainLayout from "../layouts/MainLayout";
import Footer from "../componets/Footer";
import CardsListing from "../componets/CardsListing";
import MobileCalenderview from "../componets/MobileCalenderview";

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

