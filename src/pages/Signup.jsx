import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = ({ setToken }) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
    newsletter: false,
  });

  const navigate = useNavigate();

  const handleChange = (event, key) => {
    const newObj = { ...userInfo };
    newObj[key] = event.target.value;
    setUserInfo(newObj);
  };

  const handleNewsletter = (event) => {
    const newObj = { ...userInfo };
    newObj.newsletter = event.target.checked;
    setUserInfo(newObj);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DATA}/user/signup`,
        userInfo
      );
      Cookies.set("token", response.data.token, { expires: 14 });
      setToken(Cookies.get("token"));
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <main>
      <div className="signup">
        <h1>S'inscrire</h1>
        <form method="post" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              handleChange(event, "username");
            }}
            value={userInfo.username}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => {
              handleChange(event, "email");
            }}
            value={userInfo.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              handleChange(event, "password");
            }}
            value={userInfo.password}
          />
          <label className="newsletter">
            <input
              type="checkbox"
              name="newsletter"
              onChange={handleNewsletter}
              value={userInfo.newsletter}
            />
            <span>S'inscrire à notre newsletter</span>
          </label>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button type="submit">S'inscrire</button>
        </form>

        <Link to="/login">
          <p>Tu as déjà un compte ? Connect-toi !</p>
        </Link>
      </div>
    </main>
  );
};
export default Signup;
