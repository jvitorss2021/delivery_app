const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-white py-2">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Fat Flame. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
