import {useState} from 'react';
import {Link,NavLink,Outlet,useLocation,useNavigate} from 'react-router-dom';
import {Menu,X,Briefcase,LayoutDashboard,User,CalendarDays,Users,BarChart3,FolderKanban,Mail,Phone,MapPin,Linkedin,Twitter,Github,RotateCcw} from 'lucide-react';
import {useStore} from '../hooks/useStore';import {ToastHost} from './ui';
export const Brand=({light})=><Link to="/" className={'brand'+(light?' light':'')}><span className="brand-m"><Briefcase size={16}/></span>HireHub</Link>;
export function Navbar(){
 const [open,setOpen]=useState(false);const {role,setRole}=useStore();const nav=useNavigate();const {pathname}=useLocation();
 const over=pathname==='/';const close=()=>setOpen(false);
 const sw=r=>{setRole(r);nav(r==='candidate'?'/candidate':'/recruiter');close()};
 return <header className={'nav'+(over?' over':'')}><div className="wrap row between">
  <Brand light={over}/>
  <button className="icon-btn menu" aria-label="Toggle menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
  <nav className={'links'+(open?' open':'')} aria-label="Main">
   {[['/','Home'],['/jobs','Find Jobs'],['/companies','Companies'],['/about','About'],['/contact','Contact']].map(([to,l])=><NavLink key={to} to={to} end={to==='/'} onClick={close}>{l}</NavLink>)}
   <div className="demo-sw" title="Demo role switcher — not real authentication"><span>Demo view</span>
    <button className={role==='candidate'?'on':''} onClick={()=>sw('candidate')}>Candidate</button>
    <button className={role==='recruiter'?'on':''} onClick={()=>sw('recruiter')}>Recruiter</button></div>
  </nav></div></header>}
export function Footer(){return <footer className="foot"><div className="wrap grid4">
 <div><Brand light/><p>Connecting talented people with companies worth working for.</p><div className="soc">{[Linkedin,Twitter,Github].map((I,i)=><a key={i} href="https://example.com" target="_blank" rel="noreferrer" aria-label={['LinkedIn','Twitter','GitHub'][i]}><I size={18}/></a>)}</div></div>
 <div><h4>Candidates</h4><Link to="/jobs">Find jobs</Link><Link to="/candidate">Dashboard</Link><Link to="/candidate/profile">Profile</Link></div>
 <div><h4>Employers</h4><Link to="/recruiter">Dashboard</Link><Link to="/recruiter/jobs">Post a job</Link><Link to="/recruiter/applicants">Applicants</Link></div>
 <div><h4>Contact</h4><span><Mail size={14}/> hello@hirehub.demo</span><span><Phone size={14}/> +92 21 0000 0000</span><span><MapPin size={14}/> Karachi, Pakistan</span></div>
 </div><div className="wrap legal">© {new Date().getFullYear()} HireHub — a frontend demo project. Data is stored in your browser only.</div></footer>}
const CAND=[['/candidate','Overview',LayoutDashboard,true],['/candidate/profile','My profile',User],['/interviews','Interviews',CalendarDays],['/jobs','Browse jobs',Briefcase]];
const REC=[['/recruiter','Overview',LayoutDashboard,true],['/recruiter/jobs','Job postings',FolderKanban],['/recruiter/applicants','Applicants',Users],['/interviews','Interviews',CalendarDays],['/recruiter/analytics','Analytics',BarChart3]];
export function Dash(){
 const {pathname}=useLocation();const {role,reset,toast}=useStore();const [open,setOpen]=useState(false);
 const r=pathname.startsWith('/recruiter')?'recruiter':pathname.startsWith('/candidate')?'candidate':role;
 return <div className="dash"><button className="btn sm ghost sbtn" onClick={()=>setOpen(!open)} aria-expanded={open}><Menu size={16}/> Menu</button>
  <aside className={open?'open':''}><p className="demo-tag">{r==='recruiter'?'Recruiter':'Candidate'} · demo view</p>
   {(r==='recruiter'?REC:CAND).map(([to,l,I,end])=><NavLink key={to} to={to} end={!!end} onClick={()=>setOpen(false)}><I size={18}/>{l}</NavLink>)}
   <button className="reset" onClick={()=>{reset();toast('Demo data restored')}}><RotateCcw size={14}/> Reset demo data</button></aside>
  <main><Outlet/></main></div>}
export function Shell(){const {pathname}=useLocation();
 const dash=/^\/(candidate|recruiter|interviews)/.test(pathname);
 return <><Navbar/><Outlet/>{!dash&&<Footer/>}<ToastHost/></>}
