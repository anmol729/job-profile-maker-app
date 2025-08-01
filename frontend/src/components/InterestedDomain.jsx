import React, { useState } from "react";
import {
  Container,
  Card,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Chip,
  Autocomplete,
} from "@mui/material";

import { domain } from "./data"; // Assuming this file contains a list of domains
import axios from "axios";

const InterestedDomains = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    domains: [],
    domainInput: "",
  });

  const handleInputChange = (e, value) => {
    setFormData((prevData) => ({
      ...prevData,
      domainInput: value,
    }));
  };

  const handleAddDomain = () => {
    if (
      formData.domainInput &&
      !formData.domains.includes(formData.domainInput)
    ) {
      setFormData((prevData) => ({
        ...prevData,
        domains: [...prevData.domains, formData.domainInput],
        domainInput: "",
      }));
    }
  };

  const handleDeleteDomain = (domainToDelete) => {
    setFormData((prevData) => ({
      ...prevData,
      domains: prevData.domains.filter((domain) => domain !== domainToDelete),
    }));
  };

  // API call to update the domain interest
  const token = data.email
  // const token = "malakars041@gmail.com"; // Example token (should be dynamic in a real application)

  const addInterestDomain = async (InterestDomain) => {
    try {
      const api = await axios.post(
        `${data.url}/domain_intrest/update`,
        { InterestDomain },
        {
          headers: {
            "Content-Type": "application/json",
            email: token,
          },
          withCredentials: true,
        }
      );
      console.log("Domain added:", api.data);
      alert(api.data.message);
    } catch (error) {
      console.error("Error adding domain:", error);
      alert("Error adding domain");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData); // Proceed with the current data
    addInterestDomain(formData.domains); // Send domains data to backend API
  };

  const handleSkip = () => {
    onNext({}); // Proceed with an empty object when skipping
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ p: 2 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          color="primary"
          gutterBottom
        >
          Interested Domain
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="div"
                color="text.secondary"
                gutterBottom
              >
                Select your interested domains:
              </Typography>
              <Autocomplete
                freeSolo
                options={domain}
                value={formData.domainInput}
                onInputChange={handleInputChange}
                inputValue={formData.domainInput}
                onChange={(e, value) =>
                  setFormData({ ...formData, domainInput: value })
                }
                PopperComponent={(props) => (
                  <div {...props} style={{ zIndex: 1300 }} /> // Ensures the dropdown shows below the input field
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search and select domains"
                    fullWidth
                    variant="outlined"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission when hitting Enter
                        handleAddDomain(); // Add domain when Enter is pressed
                      }
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {formData.domains.map((domain, index) => (
                  <Chip
                    key={index}
                    label={domain}
                    color="primary"
                    onDelete={() => handleDeleteDomain(domain)}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              type="button"
              onClick={handleSkip}
              variant="outlined"
              color="secondary"
              sx={{ flex: 1 }}
            >
              Skip
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ flex: 1, ml: 2 }}
            >
              Next
            </Button>
          </Box>
        </form>
      </Card>
    </Container>
  );
};

export default InterestedDomains;
