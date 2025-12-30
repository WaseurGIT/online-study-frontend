import { Link } from "react-router-dom";

const Register = () => {
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

          <form className="space-y-2">
            <div>
              <label className="block mb-1 text-gray-600">Full Name</label>
              <input
                type="text"
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
                placeholder="https://example.com/profile.jpg"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>

            <button className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition font-medium">
              Create Account
            </button>
          </form>

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
