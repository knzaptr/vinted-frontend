import { Navigate } from "react-router-dom";
import { useState } from "react";
import { TiPlus } from "react-icons/ti";
import axios from "axios";

const Publish = ({ token }) => {
  const [articleInfo, setArticleInfo] = useState({
    title: undefined,
    picture: undefined,
    description: undefined,
    brand: undefined,
    size: undefined,
    colour: undefined,
    condition: undefined,
    city: undefined,
    price: 1,
    exchange: false,
  });

  // const [picture, setPicture] = useState(null);
  // const [title, setTitle] = useState(null);
  // const [description, setDescription] = useState(null);
  // const [brand, setBrand] = useState(null);
  // const [size, setSize] = useState(null);
  // const [colour, setColour] = useState(null);
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
      formData.append("colour", colour);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("exchange", exchange); */
      }

      await axios.post(`${import.meta.env.VITE_DATA}/offer/publish`, formData, {
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      // Display the key/value pairs
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ":" + pair[1]);
      // }
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
          <div className="picture">
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

          <div className="title-description">
            <label htmlFor="title">
              Titre
              <input
                type="text"
                name="title"
                id="title"
                onChange={(event) => handleChange(event, "title")}
                value={articleInfo.title}
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
              ></textarea>
            </label>
          </div>

          <div className="details">
            <label htmlFor="brand">
              Marque
              <input
                type="text"
                name="brand"
                id="brand"
                onChange={(event) => handleChange(event, "brand")}
                value={articleInfo.brand}
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
              />
            </label>

            <label htmlFor="colour">
              Couleur
              <input
                type="text"
                name="colour"
                id="colour"
                onChange={(event) => handleChange(event, "colour")}
                value={articleInfo.colour}
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
              />
            </label>
          </div>

          <div className="price">
            <label htmlFor="price">
              Prix
              <input
                type="number"
                name="price"
                id="price"
                onChange={(event) => handleChange(event, "price")}
                value={articleInfo.price}
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
