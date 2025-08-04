import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'
import Home from '@pages/Home'
import Listings from '@pages/Listings'
import CreateListing from '@pages/CreateListing'
import EditListing from '@pages/EditListing'
import Profile from '@pages/Profile'
import Login from '@pages/Login'
import Register from '@pages/Register'
import ListingDetails from '@pages/ListingDetails'
import Blog from '@pages/Blog'
import Contact from '@pages/Contact'
import PrivateRoute from '@components/PrivateRoute'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/listings"
            element={
              <PrivateRoute>
                <Listings />
              </PrivateRoute>
            }
          />
          <Route
            path="/listings/:id"
            element={
              <PrivateRoute>
                <ListingDetails />
              </PrivateRoute>
            }
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create-listing"
            element={
              <PrivateRoute>
                <CreateListing />
              </PrivateRoute>
            }
          />
          <Route
            path="/listings/:id/edit"
            element={
              <PrivateRoute>
                <EditListing />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}

export default App 