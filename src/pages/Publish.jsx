import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TiPlus } from "react-icons/ti";
import axios from "axios";

const Publish = ({ token }) => {
  const navigate = useNavigate();

  const [articleInfo, setArticleInfo] = useState({
    title: undefined,
    picture: undefined,
    description: undefined,
    brand: undefined,
    size: undefined,
    color: undefined,
    condition: undefined,
    city: undefined,
    price: null,
    exchange: false,
  });

  const [preview, setPreview] = useState([]);

  // const [picture, setPicture] = useState(null);
  // const [title, setTitle] = useState(null);
  // const [description, setDescription] = useState(null);
  // const [brand, setBrand] = useState(null);
  // const [size, setSize] = useState(null);
  // const [color, setColor] = useState(null);
  // const [condition, setCondition] = useState(null);
  // const [city, setCity] = useState(null);
  // const [price, setPrice] = useState(0);
  // const [exchange, setExchange] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("submit");
      const formData = new FormData();
      for (let [key, value] of Object.entries(articleInfo)) {
        console.log(key, value);

        formData.append(key, value);
      }

      {
        /* formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("exchange", exchange); */
      }

      const response = await axios.post(
        `${import.meta.env.VITE_DATA}/offer/publish`,
        formData,
        {
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Display the key/value pairs
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ":" + pair[1]);
      // }

      navigate(`/offer/${response.data._id}`);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (event, key) => {
    const newObj = { ...articleInfo };
    newObj[key] = event.target.value;
    setArticleInfo(newObj);
  };

  const handleFileChange = (event) => {
    const newObj = { ...articleInfo };
    newObj.picture = event.target.files[0];
    setArticleInfo(newObj);
    const newTab = [...preview];
    newTab.push(URL.createObjectURL(newObj.picture));
    setPreview(newTab);
    console.log(newObj.picture);
    console.log(event.target.files);
  };

  const handleExchangeChange = (event) => {
    const newObj = { ...articleInfo };
    newObj.exchange = event.target.checked;
    setArticleInfo(newObj);
  };

  return !token ? (
    <Navigate to="/login" />
  ) : (
    <main className="publish">
      <div className="container">
        <h1>Vends ton article</h1>
        <form className="add-new-article" onSubmit={handleSubmit}>
          <div className="picture formulaire">
            {preview.length > 0 && (
              <div className="preview-container">
                {preview.map((item, index) => {
                  return (
                    <div key={index} className="preview">
                      <img src={item} />
                    </div>
                  );
                })}
              </div>
            )}

            <label htmlFor="picture">
              <TiPlus /> <span>Ajoute une photo</span>
              <input
                className="hidden"
                type="file"
                name="picture"
                id="picture"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="title-description formulaire">
            <label htmlFor="title">
              Titre
              <input
                type="text"
                name="title"
                id="title"
                onChange={(event) => handleChange(event, "title")}
                value={articleInfo.title}
                placeholder="ex: Chemise Sézane verte"
              />
            </label>

            <label htmlFor="description">
              Description
              <textarea
                type="text"
                name="description"
                id="description"
                onChange={(event) => handleChange(event, "description")}
                value={articleInfo.description}
                placeholder="ex: Portée quelquefois, taille correctement"
              ></textarea>
            </label>
          </div>

          <div className="details formulaire">
            <label htmlFor="brand">
              Marque
              <input
                type="text"
                name="brand"
                id="brand"
                onChange={(event) => handleChange(event, "brand")}
                value={articleInfo.brand}
                placeholder="ex: Zara"
              />
            </label>
            <label htmlFor="size">
              Taille
              <input
                type="text"
                name="size"
                id="size"
                onChange={(event) => handleChange(event, "size")}
                value={articleInfo.size}
                placeholder="ex: L / 40 / 12"
              />
            </label>

            <label htmlFor="color">
              Couleur
              <input
                type="text"
                name="color"
                id="color"
                onChange={(event) => handleChange(event, "color")}
                value={articleInfo.color}
                placeholder="ex: Fushia"
              />
            </label>

            <label htmlFor="condition">
              État
              <input
                type="text"
                name="condition"
                id="condition"
                onChange={(event) => handleChange(event, "condition")}
                value={articleInfo.condition}
                placeholder="ex: Neuf avec étiquette"
              />
            </label>

            <label htmlFor="city">
              Lieu
              <input
                type="text"
                name="city"
                id="city"
                onChange={(event) => handleChange(event, "city")}
                value={articleInfo.city}
                placeholder="ex: Paris"
              />
            </label>
          </div>

          <div className="price formulaire">
            <label htmlFor="price">
              Prix
              <input
                type="number"
                name="price"
                id="price"
                onChange={(event) => handleChange(event, "price")}
                value={articleInfo.price}
                placeholder="1.00 €"
              />
            </label>

            <label htmlFor="exchange">
              <input
                type="checkbox"
                name="exchange"
                id="exchange"
                onChange={handleExchangeChange}
                value={articleInfo.exchange}
              />
              Je suis intéressé(e) par les échanges
            </label>
          </div>

          <button type="submit">Ajouter</button>
        </form>
      </div>
    </main>
  );
};

export default Publish;
