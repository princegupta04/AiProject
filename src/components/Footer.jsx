import { Link } from 'react-router-dom';
import { FaHome, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="theme-bg-footer theme-transition">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaHome className="theme-brand-accent text-2xl" />
              <span className="text-xl font-bold theme-text-inverse">EstateList</span>
            </div>
            <p className="theme-text-muted leading-relaxed">
              Your trusted partner in real estate. We help you find your dream home and make informed investment decisions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="theme-text-muted hover:theme-brand-accent transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="theme-text-muted hover:theme-brand-accent transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="theme-text-muted hover:theme-brand-accent transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="theme-text-muted hover:theme-brand-accent transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="theme-text-muted hover:theme-brand-accent transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold theme-text-inverse">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="theme-text-muted hover:theme-brand-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="theme-text-muted hover:theme-brand-accent transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/blog" className="theme-text-muted hover:theme-brand-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="theme-text-muted hover:theme-brand-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/about" className="theme-text-muted hover:theme-brand-accent transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold theme-text-inverse">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/listings?type=house" className="theme-text-muted hover:theme-brand-accent transition-colors">
                  Houses for Sale
                </Link>
              </li>
              <li>
                <Link to="/listings?type=condo" className="theme-text-muted hover:theme-brand-accent transition-colors">
                  Condos for Sale
                </Link>
              </li>
              <li>
                <Link to="/listings?type=townhouse" className="theme-text-muted hover:theme-brand-accent transition-colors">
                  Townhouses
                </Link>
              </li>
              <li>
                <Link to="/listings?type=apartment" className="theme-text-muted hover:theme-brand-accent transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="/contact" className="theme-text-muted hover:theme-brand-accent transition-colors">
                  Property Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold theme-text-inverse">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaPhone className="theme-brand-accent mt-1" />
                <div>
                  <p className="theme-text-muted">+1 (555) 123-4567</p>
                  <p className="theme-text-muted">+1 (555) 987-6543</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaEnvelope className="theme-brand-accent mt-1" />
                <div>
                  <p className="theme-text-muted">contact@realestate.com</p>
                  <p className="theme-text-muted">info@realestate.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="theme-brand-accent mt-1" />
                <div>
                  <p className="theme-text-muted">123 Real Estate Street</p>
                  <p className="theme-text-muted">Suite 100, New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="theme-bg-tertiary py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold theme-text-inverse mb-2">Subscribe to Our Newsletter</h3>
              <p className="theme-text-muted">Get the latest property updates and market insights</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-l-lg input theme-text-primary focus:outline-none focus:ring-2 focus:theme-border-focus"
              />
              <button className="btn btn-primary px-6 py-3 rounded-r-lg font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="theme-bg-primary py-6 border-t theme-border-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="theme-text-muted text-sm mb-4 md:mb-0">
              © 2024 EstateList. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="theme-text-muted hover:theme-brand-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="theme-text-muted hover:theme-brand-accent transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="theme-text-muted hover:theme-brand-accent transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 