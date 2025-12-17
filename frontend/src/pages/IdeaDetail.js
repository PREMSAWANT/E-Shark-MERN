import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaEye, FaHeart, FaRegHeart, FaComments, FaMoneyBillWave, FaChartLine, FaRocket, FaUser } from 'react-icons/fa';

const IdeaDetail = () => {
  const { id } = useParams();
  const { user, isInvestor } = useAuth();
  const navigate = useNavigate();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (id) {
      fetchIdeaDetails();
      incrementViews();
      if (isInvestor()) {
        checkShortlist();
      }
    }
  }, [id]);

  const fetchIdeaDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/ideas/${id}`);
      const ideaData = response.data.data;
      setIdea(ideaData);
      setLikesCount(ideaData.likes?.length || 0);
      
      // Check if current user has liked
      if (user && ideaData.likes) {
        setIsLiked(ideaData.likes.includes(user._id));
      }
    } catch (error) {
      console.error('Error fetching idea:', error);
      alert('Failed to load pitch details');
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = async () => {
    try {
      await api.patch(`/ideas/${id}/view`);
    } catch (error) {
      // Silent fail - views are not critical
    }
  };

  const checkShortlist = async () => {
    try {
      const response = await api.get(`/shortlist/check/${id}`);
      setIsShortlisted(response.data.data.isShortlisted);
    } catch (error) {
      console.error('Error checking shortlist:', error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert('Please login to like this pitch');
      navigate('/login');
      return;
    }

    try {
      const response = await api.patch(`/ideas/${id}/like`);
      setIsLiked(response.data.data.isLiked);
      setLikesCount(response.data.data.likes);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleShortlist = async () => {
    if (!isInvestor()) {
      alert('Only investors can shortlist ideas');
      return;
    }

    try {
      if (isShortlisted) {
        await api.delete(`/shortlist/${id}`);
        setIsShortlisted(false);
        alert('Removed from shortlist');
      } else {
        await api.post('/shortlist', { ideaId: id });
        setIsShortlisted(true);
        alert('Added to shortlist');
      }
    } catch (error) {
      console.error('Error toggling shortlist:', error);
      alert('Failed to update shortlist');
    }
  };

  const handleInitiateChat = async () => {
    if (!isInvestor()) {
      alert('Only investors can initiate chats');
      return;
    }

    try {
      const response = await api.post('/chats', {
        innovatorId: idea.owner._id,
        ideaId: idea._id,
      });
      navigate('/chat');
    } catch (error) {
      console.error('Error creating chat:', error);
      alert('Failed to initiate chat');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading pitch details..." />;
  }

  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pitch not found</h2>
          <button onClick={() => navigate('/explore')} className="btn-primary">
            Explore Ideas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <div className="card mb-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="badge badge-info">{idea.category}</span>
                <span className="badge">{idea.currentStage}</span>
                <span className={`badge ${idea.status === 'reviewed' ? 'badge-success' : 'badge-warning'}`}>
                  {idea.status}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{idea.title}</h1>
              
              <div className="flex items-center gap-6 text-gray-600">
                <span className="flex items-center gap-2">
                  <FaEye /> {idea.views} views
                </span>
                <button onClick={handleLike} className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                  {likesCount} likes
                </button>
              </div>
            </div>

            {/* Actions */}
            {user && idea.owner._id !== user._id && (
              <div className="flex flex-col gap-3">
                {isInvestor() && (
                  <>
                    <button
                      onClick={handleShortlist}
                      className={`${
                        isShortlisted
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-primary-500 hover:bg-primary-600'
                      } text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300`}
                    >
                      {isShortlisted ? '❤️ Shortlisted' : '🤍 Shortlist'}
                    </button>
                    <button onClick={handleInitiateChat} className="btn-secondary flex items-center gap-2">
                      <FaComments /> Start Chat
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Funding Section */}
        <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Funding Required</p>
              <h2 className="text-4xl font-bold text-green-600">
                ₹{(idea.fundingRequired /100000).toFixed(2)} Lakhs
              </h2>
            </div>
            <FaMoneyBillWave className="text-6xl text-green-300" />
          </div>
        </div>

        {/* Problem Statement */}
        <div className="card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FaChartLine className="text-3xl text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900">Problem Statement</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {idea.problemStatement}
          </p>
        </div>

        {/* Solution */}
        <div className="card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FaRocket className="text-3xl text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-900">Our Solution</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {idea.solution}
          </p>
        </div>

        {/* Market Size */}
        {idea.marketSize && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Market Opportunity</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {idea.marketSize}
            </p>
          </div>
        )}

        {/* Revenue Model */}
        {idea.revenueModel && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Revenue Model</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {idea.revenueModel}
            </p>
          </div>
        )}

        {/* Roadmap */}
        {idea.roadmap && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Roadmap & Vision</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {idea.roadmap}
            </p>
          </div>
        )}

        {/* Innovator Info */}
        <div className="card bg-gradient-to-r from-blue-50 to-primary-50">
          <div className="flex items-center gap-3 mb-4">
            <FaUser className="text-3xl text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900">About the Innovator</h2>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              {idea.owner?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{idea.owner?.name}</h3>
              <p className="text-gray-600">{idea.owner?.email}</p>
              
              {idea.owner?.skills && idea.owner.skills.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold text-gray-700 mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {idea.owner.skills.map((skill, index) => (
                      <span key={index} className="badge badge-info">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {idea.owner?.background && (
                <div className="mt-3">
                  <p className="font-semibold text-gray-700 mb-1">Background:</p>
                  <p className="text-gray-600">{idea.owner.background}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;
