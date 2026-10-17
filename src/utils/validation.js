export const isEmail=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e).trim());
export const fmt=d=>new Date(d).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
export const ago=d=>{const n=Math.floor((Date.now()-new Date(d))/864e5);return n<=0?'Today':n===1?'1 day ago':n<30?n+' days ago':fmt(d)};
export const validateResume=f=>{if(!f)return 'Please choose a resume file.';
 if(!/\.(pdf|docx?)$/i.test(f.name))return 'Resume must be a PDF, DOC or DOCX file.';
 if(f.size>2*1024*1024)return 'Resume must be smaller than 2 MB.';return ''};
