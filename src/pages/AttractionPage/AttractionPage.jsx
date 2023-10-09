import { useParams } from "react-router-dom";
import AttractionCard from "../../components/AttractionCard/AttractionCard";

const AttractionPage = ({ cities }) => {
  const { cityId } = useParams();
  const cityInfo = cities?.find((city) => city._id === cityId);

  return (
    <div>
      <h1 className="flex justify-center">Attraction Page</h1>
      {cityInfo ? (
        <div className="card mt-3 w-98 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">City Name: {cityInfo.name}</h2>
            <p>City Description: {cityInfo.description}</p>
          </div>
        </div>
      ) : (
        <p>City Not found</p>
      )}
      <div className="grid justify-center">
        {cityInfo?.attractions?.map((attraction) => (
          <AttractionCard
            key={attraction._id}
            attraction={attraction}
            cityInfo={cityInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default AttractionPage;
