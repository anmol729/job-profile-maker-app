import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Card,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const CityLocationFetcher = () => {
  const [cityName, setCityName] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle city input change
  const handleCityChange = async (e) => {
    const city = e.target.value;
    setCityName(city);

    if (city.length >= 3) {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: city,
              format: "json",
              addressdetails: 1,
              limit: 1, // Get only the first result
            },
          }
        );

        if (response.data && response.data.length > 0) {
          const result = response.data[0].address;
          setState(result.state || "N/A");
          setCountry(result.country || "N/A");
        } else {
          setError("City not found.");
          setState("");
          setCountry("");
        }
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    } else {
      setState("");
      setCountry("");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Card sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          color="primary"
          gutterBottom
        >
          City Location Finder
        </Typography>

        <TextField
          label="City Name"
          variant="outlined"
          fullWidth
          value={cityName}
          onChange={handleCityChange}
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

        {!loading && !error && cityName && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">State: {state}</Typography>
            <Typography variant="h6">Country: {country}</Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default CityLocationFetcher;
