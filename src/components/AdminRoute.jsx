import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@utils/supabase';
import toast from 'react-hot-toast';

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      // Fetch user metadata (role)
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      if (error || !data || data.role !== 'admin') {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      setIsAdmin(true);
      setLoading(false);
    };
    checkAdmin();
  }, []);

  if (loading) return <div className="text-center py-20">Checking admin access...</div>;
  if (!isAdmin) {
    toast.error('Admin access required');
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminRoute; 