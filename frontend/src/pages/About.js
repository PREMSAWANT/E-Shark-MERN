import { FaRocket, FaHandshake, FaShieldAlt, FaUsers, FaChartLine, FaHeart } from 'react-icons/fa';
import { GiSharkFin } from 'react-icons/gi';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container-custom text-center">
          <GiSharkFin className="text-8xl mx-auto mb-6 animate-bounce-slow" />
          <h1 className="heading-1 mb-6">About E-Shark</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Democratizing startup funding by connecting innovative minds with forward-thinking investors
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card">
              <FaRocket className="text-5xl text-primary-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To bridge the gap between brilliant ideas and the capital they need to succeed. 
                We believe that great innovations shouldn't be held back by lack of access to funding. 
                E-Shark provides a transparent, efficient platform where entrepreneurs can showcase 
                their vision and investors can discover the next big opportunity.
              </p>
            </div>

            <div className="card">
              <FaChartLine className="text-5xl text-green-500 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To become the world's leading platform for early-stage startup funding, fostering 
                an ecosystem where innovation thrives. We envision a future where geographical 
                boundaries don't limit opportunities, and where every validated idea has the 
                chance to become reality with the right support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why E-Shark */}
      <section className="section bg-gradient-to-r from-primary-50 to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-gray-900 mb-4">Why E-Shark?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're more than just a platform – we're a community dedicated to turning ideas into reality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Trusted</h3>
              <p className="text-gray-600">
                Bank-level security with verified users and vetted pitches. Your data and 
                communications are protected with industry-standard encryption.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                <FaUsers />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Community</h3>
              <p className="text-gray-600">
                Every pitch is reviewed by our team. Every investor is verified. We maintain 
                high standards to ensure meaningful connections.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                <FaHandshake />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Connections</h3>
              <p className="text-gray-600">
                No middlemen, no unnecessary fees. Chat directly with investors or innovators. 
                Build relationships that matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="section">
        <div className="container-custom max-w-4xl">
          <div className="card">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">The E-Shark Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                E-Shark was born from a simple observation: countless brilliant ideas never see 
                the light of day because their creators can't access the right investors. Meanwhile, 
                investors miss out on promising opportunities hidden in the noise.
              </p>
              <p>
                Inspired by the success of shows like Shark Tank, we wanted to create a platform 
                that brings that same energy and opportunity to the digital world – but on a much 
                larger scale. A place where anyone with a validated idea can pitch to a global 
                audience of investors.
              </p>
              <p>
                Built with modern technology and designed with user experience in mind, E-Shark 
                streamlines the entire funding journey – from pitch creation to investor discovery 
                to deal closure. We handle the logistics, you focus on what matters: building 
                great products and making smart investments.
              </p>
              <p className="font-semibold text-primary-600 text-lg">
                Join us in shaping the future of startup funding. Let's swim with the sharks. 🦈
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-gray-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Our Impact</h2>
            <p className="text-gray-400 text-lg">Growing every day</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-5xl font-bold text-primary-400 mb-2">500+</h3>
              <p className="text-gray-400">Ideas Pitched</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-primary-400 mb-2">200+</h3>
              <p className="text-gray-400">Active Investors</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-primary-400 mb-2">₹50Cr+</h3>
              <p className="text-gray-400">Funding Raised</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-primary-400 mb-2">85%</h3>
              <p className="text-gray-400">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-gray-900 mb-4">Built By</h2>
            <p className="text-gray-600 text-lg">Passionate developers dedicated to innovation</p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="card text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-4">
                PS
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Prem Sawant</h3>
              <p className="text-primary-600 font-semibold mb-3">Full-Stack Developer</p>
              <p className="text-gray-600 mb-4">
                MERN Stack Expert | Cloud Enthusiast | Building solutions that matter
              </p>
              <div className="flex justify-center gap-4">
                <a href="https://github.com" className="text-gray-600 hover:text-primary-500 transition-colors">
                  GitHub
                </a>
                <a href="https://linkedin.com" className="text-gray-600 hover:text-primary-500 transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-500 to-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're an innovator with a groundbreaking idea or an investor seeking opportunities, 
            E-Shark is your platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Join as Innovator
            </a>
            <a href="/register" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300">
              Join as Investor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
