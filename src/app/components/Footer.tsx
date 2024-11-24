const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
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
