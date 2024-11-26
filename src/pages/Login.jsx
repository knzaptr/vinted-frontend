import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ setToken }) => {
  const [userInfo, setUserInfo] = useState({
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (event, key) => {
    const newObj = { ...userInfo };
    newObj[key] = event.target.value;
    setUserInfo(newObj);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DATA}/user/login`,
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
      <div className="login">
        <h1>Se connecter</h1>
        <form method="post" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => handleChange(event, "email")}
            value={userInfo.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={(event) => handleChange(event, "password")}
            value={userInfo.password}
          />

          <button type="submit">Se connecter</button>
        </form>
        <Link to="/signup">
          <p>Pas encore de compte ? Inscris-toi !</p>
        </Link>
      </div>
    </main>
  );
};

export default Login;
