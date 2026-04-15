import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Cpu, 
  Globe, 
  Zap,
  ChevronRight,
  Terminal,
  Briefcase,
  GraduationCap,
  FileDown,
  Edit2,
  Check
} from 'lucide-react';
import NotificationSystem from './components/NotificationSystem';
import Navbar from './components/layout/Navbar';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { PROJECTS, SKILLS, EXPERIENCE, EDUCATION } from './data/portfolio';
import { Notification } from './types';

function PortfolioContent() {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || 'YOUR NAME');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);

  // Editable Projects and Experience
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : PROJECTS;
  });
  const [experience, setExperience] = useState(() => {
    const saved = localStorage.getItem('experience');
    return saved ? JSON.parse(saved) : EXPERIENCE;
  });
  const [education, setEducation] = useState(() => {
    const saved = localStorage.getItem('education');
    return saved ? JSON.parse(saved) : EDUCATION;
  });

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null);
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null);

  // Editable Links
  const [githubUrl, setGithubUrl] = useState(() => localStorage.getItem('githubUrl') || 'https://github.com');
  const [emailAddress, setEmailAddress] = useState(() => localStorage.getItem('emailAddress') || 'hello@nova.systems');
  const [resumeUrl, setResumeUrl] = useState(() => localStorage.getItem('resumeUrl') || '/resume.pdf');

  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [tempLinks, setTempLinks] = useState({ github: githubUrl, email: emailAddress, resume: resumeUrl });

  useEffect(() => {
    addNotification('Welcome to Nova Portfolio v2.0', 'info');
  }, []);

  const addNotification = (message: string, type: Notification['type'] = 'info') => {
    const id = Math.random().toString(36).substring(7);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    addNotification('Interface re-synchronized', 'success');
  };

  const handleSaveName = () => {
    setUserName(tempName);
    localStorage.setItem('userName', tempName);
    setIsEditingName(false);
    addNotification('Name updated successfully', 'success');
  };

  const handleSaveProject = (updatedProject: any) => {
    const newProjects = projects.map((p: any) => p.id === updatedProject.id ? updatedProject : p);
    setProjects(newProjects);
    localStorage.setItem('projects', JSON.stringify(newProjects));
    setEditingProjectId(null);
    addNotification('Project updated', 'success');
  };

  const handleSaveExperience = (updatedExp: any) => {
    const newExperience = experience.map((e: any) => e.id === updatedExp.id ? updatedExp : e);
    setExperience(newExperience);
    localStorage.setItem('experience', JSON.stringify(newExperience));
    setEditingExperienceId(null);
    addNotification('Experience updated', 'success');
  };

  const handleSaveEducation = (updatedEdu: any) => {
    const newEducation = education.map((e: any) => e.id === updatedEdu.id ? updatedEdu : e);
    setEducation(newEducation);
    localStorage.setItem('education', JSON.stringify(newEducation));
    setEditingEducationId(null);
    addNotification('Education updated', 'success');
  };

  const handleSaveLinks = () => {
    setGithubUrl(tempLinks.github);
    setEmailAddress(tempLinks.email);
    setResumeUrl(tempLinks.resume);
    localStorage.setItem('githubUrl', tempLinks.github);
    localStorage.setItem('emailAddress', tempLinks.email);
    localStorage.setItem('resumeUrl', tempLinks.resume);
    setIsEditingLinks(false);
    addNotification('Links updated successfully', 'success');
  };

  return (
    <div className="min-h-screen selection:bg-accent/30 overflow-x-hidden transition-colors duration-700">
      {/* Background Grid & Animated Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Animated Glowing Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full transition-colors duration-700" 
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0], 
            y: [0, 100, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full transition-colors duration-700" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [0.8, 1, 0.8]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full transition-colors duration-700" 
        />
      </div>

      <Navbar onRefresh={handleRefresh} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-32">
        <AnimatePresence mode="wait">
          <motion.div key={refreshKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            
            {/* Hero Section */}
            <section className="mb-32">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono mb-6"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  SYSTEMS ONLINE: V2.0.4
                </motion.div>
                
                <div className="relative group mb-8">
                  {isEditingName ? (
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="text-6xl md:text-8xl font-black tracking-tighter bg-transparent border-b-4 border-accent outline-none w-full leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 glow-text"
                        autoFocus
                      />
                      <button 
                        onClick={handleSaveName}
                        className="p-4 glass hover:bg-accent hover:text-white rounded-2xl transition-all"
                      >
                        <Check className="w-8 h-8" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4">
                      <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 glow-text uppercase"
                      >
                        {userName}
                      </motion.h1>
                      <button 
                        onClick={() => setIsEditingName(true)}
                        className="opacity-0 group-hover:opacity-100 p-2 glass hover:bg-accent hover:text-white rounded-xl transition-all mt-2"
                        title="Edit Name"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed transition-colors duration-700"
                >
                  Full-stack engineer specializing in building high-performance, 
                  scalable applications with a focus on futuristic UI/UX and 
                  cutting-edge technologies.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-4 relative group/links"
                >
                  {isEditingLinks ? (
                    <div className="w-full glass p-6 rounded-2xl border border-accent/50 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-accent uppercase">GitHub URL</label>
                          <input 
                            className="w-full bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded text-sm"
                            value={tempLinks.github}
                            onChange={(e) => setTempLinks({ ...tempLinks, github: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-accent uppercase">Email Address</label>
                          <input 
                            className="w-full bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded text-sm"
                            value={tempLinks.email}
                            onChange={(e) => setTempLinks({ ...tempLinks, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-accent uppercase">Resume Path</label>
                          <input 
                            className="w-full bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded text-sm"
                            value={tempLinks.resume}
                            onChange={(e) => setTempLinks({ ...tempLinks, resume: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={handleSaveLinks}
                          className="px-4 py-2 bg-accent text-white rounded-lg flex items-center gap-2 text-sm font-bold"
                        >
                          <Check className="w-4 h-4" /> Save Links
                        </button>
                        <button 
                          onClick={() => {
                            setTempLinks({ github: githubUrl, email: emailAddress, resume: resumeUrl });
                            setIsEditingLinks(false);
                          }}
                          className="px-4 py-2 glass rounded-lg text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button 
                        onClick={() => setIsEditingLinks(true)}
                        className="absolute -top-12 right-0 opacity-0 group-hover/links:opacity-100 p-2 glass hover:bg-accent hover:text-white rounded-xl transition-all"
                        title="Edit Links"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          const element = document.getElementById('projects');
                          if (element) {
                            const offset = 80;
                            const bodyRect = document.body.getBoundingClientRect().top;
                            const elementRect = element.getBoundingClientRect().top;
                            const elementPosition = elementRect - bodyRect;
                            const offsetPosition = elementPosition - offset;
                            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                          }
                        }}
                        className="px-8 py-4 bg-accent hover:bg-cyan-400 text-white font-bold rounded-xl flex items-center gap-2 transition-all group"
                      >
                        View Projects <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <a 
                        href={resumeUrl} 
                        download="Resume.pdf"
                        className="px-8 py-4 glass hover:bg-black/5 dark:hover:bg-white/10 font-bold rounded-xl flex items-center gap-2 transition-all group"
                      >
                        Download Resume <FileDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                      </a>
                      <div className="flex items-center gap-2">
                        <a 
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 glass hover:bg-black/5 dark:hover:bg-white/20 rounded-xl transition-all active:scale-90"
                        >
                          <Github className="w-6 h-6" />
                        </a>
                        <a 
                          href={`mailto:${emailAddress}`}
                          className="p-4 glass hover:bg-black/5 dark:hover:bg-white/20 rounded-xl transition-all active:scale-90"
                        >
                          <Mail className="w-6 h-6" />
                        </a>
                        {[Twitter, Linkedin].map((Icon, i) => (
                          <button key={i} className="p-4 glass hover:bg-black/5 dark:hover:bg-white/20 rounded-xl transition-all active:scale-90">
                            <Icon className="w-6 h-6" />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="mb-32">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-sm font-mono text-accent mb-2 uppercase tracking-widest">Career Path</h2>
                  <h3 className="text-4xl font-bold tracking-tight">Professional Experience</h3>
                </div>
              </div>

              <div className="space-y-8">
                {experience.map((exp: any, idx: number) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="glass p-8 rounded-2xl border border-border-subtle hover:border-accent/30 transition-all flex flex-col md:flex-row gap-6 relative group"
                  >
                    {editingExperienceId === exp.id ? (
                      <div className="w-full space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input 
                            className="bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded"
                            defaultValue={exp.company}
                            onChange={(e) => exp.company = e.target.value}
                            placeholder="Company"
                          />
                          <input 
                            className="bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded"
                            defaultValue={exp.role}
                            onChange={(e) => exp.role = e.target.value}
                            placeholder="Role"
                          />
                          <input 
                            className="bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded"
                            defaultValue={exp.period}
                            onChange={(e) => exp.period = e.target.value}
                            placeholder="Period"
                          />
                        </div>
                        <textarea 
                          className="w-full bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded h-24"
                          defaultValue={exp.description}
                          onChange={(e) => exp.description = e.target.value}
                          placeholder="Description"
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleSaveExperience(exp)}
                            className="px-4 py-2 bg-accent text-white rounded-lg flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" /> Save
                          </button>
                          <button 
                            onClick={() => setEditingExperienceId(null)}
                            className="px-4 py-2 glass rounded-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <button 
                          onClick={() => setEditingExperienceId(exp.id)}
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 glass hover:bg-accent hover:text-white rounded-xl transition-all"
                          title="Edit Experience"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <div className="md:w-1/4">
                          <div className="flex items-center gap-2 text-accent mb-2">
                            <Briefcase className="w-4 h-4" />
                            <span className="text-xs font-mono uppercase tracking-widest">{exp.period}</span>
                          </div>
                          <h4 className="text-xl font-bold">{exp.company}</h4>
                          <p className="text-sm text-slate-400 font-mono">{exp.role}</p>
                        </div>
                        <div className="md:w-3/4">
                          <p className="text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                            {exp.description}
                          </p>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {exp.achievements.map((achievement: string, i: number) => (
                              <li key={i} className="text-xs flex items-start gap-2 text-slate-500 dark:text-slate-400">
                                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1 shrink-0" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Projects Grid */}
            <section id="projects" className="mb-32">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-sm font-mono text-accent mb-2 uppercase tracking-widest">Selected Works</h2>
                  <h3 className="text-4xl font-bold tracking-tight">Featured Projects</h3>
                </div>
                <button className="text-sm font-medium opacity-60 hover:opacity-100 flex items-center gap-1 transition-all">
                  View All <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project: any, idx: number) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="group relative glass rounded-2xl p-8 border border-border-subtle hover:border-accent/50 transition-all duration-500 flex flex-col"
                  >
                    {editingProjectId === project.id ? (
                      <div className="space-y-4">
                        <input 
                          className="w-full bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded"
                          defaultValue={project.title}
                          onChange={(e) => project.title = e.target.value}
                          placeholder="Project Title"
                        />
                        <input 
                          className="w-full bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded"
                          defaultValue={project.role}
                          onChange={(e) => project.role = e.target.value}
                          placeholder="Role"
                        />
                        <input 
                          className="w-full bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded"
                          defaultValue={project.duration}
                          onChange={(e) => project.duration = e.target.value}
                          placeholder="Duration"
                        />
                        <textarea 
                          className="w-full bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded h-24"
                          defaultValue={project.description}
                          onChange={(e) => project.description = e.target.value}
                          placeholder="Description"
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleSaveProject(project)}
                            className="px-4 py-2 bg-accent text-white rounded-lg flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" /> Save
                          </button>
                          <button 
                            onClick={() => setEditingProjectId(null)}
                            className="px-4 py-2 glass rounded-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <button 
                          onClick={() => setEditingProjectId(project.id)}
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 glass hover:bg-accent hover:text-white rounded-xl transition-all"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex gap-2">
                            {project.tags.map((tag: string) => (
                              <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-border-subtle uppercase">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{project.duration}</span>
                        </div>

                        <h4 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h4>
                        <p className="text-xs font-mono text-slate-400 mb-4 uppercase tracking-tighter">{project.role}</p>
                        
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="mb-8 flex-1">
                          <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Key Deliverables</h5>
                          <ul className="space-y-2">
                            {project.keyFeatures.map((feature: string, i: number) => (
                              <li key={i} className="text-xs flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                <div className="w-1 h-1 bg-accent rounded-full" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button className="w-full py-3 glass hover:bg-accent hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group/btn">
                          Technical Specs <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section id="education" className="mb-32">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-sm font-mono text-accent mb-2 uppercase tracking-widest">Academic Background</h2>
                  <h3 className="text-4xl font-bold tracking-tight">Education</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {education.map((edu: any, idx: number) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="glass p-8 rounded-2xl border border-border-subtle hover:border-accent/30 transition-all relative group"
                  >
                    {editingEducationId === edu.id ? (
                      <div className="space-y-4">
                        <input 
                          className="w-full bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded"
                          defaultValue={edu.degree}
                          onChange={(e) => edu.degree = e.target.value}
                          placeholder="Degree"
                        />
                        <input 
                          className="w-full bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded"
                          defaultValue={edu.institution}
                          onChange={(e) => edu.institution = e.target.value}
                          placeholder="Institution"
                        />
                        <input 
                          className="w-full bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded"
                          defaultValue={edu.period}
                          onChange={(e) => edu.period = e.target.value}
                          placeholder="Period"
                        />
                        <textarea 
                          className="w-full bg-black/10 dark:bg-white/5 border border-border-subtle p-2 rounded h-24"
                          defaultValue={edu.description}
                          onChange={(e) => edu.description = e.target.value}
                          placeholder="Description"
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleSaveEducation(edu)}
                            className="px-4 py-2 bg-accent text-white rounded-lg flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" /> Save
                          </button>
                          <button 
                            onClick={() => setEditingEducationId(null)}
                            className="px-4 py-2 glass rounded-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <button 
                          onClick={() => setEditingEducationId(edu.id)}
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 glass hover:bg-accent hover:text-white rounded-xl transition-all"
                          title="Edit Education"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2 text-accent mb-4">
                          <GraduationCap className="w-5 h-5" />
                          <span className="text-xs font-mono uppercase tracking-widest">{edu.period}</span>
                        </div>
                        <h4 className="text-xl font-bold mb-1">{edu.degree}</h4>
                        <p className="text-sm text-slate-400 font-mono mb-4">{edu.institution}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                          {edu.description}
                        </p>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Skills & Tech */}
            <section id="skills" className="mb-32">
              <div className="glass rounded-3xl p-8 md:p-12 border border-border-subtle relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Cpu className="w-64 h-64" />
                </div>
                
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div>
                    <h2 className="text-sm font-mono text-accent mb-2 uppercase tracking-widest">Capabilities</h2>
                    <h3 className="text-4xl font-bold tracking-tight mb-6">Technical Arsenal</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
                      I build using the latest technologies to ensure performance, 
                      security, and a seamless user experience across all platforms.
                    </p>
                    <div className="space-y-6">
                      {SKILLS.map((skill, idx) => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="font-mono text-accent">{skill.level}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                              className="h-full bg-accent glow-border"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: 'Performance', desc: 'Optimized for speed and core web vitals.', icon: Zap },
                      { title: 'Scalability', desc: 'Architecture that grows with your user base.', icon: Globe },
                      { title: 'Security', desc: 'Post-quantum encryption standards.', icon: Terminal },
                      { title: 'Innovation', desc: 'AI-driven features and smart logic.', icon: Cpu }
                    ].map((item, i) => (
                      <div key={i} className="p-6 glass rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all">
                        <item.icon className="w-8 h-8 text-accent mb-4" />
                        <h5 className="font-bold mb-2">{item.title}</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Contact CTA */}
            <section id="contact">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
                  READY TO <br />
                  <span className="text-accent glow-text italic">COLLABORATE?</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-10">
                  Currently accepting new projects and opportunities. 
                  Let's build something extraordinary together.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a 
                    href={`mailto:${emailAddress}`}
                    className="w-full sm:w-auto px-10 py-5 bg-text-primary text-bg-primary font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" /> Send Message
                  </a>
                  <a 
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-10 py-5 glass font-black rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <Github className="w-5 h-5" /> GitHub Profile
                  </a>
                </div>
              </div>
            </section>

          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-border-subtle py-12 glass">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
              <Zap className="w-4 h-4 text-white fill-current" />
            </div>
            <span className="font-bold tracking-tighter">NOVA</span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            © 2026 NOVA SYSTEMS. ALL RIGHTS RESERVED. // ENCRYPTED CONNECTION
          </p>
          <div className="flex items-center gap-6 text-slate-500">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
            </a>
            <Twitter className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>

      <NotificationSystem 
        notifications={notifications} 
        removeNotification={removeNotification} 
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
