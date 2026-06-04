import useReveal from "../hooks/useReveal";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Marquee from "./Marquee";
import WorksStrip from "./WorksStrip";
import Insert1 from "./Insert1";
import Services from "./Services";
import BeforeAfter from "./BeforeAfter";
import Numbers from "./Numbers";
import TextMarquee from "./TextMarquee";
import Process from "./Process";
import Cities from "./Cities";
import Reviews from "./Reviews";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import FloatingBtn from "./FloatingBtn";

export default function HomePage() {
  useReveal();

  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <Marquee />
      <WorksStrip />
      <Insert1 />
      <Services />
      <BeforeAfter />
      <Numbers />
      <TextMarquee />
      <Process />
      <Cities />
      <Reviews />
      <ContactForm />
      <Footer />
      <FloatingBtn />
    </>
  );
}
