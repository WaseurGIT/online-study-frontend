import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError("Password must contain one special character.");
      return;
    } else {
      setError("");
    }

    createUser(email, password)
      .then((result) => {
        const currentUser = result.user;

        // Update profile
        updateProfile(currentUser, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            const userData = {
              name: name, // ✅ use form value
              email: email,
              photoURL: photoURL,
              uid: currentUser.uid,
            };

            return fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });
          })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "Account Created Successfully",
              showConfirmButton: false,
              timer: 2000,
            });

            form.reset();
            navigate("/");
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-green-50 to-lime-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Illustration */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-emerald-600 to-green-600 text-white">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
            alt="Register Illustration"
            className="w-full h-full relative"
          />
          <div className="absolute ">
            <h2 className="text-4xl top-5 font-bold">Join Us Today!</h2>
            <p className="text-center mt-3 text-green-100">
              Create an account and start learning smarter.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-5 sm:p-14">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Register
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Fill in the details to create your account
          </p>

          <form onSubmit={handleRegister} className="space-y-2">
            <div>
              <label className="block mb-1 text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">
                Profile Image URL
              </label>
              <input
                type="url"
                name="photoURL"
                placeholder="https://example.com/profile.jpg"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>

            <button className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition font-medium">
              Create Account
            </button>
          </form>

          {error && <div className="text-red-500 p-2">{error}</div>}

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
