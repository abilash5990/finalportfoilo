import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/layout/Navbar';
import SeoHead from './components/SeoHead';
import NotificationSystem from './components/NotificationSystem';
import AdminBar from './components/admin/AdminBar';
import HeroSection from './components/sections/HeroSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import EducationSection from './components/sections/EducationSection';
import ContactSection from './components/sections/ContactSection';
import { ThemeProvider } from './context/ThemeContext';
import { ProfileData } from './data/site.config';
import { useNotifications } from './hooks/useNotifications';
import { useResume } from './hooks/useResume';
import { Education, Experience, Project, SkillCategory } from './types';
import {
  STORAGE_KEYS,
  clearPortfolioStorage,
  downloadPortfolioJson,
  getDefaultPortfolioData,
  loadPortfolioData,
  persistPortfolioData,
  PortfolioData,
} from './utils/portfolioStorage';

const ADMIN_PASSCODE = 'portfolio2026';

function clonePortfolioData(data: PortfolioData) {
  return {
    profile: { ...data.profile, stats: [...data.profile.stats] },
    projects: data.projects.map((p) => ({ ...p, keyFeatures: [...p.keyFeatures], tags: [...p.tags] })),
    experience: data.experience.map((e) => ({ ...e, achievements: [...e.achievements] })),
    education: data.education.map((e) => ({ ...e })),
    skillCategories: data.skillCategories.map((c) => ({
      ...c,
      skills: c.skills.map((s) => ({ ...s })),
    })),
  };
}

function applyPortfolioData(
  data: PortfolioData,
  setters: {
    setProfile: (p: ProfileData) => void;
    setProjects: (p: Project[]) => void;
    setExperience: (e: Experience[]) => void;
    setEducation: (e: Education[]) => void;
    setSkillCategories: (s: SkillCategory[]) => void;
  },
) {
  const cloned = clonePortfolioData(data);
  setters.setProfile(cloned.profile);
  setters.setProjects(cloned.projects);
  setters.setExperience(cloned.experience);
  setters.setEducation(cloned.education);
  setters.setSkillCategories(cloned.skillCategories);
}

function PortfolioContent() {
  const { notifications, addNotification, removeNotification } = useNotifications();
  const { hasCustomResume, resumeInfo, justUploaded, uploadResume, removeResume, viewResume, downloadResume } =
    useResume();
  const defaults = useMemo(() => getDefaultPortfolioData(), []);
  const initial = useMemo(() => loadPortfolioData(), []);

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.adminMode) === 'true';
  });
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState<ProfileData>(initial.profile);
  const [projects, setProjects] = useState<Project[]>(initial.projects);
  const [experience, setExperience] = useState<Experience[]>(initial.experience);
  const [education, setEducation] = useState<Education[]>(initial.education);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(initial.skillCategories);

  const [draftProfile, setDraftProfile] = useState<ProfileData>(profile);
  const [draftProjects, setDraftProjects] = useState<Project[]>(projects);
  const [draftExperience, setDraftExperience] = useState<Experience[]>(experience);
  const [draftEducation, setDraftEducation] = useState<Education[]>(education);
  const [draftSkillCategories, setDraftSkillCategories] = useState<SkillCategory[]>(skillCategories);

  const viewProfile = isEditing ? draftProfile : profile;

  const displayRole = useMemo(() => `${viewProfile.name} - ${viewProfile.role}`, [viewProfile.name, viewProfile.role]);

  const currentData = (): PortfolioData => ({
    profile,
    projects,
    experience,
    education,
    skillCategories,
  });

  const setters = { setProfile, setProjects, setExperience, setEducation, setSkillCategories };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isShortcut = (e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e';
      if (!isShortcut) return;
      e.preventDefault();
      if (isAdmin) return;
      const code = window.prompt('Enter admin passcode');
      if (code === ADMIN_PASSCODE) {
        setIsAdmin(true);
        localStorage.setItem(STORAGE_KEYS.adminMode, 'true');
      } else if (code) {
        window.alert('Incorrect passcode');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isAdmin]);

  const syncDraftsFromSaved = (data: PortfolioData) => {
    const cloned = clonePortfolioData(data);
    setDraftProfile(cloned.profile);
    setDraftProjects(cloned.projects);
    setDraftExperience(cloned.experience);
    setDraftEducation(cloned.education);
    setDraftSkillCategories(cloned.skillCategories);
  };

  const startEditing = () => {
    syncDraftsFromSaved(currentData());
    setIsEditing(true);
  };

  const saveAll = () => {
    const data: PortfolioData = {
      profile: draftProfile,
      projects: draftProjects,
      experience: draftExperience,
      education: draftEducation,
      skillCategories: draftSkillCategories,
    };
    applyPortfolioData(data, setters);
    persistPortfolioData(data);
    setIsEditing(false);
    addNotification('Changes saved locally', 'success');
  };

  const cancelEditing = () => {
    setIsEditing(false);
    syncDraftsFromSaved(currentData());
  };

  const exitAdminMode = () => {
    setIsEditing(false);
    setIsAdmin(false);
    localStorage.setItem(STORAGE_KEYS.adminMode, 'false');
  };

  const handleExport = () => {
    downloadPortfolioJson(isEditing ? {
      profile: draftProfile,
      projects: draftProjects,
      experience: draftExperience,
      education: draftEducation,
      skillCategories: draftSkillCategories,
    } : currentData());
    addNotification('Portfolio exported', 'info');
  };

  const handleImport = (data: PortfolioData) => {
    if (isEditing) {
      syncDraftsFromSaved(data);
    } else {
      applyPortfolioData(data, setters);
      persistPortfolioData(data);
    }
  };

  const handleReset = async () => {
    clearPortfolioStorage();
    await removeResume();
    const resetData = clonePortfolioData(defaults);
    applyPortfolioData(resetData, setters);
    setIsEditing(false);
    syncDraftsFromSaved(resetData);
    addNotification('Portfolio reset to defaults', 'success');
  };

  const handleResumeView = async () => {
    try {
      await viewResume();
      addNotification('Resume opened', 'info');
    } catch {
      addNotification('Failed to open resume', 'error');
    }
  };

  const handleResumeDownload = async () => {
    try {
      await downloadResume(viewProfile.name);
      addNotification('Resume downloaded', 'success');
    } catch {
      addNotification('Failed to download resume', 'error');
    }
  };

  const handleResumeUpload = async (file: File) => {
    try {
      await uploadResume(file);
      addNotification(`Resume uploaded: ${file.name}`, 'success');
    } catch (err) {
      addNotification(err instanceof Error ? err.message : 'Failed to upload resume', 'error');
    }
  };

  const handleResumeRemove = async () => {
    try {
      await removeResume();
      addNotification('Using public/resume.pdf', 'info');
    } catch {
      addNotification('Failed to remove uploaded resume', 'error');
    }
  };

  return (
    <div className="min-h-screen selection:bg-accent/20">
      <SeoHead />
      <Navbar
        brandName={viewProfile.name}
        onResumeView={handleResumeView}
        onResumeDownload={handleResumeDownload}
      />
      <NotificationSystem notifications={notifications} removeNotification={removeNotification} />

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-14 md:px-6 md:pt-20">
        {isAdmin && (
          <AdminBar
            isEditing={isEditing}
            onStartEditing={startEditing}
            onSave={saveAll}
            onCancel={cancelEditing}
            onExit={exitAdminMode}
            onExport={handleExport}
            onImport={handleImport}
            onReset={handleReset}
            onNotify={(message, type) => addNotification(message, type)}
          />
        )}

        <HeroSection
          profile={viewProfile}
          isEditing={isEditing}
          draftProfile={draftProfile}
          setDraftProfile={setDraftProfile}
          displayRole={displayRole}
          hasCustomResume={hasCustomResume}
          resumeInfo={resumeInfo}
          justUploaded={justUploaded}
          onResumeView={handleResumeView}
          onResumeDownload={handleResumeDownload}
          onResumeUpload={(file) => void handleResumeUpload(file)}
          onResumeRemove={() => void handleResumeRemove()}
        />

        <ExperienceSection
          experience={experience}
          isEditing={isEditing}
          draftExperience={draftExperience}
          setDraftExperience={setDraftExperience}
        />

        <ProjectsSection
          projects={projects}
          isEditing={isEditing}
          draftProjects={draftProjects}
          setDraftProjects={setDraftProjects}
          onImageError={(message) => addNotification(message, 'error')}
        />

        <SkillsSection
          skillCategories={skillCategories}
          isEditing={isEditing}
          draftSkillCategories={draftSkillCategories}
          setDraftSkillCategories={setDraftSkillCategories}
        />

        <EducationSection
          education={education}
          isEditing={isEditing}
          draftEducation={draftEducation}
          setDraftEducation={setDraftEducation}
        />

        <ContactSection
          profile={viewProfile}
          onFormSuccess={() => addNotification('Message sent successfully', 'success')}
          onFormError={(message) => addNotification(message, 'error')}
        />
      </main>
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
