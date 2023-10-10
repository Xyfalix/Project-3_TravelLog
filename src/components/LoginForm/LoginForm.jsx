import { getUser, login } from "../../utilities/users-service";
import { useState } from "react"; // Import the useState hook

export default function LoginForm({ setUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value, error: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      setUser(getUser());
    } catch (error) {
      setFormData({ ...formData, error: "Invalid login credentials" });
    }
  };

  return (
    <div>
      <div className="form-container bg-neutral-400 mx-auto max-w-md p-5 rounded border">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="text-m my-2 text-gray-700 font-serif">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input rounded border focus:outline-none focus:ring focus:border-blue-200"
              required
            />
          </div>
          <div className="form-control">
            <label className="text-m my-2 text-gray-700 font-serif">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input rounded border focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div className="form-control">
            <label className="text-m my-2 text-gray-700 font-serif">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input rounded border focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <button type="submit" className="btn btn-outline btn-accent my-2">Login</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{formData.error}</p>
    </div>
  );
}
