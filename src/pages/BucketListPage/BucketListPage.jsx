import CityCard from "../../components/CityCard/CityCard";

export default function BucketListPage({ cities }) {

  return (
    <>
      <h1>BucketListPage</h1>
      <div>
        {cities.map((city) => (
          <CityCard
            key={city._id}
            city={city}
            />    
        ))}
      </div>
    </>
  );
}
