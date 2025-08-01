import React, { useState } from "react";
import { TextField, Box, Button, Grid, Card, Typography } from "@mui/material";
import axios from "axios";

const ProfessionalDetailsForm = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    professionalSummary: data.professionalSummary || "",
    careerObjectives: data.careerObjectives || "",
    valueProposition: data.valueProposition || "",
  });

  const [error, setError] = useState({
    professionalSummary: "",
    careerObjectives: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleValidation = (name, value) => {
    const wordCount = value.trim().split(/\s+/).length;
    if (value.length < 100) {
      setError((prevError) => ({
        ...prevError,
        [name]: `${name.replace(
          /([A-Z])/g,
          " $1"
        )} must be at least 100 characters long.`,
      }));
    } else if (wordCount > 250) {
      setError((prevError) => ({
        ...prevError,
        [name]: `${name.replace(/([A-Z])/g, " $1")} must not exceed 250 words.`,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        [name]: "",
      }));
    }
  };

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    handleValidation(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Professional_Detail API connection
  // const token = data.email;
  const token = "malakars041@gmail.com"
  const addProfessional_Detail = async (Professional_Detail) => {
    try {
      const api = await axios.post(
        `${data.url}/profile_summery/update`,
        { Professional_Detail },
        {
          headers: {
            "Content-Type": "application/json",
            email: token,
          },
          withCredentials: true,
        }
      );
      console.log("professional detail added ",api.data);
      alert(api.data.message);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("There was an error submitting the data.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if there are any validation errors before proceeding
    if (!error.professionalSummary && !error.careerObjectives) {
      onNext(formData); // Proceed with current data even if fields are empty
      addProfessional_Detail(formData);
    }
  };

  const handleSkip = () => {
    onNext({}); // Proceed with an empty object when skipping
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
          Professional Details
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Professional Summary */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Professional Summary"
                name="professionalSummary"
                value={formData.professionalSummary}
                onChange={handleInputChange2}
                fullWidth
                multiline
                rows={3}
                required
                error={!!error.professionalSummary}
                helperText={error.professionalSummary}
                sx={{ mb: 3 }}
              />
            </Grid>
          </Grid>

          {/* Career Objectives */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Career Objectives"
                name="careerObjectives"
                value={formData.careerObjectives}
                onChange={handleInputChange2}
                fullWidth
                multiline
                rows={3}
                required
                error={!!error.careerObjectives}
                helperText={error.careerObjectives}
                sx={{ mb: 3 }}
              />
            </Grid>
          </Grid>

          {/* Value Proposition */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Value Proposition"
                name="valueProposition"
                value={formData.valueProposition}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
                sx={{ mb: 3 }}
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              type="button"
              onClick={handleSkip}
              variant="contained"
              color="secondary"
              sx={{ flex: 1, mr: 2 }}
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
    </Box>
  );
};

export default ProfessionalDetailsForm;
