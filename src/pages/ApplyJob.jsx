import {useState} from 'react';import {Link,useParams} from 'react-router-dom';import {CheckCircle2} from 'lucide-react';
import {useStore} from '../hooks/useStore';import {Field,EmptyState} from '../components/ui';import {isEmail,validateResume} from '../utils/validation';
export default function ApplyJob(){
 const {id}=useParams();const {jobs,profile,applications,addApp,toast}=useStore();const job=jobs.find(j=>j.id===id);
 const [v,setV]=useState({name:profile.name,email:profile.email,phone:profile.phone,location:profile.location,education:profile.education,experience:profile.experience,years:'1',skills:profile.skills,cover:''});
 const [file,setFile]=useState(null);const [err,setErr]=useState({});const [done,setDone]=useState(false);
 if(!job)return <div className="wrap sec"><EmptyState title="Job not found" text="This role may have been removed."><Link className="btn" to="/jobs">Browse jobs</Link></EmptyState></div>;
 const s=k=>e=>setV({...v,[k]:e.target.value});
 const submit=e=>{e.preventDefault();const x={};
  ['name','email','phone','location','education','experience','skills'].forEach(k=>{if(!v[k].trim())x[k]='This field is required.'});
  if(v.email&&!isEmail(v.email))x.email='Enter a valid email address, like name@example.com.';
  if(v.cover.trim().length<20)x.cover='Write at least 20 characters about why you are a good fit.';
  const r=validateResume(file);if(r)x.resume=r;
  if(!x.email&&applications.some(a=>a.jobId===job.id&&a.email.toLowerCase()===v.email.trim().toLowerCase()))x.email='You have already applied to this job with this email.';
  setErr(x);if(Object.keys(x).length){toast(x.email&&x.email.startsWith('You have')?'Duplicate application blocked':'Please fix the highlighted fields','err');return}
  addApp({...v,jobId:job.id,resume:file.name,years:Number(v.years)});setDone(true);toast('Application submitted')};
 if(done)return <div className="wrap sec narrow"><div className="card center"><CheckCircle2 size={48} color="var(--green)"/><h1>Application submitted</h1>
  <p>Thanks, {v.name.split(' ')[0]}. Your application for <b>{job.title}</b> at {job.company} was saved in this browser. Your resume file name was recorded; no file was uploaded to a server.</p>
  <div className="row center"><Link className="btn" to="/candidate">Track application</Link><Link className="btn ghost" to="/jobs">Keep browsing</Link></div></div></div>;
 return <div className="wrap sec narrow"><h1>Apply for {job.title}</h1><p className="muted">{job.company} · {job.location}. Demo form — nothing is sent to a server.</p>
  <form className="card form" onSubmit={submit} noValidate>
   <div className="grid2"><Field label="Full name" error={err.name}><input value={v.name} onChange={s('name')}/></Field><Field label="Email address" error={err.email}><input type="email" value={v.email} onChange={s('email')}/></Field>
   <Field label="Phone number" error={err.phone}><input value={v.phone} onChange={s('phone')}/></Field><Field label="Current location" error={err.location}><input value={v.location} onChange={s('location')}/></Field>
   <Field label="Education" error={err.education}><input value={v.education} onChange={s('education')}/></Field>
   <Field label="Years of experience"><select value={v.years} onChange={s('years')}>{[0,1,2,3,4,5,6,8,10].map(y=><option key={y} value={y}>{y===0?'Less than 1':y+(y===10?'+':'')}</option>)}</select></Field></div>
   <Field label="Relevant experience" error={err.experience}><textarea rows="3" value={v.experience} onChange={s('experience')}/></Field>
   <Field label="Skills (comma separated)" error={err.skills}><input value={v.skills} onChange={s('skills')}/></Field>
   <Field label="Cover letter" error={err.cover}><textarea rows="4" value={v.cover} onChange={s('cover')} placeholder="Why are you a great fit?"/></Field>
   <Field label="Resume (PDF, DOC or DOCX, max 2 MB)" error={err.resume}><input type="file" accept=".pdf,.doc,.docx" onChange={e=>setFile(e.target.files[0]||null)}/></Field>
   <button className="btn">Submit application</button></form></div>}
