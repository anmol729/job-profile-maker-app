require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const profileRoutes = require('./routes/profileRoutes');
const personalRoutes = require('./routes/personalRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const educationRoutes = require('./routes/educationRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const file = require('./routes/fileRoutes');
const certificates = require('./routes/certificateRoutes');
const activity = require('./routes/activityRoutes');
const achievement = require('./routes/achievementRoutes');
const project = require('./routes/projectRoutes');
const research_publication = require('./routes/research&publicationRoutes');
const conferences_seminars = require('./routes/conferences&seminars');
const domain_intreast = require('./routes/domain_intrestRoutes');
const experties_area = require('./routes/expertise_areaRoutes');
const language = require('./routes/languageRoutes');
const patent = require('./routes/pantentsRoutes');
const profile_summery = require('./routes/profile_summery');
const hobbieRoutes = require('./routes/hobbieRoutes');
const referenceRouter = require('./routes/referenceRouter');
const check_login = require('./middlewares/check-login');
const ApplicantData = require('./routes/getData')

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get('/', (req,res)=>{
  res.send('Welcome to the API of Applicants');
})

app.get('/login', (req, res)=>{
  res.send('<h1>Redirect to login</h1>');
})

// Register Routes
app.use('/profile', profileRoutes);
app.use('/personal',check_login, personalRoutes)
app.use('/skills',check_login, skillsRoutes);
app.use('/education',check_login, educationRoutes);
app.use('/experience',check_login, experienceRoutes);
app.use('/file',check_login, file);
app.use('/certificate',check_login, certificates);
app.use('/activity', check_login, activity);
app.use('/achievement', check_login, achievement);
app.use('/project', check_login, project);
app.use('/research_publication', check_login, research_publication);
app.use('/conferences_seminars', check_login, conferences_seminars);
app.use('/domain_intrest', check_login, domain_intreast);
app.use('/experties_area', check_login, experties_area);
app.use('/language', check_login, language);
app.use('/patent', check_login, patent);
app.use('/profile_summery', check_login, profile_summery);
app.use('/hobbie', check_login, hobbieRoutes);
app.use('/reference', check_login, referenceRouter);

app.use('/applicant_data',check_login,ApplicantData)

app.listen(5000, () => {
  console.log('Server is running on port5000');
});