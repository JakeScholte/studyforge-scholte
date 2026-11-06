/* StudyForge Scholte — twee actieve leermethoden, zonder database.
   Inhoud komt uit de gepubliceerde oefenbibliotheek, niet uit externe AI.
   Voortgang staat uitsluitend in deze browser. */
'use strict';
(function(){
 const KEY='studyforge-scholte-learning-v1';
 const kinds={
   guided:{title:'Leer in stappen',label:'Methode 03',verb:'Stap voor stap',desc:'Eerst begrijpen, dan een kleine opdracht. Bij iedere stap krijg je meteen uitleg.',icon:'book'},
   recall:{title:'Leg het uit',label:'Methode 04',verb:'Actief onthouden',desc:'Geef zelf antwoord zonder keuzes. Vergelijk daarna met het modelantwoord en herhaal wat lastig is.',icon:'spark'}
 };
 let session=null;
 const esc=String;
 const store=()=>{
   try{const v=JSON.parse(localStorage.getItem(KEY)||'{}');return v&&typeof v==='object'&&!Array.isArray(v)?v:{};}catch{return {};}
 };
 function stats(kind,pack){
   const record=store()[kind+':'+String(pack.source_key||pack.id)];
   return record&&typeof record==='object'?record:null;
 }
 function save(){
   if(!session||session.recorded)return;
   const data=store(),id=session.kind+':'+String(session.pack.source_key||session.pack.id);
   const previous=data[id]||{};
   data[id]={sessions:(previous.sessions||0)+1,correct:session.firstPassCorrect,
     total:session.originalTotal,last:new Date().toISOString()};
   try{localStorage.setItem(KEY,JSON.stringify(data));}catch(e){console.warn('Voortgang van leermethode niet opgeslagen',e);}
   session.recorded=true;
 }
 function catalog(kind){
   const k=kinds[kind];if(!k)return '';
   const packs=collections().filter(c=>c.type==='quiz');
   return `<div class="page-enter sf-method-page">
      <button class="back-link" data-action="nav" data-route="dashboard">← Terug naar start</button>
      <header class="sf-page-intro"><span class="sf-eyebrow">${k.label} · VMBO-T 4</span>
        <h1>${k.title}</h1><p>${k.desc}</p></header>
      <div class="sf-mini-guide"><span class="sf-mini-mark">${ic(k.icon,23)}</span>
       <div><b>${kind==='guided'?'Zo leer je echt de stof':'Zo train je je geheugen'}</b>
       <p>${kind==='guided'?'Lees een korte uitleg → maak de oefening → bekijk de feedback.':'Probeer te antwoorden zonder hulp → vergelijk met het model → herhaal moeilijke vragen.'}</p></div></div>
      <h2 class="sf-section-label">Kies een onderwerp</h2>
      ${packs.length?`<div class="sf-subject-grid">${packs.map(p=>{
          const st=stats(kind,p);
          return `<button class="sf-subject-card" data-action="learn-start" data-kind="${kind}" data-id="${Number(p.id)}">
            <span class="sf-subject-top"><span class="sf-subject-icon">${ic(k.icon,24)}</span><span class="sf-subject-tag">${htmlEscape(p.subject)}</span></span>
            <strong>${htmlEscape(p.title)}</strong>
            <span class="sf-subject-description">${htmlEscape(p.description||'Oefen dit onderwerp op jouw tempo.')}</span>
            <span class="sf-subject-meta">${Number(p.count)} vragen ${st?'· Laatste keer '+st.correct+'/'+st.total+' goed':''} <b>Start →</b></span>
          </button>`;}).join('')}</div>`:
          '<div class="sf-empty"><b>Nog geen leerstof</b><p>Zodra een oefenpakket is toegevoegd, kun je hier meteen beginnen.</p></div>'}
    </div>`;
 }
 function originalQuestion(){return session?.pack?.content?.questions?.[session.queue[session.index]];}
 function model(q){
   if(!q)return 'Geen modelantwoord beschikbaar.';
   if(q.type==='mc')return String(q.options?.[q.correct]||'Geen antwoord');
   return String(q.answer||'Geen modelantwoord');
 }
 function explanation(q){return q?.explanation||q?.hint||'Bekijk wat het juiste antwoord betekent en probeer het straks opnieuw.';}
 function title(){
   const s=session,k=kinds[s.kind];
   return `<div class="sf-learning-top"><button class="back-link" data-action="learn-exit">← Onderwerpen</button>
       <span class="sf-eyebrow">${k.label.toUpperCase()}</span></div>
       <header class="sf-learning-heading"><div><span class="sf-subject-tag">${htmlEscape(s.pack.subject)}</span>
         <h1>${htmlEscape(s.pack.title)}</h1></div>
         <span class="sf-step-count">${Math.min(s.index+1,s.queue.length)} / ${s.queue.length}</span></header>
       <div class="sf-progress-track"><span style="width:${Math.round(100*s.index/Math.max(1,s.queue.length))}%"></span></div>`;
 }
 function completed(){
   save();
   const s=session;
   return `<div class="sf-learning-complete"><span class="sf-complete-icon">✦</span>
     <span class="sf-eyebrow">${kinds[s.kind].label.toUpperCase()} · AFGEROND</span>
     <h1>Goed bezig, Jake!</h1><p>Je hebt actief gewerkt aan ${htmlEscape(s.pack.title)}. Herhaling maakt het verschil.</p>
     <div class="sf-complete-score"><strong>${s.firstPassCorrect} / ${s.originalTotal}</strong>
       <span>direct goed of zelf gekend</span></div>
     <div class="sf-complete-actions"><button class="btn btn-primary" data-action="learn-restart">Nog een ronde ↗</button>
       <button class="btn btn-outline" data-action="learn-exit">Ander onderwerp</button>
       <button class="btn btn-outline" data-action="nav" data-route="dashboard">Naar start</button></div></div>`;
 }
 function renderMethod(){
   if(!session)return '<div class="sf-empty">Kies eerst een onderwerp.</div>';
   if(session.stage==='complete')return completed();
   const q=originalQuestion(),s=session;
   if(!q)return '<div class="sf-empty">Deze oefening is niet beschikbaar.</div>';
   let body='';
   if(s.kind==='guided'){
     if(s.phase==='explain'){
       body=`<div class="sf-step-kicker"><span>01</span> EERST BEGRIJPEN</div>
         <h2>${htmlEscape(q.lessonTitle||'Korte uitleg')}</h2>
         <div class="sf-teach-panel"><span class="sf-teach-label">DIT MOET JE WETEN</span>
           <p>${htmlEscape(q.learn||q.hint||'Lees de vraag aandachtig. Bedenk wat het onderwerp inhoudt. Je krijgt hierna direct feedback op je antwoord.')}</p>
           ${q.example?`<div class="sf-teach-example"><b>Voorbeeld</b><p>${htmlEscape(q.example)}</p></div>`:''}</div>
         <button class="btn btn-primary sf-wide-btn" data-action="learn-practice">Ik snap het, oefenen →</button>`;
     }else if(s.phase==='practice'){
       body=`<div class="sf-step-kicker"><span>02</span> NU ZELF PROBEREN</div>
         <h2>${htmlEscape(q.question)}</h2>${q.type==='mc'?`<div class="sf-choice-list">${q.options.map((opt,i)=>`<button class="sf-choice" data-action="learn-answer" data-value="${i}"><span>${String.fromCharCode(65+i)}</span>${htmlEscape(opt)}</button>`).join('')}</div>`:
         `<label class="sf-answer-label" for="sf-learning-text">Schrijf je antwoord in je eigen woorden</label>
          <textarea id="sf-learning-text" class="sf-answer-field" rows="4" placeholder="Wat denk je?">${htmlEscape(s.typed||'')}</textarea>
          <button class="btn btn-primary" data-action="learn-reveal">Bekijk voorbeeldantwoord →</button>`}`;
     }else{
       const correct=s.result===true,answer=model(q);
       body=`<div class="sf-step-kicker"><span>03</span> WAT HEB JE GELEERD?</div>
         <h2>${correct?'Dat heb je goed!':'Kijk, zo zit het.'}</h2>
         <div class="sf-feedback ${correct?'good':'retry'}"><b>Juiste antwoord</b><p>${htmlEscape(answer)}</p>
           <b>Waarom?</b><p>${htmlEscape(explanation(q))}</p></div>
         ${q.type==='open'&&s.result===null?`<div class="sf-rate-row"><button class="btn btn-outline" data-action="learn-rate" data-known="0">Nog niet helemaal</button><button class="btn btn-primary" data-action="learn-rate" data-known="1">Dit wist ik!</button></div>`:
         `<button class="btn btn-primary sf-wide-btn" data-action="learn-next">Volgende stap →</button>`}`;
     }
   }else if(s.phase==='answer'){
     body=`<div class="sf-step-kicker"><span>✦</span> HAAL HET UIT JE GEHEUGEN</div>
       <h2>${htmlEscape(q.question)}</h2>
       <p class="sf-learning-note">Zonder antwoordopties. Probeer eerst zelf te formuleren wat je weet.</p>
       <label class="sf-answer-label" for="sf-learning-text">Jouw uitleg</label>
       <textarea id="sf-learning-text" class="sf-answer-field" rows="5" placeholder="Schrijf of vertel in je eigen woorden...">${htmlEscape(s.typed||'')}</textarea>
       <button class="btn btn-primary sf-wide-btn" data-action="learn-reveal">Vergelijk met het antwoord →</button>`;
   }else{
     body=`<div class="sf-step-kicker"><span>✓</span> VERGELIJK EN BEOORDEEL</div>
       <h2>Hoe goed had je het?</h2>
       ${s.typed?.trim()?`<div class="sf-your-answer"><b>Jouw antwoord</b><p>${htmlEscape(s.typed)}</p></div>`:''}
       <div class="sf-feedback good"><b>Modelantwoord</b><p>${htmlEscape(model(q))}</p>
         <b>Uitleg</b><p>${htmlEscape(explanation(q))}</p></div>
       <p class="sf-learning-note">Beoordeel jezelf eerlijk. Wat je nog niet weet, oefenen we nog een keer.</p>
       <div class="sf-rate-row"><button class="btn btn-outline" data-action="learn-rate" data-known="0">Nog oefenen</button>
       <button class="btn btn-primary" data-action="learn-rate" data-known="1">Ik wist het</button></div>`;
   }
   return `<div class="sf-learning-screen">${title()}
      <section class="sf-learning-card">${body}</section>
      <p class="sf-learning-foot">Kleine stappen, regelmatig oefenen en jezelf terugvragen helpen om de stof te onthouden.</p>
    </div>`;
 }
 async function start(kind,id){
   if(!kinds[kind])return;
   const summary=collections().find(p=>p.type==='quiz'&&Number(p.id)===Number(id));
   if(!summary){toast('Dit onderwerp is niet gevonden.',true);return;}
   const result=await api('collection',null,{profile:state.profile,id:summary.id});
   const pack=result?.collection,questions=pack?.content?.questions;
   if(!Array.isArray(questions)||!questions.length){toast('Dit onderwerp bevat nog geen vragen.',true);return;}
   // Beperk de leerroute tot 12 stappen per sessie; alle originele vragen blijven beschikbaar.
   const selected=[...questions.keys()].slice(0,12);
   session={kind,pack,queue:selected,index:0,originalTotal:selected.length,
     firstPassCorrect:0,seen:new Set(),retried:new Set(),phase:kind==='guided'?'explain':'answer',
     stage:'run',result:null,typed:'',recorded:false};
   state.route='learning-run';render();window.scrollTo({top:0,behavior:'instant'});
 }
 function setResult(known){
   const s=session;if(!s||s.stage!=='run')return;
   const number=s.queue[s.index];
   if(!s.seen.has(number)){
     s.seen.add(number);if(known)s.firstPassCorrect++;
     window.sfReview?.record({pack:s.pack,index:number,item:originalQuestion(),quality:known?2:0,mode:s.kind==='guided'?'leer-in-stappen':'leg-het-uit'});
   }
   if(s.kind==='recall'&&!known&&!s.retried.has(number)){
     s.retried.add(number);s.queue.push(number);
   }
 }
 function next(){
   const s=session;if(!s)return;
   s.index++;s.typed='';s.result=null;
   if(s.index>=s.queue.length){s.stage='complete';save();}
   else s.phase=s.kind==='guided'?'explain':'answer';
   render();window.scrollTo({top:0,behavior:'instant'});
 }
 async function handle(action,btn){
   if(action==='learn-start')return start(btn.dataset.kind,btn.dataset.id);
   if(action==='learn-exit'){
     const kind=session?.kind||'guided';session=null;return navigate(kind==='guided'?'learning-guided':'learning-recall');
   }
   if(action==='learn-restart')return start(session.kind,session.pack.id);
   if(!session)return;
   if(action==='learn-practice'&&session.kind==='guided'&&session.phase==='explain'){session.phase='practice';return render();}
   if(action==='learn-answer'&&session.kind==='guided'&&session.phase==='practice'){
     const q=originalQuestion(),n=Number(btn.dataset.value);
     if(q.type!=='mc'||!Number.isInteger(n)||n<0||n>=q.options.length)return;
     session.result=n===q.correct;session.phase='feedback';setResult(session.result);return render();
   }
   if(action==='learn-reveal'&&['answer','practice'].includes(session.phase)){
     session.typed=document.getElementById('sf-learning-text')?.value||'';
     if(session.kind==='guided'){session.phase='feedback';session.result=null;}
     else session.phase='review';
     return render();
   }
   if(action==='learn-rate'&&((session.kind==='guided'&&session.phase==='feedback')||(session.kind==='recall'&&session.phase==='review'))){
     setResult(btn.dataset.known==='1');return next();
   }
   if(action==='learn-next'&&session.kind==='guided'&&session.phase==='feedback')return next();
 }
 document.addEventListener('input',e=>{if(e.target?.id==='sf-learning-text'&&session)session.typed=e.target.value;});
 window.sfLearning={catalog,render:renderMethod,start,handle,stats,progress:store};
})();
