import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaHeart, FaComments, FaChartLine, FaLightbulb } from 'react-icons/fa';

const InvestorDashboard = () => {
  const { user } = useAuth();
  const [shortlist, setShortlist] = useState([]);
  const [recentIdeas, setRecentIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    shortlisted: 0,
    chats: 0,
    viewed: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch shortlist
      const shortlistRes = await api.get('/shortlist');
      setShortlist(shortlistRes.data.data);

      // Fetch recent ideas
      const ideasRes = await api.get('/ideas?page=1&limit=6&sort=-createdAt');
      setRecentIdeas(ideasRes.data.data);

      setStats({
        shortlisted: shortlistRes.data.data.length,
        chats: 0, // Will be updated when chat integration is complete
        viewed: 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
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
            Welcome, {user?.name}! 💼
          </h1>
          <p className="text-gray-600">Discover and invest in promising ideas</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm mb-1">Shortlisted Ideas</p>
                <h3 className="text-3xl font-bold">{stats.shortlisted}</h3>
              </div>
              <FaHeart className="text-5xl text-red-200 opacity-50" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">Active Conversations</p>
                <h3 className="text-3xl font-bold">{stats.chats}</h3>
              </div>
              <FaComments className="text-5xl text-purple-200 opacity-50" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Ideas Reviewed</p>
                <h3 className="text-3xl font-bold">{stats.viewed}</h3>
              </div>
              <FaChartLine className="text-5xl text-blue-200 opacity-50" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex gap-4">
          <Link to="/explore" className="btn-primary">
            Explore All Ideas
          </Link>
          <Link to="/investor/shortlist" className="btn-secondary">
            View Shortlist
          </Link>
        </div>

        {/* Shortlisted Ideas */}
        {shortlist.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Shortlist</h2>
              <Link to="/investor/shortlist" className="text-primary-600 hover:text-primary-700 font-semibold">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shortlist.slice(0, 3).map((item) => (
               <div key={item._id} className="card card-hover">
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge badge-info">{item.idea?.category}</span>
                    <FaHeart className="text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.idea?.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.idea?.problemStatement}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-primary-600">
                      ₹{(item.idea?.fundingRequired / 100000).toFixed(1)}L
                    </span>
                    <Link
                      to={`/idea/${item.idea?._id}`}
                      className="text-primary-600 hover:text-primary-700 font-semibold"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Ideas */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recently Added Ideas</h2>
            <Link to="/explore" className="text-primary-600 hover:text-primary-700 font-semibold">
              Explore More →
            </Link>
          </div>

          {recentIdeas.length === 0 ? (
            <div className="card text-center py-12">
              <FaLightbulb className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No ideas available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentIdeas.map((idea) => (
                <div key={idea._id} className="card card-hover">
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge badge-info">{idea.category}</span>
                    <span className="badge">{idea.currentStage}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{idea.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {idea.problemStatement}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary-600">
                      ₹{(idea.fundingRequired / 100000).toFixed(1)}L
                    </span>
                    <Link
                      to={`/idea/${idea._id}`}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      View Pitch
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Investment Criteria Reminder */}
        <div className="mt-8 card bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Investment Tips</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Review pitch details thoroughly before initiating contact</li>
            <li>✅ Check innovator's background and team composition</li>
            <li>✅ Assess market size and revenue model viability</li>
            <li>✅ Use shortlist to track promising opportunities</li>
            <li>✅ Engage in chat to clarify your questions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
