import Image from "next/image";

const Home: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen">
      <Image
        src="/images/fatflame.jpg"
        alt="Logo"
        fill
        style={{ objectFit: "cover" }}
        className="z-0"
      />
    </div>
  );
};

export default Home;
