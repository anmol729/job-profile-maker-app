import React, { useState } from "react";
import {
  Container,
  Card,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  Chip,
  Autocomplete,
} from "@mui/material";
import axios from "axios";

// Sample list of domains for suggestions
const domainList = [
  "Data Science",
  "AI",
  "Machine Learning",
  "Cybersecurity",
  "Cloud Computing",
  "Blockchain",
  "Cloud Architecture",
  "IoT",
  "Software Development",
  "Business Intelligence",
  "DevOps",
  "Full Stack Development",
  "Big Data",
  "Robotic Process Automation",
  "Digital Transformation",
  "AR/VR (Augmented Reality/Virtual Reality)",
  "Mobile App Development",
  "UI/UX Design",
  "Database Management",
  "Game Development",
  "Embedded Systems",
  "Data Engineering",
  "Quantum Computing",
  "Automation Testing",
  "Web Development",
  "Network Security",
  "Data Analytics",
  "SAP",
  "Enterprise Resource Planning (ERP)",
  "Blockchain Development",
  "Digital Marketing",
  "Project Management",
  "Cloud Security",
  "AI Research",
  "Ethical Hacking",
  "Software Testing",
  "Artificial Intelligence Ethics",
  "Business Process Management",
  "E-commerce Development",
  "Agile Development",
  "Product Management",
  "Cloud-native Development",
  "Cyber-Physical Systems",
  "Natural Language Processing (NLP)",
  "Edge Computing",
  "Robotics Engineering",
  "System Administration",
  "Technical Support",
  "Virtualization",
  "Security Operations",
  "AI Chatbots",
  "Data Privacy",
  "Machine Learning Operations (MLOps)",
  "Software Architecture",
  "Blockchain for Finance",
  "Bioinformatics",
  "Geospatial Technologies",
  "Healthcare IT",
  "Blockchain in Supply Chain",
  "5G Technology",
];


const SpecializedFieldsForm = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    specializedFields: data.specializedFields || [],
    industrySpecificKnowledge: data.industrySpecificKnowledge || "",
    domainInput: "",
  });

  // Handle input change in the autocomplete
  const handleInputChange = (e, value) => {
    setFormData((prevData) => ({
      ...prevData,
      domainInput: value,
    }));
  };

  // Add domain to the list
  const handleAddDomain = () => {
    if (
      formData.domainInput &&
      !formData.specializedFields.includes(formData.domainInput)
    ) {
      setFormData((prevData) => ({
        ...prevData,
        specializedFields: [
          ...prevData.specializedFields,
          formData.domainInput,
        ],
        domainInput: "",
      }));
    }
  };

  // Remove domain from the list
  const handleDeleteDomain = (domainToDelete) => {
    setFormData((prevData) => ({
      ...prevData,
      specializedFields: prevData.specializedFields.filter(
        (domain) => domain !== domainToDelete
      ),
    }));
  };

  // API call to update specialized fields
  const token = data.email;
  // const token = "malakars041@gmail.com"

  const addSpecializedFields = async (specializedFields) => {
    try {
      const response = await axios.post(
        `${data.url}/experties_area/update`,
        { specializedFields },
        {
          headers: {
            "Content-Type": "application/json",
            email: token,
          },
          withCredentials: true,
        }
      );
      console.log("experites added ",response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding specialized fields:", error);
      alert("Error adding specialized fields");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData); // Proceed with the current data
    addSpecializedFields(formData.specializedFields); // Send the updated specialized fields to the backend
  };

  const handleSkip = () => {
    onNext({}); // Proceed with an empty object when skipping
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Card sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h4"
          align="center"
          color="primary"
          gutterBottom
        >
          Specialized Fields & Industry Knowledge
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Domain Input with Autocomplete */}
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Select or add your specialized fields:
              </Typography>
              <Autocomplete
                freeSolo
                options={domainList}
                value={formData.domainInput}
                onInputChange={handleInputChange}
                inputValue={formData.domainInput}
                onChange={(e, value) =>
                  setFormData({ ...formData, domainInput: value })
                }
                PopperComponent={(props) => (
                  <div {...props} style={{ zIndex: 1300 }} />
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search and select domains"
                    fullWidth
                    variant="outlined"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
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

            {/* Displaying selected domains as Chips */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {formData.specializedFields.map((domain, index) => (
                  <Chip
                    key={index}
                    label={domain}
                    onDelete={() => handleDeleteDomain(domain)}
                    color="primary"
                    sx={{ margin: "5px 0" }}
                  />
                ))}
              </Box>
            </Grid>

            {/* Industry-Specific Knowledge */}
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Industry-Specific Knowledge:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="industrySpecificKnowledge"
                value={formData.industrySpecificKnowledge}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    industrySpecificKnowledge: e.target.value,
                  })
                }
                variant="outlined"
                label="Enter your industry-specific knowledge"
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
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

export default SpecializedFieldsForm;
