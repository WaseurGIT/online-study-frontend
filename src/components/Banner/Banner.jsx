import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section
      className="relative min-h-[85vh] flex items-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-blue-900/70 to-cyan-800/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Learn Together. <br />
            Submit Assignments. <br />
            <span className="text-cyan-300">Grow Smarter.</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
            A collaborative online study platform where students can manage
            assignments, submit tasks, and track learning progress effortlessly.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Get Started
            </Link>

            <Link
              to="/assignments"
              className="border border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-700 transition"
            >
              View Assignments
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
