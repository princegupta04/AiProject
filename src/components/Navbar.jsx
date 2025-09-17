import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHome, FaSearch, FaUser, FaBars, FaTimes, FaPhone, FaEnvelope, FaMoon, FaSun, FaPalette } from 'react-icons/fa'
import { supabase } from '@utils/supabase'
import { useTheme } from '@contexts/ThemeContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme, setTheme } = useTheme()
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

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <FaSun className="w-4 h-4" />
      case 'dark':
        return <FaMoon className="w-4 h-4" />
      case 'modern':
        return <FaPalette className="w-4 h-4" />
      default:
        return <FaSun className="w-4 h-4" />
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'theme-shadow-lg' : 'theme-shadow-md'
    }`}>
      {/* Top Bar */}
      <div className="theme-bg-footer py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FaPhone className="theme-brand-accent" />
                <span className="theme-text-inverse">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="theme-brand-accent" />
                <span className="theme-text-inverse">contact@realestate.com</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <span className="theme-text-muted">Welcome, {user.email}</span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="theme-bg-navbar theme-transition">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/home" className="flex items-center space-x-2">
              <FaHome className="theme-brand-primary text-2xl" />
              <span className="text-xl font-bold theme-brand-primary">
                EstateList
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/home" 
                className={`nav-link ${
                  isActive('/home') ? 'active' : ''
                }`}
              >
                Home
              </Link>
              
              {user && (
                <div className="relative group">
                  <button className={`nav-link flex items-center space-x-1 ${
                    isActive('/listings') ? 'active' : ''
                  }`}>
                    <span>Properties</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 theme-bg-card rounded-lg theme-shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 theme-border-primary border">
                    <Link to="/listings" className="block px-4 py-2 theme-text-secondary hover:theme-bg-tertiary theme-hover-primary transition-colors">
                      All Properties
                    </Link>
                    <Link to="/listings?type=house" className="block px-4 py-2 theme-text-secondary hover:theme-bg-tertiary theme-hover-primary transition-colors">
                      Houses
                    </Link>
                    <Link to="/listings?type=condo" className="block px-4 py-2 theme-text-secondary hover:theme-bg-tertiary theme-hover-primary transition-colors">
                      Condos
                    </Link>
                    <Link to="/listings?type=townhouse" className="block px-4 py-2 theme-text-secondary hover:theme-bg-tertiary theme-hover-primary transition-colors">
                      Townhouses
                    </Link>
                  </div>
                </div>
              )}

              <Link 
                to="/blog" 
                className={`nav-link ${
                  isActive('/blog') ? 'active' : ''
                }`}
              >
                Blog
              </Link>
              
              <Link 
                to="/contact" 
                className={`nav-link ${
                  isActive('/contact') ? 'active' : ''
                }`}
              >
                Contact
              </Link>
            </div>

            {/* User Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg theme-text-secondary hover:theme-bg-tertiary transition-colors"
                title={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'modern' : 'light'} theme`}
              >
                {getThemeIcon()}
              </button>

              {user ? (
                <>
                  <Link 
                    to="/create-listing" 
                    className="btn btn-secondary"
                  >
                    List Property
                  </Link>
                  <div className="relative group">
                    <button className="flex items-center space-x-2 theme-text-secondary hover:theme-brand-primary transition-colors">
                      <FaUser />
                      <span>Account</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-48 theme-bg-card rounded-lg theme-shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 theme-border-primary border">
                      <Link to="/profile" className="block px-4 py-2 theme-text-secondary hover:theme-bg-tertiary theme-hover-primary transition-colors">
                        My Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 theme-text-secondary hover:theme-bg-tertiary theme-hover-primary transition-colors"
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
                    className="nav-link"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn btn-primary"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg theme-text-secondary hover:theme-bg-tertiary transition-colors"
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
            className="lg:hidden theme-bg-card theme-border-primary border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link 
                to="/home" 
                className={`block py-2 nav-link ${
                  isActive('/home') ? 'active' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {user && (
                <Link 
                  to="/listings" 
                  className={`block py-2 nav-link ${
                    isActive('/listings') ? 'active' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Properties
                </Link>
              )}
              <Link 
                to="/blog" 
                className={`block py-2 nav-link ${
                  isActive('/blog') ? 'active' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className={`block py-2 nav-link ${
                  isActive('/contact') ? 'active' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Theme Toggle for Mobile */}
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 py-2 nav-link"
              >
                {getThemeIcon()}
                <span>Switch Theme</span>
              </button>
              
              {user ? (
                <>
                  <Link 
                    to="/create-listing" 
                    className="block py-2 theme-brand-secondary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    List Property
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block py-2 nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left py-2 nav-link"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="pt-4 border-t theme-border-primary">
                  <Link 
                    to="/login" 
                    className="block py-2 nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block py-2 theme-brand-primary font-medium"
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