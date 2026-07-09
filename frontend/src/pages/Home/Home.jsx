import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import LandingPage from "../../components/home/LandingPage";


function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default Home;