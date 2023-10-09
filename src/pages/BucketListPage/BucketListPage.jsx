import CityCard from "../../components/CityCard/CityCard";

export default function BucketListPage({ cities }) {

  return (
    <div>
      <h1 className="flex justify-center">BucketListPage</h1>
      <div className="grid justify-center">
        {cities.map((city) => (
          <CityCard
            key={city._id}
            city={city}
            />    
        ))}
      </div>
    </div>
  );
}
