import { useState, useEffect } from "react";
import Offers from "../components/content/Offers";
import axios from "axios";

const Home = ({ search }) => {
  const [offers, setOffers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_DATA);

        setOffers(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <main>
      <div className="offers container">
        {offers.map((offer) => {
          return (
            offer.product_name.toLowerCase().includes(search.toLowerCase()) && (
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
            )
          );
        })}
      </div>
    </main>
  );
};

export default Home;
