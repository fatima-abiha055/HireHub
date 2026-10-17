import {useState} from 'react';import {Link} from 'react-router-dom';import {FileText,CalendarDays,Star,Bookmark,Trash2,Eye} from 'lucide-react';
import {useStore} from '../hooks/useStore';import {StatCard,StatusBadge,EmptyState,Modal,Field} from '../components/ui';import {fmt} from '../utils/validation';import {isEmail} from '../utils/validation';
import {STATUSES} from '../data/initialData';import {IMG} from '../data/images';
const FIELDS=['name','email','phone','location','title','summary','education','skills','experience','resume'];
const done=p=>Math.round(FIELDS.filter(k=>String(p[k]||'').trim()).length/FIELDS.length*100);
export function CandidateDashboard(){
 const {profile,applications,jobs,saved,interviews,toggleSave,toast}=useStore();const [view,setView]=useState(null);
 const mine=applications.filter(a=>a.email.toLowerCase()===profile.email.toLowerCase());const job=id=>jobs.find(j=>j.id===id);
 const up=interviews.filter(i=>new Date(i.date+'T'+i.time)>=new Date()).sort((a,b)=>a.date.localeCompare(b.date));
 const sj=saved.map(job).filter(Boolean);const pct=done(profile);
 return <div><h1>Welcome back, {profile.name.split(' ')[0]}</h1><p className="muted">Demo candidate view. Everything here is calculated from your saved browser data.</p>
  <div className="grid4 gap">
   <StatCard icon={FileText} label="Applications" value={mine.length}/><StatCard icon={CalendarDays} label="Interviews" value={mine.filter(a=>a.status==='Interview Scheduled').length+up.length>0?up.length:0} hint="upcoming"/>
   <StatCard icon={Star} label="Shortlisted" value={mine.filter(a=>a.status==='Shortlisted').length}/><StatCard icon={Bookmark} label="Saved jobs" value={sj.length}/></div>
  <div className="grid2 gap top">
   <section className="card"><h2>Recent applications</h2>{mine.length?<div className="tw"><table><thead><tr><th>Role</th><th>Applied</th><th>Status</th><th><span className="sr">Actions</span></th></tr></thead><tbody>
    {mine.slice(0,6).map(a=><tr key={a.id}><td><b>{job(a.jobId)?.title||'Closed role'}</b><br/><small className="muted">{job(a.jobId)?.company}</small></td><td>{fmt(a.date)}</td><td><StatusBadge status={a.status}/></td><td><button className="icon-btn" aria-label="View application details" onClick={()=>setView(a)}><Eye size={16}/></button></td></tr>)}</tbody></table></div>
    :<EmptyState title="No applications yet" text="Apply to a role and it will appear here."><Link className="btn" to="/jobs">Find jobs</Link></EmptyState>}</section>
   <section className="card"><h2>Profile completion</h2><div className="prog"><i style={{width:pct+'%'}}/></div><p><b>{pct}%</b> complete. <Link to="/candidate/profile">Edit profile</Link></p>
    <h2>Upcoming interviews</h2>{up.length?up.slice(0,3).map(i=><p key={i.id} className="li"><b>{i.jobTitle}</b> at {i.company}<br/><small className="muted">{fmt(i.date)} · {i.time} · {i.type} (simulated)</small></p>):<p className="muted">None scheduled. <Link to="/interviews">Schedule one</Link></p>}</section></div>
  <section className="card top"><h2>Saved jobs</h2>{sj.length?sj.map(j=><div key={j.id} className="row between li"><div><Link to={'/jobs/'+j.id}><b>{j.title}</b></Link><br/><small className="muted">{j.company} · {j.location}</small></div>
   <button className="icon-btn" aria-label={'Remove '+j.title+' from saved jobs'} onClick={()=>{toggleSave(j.id);toast('Removed from saved jobs')}}><Trash2 size={16}/></button></div>):<EmptyState title="No saved jobs" text="Bookmark roles to compare them later."/>}</section>
  {view&&<Modal title="Application details" onClose={()=>setView(null)}><p><b>{job(view.jobId)?.title}</b> · {job(view.jobId)?.company}</p><p>Applied {fmt(view.date)} · Resume: {view.resume}</p>
   <div className="track">{STATUSES.filter(s=>s!=='Rejected'||view.status==='Rejected').map(s=>{const i=STATUSES.indexOf(s),c=STATUSES.indexOf(view.status);return <span key={s} className={i<=c&&view.status!=='Rejected'||s===view.status?'on':''}>{s}</span>})}</div>
   <h4>Cover letter</h4><p>{view.cover}</p></Modal>}</div>}
export function CandidateProfile(){
 const {profile,saveProfile,toast}=useStore();const [edit,setEdit]=useState(false);const [v,setV]=useState(profile);const [err,setErr]=useState({});
 const s=k=>e=>setV({...v,[k]:e.target.value});
 const save=e=>{e.preventDefault();const x={};if(!v.name.trim())x.name='Name is required.';if(!isEmail(v.email))x.email='Enter a valid email address.';if(!v.phone.trim())x.phone='Phone is required.';
  setErr(x);if(Object.keys(x).length)return;saveProfile(v);setEdit(false);toast('Profile updated')};
 const initials=profile.name.split(' ').map(w=>w[0]).join('').slice(0,2);
 if(edit)return <div><h1>Edit profile</h1><form className="card form" onSubmit={save} noValidate><div className="grid2">
  <Field label="Full name" error={err.name}><input value={v.name} onChange={s('name')}/></Field><Field label="Email" error={err.email}><input value={v.email} onChange={s('email')}/></Field>
  <Field label="Phone" error={err.phone}><input value={v.phone} onChange={s('phone')}/></Field><Field label="Location"><input value={v.location} onChange={s('location')}/></Field>
  <Field label="Headline"><input value={v.title} onChange={s('title')}/></Field><Field label="Education"><input value={v.education} onChange={s('education')}/></Field></div>
  <Field label="Professional summary"><textarea rows="3" value={v.summary} onChange={s('summary')}/></Field><Field label="Skills (comma separated)"><input value={v.skills} onChange={s('skills')}/></Field>
  <Field label="Experience and projects"><textarea rows="3" value={v.experience} onChange={s('experience')}/></Field><Field label="Resume file name (simulated)"><input value={v.resume} onChange={s('resume')}/></Field>
  <div className="row"><button className="btn">Save changes</button><button type="button" className="btn ghost" onClick={()=>{setV(profile);setEdit(false)}}>Cancel</button></div></form></div>;
 return <div><div className="profile-h" style={{backgroundImage:`url(${IMG.hero})`}}><span className="avatar" aria-label={'Avatar for '+profile.name}>{initials}</span></div>
  <div className="card pcard"><div className="row between"><div><h1>{profile.name}</h1><p className="muted">{profile.title}</p></div><button className="btn" onClick={()=>{setV(profile);setEdit(true)}}>Edit Profile</button></div>
   <p>{profile.email} · {profile.phone} · {profile.location}</p><h2>Summary</h2><p>{profile.summary}</p><h2>Education</h2><p>{profile.education}</p>
   <h2>Skills</h2><div className="chips">{profile.skills.split(',').filter(Boolean).map(x=><span key={x}>{x.trim()}</span>)}</div>
   <h2>Experience and projects</h2><p>{profile.experience}</p><h2>Resume</h2><p>{profile.resume?<>{profile.resume} <small className="muted">(file name only — demo)</small></>:'No resume added yet.'}</p></div></div>}
