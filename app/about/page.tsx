"use client";
import { useState, useEffect } from "react";
// import { toolsData } from "../data/toolsData";

const Index = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // const handleEmailSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Email submitted:", email);
  //   setEmail("");
  // };

  // // Featured tools (first 8 available)
  // const featuredTools = toolsData
  //   .filter((tool) => tool.status === "available")
  //   .slice(0, 8);

  // const handleToolClick = (tool) => {
  //   console.log("Tool clicked:", tool.name);
  // };

  // const handleCategoryClick = (categoryName) => {
  //   console.log("Category clicked:", categoryName);
  // };

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-toolnest-text mb-4">
                GrockTool is Live! about page
              </h3>
              <p className="text-toolnest-text/80 mb-6">
                Discover 150+ tools designed to simplify your digital life.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-toolnest-text text-white px-6 py-3 rounded-full font-semibold hover:bg-toolnest-text/90 transition-colors"
              >
                Explore Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-20 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-toolnest-text mb-6">
          All Your Favorite Tools{" "}
          <span className="bg-gradient-to-r from-toolnest-text to-toolnest-accent bg-clip-text text-transparent">
            in One Place about page
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-toolnest-text/80 mb-8">
          150+ tools across categories like text, numbers, dates, and more —
          free and fast.
        </p>
        <button className="bg-toolnest-accent text-toolnest-text px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300">
          Explore Tools
        </button>
      </section>

      {/* Featured Tools */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
            Featured Tools
          </h2>
          <p className="text-toolnest-text/80 text-lg">
            Popular tools used by thousands of users
          </p>
        </div>
        {/* <div className="flex flex-wrap gap-6 justify-center">
          {featuredTools.map((tool) => (
            <div
              key={tool.id}
              className="w-80 bg-toolnest-accent p-6 rounded-2xl hover:bg-white transition-all duration-300 cursor-pointer hover:shadow-lg"
              onClick={() => handleToolClick(tool)}
            >
              <h3 className="text-lg font-semibold text-toolnest-text mb-2">
                {tool.name}
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {tool.category}
              </span>
              <p className="text-toolnest-text/70 text-sm mt-4">
                {tool.description}
              </p>
            </div>
          ))}
        </div> */}
      </section>

      {/* Categories */}
      <section className="py-20 px-6 bg-toolnest-accent/20">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
            Explore Categories
          </h2>
          <p className="text-toolnest-text/80 text-lg">
            Find tools organized by category for quick access
          </p>
        </div>
        {/* <div className="flex flex-wrap gap-6 justify-center">
          {["Text Tools", "Number Tools", "Date & Time Tools"].map((cat) => (
            <div
              key={cat}
              className="bg-toolnest-accent p-6 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => handleCategoryClick(cat)}
            >
              <h3 className="text-lg font-semibold text-toolnest-text mb-1">
                {cat}
              </h3>
              <button className="bg-toolnest-text text-white py-2 px-4 rounded-xl font-medium mt-2">
                Explore
              </button>
            </div>
          ))}
        </div> */}
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-toolnest-accent p-12 rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-toolnest-text mb-4">
            Get Updates When New Tools Are Added
          </h2>
          <p className="text-toolnest-text/80 mb-8">
            Be the first to discover the latest tools in our collection
          </p>
          <form
            // onSubmit={handleEmailSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-3 rounded-full border-2 border-toolnest-text/20 focus:border-toolnest-text outline-none bg-toolnest-bg text-toolnest-text"
              required
            />
            <button
              type="submit"
              className="bg-toolnest-text text-toolnest-bg px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
