export const STATUSES=['Applied','Under Review','Shortlisted','Interview Scheduled','Offered','Hired','Rejected'];
export const CATEGORIES=['Engineering','Design','Data','Marketing','People','Finance'];
export const TYPES=['Full-time','Part-time','Contract','Internship'];
export const LEVELS=['Entry','Junior','Mid','Senior'];
export const LOCATIONS=['Karachi','Lahore','Remote','Dubai','London'];
export const COMPANIES=[['Northwind Labs','#635BFF'],['Lumen Health','#12B76A'],['Orbit Finance','#F79009'],['Cascade Cloud','#2E90FA'],['Verdant Energy','#0E9384'],['Pixelforge Studio','#D444F1']];
const day=864e5,now=Date.now();
const T=[['Frontend Engineer','Engineering','Full-time','Mid',[60,90]],['Product Designer','Design','Full-time','Mid',[55,85]],['Data Analyst','Data','Full-time','Junior',[40,60]],['Growth Marketing Manager','Marketing','Full-time','Senior',[70,100]],['Software Engineering Intern','Engineering','Internship','Entry',[12,18]],['DevOps Engineer','Engineering','Contract','Senior',[80,120]],['HR Business Partner','People','Full-time','Mid',[50,70]],['UX Researcher','Design','Part-time','Junior',[30,45]],['Backend Engineer','Engineering','Full-time','Senior',[90,130]],['Financial Analyst','Finance','Full-time','Junior',[45,65]],['Machine Learning Engineer','Data','Full-time','Senior',[100,150]],['Talent Acquisition Specialist','People','Contract','Mid',[40,60]]];
export const jobs=T.map(([title,category,type,level,[a,b]],i)=>({id:'j'+(i+1),title,category,type,level,company:COMPANIES[i%6][0],color:COMPANIES[i%6][1],
 location:LOCATIONS[(i*2)%5],salary:`$${a}k – $${b}k`,posted:new Date(now-(i*2+1)*day).toISOString(),own:false,
 description:`${COMPANIES[i%6][0]} is hiring a ${title} to join a collaborative team shipping products used by thousands of people. You will own meaningful work from day one.`,
 responsibilities:'Own projects from planning to delivery\nCollaborate with cross-functional teammates\nShare knowledge and improve team processes\nMeasure impact and iterate quickly',
 skills:'Communication, Problem solving, Teamwork, '+(category==='Engineering'?'JavaScript, React, Git':category==='Design'?'Figma, Prototyping':category==='Data'?'SQL, Python, Statistics':'Planning, Stakeholder management')}));
const N=['Ayesha Khan','Daniyal Ahmed','Sara Malik','Omar Farooq','Hira Siddiqui','Bilal Raza','Maryam Ali','Zain Abbas','Noor Fatima','Usman Tariq'];
const SK=['React, CSS, JavaScript','Figma, Research','SQL, Python','Node.js, MongoDB','Marketing, SEO','Excel, Finance'];
const ST=['Applied','Under Review','Shortlisted','Interview Scheduled','Hired','Rejected','Offered','Applied','Under Review','Applied'];
export const profile={name:'Alex Morgan',email:'alex.morgan@example.com',phone:'+92 300 1234567',location:'Karachi, Pakistan',title:'Junior Frontend Developer',
 summary:'Computer science graduate passionate about building accessible, well-crafted interfaces with React.',education:'BS Computer Science, FAST-NUCES (2025)',
 skills:'React, JavaScript, HTML, CSS, Git',experience:'Frontend intern at a local startup; built three portfolio projects.',resume:'alex-morgan-resume.pdf'};
const mine=(jobId,status,d)=>({id:'am'+jobId,jobId,name:profile.name,email:profile.email,phone:profile.phone,location:profile.location,education:profile.education,experience:profile.experience,years:1,skills:profile.skills,cover:'I would love to contribute to your team.',resume:profile.resume,status,date:new Date(now-d*day).toISOString()});
export const applications=[...N.map((name,i)=>({id:'a'+i,jobId:'j'+((i%12)+1),name,email:name.split(' ')[0].toLowerCase()+'@example.com',phone:'+92 31'+i+' 5550123',location:LOCATIONS[i%5],
 education:'BS, '+['FAST','NED','LUMS','IBA'][i%4],experience:'Relevant project and internship experience.',years:(i*2)%8,skills:SK[i%6],cover:'Excited to apply for this role.',resume:name.split(' ')[0].toLowerCase()+'-cv.pdf',status:ST[i],date:new Date(now-(i*17+3)*day).toISOString()})),
 mine('j5','Interview Scheduled',6),mine('j1','Shortlisted',12),mine('j3','Under Review',20)];
const at=d=>new Date(now+d*day).toISOString().slice(0,10);
export const interviews=[{id:'i1',jobTitle:'Software Engineering Intern',company:'Cascade Cloud',date:at(3),time:'11:00',type:'Online',note:'Video call, link sent by email'},
 {id:'i2',jobTitle:'Frontend Engineer',company:'Northwind Labs',date:at(8),time:'15:30',type:'In-person',note:'Karachi office, 2nd floor'},
 {id:'i3',jobTitle:'Data Analyst',company:'Orbit Finance',date:at(-5),time:'10:00',type:'Online',note:'Completed'}];
export const seed={role:'candidate',jobs,applications,interviews,saved:['j2','j9'],profile,messages:[]};
