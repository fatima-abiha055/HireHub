import {useState} from 'react';import {Link} from 'react-router-dom';import {Briefcase,Users,CalendarDays,Percent,Plus,Pencil,Trash2,Eye,Search} from 'lucide-react';
import {useStore} from '../hooks/useStore';import {StatCard,StatusBadge,EmptyState,Modal,Confirm,Field,Bars} from '../components/ui';
import {fmt,ago} from '../utils/validation';import {pipeline,byDept,monthly,conversion} from '../utils/analytics';
import {STATUSES,CATEGORIES,TYPES,LEVELS,LOCATIONS} from '../data/initialData';
const title=(jobs,id)=>jobs.find(j=>j.id===id)?.title||'Closed role';
export function RecruiterDashboard(){
 const {jobs,applications,interviews}=useStore();const pipe=pipeline(applications);const max=Math.max(1,...pipe.map(p=>p.value));
 return <div><div className="row between"><div><h1>Recruiter overview</h1><p className="muted">Demo recruiter view with simulated data.</p></div><Link to="/recruiter/jobs?new=1" className="btn"><Plus size={16}/> Post a Job</Link></div>
  <div className="grid4 gap"><StatCard icon={Briefcase} label="Active postings" value={jobs.length}/><StatCard icon={Users} label="Total applicants" value={applications.length}/>
   <StatCard icon={CalendarDays} label="Interviews scheduled" value={interviews.length}/><StatCard icon={Percent} label="Interview rate" value={conversion(applications)+'%'}/></div>
  <div className="grid2 gap top"><section className="card"><h2>Recruitment pipeline</h2><div className="funnel">{pipe.map(p=><div key={p.label}><span>{p.label}</span><div><i style={{width:Math.max(6,p.value/max*100)+'%'}}>{p.value}</i></div></div>)}</div></section>
   <section className="card"><h2>Recent candidate activity</h2>{applications.slice(0,6).map(a=><p key={a.id} className="li"><b>{a.name}</b> applied for {title(jobs,a.jobId)}<br/><small className="muted">{ago(a.date)} · <StatusBadge status={a.status}/></small></p>)}</section></div></div>}
const blank={title:'',category:'Engineering',location:'Karachi',type:'Full-time',level:'Mid',salary:'',description:'',responsibilities:'',skills:''};
export function ManageJobs(){
 const {jobs,saveJob,deleteJob,toast}=useStore();const [f,setF]=useState(()=>new URLSearchParams(location.search).get('new')?{...blank}:null);const [err,setErr]=useState({});const [del,setDel]=useState(null);
 const s=k=>e=>setF({...f,[k]:e.target.value});
 const save=e=>{e.preventDefault();const x={};['title','salary','description','responsibilities','skills'].forEach(k=>{if(!f[k].trim())x[k]='This field is required.'});
  setErr(x);if(Object.keys(x).length)return;saveJob(f);toast(f.id?'Job updated':'Job posted — it is live on Find Jobs');setF(null)};
 const sel=(k,l,o)=><Field label={l}><select value={f[k]} onChange={s(k)}>{o.map(x=><option key={x}>{x}</option>)}</select></Field>;
 return <div><div className="row between"><div><h1>Job postings</h1><p className="muted">New postings appear on the public job list immediately.</p></div><button className="btn" onClick={()=>{setErr({});setF({...blank})}}><Plus size={16}/> Post a Job</button></div>
  {jobs.length?<div className="card tw"><table><thead><tr><th>Title</th><th>Location</th><th>Type</th><th>Posted</th><th><span className="sr">Actions</span></th></tr></thead><tbody>
   {jobs.map(j=><tr key={j.id}><td><Link to={'/jobs/'+j.id}><b>{j.title}</b></Link><br/><small className="muted">{j.company}</small></td><td>{j.location}</td><td>{j.type}</td><td>{fmt(j.posted)}</td>
    <td className="row"><button className="icon-btn" aria-label={'Edit '+j.title} onClick={()=>{setErr({});setF({...j})}}><Pencil size={16}/></button><button className="icon-btn" aria-label={'Delete '+j.title} onClick={()=>setDel(j)}><Trash2 size={16}/></button></td></tr>)}</tbody></table></div>
   :<EmptyState title="No job postings" text="Post your first role to start receiving applications."/>}
  {f&&<Modal wide title={f.id?'Edit job':'Post a job'} onClose={()=>setF(null)}><form className="form" onSubmit={save} noValidate>
   <Field label="Job title" error={err.title}><input value={f.title} onChange={s('title')}/></Field>
   <div className="grid2">{sel('category','Department',CATEGORIES)}{sel('location','Location',LOCATIONS)}{sel('type','Employment type',TYPES)}{sel('level','Experience level',LEVELS)}</div>
   <Field label="Salary range (e.g. $50k – $70k)" error={err.salary}><input value={f.salary} onChange={s('salary')}/></Field>
   <Field label="Description" error={err.description}><textarea rows="3" value={f.description} onChange={s('description')}/></Field>
   <Field label="Responsibilities (one per line)" error={err.responsibilities}><textarea rows="3" value={f.responsibilities} onChange={s('responsibilities')}/></Field>
   <Field label="Required skills (comma separated)" error={err.skills}><input value={f.skills} onChange={s('skills')}/></Field>
   <div className="row end"><button type="button" className="btn ghost" onClick={()=>setF(null)}>Close</button><button className="btn">{f.id?'Save changes':'Publish job'}</button></div></form></Modal>}
  {del&&<Confirm title="Delete this job?" text={`"${del.title}" will be removed from the public listings. Existing applications are kept.`} action="Delete job" onYes={()=>{deleteJob(del.id);toast('Job deleted')}} onClose={()=>setDel(null)}/>}</div>}
export function Applicants(){
 const {jobs,applications,setStatus,toast}=useStore();const [q,setQ]=useState('');const [job,setJob]=useState('');const [st,setSt]=useState('');const [ex,setEx]=useState('');const [view,setView]=useState(null);const [rej,setRej]=useState(null);
 const list=applications.filter(a=>(!q||(a.name+a.email+a.skills).toLowerCase().includes(q.toLowerCase()))&&(!job||a.jobId===job)&&(!st||a.status===st)&&(!ex||(ex==='0'?a.years<=2:ex==='3'?a.years>=3&&a.years<=5:a.years>=6)));
 const change=(a,s)=>{if(s==='Rejected')setRej(a);else{setStatus(a.id,s);toast(`${a.name} moved to ${s}`)}};
 return <div><h1>Applicants</h1><p className="muted">Status changes are reflected instantly in the candidate's application tracking.</p>
  <div className="filters"><label className="field grow"><span>Search</span><div className="inp"><Search size={16}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Name, email or skill"/></div></label>
   <label className="field"><span>Job</span><select value={job} onChange={e=>setJob(e.target.value)}><option value="">All jobs</option>{jobs.map(j=><option key={j.id} value={j.id}>{j.title}</option>)}</select></label>
   <label className="field"><span>Status</span><select value={st} onChange={e=>setSt(e.target.value)}><option value="">All</option>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></label>
   <label className="field"><span>Experience</span><select value={ex} onChange={e=>setEx(e.target.value)}><option value="">Any</option><option value="0">0–2 years</option><option value="3">3–5 years</option><option value="6">6+ years</option></select></label></div>
  {list.length?<div className="card tw"><table><thead><tr><th>Candidate</th><th>Applied for</th><th>Skills</th><th>Status</th><th><span className="sr">Profile</span></th></tr></thead><tbody>
   {list.map(a=><tr key={a.id}><td><b>{a.name}</b><br/><small className="muted">{a.email} · {a.phone}</small></td><td>{title(jobs,a.jobId)}<br/><small className="muted">{fmt(a.date)} · {a.years} yrs</small></td><td>{a.skills}</td>
    <td><label className="sr" htmlFor={'st'+a.id}>Status for {a.name}</label><select id={'st'+a.id} className="stsel" value={a.status} onChange={e=>change(a,e.target.value)}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></td>
    <td><button className="btn sm ghost" onClick={()=>setView(a)}><Eye size={14}/> View Profile</button></td></tr>)}</tbody></table></div>
   :<EmptyState title="No applicants match" text="Adjust the filters to see more candidates."><button className="btn" onClick={()=>{setQ('');setJob('');setSt('');setEx('')}}>Clear filters</button></EmptyState>}
  {view&&<Modal title={view.name} onClose={()=>setView(null)}><p>{view.email} · {view.phone} · {view.location}</p><StatusBadge status={view.status}/><h4>Education</h4><p>{view.education}</p><h4>Experience ({view.years} yrs)</h4><p>{view.experience}</p><h4>Skills</h4><p>{view.skills}</p><h4>Cover letter</h4><p>{view.cover}</p><p className="muted">Resume: {view.resume} (file name only, demo)</p></Modal>}
  {rej&&<Confirm title="Reject this candidate?" text={`${rej.name} will see their application marked as Rejected.`} action="Reject" onYes={()=>{setStatus(rej.id,'Rejected');toast(rej.name+' marked as Rejected')}} onClose={()=>setRej(null)}/>}</div>}
export function Analytics(){
 const {jobs,applications,interviews}=useStore();const hired=applications.filter(a=>a.status==='Hired').length;
 return <div><h1>Recruitment analytics</h1><p className="muted">Calculated from the demo dataset and applications stored in this browser. Not real company statistics.</p>
  <div className="grid4 gap"><StatCard icon={Briefcase} label="Job postings" value={jobs.length}/><StatCard icon={Users} label="Applications" value={applications.length}/><StatCard icon={Percent} label="Interview conversion" value={conversion(applications)+'%'}/><StatCard icon={CalendarDays} label="Hires" value={hired} hint={interviews.length+' interviews on calendar'}/></div>
  <div className="grid2 gap top"><section className="card"><h2>Status breakdown</h2><Bars data={pipeline(applications)}/></section><section className="card"><h2>Applications by department</h2><Bars data={byDept(applications,jobs)} color="var(--navy2)"/></section></div>
  <section className="card top"><h2>Monthly activity (last 6 months)</h2><div className="cols">{(()=>{const m=monthly(applications),mx=Math.max(1,...m.map(x=>x.value));return m.map(x=><div key={x.k}><b>{x.value}</b><i style={{height:Math.max(4,x.value/mx*140)}}/><span>{x.label}</span></div>)})()}</div></section></div>}
