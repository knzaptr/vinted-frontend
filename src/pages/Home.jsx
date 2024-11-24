import { useState, useEffect } from "react";
import Offers from "../components/content/Offers";
import axios from "axios";

const Home = ({ search }) => {
  const [offers, setOffers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [priceMax, setPriceMax] = useState();
  const [priceMin, setPriceMin] = useState(0);
  const [sort, setSort] = useState(false);

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
            },
          }
        );

        setOffers(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [search, priceMax, priceMin, sort]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <main>
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
