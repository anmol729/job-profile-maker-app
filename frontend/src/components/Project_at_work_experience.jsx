import React, { useState } from "react";
import { TextField, Button, Grid, Box, Card, Chip } from "@mui/material";
import axios from "axios";

const Project_at_work_experience = ({ projects, setProjects }) => {
  const [newProject, setNewProject] = useState({
    projectTitle: "",
    objective: "",
    toolsTechnologies: "",
    duration: "",
    outcomeResults: "",
    url: "",
  });

  const handleAddProject = () => {
    const {
      projectTitle,
      objective,
      toolsTechnologies,
      duration,
      outcomeResults,
      url,
    } = newProject;

    // Basic validation to check required fields
    if (
      !projectTitle ||
      !objective ||
      !toolsTechnologies ||
      !duration ||
      !outcomeResults ||
      !url
    ) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    const addedProject = {
      projectTitle,
      objective,
      toolsTechnologies,
      duration,
      outcomeResults,
      url,
    };

    // Update local state for the new project
    setProjects((prevProjects) => ({
      ...prevProjects,
      projectList: [...prevProjects.projectList, addedProject],
    }));

    // Reset the form after adding the project
    setNewProject({
      projectTitle: "",
      objective: "",
      toolsTechnologies: "",
      duration: "",
      outcomeResults: "",
      url: "",
    });

    console.log("Project added = ", addedProject);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = projects.projectList.filter((_, i) => i !== index);
    setProjects({
      ...projects,
      projectList: updatedProjects,
    });
  };

  return (
    <Box sx={{ maxWidth: 750, mx: "auto" }}>
      <Card sx={{ p: 3 }}>
        <form>
          <h1>Projects</h1>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Project Title"
                value={newProject.projectTitle}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    projectTitle: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Objective"
                value={newProject.objective}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    objective: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tools and Technologies Used"
                value={newProject.toolsTechnologies}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    toolsTechnologies: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="Duration"
                type="date"
                value={newProject.duration}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    duration: e.target.value,
                  })
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Outcome/Results */}
            <Grid item xs={12}>
              <TextField
                label="Outcome/Results"
                value={newProject.outcomeResults}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    outcomeResults: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="URL"
                value={newProject.url}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    url: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProject}
                fullWidth
                sx={{ mb: 2 }}
              >
                Add Project
              </Button>
            </Grid>
          </Grid>

          {/* Project List */}
          <Grid item xs={12}>
            <Box display="flex" flexWrap="wrap" gap={2} marginBottom={2}>
              {projects.projectList.map((project, index) => (
                <Chip
                  key={index}
                  label={`${project.projectTitle} - ${project.objective}`}
                  color="secondary"
                  onDelete={() => handleRemoveProject(index)}
                />
              ))}
            </Box>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default Project_at_work_experience;
