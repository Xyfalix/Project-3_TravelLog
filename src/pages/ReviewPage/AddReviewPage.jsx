import { useState } from 'react';
import { createReview } from '../../utilities/users-service';
import Rating from 'react-rating-stars-component'


const AddReviewPage = ({ setShowAddReviewPage, selectedAttraction, currentUser, updateReviews, onReviewAdded }) => {
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [ratingErrorMessage, setRatingErrorMessage] = useState('');
  const[image, setImage] = useState('')
  const [showModal, setShowModal] = useState(false);

  const handleCreateReview = async (e) => {
    e.preventDefault();
    if (newRating === 0) {
      setRatingErrorMessage('Don\'t forget to rate (1-5 stars)');
      return;
    }
    try {
      setRatingErrorMessage('');
      const newReview = await createReview(selectedAttraction._id, { text: newReviewText, rating: newRating, user: currentUser, image}); 
      updateReviews(newReview)
      setNewReviewText('');
      setNewRating(0);
      setImage('')
      handleBack();

      if (onReviewAdded) {
        setShowModal(true);
        onReviewAdded();
      }
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  const handleBack = () => {
    setShowAddReviewPage(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
  };

  const handleClearImage = () => {
    setImage(''); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
  <div className="flex justify-center">
    <div>
      <h1 className='mb-2'>Add Review</h1>
      <form onSubmit={handleCreateReview} className="border border-gray-300 border-2 p-4 mx-auto">
        <label>Review Text:</label>
        <br />
        <textarea placeholder="Type here..." className="textarea textarea-bordered textarea-lg w-full max-w-xs mb-2"
          value={newReviewText}
          onChange={(e) => setNewReviewText(e.target.value)}
          required
        />
        <br />
        <label>Rating:</label>
          <br />
          <Rating
            count={5}
            size={30}
            value={newRating}
            onChange={(newRating) => setNewRating(newRating)}
            required
          />
          {newRating === 0 && (
            <p className="text-red-500">{ratingErrorMessage}</p>
          )}
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <br />
          {image && <img src={image} alt="Uploaded" style={{ maxWidth: '200px' }} />}
          <button className="btn btn-secondary btn-xs mt-4 mb-4" type="button" onClick={handleClearImage}>
            Clear Image
          </button>
          <br />
          <button className="btn btn-primary" onClick={handleBack}>Back to Reviews</button>
        <button className="btn btn-primary ml-4" type="submit">Create Review</button>
      </form>
    </div>
    {showModal && (
        <dialog id="my_modal_1" className="modal" open={showModal}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Attraction added!</h3>
            <p>The attraction has been successfully added to your bucket list.</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={handleCloseModal}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
  </div>
  );
};

export default AddReviewPage;
