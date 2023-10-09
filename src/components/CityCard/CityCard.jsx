import { Link } from "react-router-dom";
import AttractionPage from "../../pages/AttractionPage/AttractionPage";

const CityCard = ({ city }) => {
  return (
    <Link to={`/bucketlist/${city._id}`}>
      <div className="card mt-8 w-96 bg-base-100 shadow-xl image-full">
        <figure>
          <img
            src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt={city.name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">City Name: {city.name}</h2>
          <p>City Description: {city.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Remove from Bucket List</button>
            {city.attractions.map((attraction) => (
                <AttractionPage key={city._id} attraction={attraction} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CityCard;
