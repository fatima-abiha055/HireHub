import {useState} from 'react';import {Plus,Pencil,XCircle,Video,Building2} from 'lucide-react';
import {useStore} from '../hooks/useStore';import {Modal,Confirm,Field,EmptyState} from '../components/ui';import {fmt} from '../utils/validation';
const today=()=>new Date().toISOString().slice(0,10);
const blank={jobTitle:'',company:'',date:'',time:'',type:'Online',note:''};
export default function Interviews(){
 const {interviews,jobs,saveInterview,cancelInterview,toast}=useStore();const [form,setForm]=useState(null);const [err,setErr]=useState({});const [del,setDel]=useState(null);
 const at=i=>new Date(i.date+'T'+i.time);const now=new Date();
 const up=interviews.filter(i=>at(i)>=now).sort((a,b)=>at(a)-at(b)),past=interviews.filter(i=>at(i)<now).sort((a,b)=>at(b)-at(a));
 const pick=e=>{const j=jobs.find(x=>x.id===e.target.value);setForm({...form,jobId:e.target.value,jobTitle:j?j.title:'',company:j?j.company:''})};
 const save=e=>{e.preventDefault();const x={};if(!form.jobTitle)x.jobTitle='Choose a job.';if(!form.date)x.date='Select a date.';else if(form.date<today())x.date='Date cannot be in the past.';if(!form.time)x.time='Select a time.';
  else if(form.date===today()&&at(form)<new Date())x.time='Time has already passed today.';
  setErr(x);if(Object.keys(x).length)return;const {jobId,...rec}=form;saveInterview(rec);setForm(null);toast(form.id?'Interview updated':'Interview scheduled')};
 const open=i=>{setErr({});setForm(i?{...i,jobId:jobs.find(j=>j.title===i.jobTitle&&j.company===i.company)?.id||''}:{...blank,jobId:''})};
 const List=({items,editable})=>items.length?items.map(i=><div key={i.id} className="card row between int"><div><b>{i.jobTitle}</b> <span className="muted">· {i.company}</span><br/>
  <small className="muted">{fmt(i.date)} at {i.time} · {i.type==='Online'?<Video size={13}/>:<Building2 size={13}/>} {i.type}{i.note?' · '+i.note:''}</small></div>
  {editable&&<div className="row"><button className="btn sm ghost" onClick={()=>open(i)}><Pencil size={14}/> Edit</button><button className="btn sm ghost" onClick={()=>setDel(i)}><XCircle size={14}/> Cancel</button></div>}</div>)
  :<EmptyState title="Nothing here yet" text={editable?'Schedule an interview to see it here.':'Past interviews appear here once they are done.'}/>;
 return <div><div className="row between"><div><h1>Interviews</h1><p className="muted">Simulated demo data. No external calendar is connected.</p></div><button className="btn" onClick={()=>open()}><Plus size={16}/> Schedule interview</button></div>
  <h2>Upcoming</h2><List items={up} editable/><h2>Past</h2><List items={past}/>
  {form&&<Modal title={form.id?'Edit interview':'Schedule interview'} onClose={()=>setForm(null)}><form onSubmit={save} noValidate className="form">
   <Field label="Job" error={err.jobTitle}><select value={form.jobId||''} onChange={pick}><option value="">Select a job</option>{jobs.map(j=><option key={j.id} value={j.id}>{j.title} — {j.company}</option>)}</select></Field>
   <div className="grid2"><Field label="Date" error={err.date}><input type="date" min={today()} value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></Field>
   <Field label="Time" error={err.time}><input type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></Field></div>
   <Field label="Interview type"><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Online</option><option>In-person</option></select></Field>
   <Field label="Notes (optional)"><input value={form.note||''} onChange={e=>setForm({...form,note:e.target.value})}/></Field>
   <div className="row end"><button type="button" className="btn ghost" onClick={()=>setForm(null)}>Close</button><button className="btn">{form.id?'Save changes':'Schedule'}</button></div></form></Modal>}
  {del&&<Confirm title="Cancel this interview?" text={`${del.jobTitle} at ${del.company} on ${fmt(del.date)} will be removed.`} action="Cancel interview" onYes={()=>{cancelInterview(del.id);toast('Interview cancelled')}} onClose={()=>setDel(null)}/>}</div>}
