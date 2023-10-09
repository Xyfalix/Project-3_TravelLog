import { Link } from 'react-router-dom';
import AttractionPage from '../../pages/AttractionPage/AttractionPage';

const CityCard = ({ city }) => {
  return (
        <Link to={`/bucketlist/${city._id}`}>
            <p>City Name: {city.name}</p>
            <p>City Description: {city.description}</p>
            <p>City Id: {city._id}</p>
            {
                city.attractions.map((attraction) => (
                    <AttractionPage 
                    key={city._id}
                    attraction={attraction}
                    />
                ))
            }
        </Link>
  )
}

export default CityCard