import React, { useState } from "react";
import axios from "axios";
import { TextField, Box, Typography, Card } from "@mui/material";

const CityLocationFetcher = () => {
  const [cityName, setCityName] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch city data
  const handleCityChange = async (e) => {
    const city = e.target.value;
    setCityName(city);

    if (city.length >= 3) {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
          {
            params: { namePrefix: city },
            headers: {
              "X-RapidAPI-Key":
                "082a4a25camshbbd1caf46808d33p1684f6jsnf767993f8e16", // Replace with your RapidAPI key
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        );

        const data = response.data.data;

        if (data.length > 0) {
          const { region, country } = data[0];
          setState(region || "N/A");
          setCountry(country || "N/A");
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
