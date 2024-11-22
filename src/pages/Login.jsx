import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
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
      await axios.post(`${import.meta.env.VITE_DATA}/user/login`, userInfo);
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

        <p>Pas encore de compte ? Inscris-toi !</p>
      </div>
    </main>
  );
};

export default Login;
