import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Offer = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

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
    <main className="offer-page">
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
                    value !== "undefined" && (
                      <div key={key} className="detail">
                        <span className="left">{key}</span>
                        <span className="right">{value}</span>
                      </div>
                    )
                  );
                }
              })}
            </div>
            <div className="divider"></div>
            <div className="offer-name">{data.product_name}</div>
            <div className="offer-description">{data.product_description}</div>
            <div className="offer-owner">
              {data.owner.account.avatar && (
                <div className="owner-pic">
                  <img src={data.owner.account.avatar.url} alt="owner" />
                </div>
              )}

              <span>{data.owner.account.username}</span>
            </div>
            <button
              className="buy"
              onClick={() => {
                token
                  ? navigate("/payment", {
                      state: {
                        title: data.product_name,
                        amount: data.product_price,
                      },
                    })
                  : navigate("/login", {
                      state: {
                        from: `/offer/${id}`,
                      },
                    });
              }}
            >
              Acheter
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Offer;
