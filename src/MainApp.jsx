import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const resume = 'https://drive.google.com/file/d/185GYTBLNkPMPpVfkZXluUWxi-tqPxyy9/view?usp=sharing';
const social = [
  ['GitHub', 'https://github.com/tulika612'],
  ['LinkedIn', 'https://www.linkedin.com/in/tulika-awalgaonkar/'],
  ['Google Scholar', 'https://scholar.google.com/citations?user=9C_VGIUAAAAJ&hl=en'],
];
const navigation = ['About', 'Work', 'Experience', 'Research'];
const supportingWork = [
  {
    title: 'xLAMFlow', affiliation: 'Salesforce', category: 'On-device AI', kind: 'Machine learning', description: 'An iOS productivity assistant powered by quantized xLAM-2. Bringing multi-step agentic workflows to the device, with privacy at the core.', tags: ['Action models', 'Swift', 'GGUF'], visual: 'flow', contribution: 'Built the Swift assistant and prepared models for edge deployment.', outcome: 'Single-step, multi-turn, and multi-step workflows with local inference.', label: 'Watch demo', href: 'https://lnkd.in/p/gH9DNkhr',
  },
  {
    title: 'MobileAIBench', affiliation: 'Salesforce', category: 'Evaluation & benchmarking', kind: 'Machine learning', description: 'A cross-platform framework for evaluating LLMs and multimodal models on real mobile hardware. Measuring what matters beyond the leaderboard.', tags: ['LLMs / LMMs', 'iOS & Android', 'Quantization'], screenshot: 'images/projects/mobileaibench.png', screenshotAlt: 'MobileAIBench model selection and on-device benchmark results', contribution: 'Designed and open-sourced the iOS / Android benchmarking framework.', outcome: 'Evaluates LLMs and multimodal models across 4-, 8-, and 16-bit quantization.', label: 'Read the paper', href: 'https://arxiv.org/abs/2406.10290',
  },
  {
    title: 'Source Code Stylometry', affiliation: 'PICT', category: 'Applied machine learning', kind: 'Machine learning', description: 'Identifying code authors through their programming style. A full-stack research project combining neural networks with a Flask application.', tags: ['Python', 'Keras', 'Flask'], visual: 'code', contribution: 'Built an author-identification web application with a Flask REST API.', outcome: 'Research published at ICMLC 2021.', outcomeLabel: 'Outcome', label: 'Explore the project', href: 'https://github.com/tulika612/Code_Stylometry',
  },
];
const featured = [
  {
    title: 'Salesforce Koa',
    paperHref: 'https://arxiv.org/pdf/2609.15066',
    affiliation: 'Salesforce',
    category: 'Agentic model training',
    kind: 'Machine learning',
    description: 'A 120B CRM reasoning model post-trained from NVIDIA Nemotron-3-Super-120B.',
    tags: ['Post-training', 'Training data', '120B parameters'],
    visual: 'training',
    contribution: 'Prepared training data and contributed to model training.',
    outcome: 'CRM-focused reasoning; accepted at NeurIPS 2026.',
    outcomeLabel: 'Outcome',
    label: 'My Salesforce experience',
    href: '#experience-salesforce',
  },
  {
    title: 'Everse',
    affiliation: 'Salesforce',
    category: 'Multi-agent simulation',
    kind: 'Machine learning',
    description: 'A multi-agent customer simulation platform for modeling customer personas and interactions.',
    tags: ['Multi-agent systems', 'Persona generation', 'Evaluation'],
    visual: 'simulation',
    contribution: 'Advanced configurable personas and an end-to-end audio / transcript-to-persona workflow.',
    outcome: 'Behavioral fidelity metrics to evaluate simulation accuracy.',
    label: 'My Salesforce experience',
    href: '#experience-salesforce',
  },
  supportingWork[0],
];

function Arrow() {
  return (
    <svg className="link-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function Spark() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 5v54M5 32h54M13 13l38 38M13 51l38-38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
function ExternalLink({ href, children, className }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <Arrow />
    </a>
  );
}
function Heading({
  number, eyebrow, title, children,
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>
            {number}
            {' '}
            /
          </span>
          {' '}
          {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}
function ProjectVisual({ type }) {
  return (
    <div className={`project-visual visual-${type}`} aria-hidden="true">
      {type === 'training' && (
        <>
          <span className="visual-caption">KOA / CRM REASONING</span>
          <div className="training-diagram">
            <span className="model-source">NEMOTRON-3-SUPER-120B</span>
            <span className="diagram-connector">↓</span>
            <strong>
              120B
              <span>KOA</span>
            </strong>
            <span className="diagram-connector">↓</span>
            <span className="model-source">DATA → POST-TRAINING → REASONING</span>
          </div>
          <span className="visual-footnote">TRAINING DATA / MODEL TRAINING</span>
        </>
      )}
      {type === 'simulation' && (
        <>
          <span className="visual-caption">EVERSE / CUSTOMER SIMULATION</span>
          <div className="simulation-diagram">
            <span className="simulation-input">Audio / transcript</span>
            <span className="diagram-connector">↓</span>
            <div className="persona-nodes">
              {['Persona A', 'Persona B', 'Persona C'].map((persona) => (
                <span key={persona}>
                  <Spark />
                  {persona}
                </span>
              ))}
            </div>
            <span className="diagram-connector">↓</span>
            <span className="simulation-output">Behavioral fidelity evaluation</span>
          </div>
          <span className="visual-footnote">PERSONAS / INTERACTIONS / EVALUATION</span>
        </>
      )}
      {type === 'flow' && (
      <>
        <span className="visual-caption">INTELLIGENCE, ON DEVICE.</span>
        <div className="phone">
          <div className="phone-notch" />
          <span className="phone-symbol"><Spark /></span>
          <span>How can I help?</span>
          <div className="phone-task">
            Plan my afternoon
            <Arrow />
          </div>
          <div className="phone-task faint">
            3 actions · on device
            <span>✓</span>
          </div>
        </div>
        <span className="visual-footnote">xLAM-2 / LOCAL INFERENCE</span>
      </>
      )}
      {type === 'code' && (
      <>
        <span className="visual-caption">EVERY DEVELOPER HAS A SIGNATURE.</span>
        <div className="code-window">
          <div>
            <i />
            <i />
            <i />
          </div>
          <pre>
            <span>def</span>
            {' '}
            identify_author(code):
            {'\n'}
            {' '}
            features = encode(code)
            {'\n'}
            {' '}
            style = model(features)
            {'\n'}
            {' '}
            <span>return</span>
            {' '}
            style.signature
          </pre>
          <p>
            <i />
            {' '}
            A pattern in every line.
          </p>
        </div>
        <span className="visual-footnote">CODE → PATTERNS → AUTHOR</span>
      </>
      )}
    </div>
  );
}

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
ExternalLink.defaultProps = { className: '' };
Heading.propTypes = {
  number: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
ProjectVisual.propTypes = { type: PropTypes.string.isRequired };

export default function MainApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'; } catch { return 'dark'; } });
  const [data, setData] = useState({
    experiences: [], research: [], projects: [], education: [],
  });
  const [loadState, setLoadState] = useState('loading');
  const [filter, setFilter] = useState('Selected');
  const [showResearch, setShowResearch] = useState(false);
  const [expandedExperience, setExpandedExperience] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Storage may be unavailable. */ }
  }, [theme]);
  useEffect(() => {
    let active = true;
    Promise.all(['experiences', 'research', 'projects', 'education'].map(async (name) => {
      const response = await fetch(`${process.env.PUBLIC_URL || ''}/profile/${name}.json`);
      if (!response.ok) throw new Error('Profile data unavailable');
      const json = await response.json();
      return [name, json[name]];
    })).then((entries) => { if (active) { setData(Object.fromEntries(entries)); setLoadState('ready'); } })
      .catch(() => { if (active) setLoadState('error'); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!window.IntersectionObserver) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-15% 0px -60% 0px' });
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const archive = data.projects.map((project) => ({
    ...project, description: project.bodyText.replace(/(^|\n)\s*-\s*/g, ' ').replace(/\*\*/g, '').trim(), category: 'From the archive', kind: /Tensorflow|Keras|Transfer learning/.test(project.tags.join(' ')) ? 'Machine learning' : 'Software', href: project.links[0].href, label: project.links[0].text === 'GitHub' || project.links[0].text === 'Github' ? 'View source' : 'Explore project',
  }));
  let projects = featured;
  if (filter === 'Machine learning') {
    projects = [...featured, ...supportingWork.slice(1), ...archive.filter((project) => (
      project.kind === filter && project.title !== 'Source Code Stylometry'
    ))];
  } else if (filter === 'Software') {
    projects = archive.filter((project) => project.kind === 'Software');
  }

  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="nav-shell">
          <a href="#home" className="wordmark" aria-label="Tulika Awalgaonkar, home" onClick={() => setMenuOpen(false)}>
            <span className="wordmark-name">Tulika Awalgaonkar</span>
            <span className="wordmark-label">ENGINEER & RESEARCHER</span>
          </a>
          <nav id="primary-navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
            {navigation.map((item) => <a key={item} href={`#${item.toLowerCase()}`} aria-current={activeSection === item.toLowerCase() || (item === 'About' && activeSection === 'home') ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{item}</a>)}
            <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>
              Let’s talk
              <Arrow />
            </a>
          </nav>
          <div className="nav-tools">
            <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>{theme === 'light' ? '☾' : '☀'}</button>
            <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close −' : 'Menu +'}</button>
          </div>
        </div>
      </header>
      <main id="main">
        <section id="home" className="hero page-width">
          <div id="about" className="about-layout intro-layout">
            <div className="portrait-wrap">
              <img src={`${process.env.PUBLIC_URL || ''}/images/about/pro.png`} alt="Tulika Awalgaonkar" loading="eager" />
              <span className="portrait-caption mono">TULIKA AWALGAONKAR</span>
            </div>
            <div className="about-copy">
              <p className="eyebrow">
                MACHINE LEARNING ENGINEER · SALESFORCE
              </p>
              <h1>Hi, I’m Tulika.</h1>
              <p>
                I’m a machine learning engineer at Salesforce, working on agentic model training,
                multi-agent simulation, and language model systems.
              </p>
              <p>
                Before Salesforce, I was a founding engineer at Lamini, building LLM fine-tuning
                and inference infrastructure. My path has taken me through GPU
                benchmarking at VMware, computer vision, and a master’s in Computer
                Science at UC Irvine.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">
                  Explore my work
                  <span className="down-right" aria-hidden="true"><Arrow /></span>
                </a>
                <ExternalLink href={resume} className="text-link">View résumé</ExternalLink>
              </div>
              <div id="education" className="education-list">
                {data.education.map((education, index) => (
                  <div key={education.cardTitle}>
                    <span className="mono">{index === 0 ? 'M.S.' : 'UG'}</span>
                    <div>
                      <strong>{index === 0 ? 'University of California, Irvine' : education.cardSubtitle}</strong>
                      <span>
                        Computer Science ·
                        {' '}
                        {education.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="recent-highlights" aria-label="Recent work and engineering highlights">
            <p className="eyebrow">WORK IN FOCUS</p>
            <div className="highlights-grid">
              <a href="#work" className="highlight-item">
                <span className="eyebrow">KOA · AGENTIC MODEL TRAINING</span>
                <strong>
                  120B reasoning model
                  <Arrow />
                </strong>
                <p>Training data preparation and model training for CRM reasoning.</p>
              </a>
              <a href="#work" className="highlight-item">
                <span className="eyebrow">EVERSE · MULTI-AGENT SIMULATION</span>
                <strong>
                  Personas to behavior
                  <Arrow />
                </strong>
                <p>Customer persona generation and behavioral fidelity evaluation.</p>
              </a>
              <a href="#experience" className="highlight-item">
                <span className="eyebrow">ML INFRASTRUCTURE AT LAMINI</span>
                <strong>
                  13B → 70B
                  <Arrow />
                </strong>
                <p>Enabled larger-model inference with multi-GPU support.</p>
              </a>
            </div>
          </div>
        </section>
        <div className="credentials-strip">
          <div className="page-width">
            <span className="eyebrow">A FEW STOPS ALONG THE WAY</span>
            <div>
              <a href="#experience-salesforce" onClick={() => setExpandedExperience(0)}>
                Salesforce
                <small>AI Research</small>
              </a>
              <a href="#experience-lamini-ai" onClick={() => setExpandedExperience(1)}>
                Lamini
                <small>Founding Engineer</small>
              </a>
              <a href="#experience-vmware-inc" onClick={() => setExpandedExperience(2)}>
                VMware
                <small>ML Systems</small>
              </a>
              <a href="#education">
                UC Irvine
                <small>M.S. Computer Science</small>
              </a>
            </div>
          </div>
        </div>
        <section id="work" className="section page-width">
          <Heading
            number="01"
            eyebrow="SELECTED WORK"
            title={(
              <>
                Research into reality
                <span className="accent">.</span>
              </>
)}
          >
            Training reasoning models, building agentic simulations, and bringing models into
            real applications. A selection of my contributions.
          </Heading>
          <div className="work-toolbar">
            <div className="filter-group" role="group" aria-label="Filter projects">{['Selected', 'Machine learning', 'Software'].map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
            <span className="mono work-count">
              {String(projects.length).padStart(2, '0')}
              {' '}
              PROJECTS
            </span>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="work-card" key={project.title}>
                {project.screenshot ? (
                  <a
                    className="project-screenshot"
                    href={`${process.env.PUBLIC_URL || ''}/${project.screenshot}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View full screenshot of ${project.title}`}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL || ''}/${project.screenshot}`}
                      alt={project.screenshotAlt}
                      loading="lazy"
                    />
                    <span>
                      View full screenshot
                      <Arrow />
                    </span>
                  </a>
                ) : project.visual && <ProjectVisual type={project.visual} />}
                {!project.screenshot && !project.visual && (
                  <div className="archive-visual">
                    <img src={`${process.env.PUBLIC_URL || ''}/${project.image}`} alt="" loading="lazy" />
                  </div>
                )}
                <div className="work-content">
                  <p className="eyebrow">
                    {project.category}
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </p>
                  {project.affiliation && <p className="project-affiliation">{project.affiliation}</p>}
                  <h3>{project.title}</h3>
                  <p className="work-description">{project.description}</p>
                  {project.contribution && (
                    <dl className="project-contribution">
                      <dt>My contribution</dt>
                      <dd>{project.contribution}</dd>
                      <dt>{project.outcomeLabel || 'What it enables'}</dt>
                      <dd>{project.outcome}</dd>
                    </dl>
                  )}
                  <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  {project.href.startsWith('#') ? (
                    <a href={project.href} className="project-link" onClick={() => setExpandedExperience(0)}>
                      {project.label}
                      <Arrow />
                    </a>
                  ) : (
                    <ExternalLink href={project.href} className="project-link">{project.label}</ExternalLink>
                  )}
                  {project.paperHref && (
                    <ExternalLink href={project.paperHref} className="project-paper-link">
                      Read paper
                    </ExternalLink>
                  )}
                </div>
              </article>
            ))}
          </div>
          {loadState === 'loading' && filter !== 'Selected' && <p role="status" className="data-notice">Loading the project archive…</p>}
        </section>
        <section id="experience" className="section page-width">
          <Heading
            number="02"
            eyebrow="THE JOURNEY"
            title={(
              <>
                Built on experience
                <span className="accent">.</span>
              </>
)}
          >
            Across research teams and early-stage startups, connecting the model to the system
            around it.
          </Heading>
          <div className="experience-layout">
            <div className="experience-aside">
              <span className="large-asterisk" aria-hidden="true"><Spark /></span>
              <p>
                From the first experiment
                <br />
                to the last mile.
              </p>
              <ExternalLink href={resume} className="text-link">The full résumé</ExternalLink>
            </div>
            <div className="experience-list">
              {data.experiences.map((job, index) => (
                <article id={`experience-${job.subtitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}`} className="experience-item" key={job.subtitle}>
                  <div className="experience-line">
                    <span className="mono">{job.dateText}</span>
                    {index === 0 && (
                    <span className="current-badge">
                      <i />
                      {' '}
                      CURRENT
                    </span>
                    )}
                  </div>
                  <h3>{job.subtitle}</h3>
                  <p className="job-title">{job.title}</p>
                  <p className="job-summary">{job.workDescription[0]}</p>
                  <button type="button" className="text-button" aria-expanded={expandedExperience === index} aria-controls={`job-${index}`} onClick={() => setExpandedExperience(expandedExperience === index ? null : index)}>{expandedExperience === index ? 'Less detail −' : 'More about this role +'}</button>
                  <div id={`job-${index}`} hidden={expandedExperience !== index}><ul>{job.workDescription.slice(1).map((description) => <li key={description}>{description}</li>)}</ul></div>
                </article>
              ))}
            </div>
          </div>
          {loadState === 'loading' && <p role="status" className="data-notice">Loading experience…</p>}
        </section>
        <section id="research" className="research-section">
          <div className="page-width section">
            <Heading
              number="03"
              eyebrow="RESEARCH & PUBLICATIONS"
              title={(
                <>
                  Questions worth pursuing
                  <span className="accent">.</span>
                </>
)}
            >
              Exploring how models reason, use tools, and understand the people they’re built for.
            </Heading>
            <div className="publication-list">
              {(showResearch ? data.research : data.research.slice(0, 4)).map((paper, index) => (
                <article className="publication" key={paper.title}>
                  <span className="publication-index mono">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="eyebrow">
                      {paper.venue}
                      {' '}
                      <span>
                        {' '}
                        /
                        {paper.year}
                      </span>
                    </p>
                    <h3><a href={paper.links[0].href} target="_blank" rel="noopener noreferrer">{paper.title}</a></h3>
                    <details>
                      <summary>Authors</summary>
                      <p>{paper.authors}</p>
                    </details>
                  </div>
                  <a className="paper-arrow" href={paper.links[0].href} target="_blank" rel="noopener noreferrer" aria-label={`Read paper: ${paper.title}`}><Arrow /></a>
                </article>
              ))}
            </div>
            {loadState === 'loading' && <p role="status" className="data-notice">Loading publications…</p>}
            <div className="section-bottom">
              {data.research.length > 4 && <button type="button" className="text-button" onClick={() => setShowResearch(!showResearch)}>{showResearch ? 'Show fewer publications −' : `All ${data.research.length} publications +`}</button>}
              <ExternalLink href={social[2][1]} className="text-link">Find me on Google Scholar</ExternalLink>
            </div>
          </div>
        </section>
        {loadState === 'error' && (
        <div className="data-notice page-width" role="alert">
          Some profile details couldn’t load. Please refresh the page, or explore my work on
          <a href={social[0][1]}>GitHub</a>
          {' '}
          and
          <a href={social[2][1]}>Google Scholar</a>
          .
        </div>
        )}
        <section id="contact" className="contact-section section page-width">
          <p className="eyebrow">
            <span className="status-dot" />
            {' '}
            LET’S CONNECT
          </p>
          <div className="contact-heading">
            <h2>
              Good things start
              <br />
              with a
              {' '}
              <em>conversation.</em>
            </h2>
            <a className="contact-circle" href="mailto:tawalgao@uci.edu" aria-label="Email Tulika"><Arrow /></a>
          </div>
          <div className="contact-bottom">
            <p>
              Have an interesting problem, a research idea,
              <br />
              or just want to say hello? I’d love to hear from you.
            </p>
            <a className="email-link" href="mailto:tawalgao@uci.edu">
              tawalgao@uci.edu
              <Arrow />
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer page-width">
        <a className="wordmark" href="#home">
          <span className="wordmark-name">Tulika Awalgaonkar</span>
        </a>
        <p>Always learning. Always building.</p>
        <div>
          {social.map(([name, href]) => (
            <ExternalLink key={name} href={href}>{name}</ExternalLink>
          ))}
        </div>
        <a className="back-top" href="#home" aria-label="Back to top">↑</a>
      </footer>
    </div>
  );
}
