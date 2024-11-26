import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Offers from "../components/content/Offers";
import axios from "axios";
import Hero from "../assets/img/hero.jpg";
import Tear from "../assets/img/tear.svg";
import SwitchExample from "../components/SwitchExample";
import PriceRange from "../components/PriceRange";

const Home = ({ search }) => {
  const [offers, setOffers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sort, setSort] = useState(false);
  const [limit, setLimit] = useState(100);
  const [nbTotalOffers, setNbTotalOffers] = useState();
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  let pageButton = [];

  const pageNo = () => {
    for (let i = 1; i <= Math.ceil(nbTotalOffers / limit); i++) {
      pageButton.push(
        <button
          key={i}
          onClick={() => {
            setPage(i);
          }}
        >
          {i}
        </button>
      );
    }

    return pageButton;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DATA}/v2/offers`,
          {
            params: {
              title: search,
              priceMax: priceRange[1],
              priceMin: priceRange[0],
              sort: sort ? "price-desc" : "price-asc",
              page: page,
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
  }, [search, priceRange, sort, limit, page, nbTotalOffers]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <main>
      <div className="hero">
        <div className="sell-container">
          <span>Prêts à faire du tri dans vos placards ?</span>
          <button
            onClick={() => {
              navigate("./publish");
            }}
          >
            Commencer à vendre
          </button>
        </div>
        <img className="bg-hero" src={Hero} alt="" />{" "}
        <div>
          <img className="tear-hero" src={Tear} alt="" />
        </div>
      </div>
      <div className="container">
        <div className="filter">
          <SwitchExample
            name={sort ? "Prix décroissant" : "Prix croissant"}
            checked={sort}
            onChange={(checked) => {
              setSort(checked);
            }}
          />

          <PriceRange priceRange={priceRange} setPriceRange={setPriceRange} />

          <div className="showNbOffer">
            <span>Afficher </span>
            <button
              onClick={() => {
                setLimit(nbTotalOffers);
                setPage(1);
              }}
            >
              all
            </button>
            <button
              onClick={() => {
                setLimit(10);
                setPage(1);
              }}
            >
              10
            </button>
            <button
              onClick={() => {
                setLimit(20);
                setPage(1);
              }}
            >
              20
            </button>
            <button
              onClick={() => {
                setLimit(30);
                setPage(1);
              }}
            >
              30
            </button>
          </div>
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
        <div className="page-number">{pageNo()}</div>
      </div>
    </main>
  );
};

export default Home;
