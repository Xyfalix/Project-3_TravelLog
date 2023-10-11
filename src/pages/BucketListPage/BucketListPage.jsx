import AttractionCard from "../../components/AttractionCard/AttractionCard";

export default function BucketListPage({ attractions, setAttractions }) {

  return (
    <div>
      <h1 className="flex justify-center">BucketListPage</h1>
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
