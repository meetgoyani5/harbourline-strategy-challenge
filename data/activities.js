/*
 * EDIT THE GAME HERE. All information about Harbourline is taken from the
 * uploaded fictional teaching case, not real-world market research.
 * A field called 'judgment' means a defensible interpretation, not an established fact.
 * Each caseReference is a page in Case Facilitation #5: Harbourline Creative.
 */

export const modules = [
  { id: 'quiz', number: '01', name: 'Case Intelligence', short: 'The evidence round', type: 'MULTIPLE CHOICE', icon: '◈', description: 'Separate the facts from the story. What do we actually know?', skill: 'Performance · Evidence', accent: 'mint' },
  { id: 'drag', number: '02', name: 'Framework Lab', short: 'Drag & drop', type: 'DRAG TO MATCH', icon: '⬡', description: 'Place strategy concepts beside their correct meaning and evidence.', skill: 'External & Internal', accent: 'blue' },
  { id: 'pairs', number: '03', name: 'Connect the Dots', short: 'Match the following', type: 'CONNECT THE PAIRS', icon: '⌘', description: 'Link Harbourline case signals to their strategic implications.', skill: 'Interpretation · SWOT', accent: 'violet' },
  { id: 'truefalse', number: '04', name: 'Truth or Assumption?', short: 'True / false', type: 'FACT CHECK', icon: '◎', description: 'Challenge claims that sound convincing but go beyond the evidence.', skill: 'Critical Thinking', accent: 'amber' },
  { id: 'decision', number: '05', name: 'The Boardroom', short: 'Decision challenge', type: 'STRATEGIC DECISIONS', icon: '◇', description: 'Choose a path, then debate the consequences and trade-offs.', skill: 'Alternatives · Trade-offs', accent: 'coral' },
  { id: 'rank', number: '06', name: '90-Day Mission', short: 'Rank priorities', type: 'PRIORITY CHALLENGE', icon: '☷', description: 'Build a realistic sequence of strategic priorities under constraints.', skill: 'Recommendation · Execution', accent: 'mint' },
];

export const quiz = [
  {
    id:'q1', difficulty:'Easy', kind:'Case fact', question:'What did the tourism client question in its email to Harbourline?',
    options:['The need for all marketing services','The campaign fee and six-week schedule','Whether the company had a legal trademark','The number of office locations'], answer:1,
    explanation:'The client liked the proposal, but an employee had used AI to create attractive images, ads and posts quickly. That prompted questions about the fee and six-week timeline.',
    discussion:'Is speed of content production the same as value of a campaign?', source:'Case p. 1'
  },
  {
    id:'q2', difficulty:'Medium', kind:'Data interpretation', question:'What is the most careful interpretation of the 24 client interviews?',
    options:['15 want only content and 9 want only advice','Every interviewee agreed to pay for a new service','Interests overlap; 6 clients mentioned both, and demand is still unproven','Harbourline should discontinue all routine production'], answer:2,
    explanation:'15 considered a recurring content package, 9 named strategic advice, and 6 expressed both. These are overlapping interests, not exclusive segments or purchase commitments.',
    discussion:'Why would it be misleading to turn interview interest into a revenue forecast?', source:'Case p. 2 and Exhibit 1, p. 6'
  },
  {
    id:'q3', difficulty:'Easy', kind:'Case fact', question:'How many clients had committed to paid trials of revised services?',
    options:['24','15','9','5'], answer:3,
    explanation:'Only 5 had committed to a paid trial. None had agreed to an annual renewal.',
    discussion:'What does a paid trial prove—and what does it not prove?', source:'Case p. 2'
  },
  {
    id:'q4', difficulty:'Medium', kind:'Performance analysis', question:'Which measure would most directly address the tourism client’s stated business problem?',
    options:['Number of AI images generated','Total impressions across all booking periods','Change in weekday booking demand, alongside relevant context','Hours spent writing campaign copy'], answer:2,
    explanation:'The property already filled weekends and struggled during the week. Weekday booking demand aligns with the client objective, although pricing, room availability, and weather also matter.',
    discussion:'How could Harbourline measure contribution without falsely claiming all bookings were caused by its campaign?', source:'Case p. 1; Exhibit 1, p. 6'
  },
  {
    id:'q5', difficulty:'Hard', kind:'Capability judgment', question:'What can Harbourline conclude from its 10 standardized-content AI pilots?',
    options:['AI improves sales across all client accounts','Early drafts were faster in these trials, but quality review remained important','The agency no longer needs human reviewers','Its AI tools are proprietary and rare'], answer:1,
    explanation:'The pilots showed faster initial drafting and more variations under relatively favourable conditions. Staff still corrected claims, details, accessibility and brand consistency; wider outcomes were not established.',
    discussion:'What additional trial design would support a stronger claim about productivity?', source:'Case p. 3'
  },
  {
    id:'q6', difficulty:'Hard', kind:'Strategic judgment', question:'Which statement best describes Harbourline’s potential competitive advantage?',
    options:['Commercial AI access alone is rare','Longstanding relationships guarantee future renewals','The company has no useful resources','Its knowledge and judgment can create value, but consistent differentiation is not yet proven'], answer:3,
    explanation:'Local knowledge and brand judgment appear valuable, but their rarity, imitability and repeatable delivery are uncertain. Similar AI access is available to competitors.',
    discussion:'What evidence would you need to test whether client relationships pass VRIO?', source:'Exhibit 2, p. 7; Course Chapter 5'
  },
  {
    id:'q7', difficulty:'Medium', kind:'Implementation fact', question:'Which resource constraint must a credible initial strategy respect?',
    options:['A requirement to hire an entire research department immediately','Unlimited technology investment','A bounded trial, no immediate major hiring or build, and no involuntary layoffs in year 1','A guarantee of client sales outcomes'], answer:2,
    explanation:'The founders support a limited trial, selective staff development and potentially a specialist partner, but not immediate team expansion or a major build. They committed to no involuntary layoffs in the first year.',
    discussion:'How does this constraint change the feasibility of a premium advisory strategy?', source:'Case pp. 1, 4, 7'
  }
];

export const dragRounds = [
  {
    id:'d1', title:'Know your strategy tools', instruction:'Drag each strategy concept onto the correct definition. Tap-to-select also works.', kind:'Course framework',
    terms:[{id:'vrio',label:'VRIO'},{id:'pestel',label:'PESTEL'},{id:'swot',label:'SWOT'},{id:'five',label:'Porter’s Five Forces'}],
    targets:[{id:'swot',label:'Synthesizes supported internal strengths/weaknesses with external opportunities/threats.'},{id:'five',label:'Examines the competitive pressures that shape industry profit potential.'},{id:'pestel',label:'Assesses broad political, economic, social, technological, environmental and legal factors.'},{id:'vrio',label:'Tests whether a resource is valuable, rare, difficult to imitate and organized for value.'}],
    explanation:'Use the tools to reason from evidence to strategic judgments; simply naming a framework is not analysis.', discussion:'Which tool most directly helps explain why commercial AI access is not a lasting advantage?', source:'Course Chapters 4–6'
  },
  {
    id:'d2', title:'Sort the external pressure', instruction:'Connect each external pressure to the supported Harbourline case example.', kind:'Case evidence',
    terms:[{id:'buyer',label:'Buyer power'},{id:'sub',label:'Substitution'},{id:'rival',label:'Competitive rivalry'},{id:'trust',label:'Data / trust constraint'}],
    targets:[{id:'trust',label:'Contracts require permission before confidential client information enters an external AI system.'},{id:'rival',label:'Freelancers, large agencies and self-service tools offer overlapping alternatives.'},{id:'sub',label:'A former small-business client now makes routine social posts internally.'},{id:'buyer',label:'A finance manager challenges the agency fee and wants a clear reason to pay.'}],
    explanation:'One observation can affect several forces. These matches identify the strongest direct case connection, not the only possible interpretation.', discussion:'Is an in-house marketing employee a competitor, a substitute, or both depending on how we define the industry?', source:'Case pp. 2, 4–6'
  },
  {
    id:'d3', title:'From resources to capabilities', instruction:'Match each issue to the most relevant internal capability or gap.', kind:'Internal analysis',
    terms:[{id:'knowledge',label:'Knowledge management gap'},{id:'measurement',label:'Measurement gap'},{id:'governance',label:'AI governance gap'},{id:'incentives',label:'Misaligned incentives'}],
    targets:[{id:'incentives',label:'Employees receive more recognition for winning and completing work than questioning a weak brief.'},{id:'measurement',label:'Campaign reports track clicks and reach without consistently tracing customer outcomes.'},{id:'knowledge',label:'Reasons behind past client decisions live in personal folders and employee memory.'},{id:'governance',label:'No shared standard governs AI evidence, review, documentation and disclosure.'}],
    explanation:'The core issue is not lacking assets alone; it is lacking routines that make valuable expertise repeatable.', discussion:'Which gap would you address first if Harbourline had only 90 days?', source:'Case p. 4; Exhibit 2, p. 7'
  }
];

export const pairRounds = [
  {
    id:'p1', title:'Connect the evidence to the implication', kind:'Interpretation',
    left:[{id:'a',label:'Tourism: weekend promotion for a property with weak weekdays'},{id:'b',label:'Retail: email clicks with no clear link to repeat purchase'},{id:'c',label:'Professional services: generic articles resemble competitors'},{id:'d',label:'Former client: routine social posts now created in-house'}],
    right:[{id:'c',label:'Distinctive positioning matters more than publishing volume.'},{id:'a',label:'The output can look polished while targeting the wrong business problem.'},{id:'d',label:'Routine creative production faces genuine substitution.'},{id:'b',label:'Campaign metrics are not the same as customer outcomes.'}],
    explanation:'Each match connects a specific fact from Exhibit 1 to a reasonable strategic implication.', discussion:'Which implication is most urgent for the agency to address and why?', source:'Case p. 1; Exhibit 1, p. 6'
  },
  {
    id:'p2', title:'Evidence vs. assumption', kind:'Critical reading',
    left:[{id:'a',label:'Five clients agreed to a paid trial'},{id:'b',label:'Ten AI pilots produced faster early drafts'},{id:'c',label:'Several clients have divided work among providers'},{id:'d',label:'No dedicated measurement lead is in place'}],
    right:[{id:'d',label:'Evidence of a capability gap, not proof that the company can never measure results.'},{id:'c',label:'Evidence of service unbundling, not a measured industry-wide market share shift.'},{id:'a',label:'Early willingness to test, not evidence of annual renewal demand.'},{id:'b',label:'Promising efficiency under tested conditions, not proof of better client outcomes.'}],
    explanation:'The case repeatedly distinguishes what is observed from broader claims that still require testing.', discussion:'What assumption in the proposed strategy would you test first?', source:'Case pp. 2–4, 6–7'
  },
  {
    id:'p3', title:'Who needs what?', kind:'Customer behavior',
    left:[{id:'a',label:'Marketing coordinator'},{id:'b',label:'Business owner'},{id:'c',label:'Finance manager'},{id:'d',label:'Harbourline account director'}],
    right:[{id:'d',label:'Needs a consistent explanation of AI use, fees and the agency’s role.'},{id:'b',label:'Wants confidence that marketing contributes to business goals.'},{id:'a',label:'Values fast, usable material and fewer approval rounds.'},{id:'c',label:'Wants an understandable justification for the agency fee.'}],
    explanation:'Different people inside one client organization judge value differently. Account directors often learn of budget concerns late.', discussion:'Who needs to attend Harbourline’s next client value conversation?', source:'Case p. 2'
  }
];

export const trueFalse = [
  {id:'t1',statement:'The 15 clients interested in recurring content and the 9 interested in strategic advice form two mutually exclusive groups.',answer:false,difficulty:'Medium',kind:'Fact check',explanation:'False. Six clients expressed both preferences. The interviews do not show two neat groups.',discussion:'How would incorrectly treating these as separate groups distort a product strategy?',source:'Case p. 2'},
  {id:'t2',statement:'Harbourline has financial statements that prove its profits have already declined because of AI.',answer:false,difficulty:'Easy',kind:'Evidence gap',explanation:'False. The case provides no revenue, profit or margin figures. Pressure on fees is a risk, not evidence of a measured profit decline.',discussion:'Which missing financial measures would you request?',source:'Case p. 8'},
  {id:'t3',statement:'A campaign can increase engagement while still failing to address the client’s actual marketing objective.',answer:true,difficulty:'Medium',kind:'Interpretation',explanation:'True. A retailer campaign earned more engagement after broader targeting, but Harbourline had not shown that the reached audience was likely to buy or return.',discussion:'Who should define the metric used to judge a campaign?',source:'Case p. 3'},
  {id:'t4',statement:'Harbourline can upload all confidential client records into outside AI tools because the files are stored at the agency.',answer:false,difficulty:'Easy',kind:'Contractual fact',explanation:'False. Existing contracts require explicit client permission before confidential information enters an external system.',discussion:'How should permissions affect which AI tools the agency chooses?',source:'Case p. 4'},
  {id:'t5',statement:'Strong local client relationships are automatically a sustained competitive advantage under VRIO.',answer:false,difficulty:'Hard',kind:'VRIO reasoning',explanation:'False. The relationships are valuable, but the case does not establish that they are rare or hard to imitate. Knowledge is also concentrated in individuals.',discussion:'What would show that Harbourline is organized to capture this relationship value?',source:'Exhibit 2, p. 7; Course Chapter 5'},
  {id:'t6',statement:'The board wants an initial 90-day plan with responsibilities and conditions to continue, change or stop the trial.',answer:true,difficulty:'Easy',kind:'Case fact',explanation:'True. Elena has three weeks to recommend a direction; the board also wants a 90-day trial plan with owners and decision conditions.',discussion:'What would be a meaningful stop condition?',source:'Case p. 5'}
];

export const decisions = [
  {
    id:'s1', title:'The tourism client challenge', tag:'Client value', scene:'A client can create polished ads with AI and asks why Harbourline charges its existing fee. The proposed campaign pushes weekend stays, but the property already fills on weekends and struggles midweek.',
    question:'What should Elena propose in the next client conversation?',
    options:[
      {id:'a',label:'Match the AI output price immediately and promise the same content faster.',consequence:'May address price objections, but does not solve the weekday demand problem or demonstrate why expertise matters.',labelType:'Trade-off'},
      {id:'b',label:'Offer a paid diagnosis of weekday demand, a revised campaign test, and transparent AI-assisted execution.',consequence:'Links the offer to a client business problem and tests willingness to pay for advice. Results still depend on client pricing, capacity and weather.',labelType:'Preferred test'},
      {id:'c',label:'Guarantee a specific increase in bookings to protect the existing fee.',consequence:'A strong-sounding promise, but Harbourline does not fully control bookings and the founders do not want sales guarantees.',labelType:'High risk'},
      {id:'d',label:'Explain that human creativity is priceless and refuse to discuss fee structure.',consequence:'May defend agency identity, but ignores legitimate AI production gains and finance-manager scrutiny.',labelType:'Weak fit'}
    ], preferred:'b', reasoning:'A bounded, measurable test addresses the real business problem while acknowledging AI efficiency and limited control over results.', discussion:'Would you pay a diagnostic fee if the agency cannot promise bookings? What proof would change your decision?', source:'Case pp. 1–2; Exhibit 1, p. 6'
  },
  {
    id:'s2', title:'The retailer’s repeat-purchase problem', tag:'Measurement', scene:'A retailer can write product emails internally. It wants customers to return without constant discounts. Email clicks have increased before, but repeat purchases are not well tracked and customer records are incomplete.',
    question:'Which action best fits the evidence and resource limits?',
    options:[
      {id:'a',label:'Increase email volume immediately and report clicks as success.',consequence:'Easy to execute but repeats the same measurement problem and may increase irrelevant communication.',labelType:'Weak fit'},
      {id:'b',label:'Buy a large proprietary data platform before testing anything.',consequence:'Could eventually improve analysis but does not fit the founders’ refusal of a major technology build.',labelType:'Poor feasibility'},
      {id:'c',label:'Agree on a narrow customer segment, permissions, and a feasible repeat-purchase measure before a small test.',consequence:'Starts with usable data and a business outcome. It may delay launch and cannot prove causality without more careful design.',labelType:'Preferred test'},
      {id:'d',label:'Offer a discount and avoid discussing data quality.',consequence:'May help with budget concerns short term, but weak records still prevent useful personalization and evaluation.',labelType:'Trade-off'}
    ], preferred:'c', reasoning:'Agreeing on the objective, permission and usable data comes before AI-driven personalization; test design should match what can actually be measured.', discussion:'If purchase attribution is impossible, what weaker but honest measure would you use?', source:'Case pp. 2–3; Exhibit 1, p. 6'
  },
  {
    id:'s3', title:'The AI trust dilemma', tag:'Governance', scene:'One account director openly explains AI use. Another hides it unless asked because clients may demand discounts. Employees also lack shared evidence and review standards.',
    question:'What should the agency do first?',
    options:[
      {id:'a',label:'Ban all AI tools permanently.',consequence:'Would avoid some immediate risks but sacrifice genuine efficiency gains and learning opportunities.',labelType:'Trade-off'},
      {id:'b',label:'Let each account director decide what to disclose.',consequence:'Keeps flexibility but increases inconsistency and the chance of a trust problem across accounts.',labelType:'High risk'},
      {id:'c',label:'Claim all AI outputs are original research if a human reviewed them.',consequence:'Misrepresents evidence and violates the case’s explicit trust obligation.',labelType:'Not defensible'},
      {id:'d',label:'Adopt shared permission, disclosure, evidence and quality-review rules, with accountable human sign-off.',consequence:'Protects trust and makes practices repeatable, but requires staff time and careful implementation.',labelType:'Preferred test'}
    ], preferred:'d', reasoning:'Commercial AI tools are not proprietary differentiation. Consistent judgment and accountability are more credible parts of the value proposition.', discussion:'How much detail about AI use is enough to be transparent without overwhelming clients?', source:'Case pp. 4–5'
  },
  {
    id:'s4', title:'The board has 90 days', tag:'Capabilities', scene:'Harbourline has one analytics-capable campaign specialist, no measurement lead, uneven AI skills, and a no-layoff commitment. Founders support selective training and possibly a defined specialist partner.',
    question:'Which capability-development path is most defensible?',
    options:[
      {id:'a',label:'Immediately hire a full analytics and strategy department.',consequence:'Would add expertise but contradicts the resource constraints in the case.',labelType:'Poor feasibility'},
      {id:'b',label:'Pilot a common brief-to-measurement process, coach juniors, and use a specialist partner for a defined gap.',consequence:'Builds repeatable routines with controlled scope. The partner must have clear accountability, permissions and cost limits.',labelType:'Preferred test'},
      {id:'c',label:'Continue using personal folders and informal senior review.',consequence:'Avoids process costs now, but preserves dependency on individuals and makes learning hard to repeat.',labelType:'High risk'},
      {id:'d',label:'Train only senior creatives and stop involving junior employees.',consequence:'Could speed a few decisions initially, but undermines the development of future capabilities.',labelType:'Weak fit'}
    ], preferred:'b', reasoning:'The case supports selective development and a bounded partnership rather than immediate expansion. The point is to develop an organizational capability, not just add technology.', discussion:'What concrete result after 90 days would demonstrate a repeatable capability?', source:'Case p. 4; Exhibit 2, p. 7'
  },
  {
    id:'s5', title:'Choose the market position', tag:'Strategy', scene:'Harbourline’s buyers want different things: some need affordable recurring content, while others seek difficult marketing decisions. Only 5 have committed to paid trials and separate advice fees are untested.',
    question:'Which market position should the board test first?',
    options:[
      {id:'a',label:'A low-cost content factory competing mainly on production volume.',consequence:'Could attract price-sensitive clients but faces AI parity and may weaken differentiation.',labelType:'Defensible for a niche'},
      {id:'b',label:'Immediate pivot to strategy-only consultancy with no production.',consequence:'Clear positioning, but unproven advice demand and thin capabilities make a sudden transition risky.',labelType:'Potential long-term path'},
      {id:'c',label:'Transparent AI-assisted execution plus a separately scoped advisory/diagnostic offer for selected clients.',consequence:'A testable hybrid consistent with mixed client needs; it must prove buyers will pay and the agency can deliver advice.',labelType:'Preferred test'},
      {id:'d',label:'Keep the current hours-and-deliverables model unchanged.',consequence:'Minimal disruption but fails to address the value and pricing challenge that initiated the case.',labelType:'High risk'}
    ], preferred:'c', reasoning:'A two-part offer is a recommendation to test, not a fact established by the case. Different choices may be defensible under different evidence or goals.', discussion:'Which single new piece of evidence might cause your team to prefer an alternative strategy?', source:'Case pp. 2, 5–7'
  }
];

export const rankRounds = [
  {
    id:'r1', title:'First 30 days: what comes first?', kind:'Implementation judgment', prompt:'The board approves a limited trial. Rank what you would do FIRST to LAST in the opening phase. There is no uniquely correct order.',
    items:[{id:'a',label:'Assign one owner for the revised value proposition'},{id:'b',label:'Agree client problem and success measures with trial buyers'},{id:'c',label:'Set AI permissions, disclosure and review rules'},{id:'d',label:'Map capability gaps and plan selective training'},{id:'e',label:'Create a draft two-part service offer and price hypothesis'}],
    initial:['e','d','c','b','a'], suggested:['a','b','c','e','d'], rationale:'One defensible sequence creates accountability, defines value, protects trust, then tests an offer and capability plan. Another team could place AI governance first if its risk assessment is higher.', discussion:'Which step is a dependency for another step? What would you rearrange?', source:'Case pp. 1, 4–5, 7'
  },
  {
    id:'r2', title:'What should the pilot measure?', kind:'Evaluation judgment', prompt:'Rank the evidence you would most want before recommending a wider rollout. Explain why some measures matter more.',
    items:[{id:'a',label:'Client willingness to purchase or renew at a stated price'},{id:'b',label:'Evidence of progress against the client’s chosen objective'},{id:'c',label:'Quality and trust issues found during human review'},{id:'d',label:'Total staff time saved after all AI review and rework'},{id:'e',label:'Documented learning that can transfer to another account'}],
    initial:['d','e','b','c','a'], suggested:['b','a','c','d','e'], rationale:'Client-relevant value and willingness to pay are central to the decision, but governance and genuine net efficiency are necessary feasibility tests. The exact order depends on risk tolerance.', discussion:'Which metric must be a “stop” threshold rather than a bonus objective?', source:'Case pp. 2–5, 7'
  },
  {
    id:'r3', title:'The 90-day board decision', kind:'Strategic prioritization', prompt:'The trial produces mixed results. Prioritize board actions, considering long-term competitiveness and limited resources.',
    items:[{id:'a',label:'Review the evidence and assumptions with the five pilot clients'},{id:'b',label:'Protect client trust: address quality and data-permission risks'},{id:'c',label:'Decide which service elements to continue, change or stop'},{id:'d',label:'Define ownership, staff development and partner needs for the next phase'},{id:'e',label:'Only then approve wider rollout or additional spending'}],
    initial:['e','d','c','a','b'], suggested:['b','a','c','d','e'], rationale:'This suggested order puts non-negotiable trust risks first, reviews client evidence, decides what merits continuation, and scales only after feasibility is established.', discussion:'Under what conditions would you stop an otherwise profitable service trial?', source:'Case pp. 4–5, 7'
  }
];

export const byModule = { quiz, drag:dragRounds, pairs:pairRounds, truefalse:trueFalse, decision:decisions, rank:rankRounds };