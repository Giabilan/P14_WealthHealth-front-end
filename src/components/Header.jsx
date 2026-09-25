import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-center py-4">
      <Link to="/">
        <h1 className="text-4xl font-bold text-teal-800">HRnet</h1>
      </Link>
    </header>
  );
};

export default Header;
