import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import LandingPage from "./components/LandingPage/LandingPage";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import EducationForm from "./components/EducationForm";
import WorkExperienceForm from "./components/WorkExperienceForm";
import SkillsForm from "./components/SkillsForm";
import CVUpload from "./components/CVUpload";
// import Preview from "./components/Preview";
import Certification from "./components/Certifications";
import Activity from "./components/Acitivity";
import AchievementsForm from "./components/AchievementsForm";
import Projects from "./components/Projects";
import ProgressIndicator from "./components/ProfressIndicator";
import Preview from "./components/Preview";
import Research from "./components/Research";
import ConferenceSeminarDetailsForm from "./components/ConferenceSeminarDetailsForm";
import InterestedDomain from "./components/InterestedDomain";
import AreaOfExpertise from "./components/AreaOfExpertise";
import Languages from "./components/Languages";
import Patents from "./components/Patents";
import ProfessionalDetail from "./components/ProfessionalDetail";
import Hobbies from "./components/Hobbies";
import Reference from "./components/Reference";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Nominatim from './components/city/Nominatim'

import PhoneValidator from "./components/Phone_Validate";

import ShowApplicant_data from "./components/ShowApplicat_data";
import { API_URL, API_KEY_PHONE } from "./config";

  import Open_Weaterh_Map from "./components/city/WeatherMap";
 import Rapid from "./components/city/Rapid_API"

 import Combine from './components/city/Combine'
 import Location2 from './components/ProfileForm/Location2'
 import JobPostingForm from "./components/JobPostingForm";

const steps = [
  { label: "Job", component: JobPostingForm},
  { label: "Personal Info", component: ProfileForm },
  { label: "Interested Domain", component: InterestedDomain },
  { label: "Education", component: EducationForm },
  { label: "Work Experience", component: WorkExperienceForm },
  { label: "Skills", component: SkillsForm },
  { label: "Certifications", component: Certification },
  { label: "Activity", component: Activity },
  { label: "Achievements", component: AchievementsForm },
  { label: "Projects", component: Projects },
  { label: "Research", component: Research },
  { label: "Conference Seminar", component: ConferenceSeminarDetailsForm },
  { label: "Area of Expertise", component: AreaOfExpertise },
  { label: "Languages", component: Languages },
  { label: "Patents", component: Patents },
  { label: "Professional Detail", component: ProfessionalDetail },
  { label: "Hobbies", component: Hobbies },
  { label: "Reference", component: Reference },
  { label: "Upload CV", component: CVUpload },
];

const App = () => {
  const url = API_URL;

    console.log("API URL:", API_URL);

  const [showLanding, setShowLanding] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    url,
    name: "",
    email: "",
    phone: "",
    location: "",
    profilePicture: null,
    educationDetails: "",
    password: "",
    degree: "",
    institution: "",
    company: "",
    role: "",
    hardSkills: [],
    softSkills: [],
    cv: null,
    gradingSystem: "cgpa",
    cgpa: "",
    percentage: "",
    certification: "",
    experiences: [],
  });
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicant_data, setapplicant_data] = useState([]);

  const handleNextStep = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPreview(true);
    }
  };

  const handlePreview = () => {
    setIsPreview(true);
  };

  const handleSubmit = () => {
    // Profile api connection
    // const url = "http://localhost:5000";
    const token = formData.email
    const getProfile = async () => {
      try {
        const api = await axios.get(`${url}/applicant_data/view`, {
          headers: {
            "Content-Type": "application/json",
            email: token,
          },
          withCredentials: true,
        });
        setapplicant_data(api.data.Applicant_data);
        console.log("fetching profile data ", api.data);
        alert(api.data.message); // Success message
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
        alert(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        ); // Backend error message
      }
    };
    getProfile();
    setIsSubmitted(true);
  };

  console.log("fetching profile data - state ", applicant_data);

  const handleEditStep = (stepIndex) => {
    setCurrentStep(stepIndex);
    setIsPreview(false);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const StepComponent = steps[currentStep].component;

  const isFormCompleted = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.location &&
      formData.profilePicture &&
      formData.password &&
      formData.degree &&
      formData.institution &&
      formData.company &&
      formData.role &&
      formData.hardSkills.length > 0 &&
      formData.softSkills.length > 0 &&
      formData.certification &&
      formData.cv &&
      ((formData.gradingSystem === "cgpa" && formData.cgpa) ||
        (formData.gradingSystem === "percentage" && formData.percentage)) &&
      formData.experiences.length > 0
    );
  };

  console.log("formdata at app.jsx = ", formData);

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <>
      {/* <Open_Weaterh_Map /> */}
      {/* <Rapid /> */}
      {/* <Nominatim /> */}
      {/* <Combine /> */}
      {/* <JobPostingForm /> */}

      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          User Profile Setup
        </Typography>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      

          <ProgressIndicator
            steps={steps.map((step) => step.label)}
            currentStep={currentStep}
            onStepClick={handleEditStep}
          />

          <Box sx={{ mt: 4 }}>
            {!isPreview ? (
              <StepComponent onNext={handleNextStep} data={formData} />
            ) : (
              <Preview
                data={formData}
                onEdit={() => setIsPreview(false)}
                onSubmit={handleSubmit}
              />
            )}
          </Box>

          {currentStep === steps.length - 1 &&
            !isPreview &&
            isFormCompleted() && (
              <Box textAlign="center" sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePreview}
                >
                  Preview
                </Button>
              </Box>
            )}
        </Paper>

        {isSubmitted && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" align="center">
              Your profile has been submitted successfully!
              <ShowApplicant_data data={applicant_data} />
            </Typography>
          </Box>
        )}

        
      </Container>
    </>
  );
};

export default App;
