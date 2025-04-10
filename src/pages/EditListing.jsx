import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@utils/supabase'
import toast from 'react-hot-toast'

const EditListing = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'house',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    image: null,
  })
  const [currentImageUrl, setCurrentImageUrl] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth error:', error)
          throw error
        }

        if (session?.user) {
          setUser(session.user)
          // Fetch listing only after we have the user
          await fetchListing(session.user)
        } else {
          setUser(null)
          navigate('/login')
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        setUser(null)
        navigate('/login')
      } finally {
        setIsLoadingUser(false)
      }
    }

    const fetchListing = async (currentUser) => {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error

        if (data.user_id !== currentUser.id) {
          toast.error('You are not authorized to edit this listing')
          navigate('/listings')
          return
        }

        setFormData({
          title: data.title,
          description: data.description,
          type: data.type,
          price: data.price.toString(),
          location: data.location,
          bedrooms: data.bedrooms.toString(),
          bathrooms: data.bathrooms.toString(),
          area: data.area.toString(),
          image: null,
        })
        setCurrentImageUrl(data.image_url)
      } catch (error) {
        console.error('Error fetching listing:', error)
        toast.error('Failed to load listing')
        navigate('/listings')
      }
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user) {
        navigate('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [id, navigate]) // Remove user from dependencies

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files[0]
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('You must be logged in to edit a listing')
      navigate('/login')
      return
    }

    setLoading(true)

    try {
      let imageUrl = currentImageUrl

      // Upload new image if provided
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        
        // Upload the new file
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('listing-images')
          .upload(fileName, formData.image, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) {
          console.error('Image upload error:', uploadError)
          throw uploadError
        }

        // Get the public URL for the new image
        const { data: { publicUrl } } = supabase.storage
          .from('listing-images')
          .getPublicUrl(fileName)

        imageUrl = publicUrl
      }

      // Update listing
      const listingData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        price: parseFloat(formData.price),
        location: formData.location,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseInt(formData.area),
        image_url: imageUrl,
      }

      const { error } = await supabase
        .from('listings')
        .update(listingData)
        .eq('id', id)

      if (error) throw error

      toast.success('Listing updated successfully!')
      navigate(`/listings/${id}`)
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      toast.error(error.message || 'Failed to update listing. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return null // The PrivateRoute will handle the redirection
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold mb-6">Edit Listing</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area (sq ft)
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Image
            </label>
            <img
              src={currentImageUrl}
              alt="Current listing"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Property Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Listing'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditListing 