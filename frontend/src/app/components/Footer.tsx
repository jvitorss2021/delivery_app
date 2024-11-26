const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-500 py-2">
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
