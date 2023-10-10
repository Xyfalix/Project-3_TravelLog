import { Link } from "react-router-dom";
// import AttractionPage from "../../pages/AttractionPage/AttractionPage";

const CityCard = ({ attraction }) => {
  return (
    <Link to={`/bucketlist/${attraction._id}`}>
      <div className="card mt-8 w-96 bg-base-100 shadow-xl image-full">
        <figure>
          <img
            src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt={attraction.name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Attraction Name: {attraction.name}</h2>
          <p>Attraction Description: {attraction.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Remove from Bucket List</button>
            {/* {attraction.attractions.map((attraction) => (
                <AttractionPage key={attraction._id} attraction={attraction} />
            ))} */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CityCard;
