import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Typography,
  Card,
  CircularProgress,
  Button,
} from "@mui/material";
import axios from "axios";
import Autocomplete from "@mui/lab/Autocomplete";

const LocationFinder = ({ location, setLocation }) => {
  const [viewMode, setViewMode] = useState("searchCity"); // Toggle between modes
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { country, state, city } = location;

  // Fetch countries data
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries"
        );
        setCountries(response.data.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states based on selected country
  const fetchStates = async (selectedCountry) => {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        { country: selectedCountry }
      );
      setStates(response.data.data.states || []);
      setCities([]);
      setLocation({ country: selectedCountry, state: "", city: "" });
    } catch (err) {
      console.error("Error fetching states:", err);
    }
  };

  // Fetch cities based on selected state
  const fetchCities = async (selectedState) => {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        { country, state: selectedState }
      );
      setCities(response.data.data || []);
      setLocation({ ...location, state: selectedState, city: "" });
    } catch (err) {
      console.error("Error fetching cities:", err);
    }
  };

  // Handle city search
  const handleCitySearch = async (e) => {
    const cityName = e.target.value;
    setLocation({ country: "", state: "", city: cityName });

    if (cityName.length >= 3) {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: cityName,
              format: "json",
              addressdetails: 1,
              limit: 1,
            },
          }
        );

        if (response.data && response.data.length > 0) {
          const result = response.data[0].address;
          setLocation({
            country: result.country || "N/A",
            state: result.state || "N/A",
            city: cityName,
          });
        } else {
          setError("City not found.");
        }
      } catch (err) {
        setError("Error fetching city data.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle dropdown changes
  const handleDropdownChange = (level, value) => {
    if (level === "country") {
      fetchStates(value);
    } else if (level === "state") {
      fetchCities(value);
    } else if (level === "city") {
      setLocation({ ...location, city: value });
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto" }}>
      <Card sx={{ p: 2 }}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Select Location
        </Typography>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Button
            variant={viewMode === "searchCity" ? "contained" : "outlined"}
            onClick={() => setViewMode("searchCity")}
            sx={{ mx: 1 }}
          >
            Search by City
          </Button>
          <Button
            variant={viewMode === "selectLocation" ? "contained" : "outlined"}
            onClick={() => setViewMode("selectLocation")}
            sx={{ mx: 1 }}
          >
            Select Location
          </Button>
        </Box>

        {viewMode === "searchCity" ? (
          <>
            <TextField
              label="City Name"
              variant="outlined"
              fullWidth
              value={city}
              onChange={handleCitySearch}
              sx={{ mb: 3 }}
            />
            {loading && (
              <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
            )}
            {error && (
              <Typography variant="body1" color="error" align="center">
                {error}
              </Typography>
            )}
            {!loading && city && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">State: {state || "N/A"}</Typography>
                <Typography variant="h6">
                  Country: {country || "N/A"}
                </Typography>
              </Box>
            )}
          </>
        ) : (
          <>
            <Autocomplete
              options={countries.map((c) => c.country)}
              value={country}
              onChange={(e, value) => handleDropdownChange("country", value)}
              renderInput={(params) => (
                <TextField {...params} label="Select Country" fullWidth />
              )}
              sx={{ mb: 3 }}
            />
            {country && (
              <Autocomplete
                options={states.map((s) => s.name)}
                value={state}
                onChange={(e, value) => handleDropdownChange("state", value)}
                renderInput={(params) => (
                  <TextField {...params} label="Select State" fullWidth />
                )}
                sx={{ mb: 3 }}
              />
            )}
            {state && (
              <Autocomplete
                options={cities}
                value={city}
                onChange={(e, value) => handleDropdownChange("city", value)}
                renderInput={(params) => (
                  <TextField {...params} label="Select City" fullWidth />
                )}
                sx={{ mb: 3 }}
              />
            )}
          </>
        )}

        {city && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1" align="center">
              Selected Location: {city}, {state}, {country}
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default LocationFinder;
