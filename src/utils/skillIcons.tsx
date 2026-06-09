import { Cloud, Code, Cpu, Database, Globe, Palette, Terminal, Zap, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Terminal,
  Globe,
  Cpu,
  Zap,
  Database,
  Cloud,
  Palette,
};

export function getSkillIcon(name: string) {
  return iconMap[name] ?? Code;
}
