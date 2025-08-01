import React, { useState } from "react";
import axios from "axios";
import { TextField, Box, Typography, Card } from "@mui/material";

const CityLocationFetcher = () => {
  const [cityName, setCityName] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle city name change and fetch location data
  const handleCityChange = async (e) => {
    const city = e.target.value;
    setCityName(city);

    if (city.length >= 3) {
      setLoading(true);
      setError("");

      try {
        // Fetch location data using OpenWeatherMap API
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: city,
              appid: "4e0deed2a4d66417a30458e657ba77cc", // Replace with your OpenWeatherMap API Key
            },
          }
        );

        const { sys } = response.data;

        console.log(" data response ",response.data)

        if (sys) {
          setState(sys.state || "N/A");
          setCountry(sys.country || "N/A");
        } else {
          setState("N/A");
          setCountry("N/A");
          setError("City not found");
        }
      } catch (err) {
        setError("Error fetching data");
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
          Enter City Name
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
          <Typography variant="body1" align="center">
            Loading...
          </Typography>
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
