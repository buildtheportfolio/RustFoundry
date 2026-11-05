const API='https://api.github.com/repos/buildtheportfolio/RustFoundry/contents/projects';
const root=document.getElementById('projects');
const status=document.getElementById('status');
const search=document.getElementById('search');
const count=document.getElementById('count');
let projects=[];
const title=slug=>slug.replace(/[-_]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase());

async function validProject(entry){
  if(entry.type!=='dir'||entry.name==='_template')return false;
  const response=await fetch(`${API}/${encodeURIComponent(entry.name)}`,{headers:{Accept:'application/vnd.github+json'}});
  if(!response.ok)return false;
  const files=await response.json();
  return files.some(file=>file.type==='file'&&file.name==='Cargo.toml');
}

function render(){
  const query=search.value.trim().toLowerCase();
  const visible=projects.filter(project=>project.name.toLowerCase().includes(query));
  count.textContent=`${visible.length} project${visible.length===1?'':'s'}`;
  root.replaceChildren();
  if(!visible.length){
    const empty=document.createElement('p');empty.className='empty';empty.textContent='No projects match your search.';root.append(empty);
  }else for(const project of visible){
    const link=document.createElement('a');link.className='card';link.href=`projects/${encodeURIComponent(project.slug)}/`;
    const heading=document.createElement('h2');heading.textContent=project.name;
    const description=document.createElement('p');description.textContent='Rust project covering practical systems and software engineering.';
    const action=document.createElement('span');action.className='open';action.textContent='Open project';
    link.append(heading,description,action);root.append(link);
  }
  status.hidden=true;
}

async function loadProjects(){
  try{
    const response=await fetch(API,{headers:{Accept:'application/vnd.github+json'}});
    if(!response.ok)throw new Error(`GitHub API returned ${response.status}`);
    const entries=await response.json();
    const checked=await Promise.all(entries.map(async entry=>({entry,valid:await validProject(entry)})));
    projects=checked.filter(item=>item.valid).map(({entry})=>({slug:entry.name,name:title(entry.name)})).sort((a,b)=>a.name.localeCompare(b.name));
    render();
  }catch(error){
    root.textContent='Projects could not be loaded. Refresh and try again.';
    count.textContent='';status.hidden=true;console.error(error);
  }
}
search.addEventListener('input',render);
loadProjects();
