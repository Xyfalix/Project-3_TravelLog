import debug from "debug";
import { checkToken } from "../../utilities/users-service";

const log = debug("mern:pages:OrderHistoryPage");

export default function OrderHistoryPage() {
  const handleVerify = () => {
    log("verify");
    checkToken();
  };

  return (
    <>
      <h2>OrderHistoryPage</h2>
      <button onClick={handleVerify}>
        Verify Login
      </button>
    </>
  );
}