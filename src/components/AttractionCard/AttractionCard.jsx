import { Link } from "react-router-dom";
import { removeAttractionFromBucketList, ImageDisplay } from "../../utilities/users-service";

const AttractionCard = ({ setAttractions, attractions, attraction }) => {
    console.log(attractions);
  const handleRemoveAttractionFromBucketList = async (e) => {
    e.preventDefault(); // Prevent the default link navigation behavior

    try {
      await removeAttractionFromBucketList(attraction._id);
      if (attractions) {
        const updatedAttractions = attractions.filter(
          (item) => item._id !== attraction._id
        );
        console.log(updatedAttractions);
        setAttractions(updatedAttractions);
      }
    } catch (error) {
      console.error("Error removing attraction from bucket list:", error);
    }
  };

  return (
    <div>
      <Link to={`/bucketlist/${attraction._id}/reviews`}>
        <div className="card mt-8 w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src={ImageDisplay(attraction.image)}
              alt={attraction.name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Attraction Name: {attraction.name}</h2>
            <p>Attraction Description: {attraction.description}</p>
            <div className="card-actions justify-end">
              <button
                onClick={handleRemoveAttractionFromBucketList}
                className="btn btn-primary"
              >
                Remove from list
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AttractionCard;
