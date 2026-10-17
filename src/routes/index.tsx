import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import apiHealthMonitorScreenshot from "@/assets/api-health-monitor.png.asset.json";
import socialMediaAnalyzerScreenshot from "@/assets/social-media-analyzer.png.asset.json";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Bot,
  Braces,
  Check,
  Code2,
  Coffee,
  Database,
  FileText,
  Github,
  Globe2,
  GraduationCap,
  Linkedin,
  LoaderCircle,
  Mail,
  Menu,
  MonitorUp,
  Network,
  ScanText,
  Send,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const emailAddress = "anishbhaktula@gmail.com";
const githubUrl = "https://github.com/anishWkx";
const linkedinUrl = "https://www.linkedin.com/in/anish-bhaktula-b3b307286/";
const resumeUrl = "https://drive.google.com/file/d/1ztjrFEsGCQN_yxSjfCgOnWCy2MaNmbzy/view?usp=drive_link";
const navigation = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Services", "services"],
  ["Contact", "contact"],
] as const;

const skillGroups = [
  { title: "Frontend", icon: MonitorUp, skills: ["HTML", "CSS", "JavaScript", "React.js", "Bootstrap"] },
  { title: "Backend", icon: Braces, skills: ["Node.js", "Express.js", "REST APIs"] },
  { title: "Data", icon: Database, skills: ["MongoDB", "SQL"] },
  { title: "Programming", icon: Code2, skills: ["Java"] },
  { title: "Tools", icon: Github, skills: ["Git", "GitHub"] },
  { title: "AI & automation", icon: Workflow, skills: ["LLM integrations", "OCR", "AI workflow automation"] },
];

const projects = [
  {
    number: "01",
    title: "Social Media Content Analyzer",
    description:
      "A web application that extracts text from images and PDFs, then turns it into useful content insights, a score, and suggestions.",
    tags: ["React.js", "JavaScript", "Node.js", "Express.js", "Tesseract OCR"],
    icon: ScanText,
    preview: "ocr",
    screenshot: socialMediaAnalyzerScreenshot.url,
    features: ["Image and PDF text extraction", "Automated content insights", "Content scores and suggestions"],
    liveUrl: "https://social-media-content-analyzer-nine-xi.vercel.app/",
    repositoryUrl: "https://github.com/anishWkx/social-media-content-analyzer",
    featured: true,
  },
  {
    number: "02",
    title: "API Health & Performance Monitor",
    description:
      "A full-stack monitoring dashboard for checking API availability, measuring response times, and spotting slow or failed endpoints.",
    tags: ["React.js", "JavaScript", "Node.js", "Express.js", "REST APIs"],
    icon: Network,
    preview: "monitor",
    screenshot: apiHealthMonitorScreenshot.url,
    features: ["API health checks", "Response-time measurement", "Slow and failed endpoint detection"],
    liveUrl: "https://api-health-performance-monitor-eight.vercel.app/",
    repositoryUrl: "https://github.com/anishWkx/APIHealthPerformanceMonitor",
    featured: false,
  },
];

const services = [
  {
    icon: Code2,
    index: "01",
    title: "Full-stack web development",
    description: "Responsive web apps, from clear interfaces to connected backend features.",
  },
  {
    icon: Bot,
    index: "02",
    title: "AI-powered applications",
    description: "Practical AI and language-model integrations for everyday applications.",
  },
  {
    icon: Workflow,
    index: "03",
    title: "Workflow automation",
    description: "Connect everyday steps and cut down on repetitive work with automation.",
  },
  {
    icon: Network,
    index: "04",
    title: "APIs & monitoring",
    description: "REST APIs and monitoring tools for checking availability and response times.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bhaktula Anish — Full-Stack Developer & Portfolio" },
      {
        name: "description",
        content:
          "The portfolio of Bhaktula Anish: a VIT-AP student and full-stack developer exploring practical web applications, AI, and automation.",
      },
      { property: "og:title", content: "Bhaktula Anish — Full-Stack Developer & Portfolio" },
      {
        property: "og:description",
        content:
          "Full-stack development, practical problem-solving, and AI-powered applications by Bhaktula Anish.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactNotice, setContactNotice] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [contactStatus, setContactStatus] = useState<"success" | "error" | "">("");

  async function sendContactMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const name = String(values.get("name") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const subject = String(values.get("subject") ?? "").trim();
    const message = String(values.get("message") ?? "").trim();

    setIsSending(true);
    setContactNotice("");
    setContactStatus("");

    try {
      await emailjs.send(
        "service_8iguigi",
        "template_cz9v3tj",
        {
          name,
          from_name: name,
          email,
          from_email: email,
          subject,
          message,
          reply_to: email,
        },
        { publicKey: "lJaq45k2IKTIuegKi" },
      );
      form.reset();
      setContactStatus("success");
      setContactNotice("Thanks for reaching out — your message has been sent.");
    } catch {
      setContactStatus("error");
      setContactNotice("Your message couldn’t be sent. Please try again; your details are still here.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main id="home" className="portfolio-shell min-h-screen bg-background text-foreground">
      <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
          <a className="wordmark" href="#home" aria-label="Bhaktula Anish — home">
            <span className="wordmark-symbol">a.</span>
            <span>BHATKULA ANISH</span>
          </a>
          <div className="nav-links">
            {navigation.map(([label, id]) => (
              <a className={id === "home" ? "nav-link nav-link-current" : "nav-link"} href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </div>
          <a className="nav-contact" href="#contact">
            Let’s talk <ArrowUpRight aria-hidden="true" />
          </a>
          <Button
            className="mobile-menu-toggle"
            variant="outline"
            size="icon"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </nav>
        {menuOpen && (
          <div className="mobile-menu">
            {navigation.map(([label, id]) => (
              <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
                {label} <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </header>

      <section className="hero-section site-frame" aria-labelledby="hero-title">
        <div className="hero-main">
          <div className="hero-copy">
            <a className="availability" href="#contact">
              <span className="availability-dot" />
              OPEN TO OPPORTUNITIES
            </a>
            <p className="eyebrow hero-eyebrow">FULL-STACK DEVELOPER · VIT-AP ’27</p>
            <h1 id="hero-title">Hey, I’m Anish.<br />I like making <span>things work.</span></h1>
            <p className="hero-intro">
              I enjoy taking a problem from a rough idea to a useful, responsive product—bringing together thoughtful
              interfaces, practical backend features, and automation. I’m always looking for opportunities to learn,
              contribute, and build things people can rely on.
            </p>
            <div className="hero-actions">
              <Button asChild className="button-amber" size="lg">
                <a href="#projects">View my work <ArrowRight aria-hidden="true" /></a>
              </Button>
              <Button asChild className="button-soft" variant="outline" size="lg">
                <a href="#contact">Contact me <ArrowUpRight aria-hidden="true" /></a>
              </Button>
            </div>
            <div className="hero-socials" aria-label="Social profiles">
              <a href={githubUrl} target="_blank" rel="noreferrer"><Github aria-hidden="true" /> GitHub <ArrowUpRight aria-hidden="true" /></a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>

          <div className="portrait-wrap" aria-label="Profile photo placeholder; replace with your portrait">
            <div className="portrait-backdrop" />
            <div className="portrait-grid-mark">A<span>.</span></div>
            <div className="portrait-panel">
              <span className="portrait-caption"><Sparkles aria-hidden="true" /> YOUR PORTRAIT GOES HERE</span>
              <div className="portrait-initials" aria-hidden="true">BA</div>
              <span className="portrait-edit-note">A space for a photo, when you’re ready.</span>
            </div>
            <div className="portrait-note"><span>Building useful things</span><ArrowDownRight aria-hidden="true" /></div>
            <div className="floating-stamp"><span>CODE</span><Braces aria-hidden="true" /><span>CREATE</span></div>
          </div>

          <span className="hero-index">001 <span>—</span> 007</span>
        </div>
        <div className="ticker" aria-label="Areas of interest">
          <div className="ticker-track">
            {["FULL-STACK DEVELOPMENT", "AI & LLMs", "PRACTICAL PROBLEM-SOLVING", "WORKFLOW AUTOMATION", "FULL-STACK DEVELOPMENT", "AI & LLMs", "PRACTICAL PROBLEM-SOLVING", "WORKFLOW AUTOMATION"].map((item, index) => (
              <span key={`${item}-${index}`}>{item}<i aria-hidden="true">✳</i></span>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-section site-frame section-pad">
        <div className="section-intro">
          <p className="eyebrow"><span className="section-dot" /> A BIT ABOUT ME</p>
          <h2>Curious by nature.<br /><span>Practical by default.</span></h2>
        </div>
        <div className="about-content">
          <p className="about-lead">
            I’m a final-year <strong>B.Tech Computer Science and Business Systems</strong> student at VIT-AP University,
            graduating in 2027. I enjoy turning real-world problems into useful, thoughtful applications.
          </p>
          <p className="about-detail">
            I’m drawn to full-stack development, AI-powered products, workflow automation, and the backend systems
            that make software dependable. I like learning by building—and making the everyday a little easier.
          </p>
          <p className="about-detail">
            During my internship, I contributed to web, content, and branding work; through CSI at VIT-AP, I’ve also
            taken on a student leadership role. These experiences have helped me appreciate clear communication,
            collaboration, and the care it takes to turn an idea into something useful.
          </p>
          <a className="resume-callout" href={resumeUrl} target="_blank" rel="noreferrer">
            <span className="resume-icon"><FileText aria-hidden="true" /></span>
            <span className="resume-copy"><span className="resume-kicker">A CLOSER LOOK</span><strong>Explore my resume</strong><small>Experience, education & skills</small></span>
            <ArrowUpRight className="resume-arrow" aria-hidden="true" />
          </a>
          <a href="#experience" className="inline-arrow-link">A little more about my journey <ArrowDownRight aria-hidden="true" /></a>
          <div className="about-highlights">
            <div><Sparkles aria-hidden="true" /><span>AI & intelligent apps</span></div>
            <div><Workflow aria-hidden="true" /><span>Useful automation</span></div>
            <div><Network aria-hidden="true" /><span>APIs that connect</span></div>
          </div>
        </div>
        <div className="about-orbit" aria-hidden="true"><span>LEARN</span><span>BUILD</span><span>REPEAT</span><Coffee /></div>
      </section>

      <section id="skills" className="skills-section section-pad">
        <div className="site-frame">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow"><span className="section-dot" /> WHAT I WORK WITH</p>
              <h2>My toolkit<span className="title-period">.</span></h2>
            </div>
            <p className="heading-note">Tools I’ve explored while building<br />practical software and learning along the way.</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map(({ title, icon: Icon, skills }, index) => (
              <article className="skill-group" key={title}>
                <div className="skill-heading"><span className="skill-icon"><Icon aria-hidden="true" /></span><span className="skill-index">0{index + 1}</span></div>
                <h3>{title}</h3>
                <div className="skill-tags">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="experience-section site-frame section-pad">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow"><span className="section-dot" /> EXPERIENCE & LEADERSHIP</p>
            <h2>Learning by doing.<br /><span>Building as I go.</span></h2>
          </div>
          <p className="heading-note">An internship, student leadership, and<br />hands-on learning at university.</p>
        </div>
        <div className="experience-list">
          <article className="experience-item">
            <div className="experience-date">2024 <span>—</span> 2025</div>
            <div className="experience-symbol"><Globe2 aria-hidden="true" /></div>
            <div className="experience-description">
              <p className="experience-type">INTERNSHIP</p>
              <h3>Marketing & Web Development Intern</h3>
              <p className="experience-company">Prayana Electric Pvt. Ltd.</p>
              <p className="experience-copy">Contributed to website improvements and content, alongside branding and marketing work such as wireframes and graphics. Collaborated with stakeholders on web development and communication activities.</p>
            </div>
            <ArrowUpRight className="experience-arrow" aria-hidden="true" />
          </article>
          <article className="experience-item">
            <div className="experience-date experience-date-unspecified">UNSPECIFIED</div>
            <div className="experience-symbol"><Network aria-hidden="true" /></div>
            <div className="experience-description">
              <p className="experience-type">LEADERSHIP</p>
              <h3>Director</h3>
              <p className="experience-company">Computer Society of India · VIT-AP University</p>
              <p className="experience-copy">Learning to support the Computer Society of India chapter at VIT-AP through a student leadership role.</p>
            </div>
            <ArrowUpRight className="experience-arrow" aria-hidden="true" />
          </article>
        </div>
        <div className="education-strip">
          <span className="education-icon"><GraduationCap aria-hidden="true" /></span>
          <div><p className="experience-type">EDUCATION</p><h3>B.Tech in Computer Science and Business Systems</h3><p>VIT-AP University <span>·</span> Final-year student <span>·</span> Expected 2027</p></div>
          <span className="education-date">2027 <ArrowUpRight aria-hidden="true" /></span>
        </div>
      </section>

      <section id="projects" className="projects-section section-pad">
        <div className="site-frame">
          <div className="section-heading-row projects-heading">
            <div>
              <p className="eyebrow"><span className="section-dot" /> A FEW THINGS I’VE BUILT</p>
              <h2>Selected work<span className="title-period">.</span></h2>
            </div>
            <p className="heading-note">A closer look at how I approach<br />real problems with practical software.</p>
          </div>
          <div className="projects-list">
            {projects.map(({ number, title, description, tags, icon: Icon, preview, screenshot, features, featured, liveUrl, repositoryUrl }) => (
              <article className={`project-card${featured ? " project-featured" : ""}`} key={number}>
                <div className={`project-preview preview-${preview}`} aria-label={`Replaceable ${title} project preview placeholder`}>
                  <img className="project-screen-image" src={screenshot} alt={`${title} live application screenshot`} loading="lazy" />
                  <div className="preview-topline"><span><i /> LIVE APPLICATION</span><span>{number} / 02</span></div>
                </div>
                <div className="project-details">
                  <div className="project-title-row"><span className="project-number">{number}</span><h3>{title}</h3>{featured && <span className="featured-chip"><Sparkles aria-hidden="true" /> FEATURED</span>}</div>
                  <p className="project-description">{description}</p>
                  <div className="project-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <ul className="project-features">{features.map((feature) => <li key={feature}><Check aria-hidden="true" /> {feature}</li>)}</ul>
                  <div className="project-links">{liveUrl ? <a className="project-repository-link" href={liveUrl} target="_blank" rel="noreferrer"><Globe2 aria-hidden="true" /> Open live app <ArrowUpRight aria-hidden="true" /></a> : <span className="project-link-unavailable" title="A live project link has not been provided">Live project <ArrowUpRight aria-hidden="true" /><small>NOT PROVIDED</small></span>}<a className="project-repository-link" href={repositoryUrl} target="_blank" rel="noreferrer"><Github aria-hidden="true" /> View repository <ArrowUpRight aria-hidden="true" /></a></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="services-section site-frame section-pad">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow"><span className="section-dot" /> HOW I CAN CONTRIBUTE</p>
            <h2>Let’s build something<br /><span>useful together.</span></h2>
          </div>
          <a href="#contact" className="service-contact-link">Have a project in mind? <ArrowUpRight aria-hidden="true" /></a>
        </div>
        <p className="services-intro">I’m keen to work on real problems, learn through collaboration, and turn good ideas into useful digital experiences.</p>
        <div className="services-grid">
          {services.map(({ icon: Icon, index, title, description }) => (
            <article className="service-item" key={index}>
              <div className="service-item-top"><span>{index}</span><Icon aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{description}</p>
              <a href="#contact" aria-label={`Ask about ${title}`}><ArrowRight aria-hidden="true" /></a>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section section-pad">
        <div className="site-frame contact-layout">
          <div className="contact-copy">
            <p className="eyebrow"><span className="section-dot" /> START A CONVERSATION</p>
            <h2>Got a good<br />problem? <span>Let’s solve it.</span></h2>
            <p className="contact-lead">For opportunities, interesting ideas, or a nice conversation about building things—my inbox is open.</p>
            <a className="contact-email" href={`mailto:${emailAddress}`}><AtSign aria-hidden="true" />{emailAddress}<ArrowUpRight aria-hidden="true" /></a>
            <div className="contact-socials">
              <a href={githubUrl} target="_blank" rel="noreferrer"><Github aria-hidden="true" /> GitHub <ArrowUpRight aria-hidden="true" /></a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn <ArrowUpRight aria-hidden="true" /></a>
            </div>
            <div className="contact-stamp"><Mail aria-hidden="true" /><span>ALL GOOD<br />THINGS START<br />WITH A HELLO.</span></div>
          </div>
          <form className="contact-form" onSubmit={sendContactMessage} aria-busy={isSending}>
            <div className="contact-form-heading"><span>01 — SAY HELLO</span><ArrowDownRight aria-hidden="true" /></div>
            <h3>Have something in mind?</h3>
            <p>Your message will be sent directly to my inbox.</p>
            <div className="form-field"><Label htmlFor="name">Your name</Label><Input id="name" name="name" autoComplete="name" placeholder="What should I call you?" minLength={2} maxLength={100} required /></div>
            <div className="form-field"><Label htmlFor="email">Your email</Label><Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required /></div>
            <div className="form-field"><Label htmlFor="subject">Subject</Label><Input id="subject" name="subject" placeholder="What’s on your mind?" minLength={2} maxLength={150} required /></div>
            <div className="form-field"><Label htmlFor="message">Your message</Label><Textarea id="message" name="message" placeholder="A little context goes a long way…" minLength={10} maxLength={3000} rows={4} required /></div>
            <Button type="submit" className="button-amber contact-submit" size="lg" disabled={isSending}>
              {isSending ? "Sending…" : "Send message"}
              {isSending ? <LoaderCircle className="contact-spinner animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
            </Button>
            <p className={`contact-notice${contactStatus ? ` contact-notice-${contactStatus}` : ""}`} role="status" aria-live="polite">{contactNotice}</p>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-frame footer-main">
          <a className="wordmark footer-wordmark" href="#home"><span className="wordmark-symbol">a.</span><span>BHATKULA ANISH</span></a>
          <p>Made thoughtfully, one problem at a time.</p>
          <div className="footer-socials"><a href={githubUrl} target="_blank" rel="noreferrer" aria-label="Anish on GitHub"><Github aria-hidden="true" /></a><a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="Anish on LinkedIn"><Linkedin aria-hidden="true" /></a><a href={`mailto:${emailAddress}`} aria-label="Email Anish"><Mail aria-hidden="true" /></a></div>
        </div>
        <div className="site-frame footer-bottom"><span>© {new Date().getFullYear()} Bhaktula Anish</span><a href="#home">Back to the top <ArrowLeft aria-hidden="true" /></a><span>BUILT WITH CURIOSITY <Sparkles aria-hidden="true" /></span></div>
      </footer>
    </main>
  );
}