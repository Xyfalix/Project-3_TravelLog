import { useState } from "react";
import { signUp } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";

export default function SignUpForm({ setUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value, error: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await signUp(formData);
      console.log(`token is ${token}`);
      localStorage.setItem("token", token);
      setUser({ name: formData.name, email: formData.email });
      navigate("/");
    } catch (error) {
      setFormData({ ...formData, error: "Something went wrong" });
    }
  };

  const disable = formData.password !== formData.confirm;

  return (
    <div>
      <div className="form-container bg-neutral-500 mx-auto max-w-md p-5 rounded border">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="text-m my-2 text-info font-serif">Name</label>
            <input
              className="input rounded border focus:outline-none focus:ring focus:border-blue-500"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="text-m my-2 text-info font-serif">Email</label>
            <input
              className="input rounded border focus:outline-none focus:ring focus:border-blue-500"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="text-m my-2 text-info font-serif">Password</label>
            <input
              className="input rounded border focus:outline-none focus:ring focus:border-blue-500"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="text-m my-2 text-info font-serif">Confirm</label>
            <input
              className="input rounded border focus:outline-none focus:ring focus:border-blue-500"
              type="password"
              name="confirm"
              value={formData.confirm}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-outline btn-accent my-3"
              disabled={disable}
            >
              SIGN UP
            </button>
          </div>
        </form>
      </div>
      <p className="error-message">&nbsp;{formData.error}</p>
    </div>
  );
}
