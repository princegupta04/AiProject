import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@utils/supabase'

const Home = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6)

        if (error) throw error
        setListings(data)
      } catch (error) {
        console.error('Error fetching listings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Property</h1>
          <p className="text-xl mb-8">Discover the perfect place to call home</p>
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search by location, property type, or price..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </div>

      {/* Featured Listings */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Listings</h2>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Link
                key={listing.id}
                to={`/listings/${listing.id}`}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img
                    src={listing.image_url}
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                <p className="text-gray-600 mb-2">{listing.location}</p>
                <p className="text-primary-600 font-bold">
                  ${listing.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            to="/listings"
            className="btn btn-primary"
          >
            View All Listings
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home 