import {Link} from 'react-router-dom';
import {MapPin,Briefcase,Bookmark,Wallet} from 'lucide-react';
import {Logo} from './ui';import {useStore} from '../hooks/useStore';import {ago} from '../utils/validation';
export default function JobCard({job}){
 const {saved,toggleSave,toast}=useStore();const on=saved.includes(job.id);
 return <article className="jobcard">
  <div className="row between"><Logo name={job.company} color={job.color}/>
   <button className={'icon-btn'+(on?' on':'')} aria-pressed={on} aria-label={on?'Remove bookmark':'Bookmark job'} onClick={()=>{toggleSave(job.id);toast(on?'Removed from saved jobs':'Job saved')}}><Bookmark size={18} fill={on?'currentColor':'none'}/></button></div>
  <h3><Link to={'/jobs/'+job.id}>{job.title}</Link></h3><p className="muted">{job.company}</p>
  <ul className="meta"><li><MapPin size={14}/>{job.location}</li><li><Briefcase size={14}/>{job.type} · {job.level}</li><li><Wallet size={14}/>{job.salary}</li></ul>
  <div className="row between"><small className="muted">{ago(job.posted)}</small><Link className="btn sm ghost" to={'/jobs/'+job.id}>View role</Link></div></article>}
