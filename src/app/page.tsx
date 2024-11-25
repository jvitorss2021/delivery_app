import Image from "next/image";

const Home: React.FC = () => {
  return (
    <>
      <div className="relative w-full min-h-screen">
        <Image
          src="/images/fatflame.jpg"
          alt="Logo"
          fill
          style={{ objectFit: "cover" }}
          className="z-0"
        />

        <h1 className="absolute inset-0 flex flex-col items-center justify-start text-center text-4xl font-bold text-amber-500 mb-4"></h1>
        <h2 className="absolute inset-0 flex flex-col items-center justify-end text-center text-2xl text-orange-900">
          O melhor lugar para pedir sua comida favorita!
        </h2>
      </div>
    </>
  );
};

export default Home;
