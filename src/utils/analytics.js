import {STATUSES} from '../data/initialData';
export const countBy=(arr,fn)=>arr.reduce((m,x)=>{const k=fn(x);m[k]=(m[k]||0)+1;return m},{});
export const pipeline=apps=>{const c=countBy(apps,a=>a.status);return STATUSES.map(s=>({label:s,value:c[s]||0}))};
export const byDept=(apps,jobs)=>Object.entries(countBy(apps,a=>jobs.find(j=>j.id===a.jobId)?.category||'Other')).map(([label,value])=>({label,value}));
export const monthly=apps=>{const out=[];for(let i=5;i>=0;i--){const d=new Date();d.setDate(1);d.setMonth(d.getMonth()-i);out.push({k:d.getFullYear()+'-'+d.getMonth(),label:d.toLocaleString(undefined,{month:'short'}),value:0})}
 apps.forEach(a=>{const d=new Date(a.date),m=out.find(x=>x.k===d.getFullYear()+'-'+d.getMonth());if(m)m.value++});return out};
export const conversion=apps=>apps.length?Math.round(apps.filter(a=>['Interview Scheduled','Offered','Hired'].includes(a.status)).length/apps.length*100):0;
