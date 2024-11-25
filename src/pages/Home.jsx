import { useState, useEffect } from "react";
import Offers from "../components/content/Offers";
import axios from "axios";
import Hero from "../assets/img/hero.jpg";
import Tear from "../assets/img/tear.svg";

const Home = ({ search }) => {
  const [offers, setOffers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [priceMax, setPriceMax] = useState();
  const [priceMin, setPriceMin] = useState(0);
  const [sort, setSort] = useState(false);
  const [limit, setLimit] = useState(100);
  const [nbTotalOffers, setNbTotalOffers] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DATA}/v2/offers`,
          {
            params: {
              title: search,
              priceMax: priceMax,
              priceMin: priceMin,
              sort: sort ? "price-desc" : "price-asc",
              limit: limit,
            },
          }
        );
        setNbTotalOffers(response.data.count);
        setOffers(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [search, priceMax, priceMin, sort, limit]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <main>
      <div className="hero">
        <img className="bg-hero" src={Hero} alt="" />{" "}
        <div>
          <img className="tear-hero" src={Tear} alt="" />
        </div>
      </div>
      <div className="container">
        <div className="filter">
          <label>
            <input
              type="checkbox"
              onChange={(event) => {
                setSort(event.target.checked);
              }}
              value={sort}
            />
            <span>Tri</span>
          </label>
          <input
            type="number"
            name="prixMin"
            min="1"
            max="10000"
            onChange={(event) => {
              setPriceMin(event.target.value);
            }}
            value={priceMin}
          />
          <input
            type="number"
            name="prixMax"
            min="1"
            max="10000"
            onChange={(event) => {
              setPriceMax(event.target.value);
            }}
            value={priceMax}
          />

          <select
            id="limit"
            name="limit"
            value={limit}
            onChange={(event) => setLimit(event.target.value)}
          >
            <option value={nbTotalOffers}>-</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <div className="offers">
          {offers.map((offer) => {
            return (
              <Offers
                key={offer._id}
                id={offer._id}
                owner_picture={
                  offer.owner.account.avatar && offer.owner.account.avatar.url
                }
                owner_name={offer.owner.account.username}
                picture={offer.product_pictures[0].url}
                name={offer.product_name}
                price={offer.product_price}
                details={offer.product_details}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Home;
