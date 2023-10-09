import { useState } from 'react';
import { createReview } from '../../utilities/users-service';



const AddReviewPage = ({ setShowAddReviewPage, selectedCity, selectedAttraction, currentUser, updateReviews }) => {
  const [newReviewText, setNewReviewText] = useState('');
  console.log(selectedCity._id)
  console.log(selectedAttraction._id)

  const handleCreateReview = async (e) => {
    e.preventDefault();
    try {
      const newReview = await createReview( selectedCity._id, selectedAttraction._id, { text: newReviewText, user: currentUser });
      updateReviews(newReview)
      setNewReviewText('');
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  const handleBack = () => {
    setShowAddReviewPage(false);
  };

  return (
    <div>
      <h2>Add Review</h2>
      <button onClick={handleBack}>Back to Reviews</button>
      <form onSubmit={handleCreateReview}>
        <label>Review Text:</label>
        <textarea
          value={newReviewText}
          onChange={(e) => setNewReviewText(e.target.value)}
          required
        />
        <button type="submit">Create Review</button>
      </form>
    </div>
  );
};

export default AddReviewPage;
