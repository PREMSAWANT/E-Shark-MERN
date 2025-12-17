import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaHeart, FaEye, FaTrash, FaComments } from 'react-icons/fa';

const Shortlist = () => {
  const { user } = useAuth();
  const [shortlist, setShortlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, high, medium, low

  useEffect(() => {
    fetchShortlist();
  }, []);

  const fetchShortlist = async () => {
    try {
      setLoading(true);
      const response = await api.get('/shortlist');
      setShortlist(response.data.data);
    } catch (error) {
      console.error('Error fetching shortlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (ideaId) => {
    if (!window.confirm('Remove this idea from your shortlist?')) return;

    try {
      await api.delete(`/shortlist/${ideaId}`);
      fetchShortlist(); // Refresh list
    } catch (error) {
      console.error('Error removing from shortlist:', error);
      alert('Failed to remove from shortlist');
    }
  };

  const filteredShortlist = shortlist.filter((item) => {
    if (filter === 'all') return true;
    return item.interestLevel === filter;
  });

  if (loading) {
    return <LoadingSpinner message="Loading your shortlist..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              My Shortlist ❤️
            </h1>
            <p className="text-gray-600">
              {shortlist.length} {shortlist.length === 1 ? 'idea' : 'ideas'} saved
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'high'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              High Interest
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'medium'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'low'
                  ? 'bg-gray-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Low
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredShortlist.length === 0 ? (
          <div className="card text-center py-16">
            <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filter === 'all' ? 'No ideas shortlisted yet' : `No ${filter} interest ideas`}
            </h2>
            <p className="text-gray-600 mb-6">
              Start exploring ideas and shortlist the ones you like
            </p>
            <Link to="/explore" className="btn-primary">
              Explore Ideas
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredShortlist.map((item) => (
              <div key={item._id} className="card">
                <div className="flex items-start gap-6">
                  {/* Idea Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="badge badge-info">{item.idea?.category}</span>
                      <span className="badge">{item.idea?.currentStage}</span>
                      <span
                        className={`badge ${
                          item.interestLevel === 'high'
                            ? 'badge-success'
                            : item.interestLevel === 'medium'
                            ? 'badge-warning'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {item.interestLevel} interest
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {item.idea?.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {item.idea?.problemStatement}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <FaEye /> {item.idea?.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <FaHeart className="text-red-500" /> {item.idea?.likes?.length || 0} likes
                      </span>
                      <span className="font-semibold text-primary-600 text-base">
                        ₹{(item.idea?.fundingRequired / 100000).toFixed(1)}L funding
                      </span>
                    </div>

                    {/* Innovator Info */}
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                        {item.idea?.owner?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.idea?.owner?.name}</p>
                        <p className="text-sm text-gray-600">Innovator</p>
                      </div>
                    </div>

                    {/* Notes */}
                    {item.notes && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700 mb-1">My Notes:</p>
                        <p className="text-sm text-gray-600">{item.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    <Link
                      to={`/idea/${item.idea?._id}`}
                      className="btn-primary text-sm py-2 px-4 text-center"
                    >
                      View Pitch
                    </Link>
                    <button
                      className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
                    >
                      <FaComments /> Chat
                    </button>
                    <button
                      onClick={() => handleRemove(item.idea?._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm flex items-center gap-2"
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>

                {/* Added Date */}
                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
                  Shortlisted on {new Date(item.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        {shortlist.length > 0 && (
          <div className="mt-8 card bg-gradient-to-r from-blue-50 to-primary-50">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Shortlist Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Use interest levels to prioritize your favorite ideas</li>
              <li>✅ Add notes to remember key details about each pitch</li>
              <li>✅ Initiate chat to discuss terms with innovators</li>
              <li>✅ Review shortlisted ideas regularly as they evolve</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shortlist;
