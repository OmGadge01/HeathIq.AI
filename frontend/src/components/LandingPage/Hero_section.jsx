import PropTypes from "prop-types";

function Hero_section({ onGetStarted , onHowItWorks }) {
  return (
    <div className="flex items-center justify-center h-screen  px-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-4xl space-y-4">
        {/* Badge/Tagline */}
        <div className="inline-block px-4 py-2 rounded-full bg-blue-900/30 backdrop-blur-sm">
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
            AI-Powered Health Coach
          </p>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Transform Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Health Journey
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-300 max-w-3xl">
          Get customized diet plans, exercise routines, and data-driven insights
          tailored just for you.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={() => {
              console.log("Get Started clicked");
              onGetStarted();
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
          >
            Get Started
          </button>
          <button
            className="border-2 border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300"
            onClick={() => {
              console.log("how it works clicked");
              onHowItWorks();
            }}
          >
            How It Works →
          </button>
        </div>

        {/* Trust Indicator */}
        <p className="pt-8 text-gray-400 text-sm">
          Your health revolution starts now - unlock your potential with
          AI-powered guidance!
        </p>
      </div>
    </div>
  );
}

Hero_section.propTypes = {
  onGetStarted: PropTypes.func,
  onHowItWorks: PropTypes.func,
};

Hero_section.defaultProps = {
  onGetStarted: () => {},
  onHowItWorks: () => {},
};

export default Hero_section;
