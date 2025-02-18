import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-6">
          Self-Organizing Maps (SOM) Visualization
        </h1>

        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            About This Project
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This project demonstrates the Self-Organizing Maps (SOM) algorithm
            through interactive visualizations. You can explore one-dimensional,
            two-dimensional, and three-dimensional implementations of SOM.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Choose from the navigation menu above to start exploring different
            SOM implementations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 h-full grid grid-rows-[auto,1fr,auto]">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              One-Dimensional SOM
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Explore how SOM works in one dimension, perfect for understanding
              the basic concepts of the algorithm.
            </p>
            <div className="mt-4">
              <Link
                to="/one-dimension"
                className="inline-block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white font-medium py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Try One-Dimensional SOM
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 h-full grid grid-rows-[auto,1fr,auto]">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Two-Dimensional SOM
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              See how SOM performs in two dimensions, offering more complex and
              interesting patterns.
            </p>
            <div className="mt-4">
              <Link
                to="/two-dimension"
                className="inline-block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white font-medium py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Try Two-Dimensional SOM
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 h-full grid grid-rows-[auto,1fr,auto]">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Three-Dimensional SOM
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Experience SOM in three dimensions with interactive 3D
              visualization, perfect for complex spatial data patterns.
            </p>
            <div className="mt-4">
              <Link
                to="/three-dimension"
                className="inline-block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white font-medium py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Try Three-Dimensional SOM
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
