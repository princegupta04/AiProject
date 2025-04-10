import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '@utils/supabase'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const { user } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Error signing out')
    } else {
      toast.success('Signed out successfully')
      navigate('/')
    }
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-primary-600">
            EstateList
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/listings" className="text-gray-600 hover:text-primary-600">
              Listings
            </Link>
            
            {user ? (
              <>
                <Link to="/create-listing" className="text-gray-600 hover:text-primary-600">
                  Create Listing
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-primary-600">
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="btn btn-secondary"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary-600">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 