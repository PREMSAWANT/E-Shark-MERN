import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaSearch, FaFilter, FaEye, FaHeart } from 'react-icons/fa';

const ExploreIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    currentStage: '',
    minFunding: '',
    maxFunding: '',
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All', 'Technology', 'Healthcare', 'Education', 'Finance', 'E-commerce',
    'Agriculture', 'Environment', 'Entertainment', 'Food & Beverage',
    'Fashion', 'Real Estate', 'Other'
  ];

  const stages = ['All', 'Idea', 'Prototype', 'MVP', 'Early Revenue', 'Scaling'];

  useEffect(() => {
    fetchIdeas();
  }, [pagination.currentPage]);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 12,
        ...filters,
      });

      // Remove empty filters
      Object.keys(filters).forEach((key) => {
        if (!filters[key] || filters[key] === 'All') {
          params.delete(key);
        }
      });

      const response = await api.get(`/ideas?${params.toString()}`);
      setIdeas(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleSearch = () => {
    setPagination({ ...pagination, currentPage: 1 });
    fetchIdeas();
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      currentStage: '',
      minFunding: '',
      maxFunding: '',
    });
    setPagination({ ...pagination, currentPage: 1 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">Explore Innovative Ideas</h1>
          <p className="text-gray-600 text-lg">Discover the next big opportunity</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="input-field pl-12"
                placeholder="Search ideas by title, problem, or solution..."
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button onClick={handleSearch} className="btn-primary">
              Search
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center gap-2"
            >
              <FaFilter /> Filters
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="card mb-8 animate-slide-up">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="label">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat === 'All' ? '' : cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Stage</label>
                <select
                  value={filters.currentStage}
                  onChange={(e) => handleFilterChange('currentStage', e.target.value)}
                  className="input-field"
                >
                  {stages.map((stage) => (
                    <option key={stage} value={stage === 'All' ? '' : stage}>{stage}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Min Funding (₹)</label>
                <input
                  type="number"
                  value={filters.minFunding}
                  onChange={(e) => handleFilterChange('minFunding', e.target.value)}
                  className="input-field"
                  placeholder="e.g., 1000000"
                />
              </div>

              <div>
                <label className="label">Max Funding (₹)</label>
                <input
                  type="number"
                  value={filters.maxFunding}
                  onChange={(e) => handleFilterChange('maxFunding', e.target.value)}
                  className="input-field"
                  placeholder="e.g., 10000000"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button onClick={handleSearch} className="btn-primary">
                Apply Filters
              </button>
              <button onClick={handleClearFilters} className="btn-secondary">
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {ideas.length} of {pagination.totalItems} ideas
          </p>
        </div>

        {/* Ideas Grid */}
        {loading ? (
          <LoadingSpinner message="Loading ideas..." />
        ) : ideas.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-gray-600 text-xl mb-4">No ideas found matching your criteria</p>
            <button onClick={handleClearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {ideas.map((idea) => (
                <div key={idea._id} className="card card-hover">
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge badge-info">{idea.category}</span>
                    <span className="badge">{idea.currentStage}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{idea.title}</h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {idea.problemStatement}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FaEye /> {idea.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaHeart /> {idea.likes?.length || 0}
                    </span>
                  </div>

                  <div className="border-t pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Funding Required</p>
                      <p className="font-bold text-primary-600 text-lg">
                        ₹{(idea.fundingRequired / 100000).toFixed(1)}L
                      </p>
                    </div>
                    <Link
                      to={`/idea/${idea._id}`}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      View Pitch
                    </Link>
                  </div>

                  {/* Owner Info */}
                  <div className="mt-4 pt-4 border-t flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-semibold">
                      {idea.owner?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{idea.owner?.name}</p>
                      <p className="text-xs text-gray-500">Innovator</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPagination({ ...pagination, currentPage: pagination.currentPage - 1 })}
                  disabled={pagination.currentPage === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {[...Array(pagination.totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setPagination({ ...pagination, currentPage: index + 1 })}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        pagination.currentPage === index + 1
                          ? 'bg-primary-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExploreIdeas;
