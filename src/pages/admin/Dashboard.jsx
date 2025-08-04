import { Link, Outlet } from 'react-router-dom';
import { FaUsers, FaHome, FaEnvelope, FaList, FaChartBar } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col py-8 px-4 space-y-8">
        <div className="text-2xl font-bold mb-8 flex items-center space-x-2">
          <FaChartBar />
          <span>Admin Panel</span>
        </div>
        <nav className="flex-1 space-y-4">
          <Link to="/admin" className="flex items-center space-x-2 hover:text-blue-300">
            <FaChartBar /> <span>Dashboard</span>
          </Link>
          <Link to="/admin/users" className="flex items-center space-x-2 hover:text-blue-300">
            <FaUsers /> <span>Users</span>
          </Link>
          <Link to="/admin/listings" className="flex items-center space-x-2 hover:text-blue-300">
            <FaHome /> <span>Listings</span>
          </Link>
          <Link to="/admin/contacts" className="flex items-center space-x-2 hover:text-blue-300">
            <FaEnvelope /> <span>Contacts</span>
          </Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-2xl font-bold mb-2">--</div>
            <div className="text-gray-600">Total Users</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-2xl font-bold mb-2">--</div>
            <div className="text-gray-600">Total Listings</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-2xl font-bold mb-2">--</div>
            <div className="text-gray-600">Contact Submissions</div>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard; 