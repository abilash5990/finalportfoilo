export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  const offset = 80;
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element.getBoundingClientRect().top;
  const offsetPosition = elementRect - bodyRect - offset;
  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}
