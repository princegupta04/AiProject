import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from '@components/Navbar'
import Home from '@pages/Home'
import Listings from '@pages/Listings'
import CreateListing from '@pages/CreateListing'
import EditListing from '@pages/EditListing'
import Profile from '@pages/Profile'
import Login from '@pages/Login'
import Register from '@pages/Register'
import ListingDetails from '@pages/ListingDetails'
import PrivateRoute from '@components/PrivateRoute'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:id" element={<ListingDetails />} />
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
      <Toaster position="top-right" />
    </div>
  )
}

export default App 