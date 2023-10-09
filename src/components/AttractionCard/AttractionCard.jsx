import { Link } from "react-router-dom";
// import ReviewPage from "../../pages/ReviewPage/ReviewPage";

const AttractionCard = ({ cityInfo, attraction }) => {
  console.log(cityInfo);
  const city = cityInfo._id;
  console.log(city);

  return (
    <div>
      <Link to={`/bucketlist/${city}/${attraction._id}`}>
        <p>Attraction Name: {attraction.name}</p>
        <p>Attraction Description: {attraction.description}</p>
        <p>Attraction Id: {attraction._id}</p>
        {console.log(attraction._id)}
        {/* {attraction.map((reviews) => (
          <ReviewPage key={attraction._id} reviews={reviews} />
        ))} */}
      </Link>
    </div>
  );
};

export default AttractionCard;
