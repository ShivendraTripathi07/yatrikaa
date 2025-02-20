import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Home, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import DestinationCard from "../components/DestinationCard";
import Api from "../common";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    country: [],
    bestTimeToVisit: [],
    categories: [],
    region: [],
    highlights: [],
  });

  // Add filter options
  const filterOptions = {
    country: ["India","USA", "Japan", "France", "Italy", "Spain", "Thailand"],
    bestTimeToVisit: ["Spring", "Summer", "Fall", "Winter"],
    categories: ["Beach", "Mountain", "City", "Cultural", "Adventure"],
    region: [
      "Uttar Pradesh",
      "Asia",
      "Europe",
      "North America",
      "South America",
      "Africa",
      "Oceania",
    ],
    highlights: [
      "Historical Sites",
      "Natural Wonders",
      "Food Scene",
      "Nightlife",
      "Shopping",
    ],
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [destinations, searchQuery, selectedFilters]);

  const fetchDestinations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(Api.getAllDestinations.url, {
        method: Api.getAllDestinations.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? "Please log in to view destinations"
            : "Failed to fetch destinations"
        );
      }

      const data = await response.json();
      setDestinations(data.destinations || []);
      setFilteredDestinations(data.destinations || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setDestinations([]);
      setFilteredDestinations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const applyFilters = () => {
    let filtered = [...destinations];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (dest) =>
          dest.name.toLowerCase().includes(query) ||
          dest.description.toLowerCase().includes(query) ||
          dest.country.toLowerCase().includes(query)
      );
    }

    // Apply category filters
    Object.entries(selectedFilters).forEach(([category, selectedValues]) => {
      if (selectedValues.length > 0) {
        filtered = filtered.filter((dest) => {
          const destValue = dest[category];
          return Array.isArray(destValue)
            ? selectedValues.some((value) => destValue.includes(value))
            : selectedValues.includes(destValue);
        });
      }
    });

    setFilteredDestinations(filtered);
  };

  const FilterSection = ({ title, options, category }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedFilters[category].includes(option)}
              onChange={() => handleFilterChange(category, option)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const Sidebar = () => (
    <div
      className={`
      lg:block
      ${showMobileFilters ? "fixed inset-0 z-50 bg-white" : "hidden"}
      lg:static lg:w-64 p-6 bg-white rounded-xl shadow-sm
    `}
    >
      <div className="lg:hidden flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={() => setShowMobileFilters(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      <FilterSection
        title="Country"
        options={filterOptions.country}
        category="country"
      />
      <FilterSection
        title="Best Time to Visit"
        options={filterOptions.bestTimeToVisit}
        category="bestTimeToVisit"
      />
      <FilterSection
        title="Categories"
        options={filterOptions.categories}
        category="categories"
      />
      <FilterSection
        title="Region"
        options={filterOptions.region}
        category="region"
      />
      <FilterSection
        title="Highlights"
        options={filterOptions.highlights}
        category="highlights"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Home size={24} />
              <span className="font-semibold text-lg">Home</span>
            </Link>
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full p-3 pl-12 pr-4 border-2 border-gray-200 rounded-xl 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200 ease-in-out
                           group-hover:border-blue-400"
                />
                <Search
                  className="absolute left-4 top-3.5 text-gray-400 group-hover:text-blue-500 transition-colors"
                  size={20}
                />
              </div>
            </div>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <SlidersHorizontal size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-20">
        <div className="flex gap-8">
          <Sidebar />

          {/* Destinations Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">
                  Loading destinations...
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-600 p-6 rounded-xl shadow-sm">
                {error}
              </div>
            ) : filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredDestinations.map((destination) => (
                  <DestinationCard
                    key={destination._id}
                    destination={destination}
                    onClick={() => navigate(`/destinations/${destination._id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">
                  No destinations found matching your criteria
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
