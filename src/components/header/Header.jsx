import VintedLogo from "../../assets/img/VintedLogo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ search, setSearch, token, setToken }) => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={VintedLogo} alt="vinted" />
        </Link>
        <input
          type="text"
          name="query"
          placeholder="Recherche des articles"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          value={search}
        />
        {token ? (
          <>
            <button
              className="logoff"
              onClick={() => {
                Cookies.remove("token");
                setToken(null);
              }}
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <div className="connexion">
              <Link to="/signup">
                <button>S'incrire</button>
              </Link>
              <Link to="/login">
                <button>Se connecter</button>
              </Link>
            </div>
          </>
        )}
        <Link to="/publish">
          <button className="sell-your-articles">Vends tes articles</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
