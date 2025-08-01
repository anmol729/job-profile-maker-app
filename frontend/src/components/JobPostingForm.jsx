import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
// import ReviewJob from "./ReviewJob";

// Dropdown Options
const jobCategories = ["Engineering", "Management", "Finance", "Arts"];
const domains = ["IT", "Energy", "Finance", "Pharma"];
const workModes = ["Onsite", "Remote", "Hybrid"];
const employmentModes = ["Part-Time", "Full-Time", "Freelancer", "Internship"];
const salaryTypes = ["Daily", "Weekly", "Monthly", "Annually"];
const roleLevels = [
  "Junior",
  "Senior",
  "Associate",
  "Mid",
  "C-Level",
  "Director",
  "VP",
];
const currencies = ["INR", "USD", "EUR", "GBP"];

const JobPostingForm = () => {
  const { handleSubmit, control, setValue, formState } = useForm({
    defaultValues: {
      jobTitle: "",
      noOfVacancies: "",
      collegeCategory: "",
      aboutCompany: "",
      companyName: "",
      jobLocation: "",
      availability: "",
      salaryRange: "",
      salaryType: "",
      essentialQualification: "",
      remaining: "",
      hardSkills: "",
      softSkills: "",
      domain: "",
      workMode: "",
      employmentMode: "",
      rolesAndResponsibilities: "",
      perksAndBenefits: "",
      roleLevel: "",
      preferredQualification: "",
      salaryCurrency: "",
      overallExperience: "",
      relevantExperience: "",
      jobDescriptionSummary: "",
      experienceSkills: "",
      preferredSkills: "",
    },
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFile(file);

    // Simulate backend extraction
    setIsLoading(true);
    setTimeout(() => {
      setValue("jobTitle", "Software Developer");
      setValue("noOfVacancies", "5");
      setValue("collegeCategory", "Engineering");
      setValue("aboutCompany", "A leading software development company...");
      setValue("companyName", "Web Dev Mastery");
      setValue("jobLocation", "Indore, India");
      setValue("availability", "Immediate Joiner");
      setValue("salaryRange", "₹4,00,000 - ₹6,00,000 per annum");
      setValue("salaryType", "Annually");
      setValue(
        "essentialQualification",
        "Bachelor's Degree in Computer Science"
      );
      setValue("remaining", "Additional details...");
      setValue("hardSkills", "JavaScript, React, MongoDB");
      setValue("softSkills", "Communication, Teamwork");
      setValue("domain", "IT");
      setValue("workMode", "Hybrid");
      setValue("employmentMode", "Full-Time");
      setValue(
        "rolesAndResponsibilities",
        "Design, develop, and maintain software..."
      );
      setValue("perksAndBenefits", "Health Insurance, Flexible Work Hours...");
      setValue("roleLevel", "Junior");
      setValue("preferredQualification", "Experience with React.js projects");
      setValue("salaryCurrency", "INR");
      setValue("overallExperience", "0-2 years");
      setValue("relevantExperience", "1 year");
      setValue(
        "jobDescriptionSummary",
        "Exciting opportunity for software developers..."
      );
      setValue("experienceSkills", "JavaScript, Git, React");
      setValue("preferredSkills", "Knowledge of CI/CD and cloud services");
      setIsLoading(false);
    }, 2000);
  };

  const onSubmit = (data) => {
    setPreviewData(data);
  };

  return (
    <Box sx={{ p: 4, maxWidth: "900px", mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Job Posting Form
      </Typography>

      {/* File Upload Section */}
      <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Upload Job Description
        </Typography>
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileUpload}
          style={{ marginBottom: "1rem" }}
        />
        {isLoading && <CircularProgress />}
        {uploadedFile && !isLoading && (
          <Typography color="success.main">
            {uploadedFile.name} uploaded successfully!
          </Typography>
        )}
      </Paper>

      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {[
            { label: "Job Title *", name: "jobTitle", required: true },
            {
              label: "Number of Vacancies *",
              name: "noOfVacancies",
              required: true,
            },
            {
              label: "College Category *",
              name: "collegeCategory",
              type: "select",
              options: jobCategories,
            },
            {
              label: "About the Company",
              name: "aboutCompany",
              multiline: true,
              rows: 3,
            },
            { label: "Company Name *", name: "companyName", required: true },
            { label: "Job Location *", name: "jobLocation", required: true },
            { label: "Availability *", name: "availability", required: true },
            { label: "Salary Range *", name: "salaryRange", required: true },
            {
              label: "Salary Type *",
              name: "salaryType",
              type: "select",
              options: salaryTypes,
            },
            {
              label: "Essential Qualification *",
              name: "essentialQualification",
              required: true,
            },
            { label: "Remaining", name: "remaining" },
            {
              label: "Hard Skills *",
              name: "hardSkills",
              required: true,
              multiline: true,
              rows: 2,
            },
            {
              label: "Soft Skills *",
              name: "softSkills",
              required: true,
              multiline: true,
              rows: 2,
            },
            {
              label: "Domain *",
              name: "domain",
              type: "select",
              options: domains,
            },
            {
              label: "Work Mode *",
              name: "workMode",
              type: "select",
              options: workModes,
            },
            {
              label: "Mode of Employment *",
              name: "employmentMode",
              type: "select",
              options: employmentModes,
            },
            {
              label: "Roles and Responsibilities *",
              name: "rolesAndResponsibilities",
              multiline: true,
              rows: 4,
            },
            {
              label: "Perks and Benefits",
              name: "perksAndBenefits",
              multiline: true,
              rows: 3,
            },
            {
              label: "Level of Role *",
              name: "roleLevel",
              type: "select",
              options: roleLevels,
            },
            {
              label: "Preferred/Desired Qualification",
              name: "preferredQualification",
              multiline: true,
              rows: 2,
            },
            {
              label: "Salary Currency *",
              name: "salaryCurrency",
              type: "select",
              options: currencies,
            },
            {
              label: "Overall Experience *",
              name: "overallExperience",
              required: true,
            },
            {
              label: "Relevant Experience *",
              name: "relevantExperience",
              required: true,
            },
            {
              label: "Job Description Summary *",
              name: "jobDescriptionSummary",
              multiline: true,
              rows: 4,
            },
            {
              label: "Experience Skills",
              name: "experienceSkills",
              multiline: true,
              rows: 2,
            },
            {
              label: "Preferred Skills",
              name: "preferredSkills",
              multiline: true,
              rows: 2,
            },
          ].map((field, index) => (
            <Grid key={index} item xs={12} sm={field.rows ? 12 : 6}>
              <Controller
                name={field.name}
                control={control}
                rules={
                  field.required
                    ? { required: `${field.label} is required` }
                    : undefined
                }
                render={({ field: controllerField }) => (
                  <TextField
                    {...controllerField}
                    label={field.label}
                    fullWidth
                    multiline={field.multiline}
                    rows={field.rows}
                    select={field.type === "select"}
                    error={!!formState.errors[field.name]}
                    helperText={formState.errors[field.name]?.message}
                  >
                    {field.type === "select" &&
                      field.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Preview Job
          </Button>
        </Box>
      </form>

      {/* Review Job */}
      {/* {previewData && (
        <ReviewJob data={previewData} onEdit={() => setPreviewData(null)} />
      )} */}
    </Box>
  );
};

export default JobPostingForm;
