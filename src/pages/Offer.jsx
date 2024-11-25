import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DATA}/v2/offers/${id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <main>
      <div className="container">
        <div className="offer-container">
          <div className="offer-picture">
            <img src={data.product_pictures[0].url} alt="" />
          </div>
          <div className="offer-infos">
            <div className="offer-price">{data.product_price.toFixed(2)} €</div>
            <div className="offer-details">
              {data.product_details.map((detail) => {
                for (const [key, value] of Object.entries(detail)) {
                  return (
                    <div className="detail">
                      <span>{key} </span> {value}
                    </div>
                  );
                }
              })}
              <div></div>
            </div>
            <hr />
            <div className="offer-name">{data.product_name}</div>
            <div className="offer-description">{data.product_description}</div>
            <div className="offer-owner">
              {data.owner.account.avatar && (
                <div className="owner-pic">
                  <img src={data.owner.account.avatar.url} alt="owner" />
                </div>
              )}

              <span>{data.owner.account.username}</span>
              <button>Acheter</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Offer;
