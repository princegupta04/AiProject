import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@utils/supabase'
import toast from 'react-hot-toast'

const ListingDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        setListing(data)
      } catch (error) {
        console.error('Error fetching listing:', error)
        toast.error('Failed to load listing details')
      } finally {
        setLoading(false)
      }
    }

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    fetchListing()
    getUser()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return

    try {
      // Delete the image from storage if it exists
      if (listing.image_url) {
        const imagePath = listing.image_url.split('/').pop()
        const { error: storageError } = await supabase.storage
          .from('listing-images')
          .remove([imagePath])

        if (storageError) {
          console.error('Error deleting image:', storageError)
          // Continue with listing deletion even if image deletion fails
        }
      }

      // Delete the listing
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Listing deleted successfully')
      navigate('/listings')
    } catch (error) {
      console.error('Error deleting listing:', error)
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

  if (!listing) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-gray-900">Listing not found</h1>
        <button
          onClick={() => navigate('/listings')}
          className="btn btn-primary mt-4"
        >
          Back to Listings
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={listing.image_url}
              alt={listing.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
            <p className="text-gray-600 mb-4">{listing.location}</p>
            <p className="text-2xl font-bold text-primary-600 mb-6">
              ${listing.price.toLocaleString()}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Bedrooms</p>
                <p className="text-lg font-semibold">{listing.bedrooms}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Bathrooms</p>
                <p className="text-lg font-semibold">{listing.bathrooms}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Area</p>
                <p className="text-lg font-semibold">{listing.area} sq ft</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{listing.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Property Type</h2>
              <p className="text-gray-700 capitalize">{listing.type}</p>
            </div>

            {user && user.id === listing.user_id && (
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(`/listings/${id}/edit`)}
                  className="btn btn-primary"
                >
                  Edit Listing
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-secondary"
                >
                  Delete Listing
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetails 