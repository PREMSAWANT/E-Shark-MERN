import { Link } from 'react-router-dom';
import { GiSharkFin } from 'react-icons/gi';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-shark-800 to-shark-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GiSharkFin className="text-4xl text-primary-400" />
              <span className="text-2xl font-bold">E-Shark</span>
            </div>
            <p className="text-gray-300 text-sm">
              Pitch Smart, Invest Smarter
            </p>
            <p className="text-gray-400 text-sm">
              Connecting innovators with investors to transform ideas into reality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Explore Ideas
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Users</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Sign Up as Innovator
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Sign Up as Investor
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Login
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <p className="text-gray-400 text-sm mb-4">
              Follow us on social media for updates and news.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-primary-400 transition-colors text-xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary-400 transition-colors text-xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary-400 transition-colors text-xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary-400 transition-colors text-xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://github.com"
                className="text-gray-300 hover:text-primary-400 transition-colors text-xl"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} E-Shark. All rights reserved. Developed by{' '}
            <span className="text-primary-400 font-semibold">Prem Sawant</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
