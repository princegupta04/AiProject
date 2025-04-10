import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@utils/supabase'

const Listings = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    location: '',
  })
  const [page, setPage] = useState(1)
  const itemsPerPage = 9

  useEffect(() => {
    const fetchListings = async () => {
      try {
        let query = supabase
          .from('listings')
          .select('*')
          .order('created_at', { ascending: false })

        // Apply filters
        if (filters.type) {
          query = query.eq('type', filters.type)
        }
        if (filters.minPrice) {
          query = query.gte('price', filters.minPrice)
        }
        if (filters.maxPrice) {
          query = query.lte('price', filters.maxPrice)
        }
        if (filters.location) {
          query = query.ilike('location', `%${filters.location}%`)
        }

        const { data, error } = await query

        if (error) throw error
        setListings(data)
      } catch (error) {
        console.error('Error fetching listings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [filters])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
    setPage(1)
  }

  const totalPages = Math.ceil(listings.length / itemsPerPage)
  const paginatedListings = listings.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Listings</h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="input"
            >
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Price
            </label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min"
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Price
            </label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max"
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Enter location"
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedListings.map((listing) => (
              <Link
                key={listing.id}
                to={`/listings/${listing.id}`}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img
                    src={listing.image_url || '/placeholder-image.jpg'}
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = '/placeholder-image.jpg'
                    }}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn btn-secondary"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Listings 