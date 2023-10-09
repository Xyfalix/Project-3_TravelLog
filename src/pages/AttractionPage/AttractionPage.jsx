import { useParams } from "react-router-dom";
import AttractionCard from "../../components/AttractionCard/AttractionCard";

const AttractionPage = ({ cities }) => {
  const { cityId } = useParams();
  const cityInfo = cities?.find((city) => city._id === cityId);
  console.log(cityInfo);

  return (
    <div>
      <h1>Attraction Page</h1>
      {cityInfo ? (
        <div>
          <h2>{cityInfo.name}</h2>
          <p>{cityInfo.description}</p>
          <div>
            {cityInfo.attractions.map((attraction) => (
              <AttractionCard 
                key={attraction._id}
                attraction={attraction}
                cityInfo={cityInfo}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>City not found</p>
      )}
    </div>
  );
};

export default AttractionPage;
