import {createContext,useContext,useEffect,useState,useCallback,useMemo} from 'react';
import {seed} from '../data/initialData';
const K='hirehub:v1',Ctx=createContext();
const load=()=>{try{const s=JSON.parse(localStorage.getItem(K));if(s&&s.jobs)return s}catch{}return seed};
const uid=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
export function StoreProvider({children}){
 const [s,setS]=useState(load),[toasts,setT]=useState([]);
 useEffect(()=>{try{localStorage.setItem(K,JSON.stringify(s))}catch{}},[s]);
 const up=useCallback(f=>setS(p=>({...p,...f(p)})),[]);
 const toast=useCallback((msg,type='ok')=>{const id=uid('t');setT(t=>[...t,{id,msg,type}]);setTimeout(()=>setT(t=>t.filter(x=>x.id!==id)),3400)},[]);
 const api=useMemo(()=>({...s,toast,toasts,
  setRole:role=>up(()=>({role})),
  toggleSave:id=>up(p=>({saved:p.saved.includes(id)?p.saved.filter(x=>x!==id):[...p.saved,id]})),
  saveJob:j=>up(p=>({jobs:p.jobs.some(x=>x.id===j.id)?p.jobs.map(x=>x.id===j.id?{...x,...j}:x):[{...j,id:uid('j'),posted:new Date().toISOString(),own:true,color:'#635BFF',company:'Northwind Labs'},...p.jobs]})),
  deleteJob:id=>up(p=>({jobs:p.jobs.filter(x=>x.id!==id),saved:p.saved.filter(x=>x!==id)})),
  addApp:a=>up(p=>({applications:[{...a,id:uid('a'),date:new Date().toISOString(),status:'Applied'},...p.applications]})),
  setStatus:(id,status)=>up(p=>({applications:p.applications.map(a=>a.id===id?{...a,status}:a)})),
  saveProfile:profile=>up(()=>({profile})),
  saveInterview:i=>up(p=>({interviews:p.interviews.some(x=>x.id===i.id)?p.interviews.map(x=>x.id===i.id?i:x):[...p.interviews,{...i,id:uid('i')}]})),
  cancelInterview:id=>up(p=>({interviews:p.interviews.filter(x=>x.id!==id)})),
  addMessage:m=>up(p=>({messages:[...p.messages,{...m,date:new Date().toISOString()}]})),
  reset:()=>setS(seed)}),[s,toasts,toast,up]);
 return <Ctx.Provider value={api}>{children}</Ctx.Provider>}
export const useStore=()=>useContext(Ctx);
