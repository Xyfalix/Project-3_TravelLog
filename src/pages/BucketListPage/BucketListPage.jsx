import AttractionCard from "../../components/AttractionCard/AttractionCard";

export default function BucketListPage({ attractions, setAttractions }) {

  return (
    <div>
      <h1 className="flex justify-center mt-8 text-2xl">My Bucket List</h1>
      <div className="grid justify-center">
        {attractions.map((attraction) => (
          <AttractionCard
            key={attraction._id}
            attraction={attraction}
            attractions={attractions}
            setAttractions={setAttractions}
            />    
        ))}
      </div>
    </div>
  );
}
