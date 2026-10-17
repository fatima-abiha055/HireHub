import {useEffect} from 'react';
import {X,CheckCircle2,AlertCircle,Inbox} from 'lucide-react';
import {useStore} from '../hooks/useStore';
export function Modal({title,onClose,children,wide}){
 useEffect(()=>{const k=e=>e.key==='Escape'&&onClose();document.addEventListener('keydown',k);return()=>document.removeEventListener('keydown',k)},[onClose]);
 return <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className={'modal'+(wide?' wide':'')} role="dialog" aria-modal="true" aria-label={title}>
  <div className="modal-h"><h3>{title}</h3><button className="icon-btn" onClick={onClose} aria-label="Close dialog"><X size={18}/></button></div>{children}</div></div>}
export function Confirm({title,text,action='Confirm',onYes,onClose}){
 return <Modal title={title} onClose={onClose}><p>{text}</p><div className="row end"><button className="btn ghost" onClick={onClose}>Keep it</button><button className="btn danger" onClick={()=>{onYes();onClose()}}>{action}</button></div></Modal>}
export function ToastHost(){const {toasts}=useStore();
 return <div className="toasts" aria-live="polite">{toasts.map(t=><div key={t.id} className={'toast '+t.type}>{t.type==='err'?<AlertCircle size={18}/>:<CheckCircle2 size={18}/>}{t.msg}</div>)}</div>}
export const StatusBadge=({status})=><span className={'badge s-'+status.toLowerCase().replace(/\s/g,'-')}>{status}</span>;
export const EmptyState=({title,text,children})=><div className="empty"><Inbox size={36}/><h3>{title}</h3><p>{text}</p>{children}</div>;
export const StatCard=({icon:I,label,value,hint})=><div className="stat"><span className="stat-i"><I size={20}/></span><div><b>{value}</b><span>{label}</span>{hint&&<small>{hint}</small>}</div></div>;
export const Logo=({name,color,size=44})=><span className="clogo" style={{background:color,width:size,height:size,fontSize:size*.4}} aria-hidden="true">{name.split(' ').map(w=>w[0]).slice(0,2).join('')}</span>;
export const Field=({label,error,children})=><label className="field"><span>{label}</span>{children}{error&&<em role="alert">{error}</em>}</label>;
export const Bars=({data,color='var(--indigo)'})=>{const m=Math.max(1,...data.map(d=>d.value));
 return <div className="bars">{data.map(d=><div key={d.label} className="bar"><span>{d.label}</span><div><i style={{width:d.value/m*100+'%',background:color}}/></div><b>{d.value}</b></div>)}</div>};
