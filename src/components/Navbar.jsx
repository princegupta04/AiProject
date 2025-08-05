import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHome, FaSearch, FaUser, FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa'
import { supabase } from '@utils/supabase'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const getUser = async () => {
      const { user } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      subscription.unsubscribe()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Error signing out')
    } else {
      toast.success('Signed out successfully')
      navigate('/home')
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FaPhone className="text-blue-300" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-blue-300" />
                <span>contact@realestate.com</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <span className="text-blue-300">Welcome, {user.email}</span>
              ) : (
                <>
                  {/* <Link to="/login" className="text-blue-300 hover:text-white transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors">
                    Register
                  </Link> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`transition-all duration-300 ${isScrolled ? 'bg-white' : 'bg-white/95 backdrop-blur-sm'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/home" className="flex items-center space-x-2">
              <FaHome className="text-blue-600 text-2xl" />
              <span className={`text-xl font-bold transition-colors ${isScrolled ? 'text-gray-900' : 'text-blue-600'}`}>
                EstateList
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/home" 
                className={`font-medium transition-colors ${
                  isActive('/home') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Home
              </Link>
              
              {user && (
                <div className="relative group">
                  <button className={`font-medium transition-colors flex items-center space-x-1 ${
                    isActive('/listings') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}>
                    <span>Properties</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link to="/listings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      All Properties
                    </Link>
                    <Link to="/listings?type=house" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      Houses
                    </Link>
                    <Link to="/listings?type=condo" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      Condos
                    </Link>
                    <Link to="/listings?type=townhouse" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      Townhouses
                    </Link>
                  </div>
                </div>
              )}

              <Link 
                to="/blog" 
                className={`font-medium transition-colors ${
                  isActive('/blog') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Blog
              </Link>
              
              <Link 
                to="/contact" 
                className={`font-medium transition-colors ${
                  isActive('/contact') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* User Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <>
                  <Link 
                    to="/create-listing" 
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    List Property
                  </Link>
                  <div className="relative group">
                    <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                      <FaUser />
                      <span>Account</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        My Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link 
                to="/home" 
                className={`block py-2 font-medium ${
                  isActive('/home') ? 'text-blue-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {user && (
                <Link 
                  to="/listings" 
                  className={`block py-2 font-medium ${
                    isActive('/listings') ? 'text-blue-600' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Properties
                </Link>
              )}
              <Link 
                to="/blog" 
                className={`block py-2 font-medium ${
                  isActive('/blog') ? 'text-blue-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className={`block py-2 font-medium ${
                  isActive('/contact') ? 'text-blue-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/create-listing" 
                    className="block py-2 font-medium text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    List Property
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block py-2 font-medium text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left py-2 font-medium text-gray-700"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="pt-4 border-t border-gray-200">
                  <Link 
                    to="/login" 
                    className="block py-2 font-medium text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block py-2 font-medium text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar 