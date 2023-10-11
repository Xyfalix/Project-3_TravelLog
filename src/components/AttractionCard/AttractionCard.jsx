import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  removeAttractionFromBucketList,
  ImageDisplay,
} from "../../utilities/users-service";

const AttractionCard = ({ setAttractions, attractions, attraction }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRemoveAttractionFromBucketList = async () => {
    // Show the confirmation modal
    setShowConfirmationModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const confirmRemoveAttraction = async () => {
    setShowConfirmationModal(false);
    try {
      await removeAttractionFromBucketList(attraction._id);
      if (attractions) {
        const updatedAttractions = attractions.filter(
          (item) => item._id !== attraction._id
        );
        setAttractions(updatedAttractions);
        setShowSuccessModal(true);
  
        // Automatically close the success modal after 2 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 2000);
      }
      // Show the success modal
    } catch (error) {
      console.error("Error removing attraction from bucket list:", error);
    }
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 h-50">
      <div className="card mt-8 w-96 bg-base-100 shadow-xl image-full h-80">
        <figure>
          <img src={ImageDisplay(attraction.image)} alt={attraction.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Attraction Name: {attraction.name}</h2>
          <p>
            {showFullDescription
              ? attraction.description
              : attraction.description.length > 30
              ? `${attraction.description.substring(0, 30)}...`
              : attraction.description}
          </p>
          {attraction.description.length > 30 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Show Less" : "Show More"}
            </button>
          )}
          <div>
            <div className="card-actions justify-start">
              <button
                onClick={() =>
                  navigate(`/bucketlist/${attraction._id}/reviews`)
                }
                className="btn btn-primary"
              >
                Reviews
              </button>

              <div className="card-actions mx-5">
                <button
                  onClick={handleRemoveAttractionFromBucketList}
                  className="btn btn-primary"
                >
                  Remove from list
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal" open={showConfirmationModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Removal</h3>
          <p>
            Are you sure you want to remove this attraction from your bucket
            list?{" "}
          </p>
          <div className="modal-action">
            <button
              onClick={confirmRemoveAttraction}
              className="btn btn-primary"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirmationModal(false)}
              className="btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_2" className="modal" open={showSuccessModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Attraction removed!</h3>
          <p>The attraction has been sucessfully removed from your bucket list.</p>
          <div className="modal-action">
            <form method="dialog">
              {/* Button to close the modal */}
              <button className="btn" onClick={handleCloseSuccessModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AttractionCard;
