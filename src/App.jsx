import {Routes,Route} from 'react-router-dom';import {useEffect} from 'react';import {useLocation} from 'react-router-dom';
import {Shell,Dash} from './components/Layout';
import Home from './pages/Home';import Jobs from './pages/Jobs';import JobDetails from './pages/JobDetails';import ApplyJob from './pages/ApplyJob';
import {CandidateDashboard,CandidateProfile} from './pages/Candidate';import Interviews from './pages/Interviews';
import {RecruiterDashboard,ManageJobs,Applicants,Analytics} from './pages/Recruiter';
import {About,Contact,Companies,NotFound} from './pages/Static';
export default function App(){
 const {pathname}=useLocation();useEffect(()=>{window.scrollTo(0,0)},[pathname]);
 return <Routes><Route element={<Shell/>}>
  <Route index element={<Home/>}/><Route path="jobs" element={<Jobs/>}/><Route path="jobs/:id" element={<JobDetails/>}/><Route path="jobs/:id/apply" element={<ApplyJob/>}/>
  <Route path="companies" element={<Companies/>}/><Route path="about" element={<About/>}/><Route path="contact" element={<Contact/>}/>
  <Route element={<Dash/>}><Route path="candidate" element={<CandidateDashboard/>}/><Route path="candidate/profile" element={<CandidateProfile/>}/><Route path="interviews" element={<Interviews/>}/>
   <Route path="recruiter" element={<RecruiterDashboard/>}/><Route path="recruiter/jobs" element={<ManageJobs/>}/><Route path="recruiter/applicants" element={<Applicants/>}/><Route path="recruiter/analytics" element={<Analytics/>}/></Route>
  <Route path="*" element={<NotFound/>}/></Route></Routes>}
