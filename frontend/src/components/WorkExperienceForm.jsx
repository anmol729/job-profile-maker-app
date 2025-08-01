import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Chip,
  Container,
} from "@mui/material";

import axios from "axios";

import Location from "./ProfileForm/Location";
import ProjectDetailsForm from "./Projects";
import Project_at_work_experience from "./Project_at_work_experience";

import { jobTitleSuggestions } from "./joblist";

const WorkExperienceForm = ({ data, onNext }) => {
  const [experiences, setExperiences] = useState(data?.experiences || []);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyResponsibilities, setKeyResponsibilities] = useState("");
  const [location, setLocation] = useState("");
  const [internship, setInternship] = useState(false);
  const [internshipType, setInternshipType] = useState("Unpaid");
  const [internshipAmount, setInternshipAmount] = useState("");
  const [readyToRelocate, setReadyToRelocate] = useState(false);

  const [skills, setSkills] = useState("");
  const [skillList, setSkillList] = useState([]);

  const [error, setError] = useState("");
  const [projects, setProjects] = useState({
    projectList: [],
  });


  const [formData, setFormData] = useState({
    projectTitle: data.projectTitle || "",
    objective: data.objective || "",
    toolsTechnologies: data.toolsTechnologies || "",
    duration: data.duration || "",
    outcome: data.outcome || "",
    url: data.url || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    })); 
  };

  const handleInputChange2 = (e) => {
    const { value } = e.target;

    // Validation: Minimum 100 characters and maximum 250 words
    const wordCount = value.trim().split(/\s+/).length;
    if (value.length < 100) {
      setError("Key responsibilities must be at least 100 characters long.");
    } else if (wordCount > 250) {
      setError("Key responsibilities must not exceed 250 words.");
    } else {
      setError(""); // Clear error if valid
    }

    setKeyResponsibilities(value);
  };

  const maxSkillsAllowed = 30;

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();

    const diffYears = endDate.getFullYear() - startDate.getFullYear();
    const diffMonths = endDate.getMonth() - startDate.getMonth();
    const diffDays = endDate.getDate() - startDate.getDate();

    let totalMonths = diffYears * 12 + diffMonths;
    let totalDays = diffDays;

    if (totalDays < 0) {
      // Borrow days from the previous month
      const previousMonth = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        0
      );
      totalDays += previousMonth.getDate();
      totalMonths -= 1;
    }

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    return { years, months, days: totalDays };
  };

  const handleAddExperience = () => {
    if (!jobTitle || !company || !startDate || !keyResponsibilities || skills) {
      alert("Please fill all required fields.");
      return;
    }

    const newExperience = {
      jobTitle,
      company,
      startDate,
      endDate,
      keyResponsibilities,
      skillList,
      location,
      internship,
      internshipType,
      internshipAmount,
      readyToRelocate,
    };

    setExperiences([...experiences, newExperience]);
    resetForm();
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  const resetForm = () => {
    setJobTitle("");
    setCompany("");
    setStartDate("");
    setEndDate("");
    setKeyResponsibilities("");
    setSkills("");
    setLocation("");
    setInternship(false);
    setInternshipType("Unpaid");
    setInternshipAmount("");
    setReadyToRelocate(false);
    setFormData({
      projectTitle: "",
      objective: "",
      toolsTechnologies: "",
      duration: "",
      outcome: "",
      url: "",
    });
  };

  // work Experience api connection
  const token = data.email;
  // const token = "malakars041@gmail.com";

  const addWorkExperience = async (experiences, projects) => {
    const api = await axios.post(
      `${data.url}/experience/add`,
      { experiences: experiences, projects: projects },
      {
        headers: {
          "Content-Type": "application/json",
          email: token,
        },
        withCredentials: true,
      }
    );
    console.log(api.data);

    alert(api.data.message);
  };

  const handleNext = () => {
    if (onNext) {
      onNext(experiences);
      addWorkExperience(experiences, projects);
      console.log("at the add work experienc = ", experiences);
    } else {
      alert("Proceeding to the next step...");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && skills.trim()) {
      e.preventDefault(); // Prevent form submission

      if (skillList.length >= 30) {
        alert("You can only add up to 30 skills.");
        return;
      }

      const newSkill = skills.trim();

      if (skillList.includes(newSkill)) {
        alert(`The skill "${newSkill}" is already added.`);
        setSkills(""); // Clear the input field
        return;
      }

      setSkillList([...skillList, newSkill]);
      setSkills(""); // Clear the input field
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkillList(skillList.filter((skill) => skill !== skillToDelete));
  };

  console.log("project at work experince main ",projects)

  return (
    <Box sx={{ maxWidth: 750, mx: "auto", mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Work Experience Form
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  fullWidth
                  select
                >
                  {jobTitleSuggestions.map((job, index) => (
                    <MenuItem key={index} value={job}>
                      {job}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  label="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  label="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>

              {/* Key responsibilities */}

              <Grid item xs={12}>
                <TextField
                  label="Key Responsibilities"
                  name="keyResponsibilities"
                  value={keyResponsibilities}
                  onChange={handleInputChange2}
                  fullWidth
                  multiline
                  rows={3}
                  required
                  error={!!error}
                  helperText={error}
                />
              </Grid>

              {/* skills */}

              <Grid item xs={12}>
                <TextField
                  label="Add Skill"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  onKeyPress={handleKeyPress}
                  fullWidth
                />
                <div style={{ marginTop: "10px" }}>
                  {skillList.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => handleDeleteSkill(skill)}
                      color="primary"
                      style={{ marginRight: "5px", marginBottom: "5px" }}
                    />
                  ))}
                </div>
              </Grid>

              {/* <Grid item xs={12}>
                <TextField
                  label="Add Skill"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  onKeyPress={handleKeyPress}
                  fullWidth
                  InputProps={{
                    startAdornment: skills
                      .split(",")
                      .map((skill, index) =>
                        skill.trim() ? (
                          <Chip
                            key={index}
                            label={skill.trim()}
                            onDelete={() => handleDeleteSkill(skill.trim())}
                            color="primary"
                            style={{ marginRight: "5px" }}
                          />
                        ) : null
                      ),
                  }}
                />
              </Grid> */}

              {/*               
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {skillList.map((skill, index) => (
                    <Grid item key={index}>
                      <Chip
                        label={skill}
                        onDelete={() => handleDeleteSkill(skill)}
                        color="primary"
                        clickable
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid> */}

              {/* <Grid item xs={12}>
                <TextField
                  label="Skills (comma-separated)"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  fullWidth
                  required
                />
              </Grid> */}

              <Grid item xs={12}>
                <Location location={location} setLocation={setLocation} />
              </Grid>

              {/* Projects */}
              {/* <ProjectDetailsForm /> */}

              <Project_at_work_experience 
              projects={projects} setProjects={setProjects} />

              {/* 
              <Card sx={{ p: 2 }}>
                <form>
                  <Grid container spacing={3}>
                    {[
                      {
                        label: "Project Title",
                        name: "projectTitle",
                        placeholder: "Enter the project title...",
                      },
                      {
                        label: "Objective",
                        name: "objective",
                        placeholder: "What was the objective of the project?",
                      },
                      {
                        label: "Tools and Technologies Used",
                        name: "toolsTechnologies",
                        placeholder: "List the tools and technologies used...",
                      },
                      {
                        label: "Duration",
                        name: "duration",
                        placeholder: "Enter the duration (e.g., 3 months)...",
                      },
                      {
                        label: "Outcome/Results",
                        name: "outcome",
                        placeholder:
                          "Describe the outcome or results achieved...",
                      },
                      {
                        label: "URL",
                        name: "url",
                        placeholder: "Enter the project URL (if any)...",
                      },
                    ].map(({ label, name, placeholder }) => (
                      <Grid item xs={12} key={name}>
                        <TextField
                          fullWidth
                          label={label}
                          name={name}
                          placeholder={placeholder}
                          variant="outlined"
                          value={formData[name]}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                    }}
                  >
                  </Box>
                </form>



              </Card> */}

              <Grid item xs={6}>
                <TextField
                  select
                  label="Internship"
                  value={internship}
                  onChange={(e) => setInternship(e.target.value === "true")}
                  fullWidth
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </TextField>
              </Grid>
              {internship && (
                <>
                  <Grid item xs={6}>
                    <TextField
                      select
                      label="Internship Type"
                      value={internshipType}
                      onChange={(e) => setInternshipType(e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="Paid">Paid</MenuItem>
                      <MenuItem value="Unpaid">Unpaid</MenuItem>
                    </TextField>
                  </Grid>
                  {internshipType === "Paid" && (
                    <Grid item xs={6}>
                      <TextField
                        label="Internship Amount"
                        value={internshipAmount}
                        onChange={(e) => setInternshipAmount(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                  )}
                </>
              )}
              <Grid item xs={6}>
                <TextField
                  select
                  label="Ready to Relocate?"
                  value={readyToRelocate}
                  onChange={(e) =>
                    setReadyToRelocate(e.target.value === "true")
                  }
                  fullWidth
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleAddExperience}
                  fullWidth
                >
                  Add Experience
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Added Experiences
                </Typography>
                {experiences.map((exp, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography>
                      {exp.jobTitle} at {exp.company} ({exp.startDate} -{" "}
                      {exp.endDate || "Present"}) -{" "}
                      {calculateDuration(exp.startDate, exp.endDate).years}{" "}
                      years,{" "}
                      {calculateDuration(exp.startDate, exp.endDate).months}{" "}
                      months,{" "}
                      {calculateDuration(exp.startDate, exp.endDate).days} days
                    </Typography>
                    <Typography variant="body2">
                      {exp.keyResponsibilities}
                    </Typography>
                    <Typography variant="body2">
                      Skills: {exp.skills}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleRemoveExperience(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  fullWidth
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WorkExperienceForm;
