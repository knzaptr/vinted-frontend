import React from "react";
import { Link } from "react-router-dom";
const Offers = ({
  id,
  owner_picture,
  owner_name,
  picture,
  name,
  price,
  details,
}) => {
  return (
    <Link to={`/offer/${id}`}>
      <div className="offer">
        <div className="owner">
          {owner_picture && (
            <div className="owner-pic">
              <img src={owner_picture} alt="owner" />
            </div>
          )}

          <span>{owner_name}</span>
        </div>
        <div className="picture">
          <img src={picture} alt={name} />
        </div>
        <div className="price">{price.toFixed(2)} €</div>
        <div className="details">
          {details.map((detail, index) => {
            return (
              <React.Fragment key={index}>
                {detail.MARQUE && <div>{detail.MARQUE}</div>}
                {detail.TAILLE && <div>{detail.TAILLE}</div>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default Offers;
