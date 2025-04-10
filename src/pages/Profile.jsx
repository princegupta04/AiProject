import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@utils/supabase'
import toast from 'react-hot-toast'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        // Get user's listings
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error
        setListings(data)
      } catch (error) {
        console.error('Error fetching profile data:', error)
        toast.error('Failed to load profile data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDeleteListing = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return

    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id)

      if (error) throw error

      setListings(prev => prev.filter(listing => listing.id !== id))
      toast.success('Listing deleted successfully')
    } catch (error) {
      toast.error('Failed to delete listing')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="card mb-8">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Created</p>
              <p className="text-lg">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Listings</h2>
            <Link
              to="/create-listing"
              className="btn btn-primary"
            >
              Create New Listing
            </Link>
          </div>

          {listings.length === 0 ? (
            <p className="text-center text-gray-600 py-8">
              You haven't created any listings yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div key={listing.id} className="card">
                  <img
                    src={listing.image_url}
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                  <p className="text-gray-600 mb-2">{listing.location}</p>
                  <p className="text-primary-600 font-bold mb-4">
                    ${listing.price.toLocaleString()}
                  </p>
                  <div className="flex space-x-2">
                    <Link
                      to={`/listings/${listing.id}`}
                      className="btn btn-primary flex-1"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDeleteListing(listing.id)}
                      className="btn btn-secondary"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile 