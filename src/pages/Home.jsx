import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Self Organizing Maps (SOM) Visualization
      </h1>
      <p className="text-gray-700 text-center">
        This project demonstrates the power of Self Organizing Maps (SOM) for
        visualizing and clustering data. With interactive charts and
        simulations, you can observe how SOM organizes and categorizes data
        through unsupervised learning techniques. Explore each section to learn
        more about the algorithms, visualizations, and features that bring these
        concepts to life.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/one-dimension"
          className="block p-4 bg-yellow-500 text-white rounded-lg text-center hover:bg-yellow-600"
        >
          One Dimension
        </Link>
        <Link
          to="/two-dimension"
          className="block p-4 bg-green-500 text-white rounded-lg text-center hover:bg-green-600"
        >
          Two Dimension
        </Link>{" "}
        {/* <Link
          to="/feature-selection"
          className="block p-4 bg-purple-500 text-white rounded-lg text-center hover:bg-purple-600"
        >
          Feature Selection
        </Link> */}
      </div>
    </div>
  );
}

export default Home;
