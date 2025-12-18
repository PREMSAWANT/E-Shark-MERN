import { Link } from 'react-router-dom';
import { FaRocket, FaLightbulb, FaChartLine } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-6 animate-slide-up">
            Welcome to E-Shark 🦈
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            The premier platform connecting innovative startups with forward-thinking investors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
              Get Started
            </Link>
            <Link to="/explore" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300">
              Explore Ideas
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="heading-2 text-center text-gray-900 mb-12">Why Choose E-Shark?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card card-hover text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Innovators</h3>
              <p className="text-gray-600">
                Pitch your ideas to a network of verified investors. Get funding, mentorship, and support to turn your vision into reality.
              </p>
            </div>

            <div className="card card-hover text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLightbulb className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Investors</h3>
              <p className="text-gray-600">
                Discover innovative startups and early-stage ventures. Connect directly with founders and make informed investment decisions.
              </p>
            </div>

            <div className="card card-hover text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Connection</h3>
              <p className="text-gray-600">
                Chat in real-time, negotiate deals, and build relationships that matter. All in one secure platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-primary-600 mb-2">500+</h3>
              <p className="text-gray-600">Ideas Pitched</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary-600 mb-2">200+</h3>
              <p className="text-gray-600">Active Investors</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary-600 mb-2">₹50Cr+</h3>
              <p className="text-gray-600">Funding Raised</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary-600 mb-2">85%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-r from-primary-500 to-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of innovators and investors shaping the future of startups.
          </p>
          <Link to="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-xl hover:shadow-2xl inline-block">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
