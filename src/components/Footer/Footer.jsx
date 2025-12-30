const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left */}
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold text-white">StudyHub</span>. All rights reserved.
        </p>

        {/* Center Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">Assignments</a>
          <a href="#" className="hover:text-white transition">About</a>
        </div>

        {/* Right */}
        <p className="text-sm">
          Built with ❤️ for learning
        </p>
      </div>
    </footer>
  );
};

export default Footer;
