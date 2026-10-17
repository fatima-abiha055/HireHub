// Central image config. Replace these imports with your own files (or URLs) to swap photography.
import hero from '../assets/images/hero.png';
import team from '../assets/images/team.png';
import office from '../assets/images/office.png';
export const IMG={hero,team,office,about:team,cta:office,recruiter:team,candidate:hero};
export const bg=src=>({backgroundImage:`url(${src})`});
