import { Link } from 'react-router-dom';
import { FaRocket, FaHandshake, FaChartLine, FaLightbulb, FaUsers, FaShieldAlt } from 'react-icons/fa';
import { GiSharkFin } from 'react-icons/gi';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white section">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-slide-up">
            <h1 className="heading-1">
              Turn Your Ideas Into <br />
              <span className="text-yellow-300">Funded Reality</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Pitch Smart, Invest Smarter
            </p>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto">
              E-Shark connects innovative minds with forward-thinking investors.
              Whether you have a groundbreaking idea or you're looking for the next big opportunity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Get Started Free
              </Link>
              <Link to="/explore" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Explore Ideas
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-blue-400">
              <div>
                <h3 className="text-4xl font-bold text-yellow-300">500+</h3>
                <p className="text-blue-100">Ideas Pitched</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-yellow-300">200+</h3>
                <p className="text-blue-100">Active Investors</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-yellow-300">₹50Cr+</h3>
                <p className="text-blue-100">Funding Raised</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-gray-900 mb-4">How E-Shark Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple, transparent, and effective platform for connecting innovators with investors
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Innovators */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary-600 flex items-center gap-2">
                <FaRocket className="text-3xl" />
                For Innovators
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Create Your Pitch</h4>
                    <p className="text-gray-600">Submit your idea with problem, solution, market size, and funding needs</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get Reviewed</h4>
                    <p className="text-gray-600">Our team reviews and approves quality pitches for investor visibility</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Connect & Collaborate</h4>
                    <p className="text-gray-600">Interested investors reach out to discuss potential funding</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure Funding</h4>
                    <p className="text-gray-600">Negotiate terms and bring your vision to life</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Investors */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-green-600 flex items-center gap-2">
                <FaHandshake className="text-3xl" />
                For Investors
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Browse Quality Ideas</h4>
                    <p className="text-gray-600">Explore vetted pitches across various industries and stages</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Filter & Shortlist</h4>
                    <p className="text-gray-600">Use advanced filters to find ideas matching your investment criteria</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Initiate Conversations</h4>
                    <p className="text-gray-600">Chat directly with innovators to evaluate opportunities</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Make Impact</h4>
                    <p className="text-gray-600">Invest in promising ventures and grow your portfolio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-gray-900 mb-4">Why Choose E-Shark?</h2>
            <p className="text-lg text-gray-600">
              Built for success with powerful features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card card-hover text-center">
              <FaLightbulb className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Ideas</h3>
              <p className="text-gray-600">
                Every pitch is reviewed to ensure only serious, viable ideas reach investors
              </p>
            </div>

            <div className="card card-hover text-center">
              <FaUsers className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Chat</h3>
              <p className="text-gray-600">
                Instant messaging between investors and innovators for quick collaboration
              </p>
            </div>

            <div className="card card-hover text-center">
              <FaShieldAlt className="text-5xl text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                Bank-level security with JWT authentication and encrypted communications
              </p>
            </div>

            <div className="card card-hover text-center">
              <FaChartLine className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Track views, likes, and investor interest with detailed analytics
              </p>
            </div>

            <div className="card card-hover text-center">
              <FaHandshake className="text-5xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Direct Connections</h3>
              <p className="text-gray-600">
                No middlemen - connect directly with decision-makers
              </p>
            </div>

            <div className="card card-hover text-center">
              <GiSharkFin className="text-5xl text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Shark Tank Model</h3>
              <p className="text-gray-600">
                Inspired by proven investment models that work
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section hero-gradient text-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of innovators and investors already making their mark
          </p>
          <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
