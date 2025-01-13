import React, { useState, useEffect } from "react";
import DestinationCard from "../components/DestinationCard";
import Api from "../common";
import { useNavigate } from "react-router-dom";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(Api.getAllDestinations.url, {
          method: Api.getAllDestinations.method,
          credentials: "include", // Include credentials if using cookies
          headers: {
            "Content-Type": "application/json",
            // Add any required auth headers here
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Please log in to view destinations");
          }
          throw new Error("Failed to fetch destinations");
        }

        const data = await response.json();
        console.log(data);
        setDestinations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading destinations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.destinations.map((destination) => (
          <DestinationCard
            key={destination._id}
            destination={destination}
            onClick={() => navigate(`/destinations/${destination._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Destinations;
