import React, { useState } from "react";
import { TextField, Button, Box, Grid, Typography, Paper } from "@mui/material";
import PhoneNumberForm from "../components/ProfileForm/Phone";

import axios from "axios";

const RefereeDetailsForm = ({ onNext, data }) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    refereeName: data.refereeName || "",
    designation: data.designation || "",
    organization: data.organization || "",
    contactDetails: data.contactDetails || "",
    relationship: data.relationship || "",
    // phoneNumber: phone,
  });

const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to validate the phone number
  const validatePhoneNumber = (value) => {
    const number = value.replace(/\s+/g, ""); // Remove spaces
    const isNumberValid = /^\d{10}$/.test(number); // 10 digits
    if (!isNumberValid) {
      setIsValid(false);
      setErrorMessage("Valid 10-digit phone number is required.");
    } else {
      setIsValid(true);
      setErrorMessage("");
    }
    setPhone(value);
  };

  // Reference api connection
  const token = data.email;
  // const token = "malakars041@gmail.com";

  const addReference = async (Reference) => {
    const api = await axios.post(
      `${data.url}/reference/update`,
      { Reference },
      {
        headers: {
          "Content-Type": "application/json",
          email: token,
        },
        withCredentials: true,
      }
    );
    console.log("reference added ", api.data);

    alert(api.data.message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData); // Proceed with current data even if fields are empty
    addReference({ formData, PhoneNumber: phone, email: email });
  };

  const handleSkip = () => {
    onNext({}); // Proceed with an empty object when skipping
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my: 5,
      }}
    >
      <Paper
        sx={{
          maxWidth: "48rem",
          padding: 4,
          boxShadow: 3,
          backgroundColor: "white", // Removed dark mode
          color: "black", // Light text color
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ mb: 4, color: "#1976d2" }}
        >
          Reference Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Referee Name */}
            <Grid item xs={12}>
              <TextField
                label="Reference Name"
                name="refereeName"
                variant="outlined"
                fullWidth
                value={formData.refereeName}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Designation */}
            <Grid item xs={12}>
              <TextField
                label="Designation"
                name="designation"
                variant="outlined"
                fullWidth
                value={formData.designation}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Organization Name */}
            <Grid item xs={12}>
              <TextField
                label="Organization Name"
                name="organization"
                variant="outlined"
                fullWidth
                value={formData.organization}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Contact Details */}
            {/* <Grid item xs={12}>
              <TextField
                label="Contact Details"
                name="contactDetails"
                variant="outlined"
                fullWidth
                value={formData.contactDetails}
                onChange={handleInputChange}
              />
            </Grid> */}

            {/* Relationship */}
            <Grid item xs={12}>
              <TextField
                label="Relationship"
                name="relationship"
                variant="outlined"
                fullWidth
                value={formData.relationship}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Email Address */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12}>
            <PhoneNumberForm
              phone={phone}
              setPhone={validatePhoneNumber}
              errorMessage={errorMessage}
              isValid={isValid}
            />
          </Grid>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSkip}
              sx={{ flexGrow: 1, marginRight: 2 }}
            >
              Skip
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ flexGrow: 1 }}
            >
              Next
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default RefereeDetailsForm;
