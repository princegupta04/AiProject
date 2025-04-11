import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@utils/supabase'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { ListingDetailsSkeleton } from '@components/Skeleton'
import PaymentWrapper from '@components/PaymentForm'

const ListingDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        console.log('Listing data:', data)
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
      console.log('Current user:', user)
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
        }
      }

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
    return <ListingDetailsSkeleton />
  }

  if (!listing) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <h1 className="text-2xl font-bold text-gray-900">Listing not found</h1>
        <button
          onClick={() => navigate('/listings')}
          className="btn btn-primary mt-4"
        >
          Back to Listings
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
              )}
              <img
                src={listing.image_url}
                alt={listing.title}
                className={`w-full h-96 object-cover rounded-lg transition-opacity duration-300 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setImageLoading(false)}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/placeholder-image.jpg'
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
              <p className="text-gray-600 mb-4">{listing.location}</p>
              <p className="text-2xl font-bold text-primary-600 mb-6">
                ${listing.price.toLocaleString()}
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 mb-6"
            >
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Bedrooms</p>
                <p className="text-lg font-semibold">{listing.bedrooms}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Bathrooms</p>
                <p className="text-lg font-semibold">{listing.bathrooms}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Area</p>
                <p className="text-lg font-semibold">{listing.area} sq ft</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{listing.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold mb-2">Property Type</h2>
              <p className="text-gray-700 capitalize">{listing.type}</p>
            </motion.div>

            {user && user.id === listing.user_id ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex space-x-4"
              >
                <button
                  onClick={() => navigate(`/listings/${id}/edit`)}
                  className="btn btn-primary flex-1"
                >
                  Edit Listing
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-secondary"
                >
                  Delete Listing
                </button>
              </motion.div>
            ) : user ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <PaymentWrapper 
                  listing={listing} 
                  onSuccess={() => {
                    toast.success('Payment successful! The listing will be marked as sold.');
                    navigate('/listings');
                  }} 
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-primary w-full"
                >
                  Login to Purchase
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default ListingDetails 