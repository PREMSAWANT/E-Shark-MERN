import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaPlus, FaEye, FaHeart, FaChartLine, FaComments, FaEdit, FaTrash } from 'react-icons/fa';

const InnovatorDashboard = () => {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalIdeas: 0,
    totalViews: 0,
    totalLikes: 0,
    totalChats: 0,
  });

  useEffect(() => {
    fetchMyIdeas();
  }, []);

  const fetchMyIdeas = async () => {
    try {
      setLoading(true);
      const response = await api.get('/ideas/my/ideas');
      const myIdeas = response.data.data;
      setIdeas(myIdeas);

      // Calculate stats
      const totalViews = myIdeas.reduce((sum, idea) => sum + idea.views, 0);
      const totalLikes = myIdeas.reduce((sum, idea) => sum + idea.likes.length, 0);

      setStats({
        totalIdeas: myIdeas.length,
        totalViews,
        totalLikes,
        totalChats: 0, // Will be updated when chat API is integrated
      });
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ideaId) => {
    if (!window.confirm('Are you sure you want to delete this pitch?')) return;

    try {
      await api.delete(`/ideas/${ideaId}`);
      fetchMyIdeas(); // Refresh list
    } catch (error) {
      console.error('Error deleting idea:', error);
      alert('Failed to delete pitch');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      submitted: 'badge badge-warning',
      reviewed: 'badge badge-success',
      shortlisted: 'badge badge-info',
      funded: 'badge badge-success',
      rejected: 'badge badge-danger',
    };
    return badges[status] || 'badge';
  };

  if (loading) {
    return <LoadingSpinner message="Loading your dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">Manage your pitches and track your progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Total Pitches</p>
                <h3 className="text-3xl font-bold">{stats.totalIdeas}</h3>
              </div>
              <FaChartLine className="text-5xl text-blue-200 opacity-50" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm mb-1">Total Views</p>
                <h3 className="text-3xl font-bold">{stats.totalViews}</h3>
              </div>
              <FaEye className="text-5xl text-green-200 opacity-50" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm mb-1">Total Likes</p>
                <h3 className="text-3xl font-bold">{stats.totalLikes}</h3>
              </div>
              <FaHeart className="text-5xl text-red-200 opacity-50" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">Active Chats</p>
                <h3 className="text-3xl font-bold">{stats.totalChats}</h3>
              </div>
              <FaComments className="text-5xl text-purple-200 opacity-50" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Link
            to="/innovator/create-pitch"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FaPlus /> Create New Pitch
          </Link>
        </div>

        {/* Ideas List */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Pitches</h2>
            <span className="text-gray-600">{ideas.length} total</span>
          </div>

          {ideas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">You haven't created any pitches yet</p>
              <Link to="/innovator/create-pitch" className="btn-primary">
                Create Your First Pitch
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {ideas.map((idea) => (
                <div
                  key={idea._id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{idea.title}</h3>
                        <span className={getStatusBadge(idea.status)}>
                          {idea.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{idea.problemStatement}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaEye /> {idea.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <FaHeart /> {idea.likes?.length || 0} likes
                        </span>
                        <span className="badge badge-info">{idea.category}</span>
                        <span className="badge">{idea.currentStage}</span>
                        <span className="font-semibold text-primary-600">
                          ₹{(idea.fundingRequired / 100000).toFixed(1)}L funding
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Link
                        to={`/idea/${idea._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <FaEye className="text-xl" />
                      </Link>
                      <Link
                        to={`/innovator/edit-pitch/${idea._id}`}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit className="text-xl" />
                      </Link>
                      <button
                        onClick={() => handleDelete(idea._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrash className="text-xl" />
                      </button>
                    </div>
                  </div>

                  {idea.adminNotes && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Admin Notes:</strong> {idea.adminNotes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tips Section */}
        {ideas.length > 0 && (
          <div className="mt-8 card bg-gradient-to-r from-primary-50 to-blue-50">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Tips to Improve Your Pitches</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Add compelling images to increase views by 40%</li>
              <li>✅ Clearly define your problem statement and solution</li>
              <li>✅ Include market size and revenue model for investor confidence</li>
              <li>✅ Respond quickly to investor inquiries in chat</li>
              <li>✅ Keep your profile updated with latest achievements</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InnovatorDashboard;
