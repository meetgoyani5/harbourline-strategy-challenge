import { modules, byModule } from './data/activities.js';

const STORAGE = 'harbourline-strategy-challenge-v1';
const root = document.getElementById('app');
const toastEl = document.getElementById('toast');
const roundCount = modules.reduce((n, mod) => n + byModule[mod.id].length, 0);
const totalInteractions = byModule.quiz.length + byModule.drag.reduce((n,r)=>n+r.terms.length,0) + byModule.pairs.reduce((n,r)=>n+r.left.length,0) + byModule.truefalse.length + byModule.decision.length + byModule.rank.length;
const defaults = () => ({
  screen: 'home', module: 'quiz', indexes: Object.fromEntries(modules.map(m=>[m.id,0])),
  answers: Object.fromEntries(modules.map(m=>[m.id,{}])),
  facilitatorOpen: false, projector:false, timer: { duration:60, remaining:60, running:false },
  competition:false, teamCount:3,
  teams:[{name:'Team Atlas',score:0},{name:'Team Compass',score:0},{name:'Team Horizon',score:0},{name:'Team North',score:0}],
});
function load() {
  const base = defaults();
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE) || 'null');
    if (!saved || typeof saved !== 'object') return base;
    if (!modules.some(m=>m.id===saved.module)) saved.module='quiz';
    return { ...base, ...saved,
      indexes:{...base.indexes,...saved.indexes},
      answers:{...base.answers,...saved.answers},
      timer:{...base.timer,...saved.timer,running:false},
      teams:Array.isArray(saved.teams) && saved.teams.length===4 ? saved.teams : base.teams,
      facilitatorOpen:false,
    };
  } catch { return base; }
}
let state = load();
let currentToastTimeout;
const escapeHTML = (x) => String(x ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const esc = escapeHTML;
const itemFor = (m=state.module) => byModule[m][state.indexes[m] || 0] || byModule[m][0];
const answerFor = (m=state.module, id=itemFor(m).id) => state.answers[m]?.[id] || {};
function updateAnswer(m, id, patch) { state.answers[m][id] = {...answerFor(m,id),...patch}; render(); }
const isDone = (a) => !!a.checked;
const moduleDone = m => byModule[m].filter(q=>isDone(state.answers[m]?.[q.id]||{})).length;
const doneTotal = () => modules.reduce((n,m)=>n+moduleDone(m.id),0);
const roundScore = () => {
  let score=0;
  for(const q of byModule.quiz){const a=answerFor('quiz',q.id);if(a.method==='check'&&a.choice===q.answer)score += q.difficulty==='Hard'?200:q.difficulty==='Medium'?150:100;}
  for(const q of byModule.truefalse){const a=answerFor('truefalse',q.id);if(a.method==='check'&&a.choice===q.answer)score += 100;}
  for(const q of byModule.drag){const a=answerFor('drag',q.id);if(a.method==='check')score += q.targets.filter(t=>a.placed?.[t.id]===t.id).length*40;}
  for(const q of byModule.pairs){const a=answerFor('pairs',q.id);if(a.method==='check')score += q.left.filter(t=>a.placed?.[t.id]===t.id).length*40;}
  for(const q of byModule.decision){const a=answerFor('decision',q.id);if(a.method==='check')score+=50;}
  for(const q of byModule.rank){const a=answerFor('rank',q.id);if(a.method==='check')score+=50;}
  return score;
};
function save() { try{localStorage.setItem(STORAGE,JSON.stringify(state));}catch{} }
function showToast(msg) {
  toastEl.textContent=msg;
  toastEl.classList.add('show');
  clearTimeout(currentToastTimeout);
  currentToastTimeout=setTimeout(()=>toastEl.classList.remove('show'),2800);
}
function displayTime(t){return `${String(Math.floor(Math.max(0,t)/60)).padStart(2,'0')}:${String(Math.max(0,t)%60).padStart(2,'0')}`;}
function resetTimer(){state.timer.remaining=state.timer.duration;state.timer.running=false;}
function navigateModule(m){ if(!byModule[m]) return; state.screen='activity';state.module=m;state.facilitatorOpen=false;resetTimer();render();scrollToTop(); }
function navigateIndex(index){const max=byModule[state.module].length-1;if(index<0)return;if(index>max){const i=modules.findIndex(m=>m.id===state.module);if(i<modules.length-1)navigateModule(modules[i+1].id);else navigateHome();return;}state.indexes[state.module]=index;resetTimer();render();scrollToTop();}
function navigateHome(){state.screen='home';state.facilitatorOpen=false;state.timer.running=false;render();scrollToTop();}
function scrollToTop(){window.scrollTo({top:0,behavior:'smooth'});}
function icon(name) {
 const paths={
  spark:'<path d="m12 3 1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9L12 3Z"/><path d="m19 18 .8 2.2L22 21l-2.2.8L19 24l-.8-2.2L16 21l2.2-.8L19 18Z"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>', left:'<path d="M19 12H5m6-6-6 6 6 6"/>',
  home:'<path d="m3 10 9-7 9 7v11H3V10Z"/><path d="M9 21v-7h6v7"/>',
  settings:'<path d="M12 2v4m0 12v4M4.9 4.9l2.8 2.8m8.6 8.6 2.8 2.8M2 12h4m12 0h4M4.9 19.1l2.8-2.8m8.6-8.6 2.8-2.8"/><circle cx="12" cy="12" r="5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check:'<path d="m5 12 4 4L19 6"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',
  fullscreen:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
  reset:'<path d="M3 12a9 9 0 1 0 2.5-6.2L3 8"/><path d="M3 3v5h5"/>',
  pause:'<path d="M8 5v14m8-14v14"/>',play:'<path d="m8 5 11 7-11 7V5Z"/>',
  up:'<path d="m6 15 6-6 6 6"/>',down:'<path d="m6 9 6 6 6-6"/>',
  eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  medal:'<circle cx="12" cy="9" r="5"/><path d="M8 14 6 22l6-3 6 3-2-8"/>',
  shield:'<path d="m12 2 8 4v6c0 5-3 8-8 10-5-2-8-5-8-10V6l8-4Z"/><path d="m9 12 2 2 4-4"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M17 5a3 3 0 0 1 0 6m0 4a5 5 0 0 1 4 5"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  drag:'<circle cx="7" cy="6" r="1"/><circle cx="17" cy="6" r="1"/><circle cx="7" cy="12" r="1"/><circle cx="17" cy="12" r="1"/><circle cx="7" cy="18" r="1"/><circle cx="17" cy="18" r="1"/>'
 };
 return `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.spark}</svg>`;
}
function button(label,action,cls='btn btn-secondary',extras='') {return `<button type="button" class="${cls}" data-action="${action}" ${extras}>${label}</button>`;}
function feedbackBox(kicker,heading,explanation,discussion,source,variant='success') {
 return `<section class="feedback ${variant}" aria-live="polite">
  <div class="feedback-kicker">${icon(variant==='success'?'check':'spark')} ${esc(kicker)}</div>
  <h3>${esc(heading)}</h3><p>${esc(explanation)}</p>
  <div class="discussion"><span class="discussion-mark">DISCUSS AS A CLASS</span><p>${esc(discussion)}</p></div>
  <p class="source-note">${icon('shield')} <strong>Evidence:</strong> ${esc(source)} · <span>Fictional teaching case / course concepts</span></p>
 </section>`;
}
function stageHeader(title, subtitle, kicker, q, total){
 return `<div class="stage-heading"><div class="stage-subline"><span class="eyebrow">${esc(kicker)}</span><span class="step-count">ROUND ${String(q).padStart(2,'0')} / ${String(total).padStart(2,'0')}</span></div>
 <h1>${esc(title)}</h1><p>${esc(subtitle)}</p></div>`;
}
function primaryControls(label='Check Answer',allow=true){return `<div class="action-strip">${button(icon('check')+` ${esc(label)}`,'check','btn btn-primary',!allow?'disabled':'')}
 ${button(icon('eye')+' Reveal / show solution','reveal','btn btn-outline')}
 ${button(icon('reset')+' Reset round','reset-current','btn btn-quiet')}</div>`;}
function answerClass(selected, correct, done){if(!done)return selected?'selected':'';if(correct)return 'correct';if(selected)return 'incorrect';return '';}
function renderQuiz(q){const a=answerFor();const done=!!a.checked;
return `${stageHeader('What does the case actually tell us?','Pick the strongest answer. Evidence first, interpretation second.',`${q.kind.toUpperCase()} · ${q.difficulty}`,state.indexes.quiz+1,byModule.quiz.length)}
<div class="question-panel"><div class="question-index">QUESTION ${String(state.indexes.quiz+1).padStart(2,'0')}</div><h2>${esc(q.question)}</h2>
<div class="options-grid">${q.options.map((opt,i)=>`<button type="button" data-action="quiz-choice" data-value="${i}" data-focus="quiz-${i}" class="option ${answerClass(a.choice===i,i===q.answer,done)}" aria-pressed="${a.choice===i}" ${done?'disabled':''}><span class="option-letter">${'ABCD'[i]}</span><span class="option-copy">${esc(opt)}</span><span class="option-status">${done?(i===q.answer?icon('check'):a.choice===i?icon('x'):''):a.choice===i?'●':''}</span></button>`).join('')}</div>
${done? feedbackBox(a.method==='reveal'?'Facilitator reveal':a.choice===q.answer?'Correct answer':'Review the evidence',`Answer ${'ABCD'[q.answer]} · ${q.options[q.answer]}`,q.explanation,q.discussion,q.source,a.choice===q.answer?'success':'neutral') : primaryControls('Check Answer',a.choice!==undefined)}
</div>`;}
function renderTrueFalse(q){const a=answerFor();const done=!!a.checked;
return `${stageHeader('Truth or assumption?','Decide whether the statement is supported by the case.',`${q.kind.toUpperCase()} · ${q.difficulty}`,state.indexes.truefalse+1,byModule.truefalse.length)}
<div class="question-panel"><div class="question-index">STATEMENT ${String(state.indexes.truefalse+1).padStart(2,'0')}</div><h2>${esc(q.statement)}</h2>
<div class="binary-row">${[true,false].map(v=>`<button type="button" class="binary-choice ${answerClass(a.choice===v,v===q.answer,done)}" data-action="tf-choice" data-value="${v}" data-focus="tf-${v}" aria-pressed="${a.choice===v}" ${done?'disabled':''}><span class="binary-icon">${v?'T':'F'}</span><span>${v?'TRUE':'FALSE'}</span>${done&&v===q.answer?icon('check'):''}</button>`).join('')}</div>
${done?feedbackBox(a.method==='reveal'?'Facilitator reveal':a.choice===q.answer?'Correct':'Not quite',q.answer?'TRUE':'FALSE',q.explanation,q.discussion,q.source,a.choice===q.answer?'success':'neutral'):primaryControls('Check Answer',a.choice!==undefined)}</div>`;
}
function renderDrag(q){const a=answerFor();const placed=a.placed||{};const done=!!a.checked;const selected=a.selected;
const matchedTerms=new Set(Object.values(placed));
return `${stageHeader(q.title,q.instruction,`${q.kind.toUpperCase()} · CHAPTER 2`,state.indexes.drag+1,byModule.drag.length)}
<div class="challenge-panel"><div class="activity-help">${icon('drag')} <span>Drag a concept to a definition, <strong>or tap a concept and then its destination</strong>. Keyboard users can select both using Enter or Space.</span></div>
<div class="drag-board"><div class="drag-col"><div class="column-title"><span>CONCEPT CARDS</span><small>${q.terms.length} concepts</small></div>
${q.terms.map(t=>`<button type="button" data-term="${esc(t.id)}" data-action="pick-term" data-value="${esc(t.id)}" data-focus="term-${esc(t.id)}" class="drag-token ${selected===t.id?'active':''} ${matchedTerms.has(t.id)?'assigned':''}" aria-pressed="${selected===t.id}" ${done?'disabled':''}>${icon('drag')}<span>${esc(t.label)}</span>${matchedTerms.has(t.id)?`<span class="token-check">${icon('check')}</span>`:''}</button>`).join('')}
</div><div class="drag-col"><div class="column-title"><span>DROP ZONES</span><small>Match the meaning</small></div>
${q.targets.map((target,i)=>{const term= q.terms.find(t=>t.id===placed[target.id]);const correct=placed[target.id]===target.id;return `<button type="button" data-drop-target="${esc(target.id)}" data-action="drop-target" data-value="${esc(target.id)}" data-focus="target-${esc(target.id)}" class="drop-target ${done?(correct?'correct':placed[target.id]?'incorrect':'unanswered'):''} ${selected&&!done?'ready':''}" ${done?'disabled':''}><span class="drop-number">${String(i+1).padStart(2,'0')}</span><span class="target-main">${esc(target.label)}<strong class="assigned-tag">${term?esc(term.label):'Drop or tap a card here'}</strong></span>${done?(correct?icon('check'):icon('x')):''}</button>`}).join('')}
</div></div>
${done?`<div class="result-inline"><strong>${q.targets.filter(t=>placed[t.id]===t.id).length} / ${q.targets.length} correct</strong><span>${a.method==='reveal'?'Shown by facilitator':'Evidence-linked feedback'}</span></div>
${feedbackBox('Answer review','Why these matches matter',q.explanation,q.discussion,q.source)}
<div class="action-strip">${button(icon('reset')+' Retry incorrect matches','retry-wrong','btn btn-secondary')}${button(icon('eye')+' Show correct matches','reveal','btn btn-outline')}${button(icon('reset')+' Reset round','reset-current','btn btn-quiet')}</div>
${a.showSolution?`<div class="solution-list">${q.targets.map(t=>`<div><strong>${esc(q.terms.find(x=>x.id===t.id)?.label)}</strong><span>${esc(t.label)}</span></div>`).join('')}</div>`:''}`:
`<div class="action-strip">${button(icon('check')+' Check Matches','check','btn btn-primary',Object.keys(placed).length?'':'disabled')}${button(icon('eye')+' Show Correct Answers','reveal','btn btn-outline')}${button(icon('reset')+' Reset round','reset-current','btn btn-quiet')}</div>`}</div>`;
}
function matchingTag(index){return `<span class="match-tag">${index+1}</span>`;}
function renderPairs(q){const a=answerFor();const placed=a.placed||{};const done=!!a.checked;const chosen=a.selected;
return `${stageHeader(q.title,'Choose a left-side card, then the matching right-side card. You can change the links before checking.',`${q.kind.toUpperCase()} · CHAPTER 2`,state.indexes.pairs+1,byModule.pairs.length)}
<div class="challenge-panel"><div class="activity-help">${icon('spark')} <span><strong>Connect the evidence.</strong> Select a left item, then a right item. Matching numbers and lines show your current connections.</span></div>
<div class="match-board" id="match-board"><svg class="pair-lines" aria-hidden="true"></svg>
<div class="match-col"><div class="column-title">LEFT · CASE SIGNALS</div>${q.left.map((v,i)=>`<button class="match-card ${chosen===v.id?'active':''} ${placed[v.id]?'connected':''} ${done?(placed[v.id]===v.id?'correct':'incorrect'):''}" type="button" data-action="select-left" data-value="${esc(v.id)}" data-focus="left-${v.id}" aria-pressed="${chosen===v.id}" ${done?'disabled':''} data-left="${esc(v.id)}">${placed[v.id]?matchingTag(i):`<span class="match-empty">${String(i+1).padStart(2,'0')}</span>`}<span>${esc(v.label)}</span></button>`).join('')}</div>
<div class="match-col"><div class="column-title">RIGHT · STRATEGIC MEANING</div>${q.right.map(v=>{const matchingLeft=Object.keys(placed).find(left=>placed[left]===v.id);const num=q.left.findIndex(x=>x.id===matchingLeft);return `<button type="button" data-action="select-right" data-value="${esc(v.id)}" data-focus="right-${v.id}" data-right="${esc(v.id)}" class="match-card ${matchingLeft?'connected':''} ${done&&matchingLeft?(matchingLeft===v.id?'correct':'incorrect'):''} ${chosen&&!done?'available':''}" ${done?'disabled':''}>${num>=0?matchingTag(num):'<span class="match-empty">↔</span>'}<span>${esc(v.label)}</span></button>`}).join('')}</div></div>
${done?`<div class="result-inline"><strong>${q.left.filter(t=>placed[t.id]===t.id).length} / ${q.left.length} aligned</strong><span>Case evidence → interpretation</span></div>${feedbackBox('Connections reviewed','How the evidence supports the reasoning',q.explanation,q.discussion,q.source)}
<div class="action-strip">${button(icon('reset')+' Retry incorrect','retry-wrong','btn btn-secondary')}${button(icon('eye')+' Show correct pairs','reveal','btn btn-outline')}${button(icon('reset')+' Reset round','reset-current','btn btn-quiet')}</div>
${a.showSolution?`<div class="solution-list">${q.left.map(t=>`<div><strong>${esc(t.label)}</strong><span>${esc(q.right.find(v=>v.id===t.id)?.label)}</span></div>`).join('')}</div>`:''}`:
`<div class="action-strip">${button(icon('check')+' Check Answers','check','btn btn-primary',Object.keys(placed).length?'':'disabled')}${button(icon('eye')+' Show Correct Answers','reveal','btn btn-outline')}${button(icon('reset')+' Reset round','reset-current','btn btn-quiet')}</div>`}</div>`;
}
function renderDecision(q){const a=answerFor();const done=!!a.checked;
return `${stageHeader(q.title,'A board-level decision with evidence, trade-offs and no guaranteed outcome.',`${q.tag.toUpperCase()} · JUDGMENT`,state.indexes.decision+1,byModule.decision.length)}
<div class="challenge-panel"><div class="scene"><span class="scene-label">THE SITUATION</span><p>${esc(q.scene)}</p></div><h2 class="decision-question">${esc(q.question)}</h2>
<div class="decision-options">${q.options.map((v,i)=>`<button type="button" class="decision-option ${a.choice===v.id?'selected':''} ${done&&v.id===q.preferred?'preferred':''}" data-action="decision-choice" data-value="${v.id}" data-focus="decision-${v.id}" aria-pressed="${a.choice===v.id}" ${done?'disabled':''}><span class="option-letter">${'ABCD'[i]}</span><span>${esc(v.label)}</span>${done&&v.id===q.preferred?icon('check'):''}</button>`).join('')}</div>
${done?`<div class="consequences"><div class="section-kicker">BOARDROOM CONSEQUENCES · ALL OPTIONS</div>${q.options.map(v=>`<div class="consequence ${v.id===q.preferred?'recommended':''} ${a.choice===v.id?'chosen':''}"><div class="consequence-top"><strong>${esc('ABCD'[q.options.indexOf(v)])}. ${esc(v.label)}</strong><span>${esc(v.labelType)}</span></div><p>${esc(v.consequence)}</p></div>`).join('')}</div>
${feedbackBox('A defensible recommendation',`Suggested path: ${'ABCD'[q.options.findIndex(v=>v.id===q.preferred)]}`,q.reasoning,q.discussion,q.source,'neutral')}
<div class="action-strip">${button(icon('reset')+' Try a different decision','retry-round','btn btn-secondary')}${button(icon('reset')+' Reset round','reset-current','btn btn-quiet')}</div>`:
`<p class="guidance-note">Not every plausible option is “wrong.” Compare feasibility, trust, customer value and uncertain outcomes.</p>${primaryControls('Reveal Consequences',!!a.choice)}`}</div>`;
}
function renderRank(q){const a=answerFor();const order=a.order||q.initial;const done=!!a.checked;const lookup=Object.fromEntries(q.items.map(v=>[v.id,v]));
return `${stageHeader(q.title,q.prompt,`${q.kind.toUpperCase()} · CHAPTER 2`,state.indexes.rank+1,byModule.rank.length)}
<div class="challenge-panel"><div class="activity-help">${icon('drag')} <span><strong>Rank 1 → 5.</strong> Drag a handle to move an action, or use its arrow buttons for touch and keyboard access. This is a <strong>suggested</strong> ordering, not an objective answer key.</span></div>
<div class="rank-board"><div class="column-title"><span>YOUR PRIORITIES</span><small>Highest priority at the top</small></div>
${order.map((id,i)=>`<div class="rank-row" data-rank-row="${esc(id)}"><div class="rank-number">${i+1}</div><div class="rank-label">${esc(lookup[id]?.label || id)}</div><div class="rank-buttons"><button type="button" data-action="rank-up" data-value="${id}" data-focus="rank-up-${id}" aria-label="Move ${esc(lookup[id]?.label)} up" ${done||i===0?'disabled':''}>${icon('up')}</button><button type="button" data-action="rank-down" data-value="${id}" data-focus="rank-down-${id}" aria-label="Move ${esc(lookup[id]?.label)} down" ${done||i===order.length-1?'disabled':''}>${icon('down')}</button></div><span class="rank-handle" tabindex="${done?'-1':'0'}" role="button" aria-label="Drag ${esc(lookup[id]?.label)} to reorder" data-sort-handle="${id}">${icon('drag')}</span></div>`).join('')}
</div>
${done?`<div class="ranking-result"><div><div class="column-title">YOUR ORDER</div>${order.map((id,i)=>`<p><strong>${i+1}.</strong> ${esc(lookup[id]?.label)}</p>`).join('')}</div><div><div class="column-title">ONE SUGGESTED ORDER</div>${q.suggested.map((id,i)=>`<p><strong>${i+1}.</strong> ${esc(lookup[id]?.label)}</p>`).join('')}</div></div>${feedbackBox('Discuss the trade-offs','More than one order can be defended',q.rationale,q.discussion,q.source,'neutral')}
<div class="action-strip">${button(icon('reset')+' Reorder again','retry-round','btn btn-secondary')}${button(icon('reset')+' Reset round','reset-current','btn btn-quiet')}</div>`:
`<p class="guidance-note">There is no automatic “wrong” ranking. Present your reasoning, then compare with an illustrative sequence.</p><div class="action-strip">${button(icon('check')+' Submit Ranking','check','btn btn-primary')}${button(icon('eye')+' Compare to suggested order','reveal','btn btn-outline')}${button(icon('reset')+' Reset order','reset-current','btn btn-quiet')}</div>`}</div>`;
}
function renderActivity(){const mod=modules.find(x=>x.id===state.module);const index=state.indexes[state.module];const total=byModule[state.module].length;const q=itemFor();const done=moduleDone(state.module);
const renderers={quiz:renderQuiz,drag:renderDrag,pairs:renderPairs,truefalse:renderTrueFalse,decision:renderDecision,rank:renderRank};
return `<div class="activity-layout"><aside class="lesson-sidebar"><div class="sidebar-label">THE STRATEGY JOURNEY</div>${modules.map(m=>`<button type="button" data-action="open-module" data-value="${m.id}" class="sidebar-item ${m.id===state.module?'current':''}"><span class="sidebar-num">${m.number}</span><span class="sidebar-item-name">${esc(m.name)}<small>${esc(m.skill)}</small></span>${moduleDone(m.id)===byModule[m.id].length?icon('check'):''}</button>`).join('')}
<div class="sidebar-note"><span class="live-dot"></span> <strong>Facilitation note</strong><p>Students should defend claims with case evidence, not just vote for an answer.</p></div></aside>
<div class="lesson-content"><div class="lesson-top"><div><span class="overline">${mod.type} <span class="overline-separator">/</span> ${mod.number} OF 06</span><div class="crumb">${icon('home')} <button data-action="home">Home</button><span>›</span><strong>${esc(mod.name)}</strong></div></div><div class="lesson-top-right"><span class="time-chip">${icon('clock')} <span class="timer-display">${state.timer.duration?displayTime(state.timer.remaining):'OFF'}</span></span>${button('Timer controls','open-facilitator','btn btn-small btn-outline')}</div></div>
<div class="round-progress"><div class="round-progress-top"><span>Round progress</span><span>${done} / ${total} completed</span></div><div class="progress-rail"><span style="width:${Math.round(done/total*100)}%"></span></div></div>
<section class="stage-card" key="${state.module}-${index}">${renderers[state.module](q)}</section>
<div class="lesson-footer">${button(icon('left')+' Previous','previous','btn btn-secondary',index===0?'disabled':'')}
<div class="dot-row" aria-label="Rounds">${byModule[state.module].map((r,i)=>`<button type="button" data-action="go-index" data-value="${i}" class="round-dot ${i===index?'on':''} ${isDone(answerFor(state.module,r.id))?'completed':''}" aria-label="Go to round ${i+1}" ${i===index?'aria-current="step"':''}></button>`).join('')}</div>
${button((index===total-1?'Next activity':'Next question')+' '+icon('arrow'),'next','btn btn-primary')}</div></div></div>`;
}
function renderHome(){const percent=Math.round(doneTotal()/roundCount*100);
return `<div class="home"><div class="hero"><div class="hero-copy"><div class="hero-badge">${icon('spark')} BADM 470 · BUSINESS POLICY & STRATEGY</div>
<h1>HARBOURLINE<br><span>THE STRATEGY</span><br>CHALLENGE<span class="hero-period">.</span></h1><p class="hero-sub">Can you make the right strategic decisions in the age of AI?</p><p class="hero-body">From the evidence to the boardroom: six interactive challenges built around a fictional Vancouver creative agency navigating the future of client value.</p>
<div class="hero-actions">${button(`${doneTotal()?'Continue challenge':'Start the challenge'} ${icon('arrow')}`,'start','btn btn-primary btn-hero')}${button('Explore activities','scroll-activities','btn btn-outline btn-hero')}</div>
<div class="hero-stats"><div><strong>06</strong><span>GAME STAGES</span></div><div><strong>${String(roundCount).padStart(2,'0')}</strong><span>ROUNDS</span></div><div><strong>${totalInteractions}</strong><span>INTERACTIONS</span></div></div>
</div><div class="hero-art" aria-hidden="true"><div class="orbit orbit-1"></div><div class="orbit orbit-2"></div><div class="orbit orbit-3"></div><div class="hero-center"><span class="case-mark">HC<span>✦</span></span><small>THE BOARDROOM</small><strong>YOUR<br>DECISION<br>MATTERS.</strong></div><div class="float-note note-top">STRATEGIC VALUE <span>↗</span></div><div class="float-note note-bottom">AI × HUMAN JUDGMENT</div><div class="float-dot dot-a"></div><div class="float-dot dot-b"></div></div></div>
<div class="home-summary"><div><span class="section-kicker">YOUR SESSION</span><h2>Ready to think like a strategist?</h2><p>The facilitator controls reveals. Teams make the case for their reasoning.</p></div><div class="session-progress"><div><strong>${percent}%</strong><span>Overall progress</span></div><div class="progress-rail"><span style="width:${percent}%"></span></div></div></div>
<section id="activities" class="activity-section"><div class="section-header"><div><div class="section-kicker">CHOOSE YOUR CHALLENGE</div><h2>Six stages. One strategic decision.</h2><p>Play in order or jump to any activity at any time.</p></div><div class="tiny-label">BASED ON CHAPTER 2 · ABBREVIATED CASE ANALYSIS</div></div><div class="module-grid">
${modules.map(m=>`<button type="button" data-action="open-module" data-value="${m.id}" class="module-card accent-${m.accent}"><div class="module-card-top"><span class="module-number">${m.number} / 06</span><span class="module-symbol">${m.icon}</span></div><div class="module-type">${m.type}</div><h3>${esc(m.name)}</h3><p>${esc(m.description)}</p><div class="module-footer"><span>${moduleDone(m.id)} / ${byModule[m.id].length} rounds done</span><span class="module-go">${icon('arrow')}</span></div></button>`).join('')}
</div></section>
<div class="source-strip"><div>${icon('shield')} <strong>CASE-INTEGRITY FIRST</strong> <span>Facts are labelled; decisions are presented as judgments. The Harbourline case is fictional.</span></div><span>Capilano University · Classroom facilitation</span></div></div>`;
}
function renderTeamRibbon(){if(!state.competition)return '';return `<div class="team-ribbon">${state.teams.slice(0,state.teamCount).map((t,i)=>`<span><b>${esc(t.name)}</b><strong>${Number(t.score)||0} pts</strong></span>`).join('')}</div>`;}
function renderDrawer(){if(!state.facilitatorOpen)return '';
return `<div class="drawer-backdrop" data-action="close-facilitator"></div><aside class="facilitator-drawer" role="dialog" aria-modal="true" aria-label="Facilitator controls"><div class="drawer-head"><div><div class="section-kicker">PRESENTER CONTROLS</div><h2>Facilitator mode</h2><p>Own the pace. Reveal only when ready.</p></div>${button(icon('x'),'close-facilitator','icon-button', 'aria-label="Close facilitator mode"')}</div>
<div class="drawer-scroll"><section class="drawer-section"><h3>Quick navigation</h3><div class="jump-grid">${modules.map(m=>`<button type="button" data-action="open-module" data-value="${m.id}" class="jump-button ${state.module===m.id&&state.screen==='activity'?'active':''}"><strong>${m.number}</strong><span>${esc(m.name)}</span></button>`).join('')}</div>${button(icon('home')+' Back to home','home','btn btn-secondary btn-block')}</section>
<section class="drawer-section"><h3>Current round</h3><p class="drawer-hint">${state.screen==='activity'?esc(itemFor().title||itemFor().question||itemFor().statement||'Current challenge'):'Open an activity to use these controls.'}</p><div class="drawer-two">${button(icon('eye')+' Reveal','reveal','btn btn-primary',state.screen!=='activity'?'disabled':'')}${button(icon('reset')+' Reset','reset-current','btn btn-secondary',state.screen!=='activity'?'disabled':'')}</div>${button(icon('reset')+' Reset this activity','reset-module','btn btn-quiet btn-block',state.screen!=='activity'?'disabled':'')}</section>
<section class="drawer-section"><h3>Question timer</h3><label class="field-label" for="timer-preset">Timer duration</label><select id="timer-preset" data-change="timer-duration" class="field"><option value="0" ${state.timer.duration===0?'selected':''}>Off</option>${[30,60,90,120,180].map(n=>`<option value="${n}" ${state.timer.duration===n?'selected':''}>${n} seconds</option>`).join('')}</select>
<div class="timer-face"><span class="timer-display">${state.timer.duration?displayTime(state.timer.remaining):'OFF'}</span><small>${state.timer.remaining===0&&state.timer.duration?'TIME TO DISCUSS':'No automatic answer reveal'}</small></div>
<div class="drawer-two">${button(icon(state.timer.running?'pause':'play')+(state.timer.running?' Pause':' Start'),'timer-toggle','btn btn-secondary',!state.timer.duration||state.timer.remaining<=0?'disabled':'')}${button(icon('reset')+' Reset timer','timer-reset','btn btn-secondary')}</div></section>
<section class="drawer-section"><div class="toggle-row"><div><h3>Team competition</h3><p class="drawer-hint">Award points manually for clear reasoning.</p></div><label class="switch"><input type="checkbox" data-change="competition" ${state.competition?'checked':''} aria-label="Enable team competition"><span></span></label></div>
${state.competition?`<label for="team-count" class="field-label">Number of teams</label><select id="team-count" data-change="team-count" class="field">${[2,3,4].map(n=>`<option value="${n}" ${state.teamCount===n?'selected':''}>${n} teams</option>`).join('')}</select>
<div class="team-edit-list">${state.teams.slice(0,state.teamCount).map((t,i)=>`<div class="team-edit"><label for="team-${i}">TEAM ${i+1}</label><input id="team-${i}" data-change="team-name" data-index="${i}" class="field" value="${esc(t.name)}" maxlength="28" aria-label="Team ${i+1} name"><div class="score-edit"><button type="button" data-action="team-minus" data-value="${i}" aria-label="Remove 10 points from ${esc(t.name)}">−10</button><strong>${Number(t.score)||0}</strong><button type="button" data-action="team-plus" data-value="${i}" aria-label="Award 10 points to ${esc(t.name)}">+10</button><button type="button" data-action="team-plus50" data-value="${i}" aria-label="Award 50 points to ${esc(t.name)}">+50</button></div></div>`).join('')}</div>`:''}</section>
<section class="drawer-section"><h3>Presentation tools</h3><label class="projection-toggle"><input type="checkbox" data-change="projector" ${state.projector?'checked':''}> <span>Projector readability mode</span></label><p class="drawer-hint">Enlarges question and answer text for a large classroom screen.</p>${button(icon('fullscreen')+' Toggle full screen','fullscreen','btn btn-secondary btn-block')}${button(icon('reset')+' Reset entire game','reset-all','btn btn-danger btn-block')}<p class="drawer-hint">Session progress and team scores are stored only in this browser. Use Reset to clear them.</p></section></div></aside>`;
}
function render(){
 const focused=document.activeElement?.getAttribute?.('data-focus');
 const percent=Math.round(doneTotal()/roundCount*100);
 root.innerHTML=`<div class="app-shell ${state.projector?'projector':''}"><header class="global-header"><div class="header-inside"><button type="button" data-action="home" class="brand" aria-label="Harbourline home"><span class="brand-logo">H<span>✦</span></span><span class="brand-type">HARBOURLINE <small>THE STRATEGY CHALLENGE</small></span></button>
<div class="header-progress"><span>${icon('medal')} ${roundScore()} XP</span><div class="mini-progress"><span style="width:${percent}%"></span></div><small>${doneTotal()}/${roundCount} ROUNDS</small></div>
<div class="header-actions">${button(icon('fullscreen'),'fullscreen','icon-button header-fullscreen','aria-label="Toggle full-screen presentation"')}${button(icon('settings')+' <span>Facilitator</span>','open-facilitator','btn btn-top','aria-label="Open facilitator controls"')}</div></div>${renderTeamRibbon()}</header>
<main>${state.screen==='home'?renderHome():renderActivity()}</main><footer class="global-footer"><span>HARBOURLINE CREATIVE · THE STRATEGY CHALLENGE</span><span>BADM 470 · Fictional case · Evidence before conclusions</span></footer>${renderDrawer()}</div>`;
 save();
 if(focused){const el=[...root.querySelectorAll('[data-focus]')].find(e=>e.getAttribute('data-focus')===focused);el?.focus({preventScroll:true});}
 if(state.screen==='activity'&&state.module==='pairs')requestAnimationFrame(drawPairLines);
}
function drawPairLines(){const board=document.getElementById('match-board');if(!board)return;const svg=board.querySelector('.pair-lines');const q=itemFor('pairs');const a=answerFor('pairs',q.id);const map=a.placed||{};const bounds=board.getBoundingClientRect();svg.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);svg.setAttribute('width',bounds.width);svg.setAttribute('height',bounds.height);
svg.innerHTML=Object.entries(map).map(([left,right],i)=>{const l=board.querySelector(`[data-left="${left}"]`);const r=board.querySelector(`[data-right="${right}"]`);if(!l||!r)return '';const a=l.getBoundingClientRect(),b=r.getBoundingClientRect();const x1=a.right-bounds.left+4,y1=a.top+a.height/2-bounds.top,x2=b.left-bounds.left-4,y2=b.top+b.height/2-bounds.top;const good=answerFor('pairs',q.id).checked&&left===right;const bad=answerFor('pairs',q.id).checked&&left!==right;return `<path d="M${x1},${y1} C${x1+40},${y1} ${x2-40},${y2} ${x2},${y2}" fill="none" stroke="${good?'#56e1c2':bad?'#ff8f8a':'#82a8ee'}" stroke-width="3" opacity=".9"/><circle cx="${x1}" cy="${y1}" r="4" fill="#82a8ee"/><circle cx="${x2}" cy="${y2}" r="4" fill="${good?'#56e1c2':'#82a8ee'}"/>`;}).join('');}
function assignDrag(target,term){const q=itemFor('drag'),a=answerFor();if(a.checked)return;const placed={...(a.placed||{})};for(const [k,v] of Object.entries(placed))if(v===term)delete placed[k];placed[target]=term;updateAnswer('drag',q.id,{placed,selected:null});}
function assignPair(right,left){const q=itemFor('pairs'),a=answerFor();if(a.checked)return;const placed={...(a.placed||{})};for(const [k,v] of Object.entries(placed))if(v===right)delete placed[k];placed[left]=right;updateAnswer('pairs',q.id,{placed,selected:null});}
function moveRank(id, direction){const q=itemFor('rank'),a=answerFor();if(a.checked)return;const order=[...(a.order||q.initial)],i=order.indexOf(id),j=i+direction;if(i<0||j<0||j>=order.length)return;[order[i],order[j]]=[order[j],order[i]];updateAnswer('rank',q.id,{order});}
function submitCurrent(reveal=false){const q=itemFor(),m=state.module,a=answerFor();if(a.checked&&reveal){if(m==='drag'||m==='pairs')updateAnswer(m,q.id,{showSolution:true});else showToast('This round already displays the answer.');return;}if(a.checked&&!reveal){showToast('This round is already checked. Reset or retry to change your answer.');return;}
 if(!reveal){if((m==='quiz'||m==='truefalse'||m==='decision')&&a.choice===undefined){showToast('Choose an answer before checking.');return;}
 if((m==='drag'||m==='pairs')&&!Object.keys(a.placed||{}).length){showToast('Make at least one match first.');return;}}
 state.timer.running=false;
 const patch={checked:true,method:reveal?'reveal':'check'};
 if(m==='drag'||m==='pairs')patch.showSolution=!!reveal;
 updateAnswer(m,q.id,patch);
}
function resetCurrent(){const m=state.module,id=itemFor().id;delete state.answers[m][id];resetTimer();render();}
function retryRound(){const m=state.module,q=itemFor(),a=answerFor();if(m==='drag'||m==='pairs'){
 const placed={...a.placed};for(const [k,v] of Object.entries(placed))if(k!==v)delete placed[k];updateAnswer(m,q.id,{placed,checked:false,showSolution:false,method:null,selected:null});
 } else updateAnswer(m,q.id,{checked:false,method:null,showSolution:false});}
function resetModule(){if(state.screen!=='activity')return;if(!confirm('Reset all answers and progress in this activity?'))return;state.answers[state.module]={};state.indexes[state.module]=0;resetTimer();render();showToast('This activity was reset.');}
function resetAll(){if(!confirm('Reset ALL game progress and team scores on this device? This cannot be undone.'))return;state=defaults();render();showToast('New game ready.');}
async function toggleFullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{showToast('Full-screen is not available in this browser.');}}
function onAction(action,el){const val=el.dataset.value;const a=answerFor(),q=itemFor();
 switch(action){
  case 'home':navigateHome();break;
  case 'start':navigateModule('quiz');break;
  case 'scroll-activities':document.getElementById('activities')?.scrollIntoView({behavior:'smooth'});break;
  case 'open-module':navigateModule(val);break;
  case 'open-facilitator':state.facilitatorOpen=true;render();setTimeout(()=>root.querySelector('.facilitator-drawer .icon-button')?.focus(),0);break;
  case 'close-facilitator':state.facilitatorOpen=false;render();break;
  case 'quiz-choice':if(!a.checked)updateAnswer('quiz',q.id,{choice:Number(val)});break;
  case 'tf-choice':if(!a.checked)updateAnswer('truefalse',q.id,{choice:val==='true'});break;
  case 'decision-choice':if(!a.checked)updateAnswer('decision',q.id,{choice:val});break;
  case 'pick-term':if(!a.checked)updateAnswer('drag',q.id,{selected:val});break;
  case 'drop-target':if(!a.checked){if(a.selected)assignDrag(val,a.selected);else showToast('Select a concept card first.');}break;
  case 'select-left':if(!a.checked)updateAnswer('pairs',q.id,{selected:val});break;
  case 'select-right':if(!a.checked){if(a.selected)assignPair(val,a.selected);else showToast('Select a left-side card first.');}break;
  case 'rank-up':moveRank(val,-1);break;
  case 'rank-down':moveRank(val,1);break;
  case 'check':submitCurrent(false);break;
  case 'reveal':if(state.screen==='activity')submitCurrent(true);break;
  case 'retry-wrong':retryRound();break;
  case 'retry-round':retryRound();break;
  case 'reset-current':if(state.screen==='activity')resetCurrent();break;
  case 'reset-module':resetModule();break;
  case 'reset-all':resetAll();break;
  case 'next':navigateIndex(state.indexes[state.module]+1);break;
  case 'previous':navigateIndex(state.indexes[state.module]-1);break;
  case 'go-index':navigateIndex(Number(val));break;
  case 'timer-toggle':if(state.timer.duration&&state.timer.remaining>0){state.timer.running=!state.timer.running;render();}break;
  case 'timer-reset':resetTimer();render();break;
  case 'fullscreen':toggleFullscreen();break;
  case 'team-minus':state.teams[Number(val)].score=Math.max(0,state.teams[Number(val)].score-10);render();break;
  case 'team-plus':state.teams[Number(val)].score+=10;render();break;
  case 'team-plus50':state.teams[Number(val)].score+=50;render();break;
 }
}
root.addEventListener('click',e=>{const btn=e.target.closest('[data-action]');if(btn&&!btn.disabled)onAction(btn.dataset.action,btn);});
root.addEventListener('change',e=>{
 const input=e.target,action=input.dataset.change;
 if(action==='timer-duration'){state.timer.duration=Number(input.value);resetTimer();render();}
 if(action==='competition'){state.competition=input.checked;render();}
 if(action==='projector'){state.projector=input.checked;render();}
 if(action==='team-count'){state.teamCount=Number(input.value);render();}
 if(action==='team-name'){const i=Number(input.dataset.index);state.teams[i].name=input.value.trim()||`Team ${i+1}`;render();}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.facilitatorOpen){state.facilitatorOpen=false;render();}
 if((e.key==='Enter'||e.key===' ')&&document.activeElement?.dataset?.sortHandle){e.preventDefault();showToast('Use the up and down buttons beside a priority to reorder it with the keyboard.');}
});
window.addEventListener('resize',()=>{if(state.screen==='activity'&&state.module==='pairs')requestAnimationFrame(drawPairLines);});
setInterval(()=>{if(!state.timer.running)return;if(state.timer.remaining>0){state.timer.remaining-=1;document.querySelectorAll('.timer-display').forEach(n=>{n.textContent=displayTime(state.timer.remaining);});save();}
 if(state.timer.remaining<=0){state.timer.running=false;render();showToast('Time is up! Discuss before revealing the answer.');}},1000);

// Pointer-based dragging works with mouse, touch and pen. Click/tap and arrow controls are
// equivalent alternatives for accessibility and for touch devices where dragging is awkward.
let gesture=null;
root.addEventListener('pointerdown',e=>{
 if(state.screen!=='activity'||answerFor().checked)return;
 const term=e.target.closest('[data-term]');const handle=e.target.closest('[data-sort-handle]');if(!term&&!handle)return;
 if(e.button!==0&&e.pointerType==='mouse')return;
 const element=term||handle;
 gesture={type:term?'drag':'rank',id:term?term.dataset.term:handle.dataset.sortHandle,x:e.clientX,y:e.clientY,element,ghost:null,moved:false};
 if(handle)e.preventDefault();
});
function pointerMove(e){if(!gesture)return;const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;if(!gesture.moved&&Math.hypot(dx,dy)>9){gesture.moved=true;
  const box=(gesture.type==='rank'?gesture.element.closest('.rank-row'):gesture.element).getBoundingClientRect();const ghost=gesture.element.closest('.rank-row')?.cloneNode(true)||gesture.element.cloneNode(true);
  ghost.classList.add('drag-ghost');ghost.style.width=`${box.width}px`;ghost.style.left=`${e.clientX+12}px`;ghost.style.top=`${e.clientY+12}px`;ghost.setAttribute('aria-hidden','true');document.body.append(ghost);gesture.ghost=ghost;document.body.classList.add('dragging');
 }
 if(gesture.moved){e.preventDefault();gesture.ghost.style.left=`${e.clientX+12}px`;gesture.ghost.style.top=`${e.clientY+12}px`;}
}
function pointerUp(e){if(!gesture)return;const g=gesture;gesture=null;g.ghost?.remove();document.body.classList.remove('dragging');if(!g.moved)return;
 const below=document.elementFromPoint(e.clientX,e.clientY);
 if(g.type==='drag'){const target=below?.closest('[data-drop-target]');if(target){assignDrag(target.dataset.dropTarget,g.id);showToast('Card placed. Check matches when ready.');}else showToast('Drop onto a definition, or tap a card and target.');}
 if(g.type==='rank'){const target=below?.closest('[data-rank-row]');if(target){const q=itemFor('rank');const order=[...(answerFor().order||q.initial)];const from=order.indexOf(g.id),to=order.indexOf(target.dataset.rankRow);if(from>=0&&to>=0){order.splice(from,1);order.splice(to,0,g.id);updateAnswer('rank',q.id,{order});}}}
}
document.addEventListener('pointermove',pointerMove,{passive:false});document.addEventListener('pointerup',pointerUp);document.addEventListener('pointercancel',()=>{gesture?.ghost?.remove();gesture=null;document.body.classList.remove('dragging');});
render();