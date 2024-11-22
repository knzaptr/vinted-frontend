import VintedLogo from "../../assets/img/VintedLogo.png";
import { Link } from "react-router-dom";

const Header = ({ search, setSearch }) => {
  return (
    <header>
      <div className="container">
        <img src={VintedLogo} alt="vinted" />
        <input
          type="text"
          name="query"
          placeholder="Recherche des articles"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          value={search}
        />
        <div className="connexion">
          <Link to="/signup">
            <button>S'incrire</button>
          </Link>
          <Link to="/login">
            <button>Se connecter</button>
          </Link>
        </div>
        <button className="sell-your-articles">Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
