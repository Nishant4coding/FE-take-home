import React, { useEffect, useState } from "react";
import { Database, ArrowRight, BarChart2, Users, Search } from "lucide-react";
import { fetchData } from "../utils/api";
import { DataRecord } from "../types";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 flex flex-col">
      {/* Hero Section */}
      <header className="flex-1 flex flex-col justify-center items-center text-center px-4 py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="mb-8">
          <Database className="w-20 h-20 mx-auto animate-bounce text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Data Explorer Dashboard
        </h1>
        <p className="text-lg md:text-xl mt-6 max-w-3xl mx-auto">
          Explore and analyze your data with a feature-rich dashboard. Gain
          insights into posts, comments, users, and more in a visually intuitive
          way.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 px-10 py-4 text-lg font-bold bg-white text-blue-600 rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-110 transition duration-300"
        >
          Go to Dashboard <ArrowRight className="ml-2 w-5 h-5 inline" />
        </button>
      </header>

      {/* Stats Section */}
      <section className="py-16 bg-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            Quick Stats
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Stay updated with the latest stats on your data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 animate-pulse">
                {postCount !== null ? postCount : "Loading..."}
              </div>
              <div className="text-gray-700 mt-2">Posts Available</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600 animate-pulse">
                {commentCount !== null ? commentCount : "Loading..."}
              </div>
              <div className="text-gray-700 mt-2">Comments</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 animate-pulse">
                10
              </div>
              <div className="text-gray-700 mt-2">Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm md:text-base">
            © 2024 <span className="font-bold">Data Explorer</span>. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
