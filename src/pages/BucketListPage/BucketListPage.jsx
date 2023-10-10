import CityCard from "../../components/CityCard/CityCard";

export default function BucketListPage({ attractions }) {

  return (
    <div>
      <h1 className="flex justify-center">BucketListPage</h1>
      <div className="grid justify-center">
        {attractions.map((attraction) => (
          <CityCard
            key={attraction._id}
            attraction={attraction}
            />    
        ))}
      </div>
    </div>
  );
}
