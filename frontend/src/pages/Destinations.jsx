import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Home, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import DestinationCard from "../components/DestinationCard";
import Api from "../common";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    country: [],
    region: [],
    categories: [],
    rating: "",
    priceRange: "",
  });

  const filterOptions = {
    countries: [
      "USA",
      "France",
      "Japan",
      "Italy",
      "Spain",
      "Thailand",
      "India",
    ],
    regions: [
      "North India",
      "South India",
      "East India",
      "West India",
      "Central India",
      "Northeast India",
    ],
    categories: [
      "Beach",
      "Mountain",
      "City",
      "Cultural",
      "Adventure",
      "Relaxation",
    ],
    ratings: ["4+ Stars", "3+ Stars", "2+ Stars"],
    priceRanges: ["Budget", "Mid-range", "Luxury"],
  };

  useEffect(() => {
    fetchDestinations();
  }, []); // Removed handleFilterChange from dependencies

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
      setDestinations(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setDestinations({ destinations: [] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchDestinations();
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `${Api.searchDestination.url}?query=${encodeURIComponent(searchQuery)}`,
        {
          method: Api.searchDestination.method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();
      setDestinations(data);
      setError(null);
    } catch (err) {
      setError("Failed to search destinations");
      setDestinations({ destinations: [] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = async (filterType, value) => {
    let newFilters = { ...selectedFilters };

    // Map filterType to the correct key in selectedFilters
    const filterTypeMap = {
      countries: "country",
      regions: "region",
      categories: "categories",
      ratings: "rating",
      priceRanges: "priceRange",
    };

    // Get the correct filter key
    const filterKey = filterTypeMap[filterType] || filterType;

    // Handle radio button filters
    if (filterKey === "rating" || filterKey === "priceRange") {
      newFilters[filterKey] = newFilters[filterKey] === value ? "" : value;
    }
    // Handle array-based filters
    else if (Array.isArray(newFilters[filterKey])) {
      if (newFilters[filterKey].includes(value)) {
        newFilters[filterKey] = newFilters[filterKey].filter(
          (item) => item !== value
        );
      } else {
        newFilters[filterKey] = [...newFilters[filterKey], value];
      }
    }

    setSelectedFilters(newFilters);

    // Only proceed with API call if there are active filters
    try {
      setIsLoading(true);

      // Build query parameters
      const queryParams = new URLSearchParams();

      if (newFilters.country.length) {
        queryParams.append("countries", newFilters.country.join(","));
      }
      if (newFilters.region.length) {
        queryParams.append("regions", newFilters.region.join(","));
      }
      if (newFilters.categories.length) {
        queryParams.append("categories", newFilters.categories.join(","));
      }
      if (newFilters.rating) {
        const ratingValue = parseInt(newFilters.rating.split("+")[0]);
        queryParams.append("minRating", ratingValue);
      }
      if (newFilters.priceRange) {
        const priceRangeMap = {
          Budget: "budget",
          "Mid-range": "midrange",
          Luxury: "luxury",
        };
        queryParams.append("priceRange", priceRangeMap[newFilters.priceRange]);
      }

      let url = Api.filterDestinations.url;
      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }

      const response = await fetch(url, {
        method: Api.filterDestinations.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Filtering failed");

      const data = await response.json();
      if (data && Array.isArray(data.destinations)) {
        setDestinations(data);
      } else {
        setDestinations({ destinations: [] });
      }
      setError(null);
    } catch (err) {
      setError("Failed to filter destinations");
      setDestinations({ destinations: [] });
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setSelectedFilters({
      country: [],
      region: [],
      categories: [],
      rating: "",
      priceRange: "",
    });
    fetchDestinations();
  };

  const FilterSection = ({ title, options, selected, type = "checkbox" }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="mb-6 border-b pb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
            {title}
          </h3>
          <ChevronDown
            size={20}
            className={`text-gray-500 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="space-y-2">
            {type === "radio" ? (
              <div className="space-y-2">
                {options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={title.toLowerCase()}
                      value={option}
                      checked={selected === option}
                      onChange={() =>
                        handleFilterChange(title.toLowerCase(), option)
                      }
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => handleFilterChange(title, option)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
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
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button
                  onClick={resetFilters}
                  className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              <FilterSection
                title="Countries"
                options={filterOptions.countries}
                selected={selectedFilters.country}
              />

              <FilterSection
                title="Regions"
                options={filterOptions.regions}
                selected={selectedFilters.region}
              />

              <FilterSection
                title="Categories"
                options={filterOptions.categories}
                selected={selectedFilters.categories}
              />

              <FilterSection
                title="Ratings"
                options={filterOptions.ratings}
                selected={selectedFilters.rating}
                type="radio"
              />

              <FilterSection
                title="PriceRanges"
                options={filterOptions.priceRanges}
                selected={selectedFilters.priceRange}
                type="radio"
              />
            </div>
          </div>

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
            ) : destinations.destinations &&
              destinations.destinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {destinations.destinations.map((destination) => (
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
