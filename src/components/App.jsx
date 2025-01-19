import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import FunctionalLayout from "../Layout/FunctionalLayout";
import { Route, Routes, } from "react-router-dom";
import Offers from "./main/offers/Offers";
import React, { useContext, useEffect, useState } from "react";
import OfferDetailPage from "./main/offers/OfferDetailPage";
import Reservation from "./reservation/Reservation";
import Confirmation from "./reservation/Confirmation";
import Passengers from "./reservation/Passengers";
import Ancillaries from "./reservation/Ancillaries";
import Review from "./reservation/Review";
import Payment from "./reservation/Payment";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "./errorpage/ErrorPage";
import Services from "./main/flightservices/Services";
import ServicesDetailPage from "./main/flightservices/ServicesDetailPage";
import Experience from "./main/experience/Experience";
import ExperienceDetailPage from "./main/experience/ExperienceDetailPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route  index element={<Main />} />
        <Route  path="/home" element={<Main />} />
        <Route path="/offers" element={<Offers/>} /> 
        <Route path="/offers/:offerId" element={<OfferDetailPage />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/services/:serviceId" element={<ServicesDetailPage />} />
        <Route path="/on-board-experience" element={<Experience/>} />
        <Route path="/on-board-experience/:experienceId" element={<ExperienceDetailPage/>} />
        <Route path="/experience" element={<Experience/>} />
        <Route path="/experience/:experienceId" element={<ExperienceDetailPage/>} />

      </Route>

      <Route path="/" element={<FunctionalLayout />}>
        <Route path="/book" element={<Reservation />} />
        <Route path="/confirm" element={<Confirmation />} />
        <Route path="/confirm/passengers" element={<Passengers />} />
        <Route path="/confirm/passengers/ancillaries" element={<Ancillaries />} />
        <Route path="/confirm/passengers/ancillaries/review" element={<Review />} />
        <Route path="/confirm/passengers/ancillaries/review/payment" element={<Payment />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
