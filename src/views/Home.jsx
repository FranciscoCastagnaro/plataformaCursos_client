import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { MainInfo } from "../components/MainInfo";
import { Footer } from "../components/Footer";
import { UserOpinions } from "../components/UserOpinions";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <MainInfo />
      <UserOpinions />
      <Footer />
    </>
  );
};
