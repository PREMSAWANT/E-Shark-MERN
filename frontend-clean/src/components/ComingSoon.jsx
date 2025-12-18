const ComingSoon = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100">
    <div className="text-center">
      <h1 className="text-4xl font-bold gradient-text mb-4">{title}</h1>
      <p className="text-gray-600 text-lg">🚧 Under Development 🚧</p>
      <p className="text-gray-500 mt-2">This page is being built. Check back soon!</p>
    </div>
  </div>
);

export default ComingSoon;
