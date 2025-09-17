import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaUser, FaComments, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { sendContactEmail } from '../utils/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const {data, error} = await sendContactEmail(formData);
      console.log(data);
      console.log(error);
      if (error) {
        throw new Error(error.message || 'Failed to send message');
      }

      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(error.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen theme-bg-secondary theme-transition">
      {/* Hero Section */}
      <section className="theme-bg-footer text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 theme-text-inverse"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl theme-text-muted"
          >
            We're here to help you find your dream property
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card text-center"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 theme-bg-brand-primary">
                <FaPhone className="theme-text-inverse text-2xl" />
              </div>
              <h3 className="text-xl font-semibold theme-text-primary mb-4">Phone</h3>
              <p className="theme-text-secondary mb-2">+1 (555) 123-4567</p>
              <p className="theme-text-secondary">+1 (555) 987-6543</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card text-center"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 theme-bg-brand-secondary">
                <FaEnvelope className="theme-text-inverse text-2xl" />
              </div>
              <h3 className="text-xl font-semibold theme-text-primary mb-4">Email</h3>
              <p className="theme-text-secondary mb-2">contact@realestate.com</p>
              <p className="theme-text-secondary">info@realestate.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="card text-center"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 theme-bg-brand-accent">
                <FaMapMarkerAlt className="theme-text-inverse text-2xl" />
              </div>
              <h3 className="text-xl font-semibold theme-text-primary mb-4">Office</h3>
              <p className="theme-text-secondary mb-2">123 Real Estate Street</p>
              <p className="theme-text-secondary">Suite 100, New York, NY 10001</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="card"
            >
              <h2 className="text-3xl font-bold theme-text-primary mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="form-label">
                      <FaUser className="inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      <FaEnvelope className="inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="form-label">
                    <FaPhone className="inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="form-label">
                    <FaComments className="inline mr-2" />
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="form-label">
                    <FaComments className="inline mr-2" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="input resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </motion.div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="space-y-8"
            >
              {/* Business Hours */}
              <div className="card">
                <h3 className="text-2xl font-semibold theme-text-primary mb-6 flex items-center">
                  <FaClock className="mr-3 theme-brand-primary" />
                  Business Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b theme-border-primary">
                    <span className="font-medium theme-text-primary">Monday - Friday</span>
                    <span className="theme-text-secondary">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b theme-border-primary">
                    <span className="font-medium theme-text-primary">Saturday</span>
                    <span className="theme-text-secondary">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium theme-text-primary">Sunday</span>
                    <span className="theme-text-secondary">Closed</span>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="card">
                <h3 className="text-2xl font-semibold theme-text-primary mb-6">Why Choose Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <FaCheckCircle className="theme-brand-secondary mt-1" />
                    <div>
                      <h4 className="font-medium theme-text-primary">Expert Guidance</h4>
                      <p className="theme-text-secondary text-sm">Professional real estate experts to guide you through every step</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FaCheckCircle className="theme-brand-secondary mt-1" />
                    <div>
                      <h4 className="font-medium theme-text-primary">24/7 Support</h4>
                      <p className="theme-text-secondary text-sm">Round-the-clock customer support for all your needs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FaCheckCircle className="theme-brand-secondary mt-1" />
                    <div>
                      <h4 className="font-medium theme-text-primary">Best Deals</h4>
                      <p className="theme-text-secondary text-sm">Access to exclusive properties and competitive pricing</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FaCheckCircle className="theme-brand-secondary mt-1" />
                    <div>
                      <h4 className="font-medium theme-text-primary">Trusted Service</h4>
                      <p className="theme-text-secondary text-sm">Over 100+ satisfied families served successfully</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="card">
                <h3 className="text-2xl font-semibold theme-text-primary mb-6">Our Location</h3>
                <div className="theme-bg-tertiary h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="theme-text-muted text-4xl mx-auto mb-4" />
                    <p className="theme-text-secondary">Interactive Map Coming Soon</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 