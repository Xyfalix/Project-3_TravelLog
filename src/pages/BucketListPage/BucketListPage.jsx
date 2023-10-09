import AttractionPage from "../AttractionPage/AttractionPage";
import { useState,useEffect } from "react";
import { getCities } from "../../utilities/users-service";

export default function BucketListPage() {
  const [cities, setCities] = useState([])

  useEffect(()=> {
    async function fetchData() {
        try{
            const data = await getCities();
            console.log(data);
            setCities(data);
        } catch (error) {
            console.log('The error is', error);
        }
      }
      fetchData(); 
    }, []);

    return (
       <>
         <h1>BucketListPage</h1>
         <>{cities}</>
         <div>
           City IMG 
           City Description
           City.map into 
           <AttractionPage />
         </div>
       </>
    )
}