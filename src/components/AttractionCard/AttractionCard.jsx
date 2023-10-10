import { Link } from "react-router-dom";
// import ReviewPage from "../../pages/ReviewPage/ReviewPage";

const AttractionCard = ({ attraction }) => {
    // const { attractionId } = useParams();
    // const attractionInfo = attractions?.find((attraction) => attraction._id === attractionId);
    console.log(attraction._id)

  return (
    <div>
      <Link to={`/bucketlist/${attraction._id}/reviews`}>
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
              <button className="btn btn-primary">Remove from list</button>
            </div>
          </div>
        </div>
        {/* {attraction.map((reviews) => (
          <ReviewPage key={attraction._id} reviews={reviews} />
        ))} */}
      </Link>
    </div>
  );
};

export default AttractionCard;
