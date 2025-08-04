import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaTags } from 'react-icons/fa';

const Blog = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Future of Real Estate: Trends to Watch in 2024",
      excerpt: "Discover the latest trends shaping the real estate market and how they might affect your investment decisions.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "March 15, 2024",
      author: "John Doe",
      tags: ["Market Trends", "Investment"]
    },
    {
      id: 2,
      title: "Smart Home Technology: Enhancing Property Value",
      excerpt: "Learn how smart home features can increase your property's value and appeal to modern buyers.",
      image: "https://images.unsplash.com/photo-1558002038-1055e93f2e2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "March 10, 2024",
      author: "Jane Smith",
      tags: ["Technology", "Home Improvement"]
    },
    {
      id: 3,
      title: "Sustainable Living: Eco-Friendly Homes on the Rise",
      excerpt: "Explore the growing demand for sustainable housing and how it's changing the real estate landscape.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "March 5, 2024",
      author: "Mike Johnson",
      tags: ["Sustainability", "Green Living"]
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-xl text-gray-600">Insights, trends, and expert advice in real estate</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: post.id * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <div className="flex items-center space-x-2 text-white text-sm">
                    <FaCalendarAlt />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <FaUser />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaTags />
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog; 