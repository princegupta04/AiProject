import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Database helper functions
export const getListings = async () => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export const getListingById = async (id) => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export const createListing = async (listing) => {
  const { data, error } = await supabase
    .from('listings')
    .insert([listing])
    .select()
  return { data, error }
}

export const updateListing = async (id, updates) => {
  const { data, error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', id)
    .select()
  return { data, error }
}

export const deleteListing = async (id) => {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id)
  return { error }
}

// Storage helper functions
export const uploadImage = async (file, path) => {
  const { data, error } = await supabase.storage
    .from('listing-images')
    .upload(path, file)
  return { data, error }
}

export const getImageUrl = (path) => {
  const { data } = supabase.storage
    .from('listing-images')
    .getPublicUrl(path)
  return data.publicUrl
} 