import { useEffect, useState } from 'react';
import AddReviewPage from './AddReviewPage';
import { useParams } from 'react-router';

function ReviewPage({ cities }) {
  const [reviews, setReviews] = useState([]);
  const [showAddReviewPage, setShowAddReviewPage] = useState(false);  
  const { cityId, attractionId } = useParams();
  const selectedCity = cities?.find((city) => city._id === cityId);
  const selectedAttraction  = selectedCity?.attractions?.find((attraction) => attraction._id === attractionId);
  console.log(cities)
  console.log(selectedCity)
  console.log(selectedAttraction)
  console.log(cityId)
  console.log(attractionId)
  



  useEffect(() => {
    if (selectedAttraction) {
      setReviews(selectedAttraction.reviews);
    }
  }, [selectedAttraction]);

  return (
    <div>
      <h1>Reviews Page</h1>

      {showAddReviewPage ? (
        <AddReviewPage
          setShowAddReviewPage={setShowAddReviewPage}
          selectedCity={selectedCity}
          selectedAttraction={selectedAttraction} 
          reviews={reviews}
          setReviews={setReviews}
        />
      ) : (
        <div>
          <div>
            <h2>Reviews</h2>
            <button onClick={() => setShowAddReviewPage(true)}>
              Add Review
            </button>
            <ul>
              {reviews.map((review) => (
                <li key={review._id}>
                  <strong>Review:</strong> {review.text}<br />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;
