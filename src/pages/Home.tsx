import React, { useEffect, useState } from "react";
import { Database, ArrowRight, BarChart2, Users, Search } from "lucide-react";
import { fetchData } from "../utils/api";
import { DataRecord } from "../types";

function Home() {
  const [postCount, setPostCount] = useState<number | null>(null);
  const [commentCount, setCommentCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const posts = await fetchData("posts");
        const comments = await fetchData("comments");

        setPostCount(posts.length);
        setCommentCount(comments.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPostCount(0);
        setCommentCount(0);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Database className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Data Explorer Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Explore and analyze your data with our powerful dashboard. View
            posts, comments, and more in an intuitive interface.
          </p>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        {/* Stats Section */}
        <div className="mt-24 bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {postCount !== null ? postCount : "Loading..."}
              </div>
              <div className="text-gray-600">Posts Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {commentCount !== null ? commentCount : "Loading..."}
              </div>
              <div className="text-gray-600">Comments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10</div>
              <div className="text-gray-600">Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>© 2024 Data Explorer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
