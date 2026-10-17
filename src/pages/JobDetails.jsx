import {Link,useParams} from 'react-router-dom';import {MapPin,Briefcase,Wallet,Bookmark,Check,GraduationCap} from 'lucide-react';
import {useStore} from '../hooks/useStore';import {Logo,EmptyState} from '../components/ui';import JobCard from '../components/JobCard';import {ago} from '../utils/validation';
export default function JobDetails(){
 const {id}=useParams();const {jobs,saved,toggleSave,toast}=useStore();const job=jobs.find(j=>j.id===id);
 if(!job)return <div className="wrap sec"><EmptyState title="This job is no longer available" text="It may have been closed or removed."><Link className="btn" to="/jobs">Browse jobs</Link></EmptyState></div>;
 const on=saved.includes(job.id);const rel=jobs.filter(j=>j.id!==job.id&&(j.category===job.category||j.location===job.location)).slice(0,3);
 return <div className="wrap sec"><Link to="/jobs" className="muted">← Back to jobs</Link>
  <div className="detail"><div className="card">
   <div className="row gap"><Logo name={job.company} color={job.color} size={60}/><div><h1>{job.title}</h1><p className="muted">{job.company} · Posted {ago(job.posted)}</p></div></div>
   <ul className="meta big"><li><MapPin size={16}/>{job.location}</li><li><Wallet size={16}/>{job.salary}</li><li><Briefcase size={16}/>{job.type}</li><li><GraduationCap size={16}/>{job.level} level</li></ul>
   <h2>About the role</h2><p>{job.description}</p>
   <h2>Responsibilities</h2><ul className="ticks">{job.responsibilities.split('\n').filter(Boolean).map(r=><li key={r}><Check size={16}/>{r}</li>)}</ul>
   <h2>Requirements and skills</h2><div className="chips">{job.skills.split(',').map(s=><span key={s}>{s.trim()}</span>)}</div>
   <h2>Benefits</h2><ul className="ticks">{['Flexible working hours','Health insurance','Learning budget','Paid leave and public holidays'].map(r=><li key={r}><Check size={16}/>{r}</li>)}</ul>
   <h2>About {job.company}</h2><p>{job.company} is a demo company profile used to illustrate HireHub. It values transparency, curiosity and craft.</p></div>
   <aside className="card sticky"><Link to={`/jobs/${job.id}/apply`} className="btn block">Apply Now</Link>
    <button className="btn ghost block" onClick={()=>{toggleSave(job.id);toast(on?'Removed from saved jobs':'Job saved')}}><Bookmark size={16} fill={on?'currentColor':'none'}/>{on?'Saved':'Save Job'}</button></aside></div>
  {rel.length>0&&<><h2>Related jobs</h2><div className="grid3">{rel.map(j=><JobCard key={j.id} job={j}/>)}</div></>}</div>}
