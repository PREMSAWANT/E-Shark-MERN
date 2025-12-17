import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaUsers, FaLightbulb,FaCheckCircle, FaTimesCircle, FaChartBar } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);

  useEffect(() => {
    fetchStats();
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'ideas') fetchIdeas();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchIdeas = async () => {
    try {
      const response = await api.get('/admin/ideas?status=submitted');
      setIdeas(response.data.data);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  };

  const handleVerifyUser = async (userId, verified) => {
    try {
      await api.patch(`/admin/users/${userId}`, { verified });
      fetchUsers();
      alert(`User ${verified ? 'verified' : 'unverified'} successfully`);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user status');
    }
  };

  const handleIdeaAction = async (ideaId, status, adminNotes = '') => {
    try {
      await api.patch(`/ideas/${ideaId}/status`, { status, adminNotes });
      fetchIdeas();
      setSelectedIdea(null);
      alert(`Idea ${status} successfully`);
    } catch (error) {
      console.error('Error updating idea:', error);
      alert('Failed to update idea status');
    }
  };

  if (loading && !stats) {
    return <LoadingSpinner message="Loading admin dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage platform users and content</p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <FaUsers className="text-4xl mb-2 opacity-75" />
              <p className="text-blue-100 text-sm">Total Users</p>
              <h3 className="text-3xl font-bold">{stats.stats.totalUsers}</h3>
              <div className="mt-2 text-sm text-blue-100">
                <p>Innovators: {stats.stats.totalInnovators}</p>
                <p>Investors: {stats.stats.totalInvestors}</p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <FaLightbulb className="text-4xl mb-2 opacity-75" />
              <p className="text-purple-100 text-sm">Total Ideas</p>
              <h3 className="text-3xl font-bold">{stats.stats.totalIdeas}</h3>
              <div className="mt-2 text-sm text-purple-100">
                <p>Pending: {stats.stats.pendingIdeas}</p>
                <p>Approved: {stats.stats.approvedIdeas}</p>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
              <FaCheckCircle className="text-4xl mb-2 opacity-75" />
              <p className="text-green-100 text-sm">Funded Ideas</p>
              <h3 className="text-3xl font-bold">{stats.stats.fundedIdeas}</h3>
            </div>

            <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <FaChartBar className="text-4xl mb-2 opacity-75" />
              <p className="text-orange-100 text-sm">Total Chats</p>
              <h3 className="text-3xl font-bold">{stats.stats.totalChats}</h3>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="card mb-8">
          <div className="flex space-x-4 border-b pb-4">
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 font-semibold rounded-lg transition-colors ${
                activeTab === 'stats'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 font-semibold rounded-lg transition-colors ${
                activeTab === 'users'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('ideas')}
              className={`px-4 py-2 font-semibold rounded-lg transition-colors ${
                activeTab === 'ideas'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Pending Ideas
            </button>
          </div>

          <div className="mt-6">
            {/* Stats Tab */}
            {activeTab === 'stats' && stats && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Users</h3>
                  <div className="space-y-2">
                    {stats.recentUsers?.map((user) => (
                      <div key={user._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <span className="badge badge-info capitalize">{user.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Ideas</h3>
                  <div className="space-y-2">
                    {stats.recentIdeas?.map((idea) => (
                      <div key={idea._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">{idea.title}</p>
                          <p className="text-sm text-gray-600">by {idea.owner?.name}</p>
                        </div>
                        <span className="badge">{idea.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">All Users</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">{user.name}</td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3">
                            <span className="badge capitalize">{user.role}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`badge ${user.verified ? 'badge-success' : 'badge-warning'}`}>
                              {user.verified ? 'Verified' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {user.role !== 'admin' && (
                              <button
                                onClick={() => handleVerifyUser(user._id, !user.verified)}
                                className={`text-sm px-3 py-1 rounded ${
                                  user.verified
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                                }`}
                              >
                                {user.verified ? 'Unverify' : 'Verify'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Ideas Tab */}
            {activeTab === 'ideas' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pending Ideas for Review</h3>
                {ideas.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No pending ideas</p>
                ) : (
                  <div className="space-y-4">
                    {ideas.map((idea) => (
                      <div key={idea._id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{idea.title}</h4>
                            <p className="text-gray-600 mb-3">{idea.problemStatement}</p>
                            <div className="flex gap-3 text-sm">
                              <span className="badge badge-info">{idea.category}</span>
                              <span className="badge">{idea.currentStage}</span>
                              <span className="font-semibold text-primary-600">
                                ₹{(idea.fundingRequired / 100000).toFixed(1)}L
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                              By: {idea.owner?.name} ({idea.owner?.email})
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleIdeaAction(idea._id, 'reviewed')}
                              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                            >
                              <FaCheckCircle /> Approve
                            </button>
                            <button
                              onClick={() => {
                                const notes = prompt('Rejection reason (optional):');
                                handleIdeaAction(idea._id, 'rejected', notes || '');
                              }}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
                            >
                              <FaTimesCircle /> Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
