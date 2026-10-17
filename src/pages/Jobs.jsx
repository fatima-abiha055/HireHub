import {useMemo,useState} from 'react';import {useSearchParams} from 'react-router-dom';import {Search,RotateCcw} from 'lucide-react';
import {useStore} from '../hooks/useStore';import JobCard from '../components/JobCard';import {EmptyState} from '../components/ui';
import {CATEGORIES,TYPES,LEVELS,LOCATIONS} from '../data/initialData';
const PAGE=6;
export default function Jobs(){
 const {jobs}=useStore();const [sp]=useSearchParams();
 const init={q:sp.get('q')||'',loc:sp.get('loc')||'',cat:sp.get('cat')||'',type:'',level:'',sort:'newest'};
 const [f,setF]=useState(init);const [n,setN]=useState(PAGE);
 const set=k=>e=>{setF({...f,[k]:e.target.value});setN(PAGE)};
 const list=useMemo(()=>{const q=f.q.toLowerCase().trim(),l=f.loc.toLowerCase().trim();
  const r=jobs.filter(j=>(!q||[j.title,j.company,j.skills,j.category].join(' ').toLowerCase().includes(q))&&(!l||j.location.toLowerCase().includes(l))&&(!f.cat||j.category===f.cat)&&(!f.type||j.type===f.type)&&(!f.level||j.level===f.level));
  const score=j=>q?(j.title.toLowerCase().includes(q)?2:0)+(j.company.toLowerCase().includes(q)?1:0):0;
  return [...r].sort((a,b)=>f.sort==='relevant'?score(b)-score(a)||new Date(b.posted)-new Date(a.posted):new Date(b.posted)-new Date(a.posted))},[jobs,f]);
 const sel=(k,label,opts)=><label className="field"><span>{label}</span><select value={f[k]} onChange={set(k)}><option value="">All</option>{opts.map(o=><option key={o}>{o}</option>)}</select></label>;
 return <div className="wrap sec"><h1>Find jobs</h1>
  <div className="filters">
   <label className="field grow"><span>Search</span><div className="inp"><Search size={16}/><input value={f.q} onChange={set('q')} placeholder="Title, keyword or company"/></div></label>
   {sel('loc','Location',LOCATIONS)}{sel('cat','Category',CATEGORIES)}{sel('type','Employment type',TYPES)}{sel('level','Experience',LEVELS)}
   <label className="field"><span>Sort by</span><select value={f.sort} onChange={set('sort')}><option value="newest">Newest</option><option value="relevant">Most relevant</option></select></label>
   <button className="btn ghost" onClick={()=>{setF({q:'',loc:'',cat:'',type:'',level:'',sort:'newest'});setN(PAGE)}}><RotateCcw size={16}/> Reset filters</button></div>
  <p className="muted" aria-live="polite">{list.length} {list.length===1?'job':'jobs'} found</p>
  {list.length?<><div className="grid3">{list.slice(0,n).map(j=><JobCard key={j.id} job={j}/>)}</div>
   {n<list.length&&<div className="center"><button className="btn ghost" onClick={()=>setN(n+PAGE)}>Load more jobs</button></div>}</>
  :<EmptyState title="No jobs match your search" text="Try fewer filters or a broader keyword."><button className="btn" onClick={()=>setF({q:'',loc:'',cat:'',type:'',level:'',sort:'newest'})}>Reset filters</button></EmptyState>}</div>}
