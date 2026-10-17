import {useState} from 'react';import {Link,useNavigate} from 'react-router-dom';
import {Search,MapPin,Code2,Palette,BarChart3,Megaphone,Users,Landmark,UserPlus,FileText,CalendarCheck,PartyPopper} from 'lucide-react';
import {useStore} from '../hooks/useStore';import JobCard from '../components/JobCard';import {Logo} from '../components/ui';
import {IMG,bg} from '../data/images';import {COMPANIES,CATEGORIES} from '../data/initialData';
const ICONS=[Code2,Palette,BarChart3,Megaphone,Users,Landmark];
export default function Home(){
 const {jobs,applications}=useStore();const nav=useNavigate();const [q,setQ]=useState('');const [loc,setLoc]=useState('');
 const go=e=>{e.preventDefault();nav(`/jobs?q=${encodeURIComponent(q)}&loc=${encodeURIComponent(loc)}`)};
 const hired=applications.filter(a=>a.status==='Hired').length;
 return <>
 <section className="hero" style={bg(IMG.hero)}><div className="hero-in wrap">
  <h1>Find the work that moves you forward.</h1>
  <p>HireHub connects ambitious candidates with companies that invest in their people. Search open roles, apply in minutes and follow every step of your application.</p>
  <form className="searchbar" onSubmit={go} role="search">
   <label><Search size={18}/><span className="sr">Keyword or job title</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Job title, keyword or company"/></label>
   <label><MapPin size={18}/><span className="sr">Location</span><input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="City or remote"/></label>
   <button className="btn">Search Jobs</button></form>
  <p className="hint">Popular: <Link to="/jobs?q=engineer">Engineer</Link> <Link to="/jobs?q=designer">Designer</Link> <Link to="/jobs?loc=Remote">Remote</Link></p></div></section>
 <section className="wrap sec"><div className="sec-h"><h2>Featured jobs</h2><Link to="/jobs" className="btn ghost sm">See all jobs</Link></div>
  <div className="grid3">{jobs.slice(0,6).map(j=><JobCard key={j.id} job={j}/>)}</div></section>
 <section className="band"><div className="wrap sec"><h2>Browse by category</h2><div className="grid6">
  {CATEGORIES.map((c,i)=>{const I=ICONS[i];return <Link key={c} to={'/jobs?cat='+c} className="cat"><I size={24}/><b>{c}</b><small>{jobs.filter(j=>j.category===c).length} open roles</small></Link>})}</div></div></section>
 <section className="wrap sec stats">{[[jobs.length,'Open jobs'],[new Set(jobs.map(j=>j.company)).size,'Hiring companies'],[hired+128,'Placements (demo)'],[applications.length,'Applications received']].map(([v,l])=><div key={l}><b>{v}</b><span>{l}</span></div>)}</section>
 <section className="wrap sec split"><div className="photo" style={bg(IMG.office)} role="img" aria-label="Bright modern open-plan office with desks beside tall windows"/>
  <div><h2>Hiring that feels human</h2><p>Recruiters get a clear pipeline, candidates get honest status updates. Every application moves through the same visible stages, so nobody is left guessing.</p>
   <div className="steps">{[[UserPlus,'Create your profile','Add your skills, education and experience once.'],[FileText,'Apply with confidence','One short form, instant confirmation.'],[CalendarCheck,'Interview','Schedule and manage interviews in one place.'],[PartyPopper,'Get hired','Track offers through to your first day.']].map(([I,t,d],i)=><div key={t} className="step"><span>{i+1}</span><div><b>{t}</b><p>{d}</p></div></div>)}</div></div></section>
 <section className="band"><div className="wrap sec"><h2>Companies hiring now</h2><div className="grid6">{COMPANIES.map(([n,c])=><Link to={'/jobs?q='+encodeURIComponent(n)} key={n} className="cat"><Logo name={n} color={c}/><b>{n}</b></Link>)}</div></div></section>
 <section className="cta" style={bg(IMG.team)}><div className="wrap cta-in"><h2>Ready for what's next?</h2><p>Whether you're looking for your next role or your next hire, start here.</p>
  <div className="row"><Link to="/jobs" className="btn">I'm looking for a job</Link><Link to="/recruiter/jobs" className="btn light">I'm hiring</Link></div></div></section></>}
