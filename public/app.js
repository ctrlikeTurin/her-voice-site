(function(){
"use strict";
var MB = 1024*1024;
var DEF = {
  text:{
    "hero.lead":"Six students working to keep girls in Rwanda reading, learning and in school.",
    "mission.statement":"Our think tank mission is to help girls in Kibagabaga, Kigali stay in school and learn to read and write with confidence, by using our research, software and community-organising skills together with local partners, in order to build a learning centre, household outreach and mentorship that keep running after the grant ends.",
    "problem.statement":"In 2022, 23.3% of Rwandan women aged 15 and above were illiterate, compared with 19.0% of men, according to the National Institute of Statistics of Rwanda. In Kibagabaga, Gasabo District, girls aged 12 to 18 fall behind or leave school because families put food and shelter before fees, girls carry household chores, and some leave after early pregnancy or marriage. Our five interviews in October 2026 named the same barriers: cost, chores, inflexible class times and too little one-to-one help. Girls who cannot read well struggle to continue to higher education or earn a formal wage. Between January and December 2027, we aim to enrol 60 girls in a community learning centre, raise the reading level of 70% of them, and keep 90% in school, using a $10,000 grant.",
    "problem.c1":"Poor households struggle to pay school fees and materials, and often put basic needs like food and shelter first.",
    "problem.c2":"Girls are expected to fetch water, look after siblings and help at home, which cuts into study time.",
    "problem.c3":"Adolescent pregnancy and early marriage end many girls’ schooling for good.",
    "problem.c4":"Rural schools can lack devices, power and learning materials, and sessions are often far from home.",
    "problem.research":"We interviewed five people between 17 and 27 October 2026: a non-governmental organisation (Root Foundation), a student, a head teacher, a parent and a local government official. Their message was consistent: costs, chores and inconvenient schedules block learning, and communities want programmes that last beyond the first round of funding.",
    "solution.lead":"We bring learning close to girls’ homes with local leaders, a partner school and volunteers, and we keep families involved.",
    "solution.s1":"An after-school reading club in a classroom lent by a partner school, led by trained volunteer teachers and older students, at times that fit around chores.",
    "solution.s2":"Umudugudu leaders visit families, promote full attendance and identify girls who need support, while teachers track attendance and progress.",
    "solution.s3":"Small recognition for girls and families with steady attendance, funded from the grant and tracked with monthly attendance and reading checks.",
    "solution.s4":"Girls are matched with women role models, professionals and older students who build confidence and show what is possible.",
    "proto.text":"The prototype for the Her Voice learning-centre model.",
    "chal.lead":"Each challenge pushed us out of the classroom and into the community. Here is what we did, with the evidence.",
    "team.lead":"We come from different backgrounds and share one purpose."
  },
  team:[
    {name:"Arvin Moradi",role:"",bio:"",photo:null},
    {name:"Ganza Gael",role:"",bio:"",photo:null},
    {name:"Arnold Sano Rwakagara",role:"",bio:"",photo:null},
    {name:"Sasha Naturinda",role:"",bio:"",photo:null},
    {name:"Nolan George Marwa",role:"",bio:"",photo:null},
    {name:"Wilsalem Turin Kipchumba",role:"",bio:"",photo:null}
  ],
  media:{
    ch1:[{k:"link",url:"https://youtu.be/uaQpKnMLBCk",label:"Challenge 1 video"}],
    ch2:[{k:"link",url:"https://www.youtube.com/watch?v=eA1nw2yG9kw",label:"Challenge 2 video"}],
    ch3:[{k:"link",url:"https://youtu.be/NiSLbmZsroY",label:"Challenge 3 video"}],
    ch4:[{k:"link",url:"https://youtu.be/vewRuDzncjI",label:"Challenge 4 video"}],
    ch5:[{k:"link",url:"https://youtu.be/4F5xC7xuiag",label:"Pitch video"},{k:"link",url:"https://docs.google.com/presentation/d/1-6gsmfUpwDVNGD-WMVjv5JjdRJolN30dbmPTZzZxaDY/edit?usp=sharing",label:"Grant proposal slides"}],
    ch6:[],
    proto:[]
  }
};
var CH = [
  {id:"ch1",n:"Challenge 01",t:"Introduction",b:"We introduced ourselves as Her Voice: different backgrounds and interests, one shared mission."},
  {id:"ch2",n:"Challenge 02",t:"Discover Africa",b:"We explored the challenges and opportunities across Africa that led us to focus on girls’ education."},
  {id:"ch3",n:"Challenge 03",t:"HELP-LAB",b:"We supported top-performing students at Kibagabaga Primary School with stationery and documented the visit on video."},
  {id:"ch4",n:"Challenge 04",t:"Hunt for Treasure",b:"We interviewed an entrepreneur outside ALU about how they started, why they took on their cause, how they run day to day, their challenges, successes and plans, then reflected as a team on what it means for our own path."},
  {id:"ch5",n:"Challenge 05",t:"Launch Your Mission",b:"We turned our research into a $10,000 grant proposal and a three-minute pitch: the mission, the problem, a community-led learning-centre model and a budget that fits."},
  {id:"ch6",n:"Challenge 06",t:"Your Digital Print",b:"This website: our mission, problem, solution, prototype, team and the record of all six challenges."}
];
var BUDGET = [["Learning centre setup",3000],["Learning materials",2200],["Volunteer teacher stipends and training",1800],["Mentorship programme",900],["Attendance incentives",800],["Monitoring and evaluation",600],["Contingency",700]];
var VALUES = [["Complete accountability","Each of us owns our actions and their consequences."],["Valuing diversity","Decisions are shared equally and every contribution counts."],["Adaptability","When challenges get hard, persistence helps us find a way through."]];
var IMPACT = [["Keep girls in school","Guidance for teenagers and backing from their communities, so fewer girls drop out."],["Change what families expect","Show families the economic value of educated women, so early marriage is less relied on."],["Learning at every age","Bring education close to home so women and girls of any age can take part."]];
CH.forEach(function(ch){ DEF.text[ch.id+".blurb"]=ch.b; });

var S = JSON.parse(JSON.stringify(DEF));
var editing=false, dirty=false, key=null;
var KEY_STORE="hv-edit-key";

function $(s,r){return (r||document).querySelector(s)}
function h(tag,attrs){
  var e=document.createElement(tag); attrs=attrs||{};
  Object.keys(attrs).forEach(function(k){
    var v=attrs[k];
    if(k==="class")e.className=v;
    else if(k.indexOf("on")===0)e.addEventListener(k.slice(2),v);
    else if(v===true)e.setAttribute(k,"");
    else if(v!==false&&v!=null)e.setAttribute(k,v);
  });
  for(var i=2;i<arguments.length;i++){
    var kids=[].concat(arguments[i]);
    kids.forEach(function(c){ if(c==null||c===false)return; e.append(c.nodeType?c:document.createTextNode(String(c))); });
  }
  return e;
}
function safeUrl(u){ return /^https?:\/\//i.test(u||"") ? u : null; }
function ytId(u){
  var m=/^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i.exec(u||"");
  return m?m[1]:null;
}
function tx(k){ return Object.prototype.hasOwnProperty.call(S.text,k) ? S.text[k] : DEF.text[k]; }
function mark(){ dirty=true; setMsg("Unsaved changes",false); }
function setMsg(t,err){ var m=$("#msg"); m.textContent=t; m.className="msg"+(err?" err":""); }
function store(v){ try{ if(v)localStorage.setItem(KEY_STORE,v); else localStorage.removeItem(KEY_STORE); }catch(e){} }
function stored(){ try{ return localStorage.getItem(KEY_STORE); }catch(e){ return null; } }

/* ---------- render ---------- */
function renderText(){
  document.querySelectorAll("[data-t]").forEach(function(el){
    var k=el.getAttribute("data-t");
    el.textContent = tx(k);
    if(editing){
      el.setAttribute("contenteditable","plaintext-only");
      el.oninput=function(){ S.text[k]=el.innerText; mark(); };
    }else{
      el.removeAttribute("contenteditable"); el.oninput=null;
    }
  });
}
function renderStatic(){
  var v=$("#values"); v.textContent="";
  VALUES.forEach(function(x){ v.append(h("div",{class:"card"},h("h3",null,x[0]),h("p",null,x[1]))); });
  var im=$("#impact"); im.textContent="";
  IMPACT.forEach(function(x){ im.append(h("div",{class:"card"},h("h3",null,x[0]),h("p",null,x[1]))); });
  var b=$("#budget"); b.textContent="";
  var max=3000,total=0;
  BUDGET.forEach(function(r){
    total+=r[1];
    b.append(h("div",{class:"bar-row"},h("span",null,r[0]),h("div",{class:"bar-track"},h("div",{class:"bar-fill",style:"width:"+(r[1]/max*100).toFixed(1)+"%"})),h("span",{class:"bar-val"},"$"+r[1].toLocaleString("en-US"))));
  });
  b.append(h("div",{class:"total"},h("span",null,"Total"),h("span",null,"$"+total.toLocaleString("en-US"))));
}
function mediaItem(k,i,it){
  var fig, yt;
  if(it.k==="video"&&it.id){
    fig=h("figure",null,h("video",{controls:true,preload:"metadata",src:"/media/"+it.id}),it.label?h("figcaption",null,it.label):null);
  }else if(it.k==="image"&&it.id){
    fig=h("figure",null,h("img",{class:"m",loading:"lazy",src:"/media/"+it.id,alt:it.label||"Photo from the challenge"}),it.label?h("figcaption",null,it.label):null);
  }else if((yt=ytId(it.url))){
    fig=h("figure",null,h("div",{class:"yt"},h("iframe",{src:"https://www.youtube-nocookie.com/embed/"+yt,title:it.label||"Video",loading:"lazy",allow:"accelerometer; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:true})),it.label?h("figcaption",null,it.label):null);
  }else{
    var u=safeUrl(it.url);
    fig=h("figure",null,u?h("a",{class:"linkcard",href:u,target:"_blank",rel:"noopener"},h("strong",null,it.label||"Open link"),h("span",null,u)):h("div",{class:"linkcard"},h("strong",null,it.label||"Link")));
  }
  if(editing){
    var cap=h("input",{type:"text",id:"cap-"+k+"-"+i,value:it.label||"","aria-label":"Caption",placeholder:"Caption",oninput:function(e){it.label=e.target.value;mark();}});
    var rm=h("button",{type:"button",class:"x",onclick:function(){S.media[k].splice(i,1);mark();renderMedia();}},"Remove");
    fig.append(h("div",{class:"item-ed"},cap,rm));
  }
  return fig;
}
function mediaBlock(k){
  var list=S.media[k]||(S.media[k]=[]);
  var wrap=h("div",null);
  if(list.length){ wrap.append(h("div",{class:"media"},list.map(function(it,i){return mediaItem(k,i,it);}))); }
  else if(!editing){ wrap.append(h("p",{class:"empty"},"Evidence for this section is being added.")); }
  if(editing){ wrap.append(editBar(k)); }
  return wrap;
}
function editBar(k){
  var bar=h("div",{class:"ed-bar"});
  var vid=h("input",{type:"file",id:"vid-"+k,class:"sr",accept:"video/mp4,video/webm",onchange:function(e){doUpload(k,e.target,"video");}});
  var img=h("input",{type:"file",id:"img-"+k,class:"sr",accept:"image/png,image/jpeg,image/webp,image/gif",multiple:true,onchange:function(e){doUpload(k,e.target,"image");}});
  var vb=h("button",{type:"button",class:"btn small",onclick:function(){vid.click();}},"Upload video");
  var ib=h("button",{type:"button",class:"btn small",onclick:function(){img.click();}},"Upload photos");
  var lab=h("input",{type:"text",id:"ll-"+k,placeholder:"Link label, e.g. Watch on YouTube","aria-label":"Link label"});
  var url=h("input",{type:"url",id:"lu-"+k,placeholder:"https://youtu.be/...","aria-label":"Link address"});
  var add=h("button",{type:"button",class:"btn small ghost",style:"color:var(--ink)",onclick:function(){
    var u=safeUrl(url.value.trim());
    if(!u){setMsg("Enter a link that starts with https://",true);return;}
    S.media[k].push({k:"link",url:u,label:lab.value.trim()||"Open link"});
    mark();renderMedia();
  }},"Add link");
  bar.append(vid,img,vb,ib,h("div",{style:"flex-basis:100%;height:0"}),lab,url,add,
    h("p",{class:"hint",style:"flex-basis:100%"},"Videos up to 20 MB (mp4 or webm). For longer videos, upload to YouTube and add the link; YouTube links play right on the page."));
  return bar;
}
function renderMedia(){
  var p=$("#media-proto"); p.textContent=""; p.append(mediaBlock("proto"));
  var c=$("#chal"); c.textContent="";
  CH.forEach(function(ch){
    var card=h("article",{class:"chal-card",id:ch.id});
    card.append(h("div",{class:"chal-head"},h("span",{class:"chal-num"},ch.n),h("h3",null,ch.t)));
    card.append(h("p",{class:"blurb","data-t":ch.id+".blurb"}));
    card.append(mediaBlock(ch.id));
    c.append(card);
  });
  renderText();
}
function initials(n){ return n.split(/\s+/).filter(Boolean).slice(0,2).map(function(w){return w[0].toUpperCase();}).join(""); }
function renderTeam(){
  var g=$("#team-grid"); g.textContent="";
  S.team.forEach(function(m,i){
    var ph=h("div",{class:"photo"});
    if(m.photo){ ph.append(h("img",{src:"/media/"+m.photo,alt:"Photo of "+m.name,loading:"lazy"})); }
    else{ ph.append(h("span",{class:"initials","aria-hidden":"true"},initials(m.name||"?"))); }
    ph.insertAdjacentHTML("beforeend",'<svg viewBox="0 0 120 22" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 22 L10 4 L20 22 L30 4 L40 22 L50 4 L60 22 L70 4 L80 22 L90 4 L100 22 L110 4 L120 22" fill="none" stroke-width="3" style="stroke:var(--accent)"/></svg>');
    var body=h("div",{class:"member-body"},
      h("h3",{class:"view-only"},m.name),
      m.role?h("span",{class:"role view-only"},m.role):null,
      m.bio?h("p",{class:"bio view-only"},m.bio):null
    );
    var ed=h("div",{class:"member-ed"});
    var f=h("input",{type:"file",id:"ph-"+i,class:"sr",accept:"image/png,image/jpeg,image/webp",onchange:function(e){doPhoto(i,e.target);}});
    ed.append(f,
      h("button",{type:"button",class:"btn small",onclick:function(){f.click();}},m.photo?"Change photo":"Upload photo"),
      m.photo?h("button",{type:"button",class:"x",onclick:function(){m.photo=null;mark();renderTeam();}},"Remove photo"):null,
      h("label",{class:"tag",for:"nm-"+i},"Name"),
      h("input",{type:"text",id:"nm-"+i,value:m.name,oninput:function(e){m.name=e.target.value;mark();}}),
      h("label",{class:"tag",for:"rl-"+i},"Role"),
      h("input",{type:"text",id:"rl-"+i,value:m.role,list:"roles",placeholder:"e.g. Research lead",oninput:function(e){m.role=e.target.value;mark();}}),
      h("label",{class:"tag",for:"bi-"+i},"Short bio"),
      h("textarea",{id:"bi-"+i,placeholder:"One or two sentences about what this person does in the team.",oninput:function(e){m.bio=e.target.value;mark();}},m.bio)
    );
    body.append(ed);
    g.append(h("div",{class:"member"},ph,body));
  });
}
function renderAll(){ renderStatic(); renderMedia(); renderTeam(); renderText(); }

/* ---------- server calls ---------- */
function api(path,opts){
  opts=opts||{}; opts.headers=opts.headers||{};
  if(key) opts.headers["X-Edit-Key"]=key;
  return fetch(path,opts).then(function(r){
    return r.json().catch(function(){return {};}).then(function(d){
      if(!r.ok){ var e=new Error(d.error||"http_"+r.status); e.code=d.error||("http_"+r.status); e.status=r.status; throw e; }
      return d;
    });
  });
}
function lostAuth(e){
  if(e&&e.status===401){ key=null; store(null); setMsg("Your login has expired. Log in again, then save.",true); openLogin(); return true; }
  return false;
}

/* ---------- uploads ---------- */
function errText(e){
  var c=e&&e.code;
  if(c==="too_large")return "That file is over 20 MB. Upload it to YouTube and add the link instead.";
  if(c==="unsupported_type")return "That file type is not supported. Use mp4 or webm for video and jpg, png or webp for photos.";
  return "Upload failed. Please try again.";
}
function shrink(file){
  if(!/^image\/(png|jpeg|webp)$/.test(file.type)||!window.createImageBitmap) return Promise.resolve(file);
  return createImageBitmap(file).then(function(bm){
    var max=1400, sc=Math.min(1,max/Math.max(bm.width,bm.height));
    if(sc===1&&file.size<1.5*MB) return file;
    var c=document.createElement("canvas"); c.width=Math.round(bm.width*sc); c.height=Math.round(bm.height*sc);
    c.getContext("2d").drawImage(bm,0,0,c.width,c.height);
    return new Promise(function(res){ c.toBlob(function(b){res(b||file);},"image/jpeg",0.86); });
  }).catch(function(){return file;});
}
function upload(blob){
  if(blob.size>20*MB) return Promise.reject({code:"too_large"});
  return api("/api/upload",{method:"POST",headers:{"Content-Type":blob.type},body:blob});
}
function doUpload(k,input,kind){
  var files=[].slice.call(input.files||[]); input.value="";
  if(!files.length)return;
  (function next(i){
    if(i>=files.length){ renderMedia(); setMsg("Uploaded. Click Save changes to publish.",false); return; }
    var f=files[i];
    setMsg("Uploading "+f.name+"…",false);
    (kind==="image" ? shrink(f) : Promise.resolve(f)).then(upload).then(function(r){
      S.media[k].push({k:kind,id:r.id,label:f.name.replace(/\.[^.]+$/,"").replace(/[-_]+/g," ")});
      mark(); next(i+1);
    }).catch(function(e){ if(!lostAuth(e)) setMsg(errText(e),true); renderMedia(); });
  })(0);
}
function doPhoto(i,input){
  var f=(input.files||[])[0]; input.value="";
  if(!f)return;
  setMsg("Uploading photo…",false);
  shrink(f).then(upload).then(function(r){ S.team[i].photo=r.id; mark(); renderTeam(); setMsg("Uploaded. Click Save changes to publish.",false); })
  .catch(function(e){ if(!lostAuth(e)) setMsg(errText(e),true); });
}

/* ---------- save ---------- */
function save(){
  var btn=$("#save"); btn.disabled=true; setMsg("Saving…",false);
  api("/api/data",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({v:1,text:S.text,team:S.team,media:S.media})})
  .then(function(){ dirty=false; setMsg("Saved. Everyone who opens the site sees this version.",false); })
  .catch(function(e){ if(!lostAuth(e)) setMsg("Could not save. Your changes are still here. Try again.",true); })
  .then(function(){ btn.disabled=false; });
}

/* ---------- login and edit mode ---------- */
function openLogin(){ $("#login-msg").textContent=""; $("#pw").value=""; $("#login").showModal(); }
function setEditing(on){
  editing=on; document.body.classList.toggle("editing",on);
  $("#edit-toggle").textContent = on ? "Editing" : "Edit site";
  if(on) setMsg(dirty?"Unsaved changes":"Editing. Click any dashed text to change it.",false);
  renderAll();
}
function loggedIn(k){
  key=k; store(k);
  $("#edit-toggle").hidden=false;
  $("#login-open").textContent="Logged in as editor";
}
$("#login-open").addEventListener("click",function(){ if(key) setEditing(true); else openLogin(); });
$("#login-cancel").addEventListener("click",function(){ $("#login").close(); });
$("#login-form").addEventListener("submit",function(ev){
  ev.preventDefault();
  var pw=$("#pw").value, go=$("#login-go");
  go.disabled=true; $("#login-msg").textContent="";
  fetch("/api/auth",{method:"POST",headers:{"X-Edit-Key":pw}}).then(function(r){
    if(r.ok){ loggedIn(pw); $("#login").close(); setEditing(true); }
    else $("#login-msg").textContent = r.status===401 ? "That password is not right." : "Could not log in. Try again.";
  }).catch(function(){ $("#login-msg").textContent="Could not reach the server. Check your connection."; })
  .then(function(){ go.disabled=false; });
});
$("#logout").addEventListener("click",function(){
  if(dirty&&!confirm("You have unsaved changes. Log out anyway?"))return;
  key=null; store(null); dirty=false;
  $("#edit-toggle").hidden=true; $("#login-open").textContent="Editor login";
  setEditing(false); load();
});
$("#edit-toggle").addEventListener("click",function(){ setEditing(!editing); });
$("#done").addEventListener("click",function(){ setEditing(false); });
$("#save").addEventListener("click",save);
window.addEventListener("beforeunload",function(e){ if(dirty&&editing){ e.preventDefault(); e.returnValue=""; } });

function merge(d){
  if(!d||typeof d!=="object")return;
  if(d.text&&typeof d.text==="object") Object.keys(d.text).forEach(function(k){ if(typeof d.text[k]==="string") S.text[k]=d.text[k]; });
  if(Array.isArray(d.team)&&d.team.length) S.team=d.team.map(function(m){return {name:String(m.name||""),role:String(m.role||""),bio:String(m.bio||""),photo:(typeof m.photo==="string"&&/^[0-9a-f]{32}$/.test(m.photo))?m.photo:null};});
  if(d.media&&typeof d.media==="object") Object.keys(d.media).forEach(function(k){ if(Array.isArray(d.media[k])) S.media[k]=d.media[k].filter(function(it){return it&&(it.k==="link"||/^[0-9a-f]{32}$/.test(it.id||""));}); });
}
function load(){
  S=JSON.parse(JSON.stringify(DEF));
  return fetch("/api/data",{cache:"no-store"}).then(function(r){return r.ok?r.json():null;}).then(function(d){ merge(d); renderAll(); }).catch(function(){});
}

renderAll();
load();
var saved=stored();
if(saved){
  fetch("/api/auth",{method:"POST",headers:{"X-Edit-Key":saved}}).then(function(r){ if(r.ok) loggedIn(saved); else store(null); }).catch(function(){});
}
})();
