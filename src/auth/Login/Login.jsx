import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const saveUserToDB = async (user) => {
    const token = await user.getIdToken();

    const response = await fetch(`http://localhost:5000/users/${user.email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const existingUser = await response.json();
    if (existingUser) return;

    const userData = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL || "",
      uid: user.uid,
      lastLogin: new Date(),
    };

    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await loginUser(email, password);
      await saveUserToDB(result.user);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#f0f0f0",
        iconColor: "#4ade80",
      });

      form.reset();
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin(); // this is signInWithPopup

      await saveUserToDB(result.user);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Welcome ${result.user.displayName}`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#f0f0f0",
        iconColor: "#4ade80",
      });

      navigate("/"); // navigate only after successful login
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Illustration */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-emerald-600 to-green-600 text-white">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
            alt="Register Illustration"
            className="w-full h-full relative"
          />
          <div className="absolute ">
            <h2 className="text-4xl top-5 font-bold">Welcome Back!</h2>
            <p className="text-center mt-3 text-green-100">
              Login to continue your learning journey with us.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-10 sm:p-14">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Login
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleLogin} className="space-y-2">
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <h1 className="text-right text-sm text-indigo-600 hover:underline cursor-pointer">
              Forgot Password?
            </h1>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition font-medium cursor-pointer"
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>

            <button
              type="submit"
              className="cursor-pointer w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-medium"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
