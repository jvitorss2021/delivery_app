import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Home: React.FC = () => {
  return (
    <>
      <Header />

      <div className="relative w-full min-h-screen">
        <Image
          src="/images/FatFlame2.jpg"
          alt="Logo"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />

        <h1 className="absolute inset-0 flex flex-col items-center justify-start text-center text-4xl font-bold text-amber-500 mb-4">
          Bem-vindo ao Fat Flame Delivery!
        </h1>
        <h2 className="absolute inset-0 flex flex-col items-center justify-end text-center text-2xl text-amber-400">
          O melhor lugar para pedir sua comida favorita!
        </h2>
      </div>

      <Footer />
    </>
  );
};

export default Home;
