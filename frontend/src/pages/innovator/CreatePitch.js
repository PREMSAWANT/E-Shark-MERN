import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { FaLightbulb, FaChartLine, FaMoneyBillWave, FaRocket } from 'react-icons/fa';

const CreatePitch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    problemStatement: '',
    solution: '',
    marketSize: '',
    revenueModel: '',
    fundingRequired: '',
    currentStage: 'Idea',
    roadmap: '',
  });

  const categories = [
    'Technology', 'Healthcare', 'Education', 'Finance', 'E-commerce',
    'Agriculture', 'Environment', 'Entertainment', 'Food & Beverage',
    'Fashion', 'Real Estate', 'Other'
  ];

  const stages = ['Idea', 'Prototype', 'MVP', 'Early Revenue', 'Scaling'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title || !formData.category || !formData.problemStatement || 
        !formData.solution || !formData.fundingRequired) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.fundingRequired <= 0) {
      setError('Funding amount must be greater than 0');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/ideas', formData);
      alert('Pitch created successfully! Awaiting admin approval.');
      navigate('/innovator/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create pitch');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <FaLightbulb className="text-6xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">Basic Information</h3>
              <p className="text-gray-600">Tell us about your idea</p>
            </div>

            <div>
              <label className="label">
                Pitch Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., AI-Powered Study Assistant"
                maxLength="100"
                required
              />
              <p className="text-sm text-gray-500 mt-1">{formData.title.length}/100 characters</p>
            </div>

            <div>
              <label className="label">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">
                Current Stage *
              </label>
              <select
                name="currentStage"
                value={formData.currentStage}
                onChange={handleChange}
                className="input-field"
                required
              >
                {stages.map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <FaChartLine className="text-6xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">Problem & Solution</h3>
              <p className="text-gray-600">Define what you're solving and how</p>
            </div>

            <div>
              <label className="label">
                Problem Statement *
              </label>
              <textarea
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleChange}
                className="input-field resize-none"
                rows="5"
                placeholder="What problem are you solving? Who faces this problem?"
                required
              />
            </div>

            <div>
              <label className="label">
                Your Solution *
              </label>
              <textarea
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                className="input-field resize-none"
                rows="5"
                placeholder="How does your product/service solve the problem?"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <FaMoneyBillWave className="text-6xl text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">Market & Business Model</h3>
              <p className="text-gray-600">Show the opportunity</p>
            </div>

            <div>
              <label className="label">
                Market Size (Optional)
              </label>
              <textarea
                name="marketSize"
                value={formData.marketSize}
                onChange={handleChange}
                className="input-field resize-none"
                rows="4"
                placeholder="Describe your target market size, TAM, SAM, SOM..."
              />
            </div>

            <div>
              <label className="label">
                Revenue Model (Optional)
              </label>
              <textarea
                name="revenueModel"
                value={formData.revenueModel}
                onChange={handleChange}
                className="input-field resize-none"
                rows="4"
                placeholder="How will you make money? Subscription, freemium, commission, etc."
              />
            </div>

            <div>
              <label className="label">
                Funding Required (₹) *
              </label>
              <input
                type="number"
                name="fundingRequired"
                value={formData.fundingRequired}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., 5000000"
                min="0"
                required
              />
              {formData.fundingRequired && (
                <p className="text-sm text-gray-600 mt-1">
                  ≈ ₹{(formData.fundingRequired / 100000).toFixed(2)} Lakhs
                </p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <FaRocket className="text-6xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">Roadmap & Vision</h3>
              <p className="text-gray-600">Where are you heading?</p>
            </div>

            <div>
              <label className="label">
                Roadmap & Milestones (Optional)
              </label>
              <textarea
                name="roadmap"
                value={formData.roadmap}
                onChange={handleChange}
                className="input-field resize-none"
                rows="6"
                placeholder="Share your 6-12 month roadmap, key milestones, and vision..."
              />
            </div>

            {/* Summary Preview */}
            <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-200">
              <h4 className="font-bold text-gray-900 mb-4">📋 Pitch Summary</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Title:</strong> {formData.title || 'Not set'}</p>
                <p><strong>Category:</strong> {formData.category || 'Not set'}</p>
                <p><strong>Stage:</strong> {formData.currentStage}</p>
                <p><strong>Funding:</strong> ₹{formData.fundingRequired ? (formData.fundingRequired / 100000).toFixed(2) + ' Lakhs' : 'Not set'}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container-custom max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Create Your Pitch</h1>
          <p className="text-gray-600">Share your vision with potential investors</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="card">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit Pitch'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>✨ Your pitch will be reviewed by our team before going live</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePitch;
