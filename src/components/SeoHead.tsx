import { useEffect } from 'react';
import { SITE } from '../data/site.config';

export default function SeoHead() {
  useEffect(() => {
    document.title = SITE.title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', SITE.description);
    setMeta('og:title', SITE.title, true);
    setMeta('og:description', SITE.description, true);
    setMeta('og:image', `${SITE.url}${SITE.ogImage}`, true);
    setMeta('og:url', SITE.url, true);
    setMeta('og:type', 'website', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', SITE.title);
    setMeta('twitter:description', SITE.description);
    setMeta('twitter:image', `${SITE.url}${SITE.ogImage}`);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          name: SITE.name,
          jobTitle: SITE.role,
          email: SITE.email,
          url: SITE.url,
          sameAs: [SITE.githubUrl, SITE.linkedinUrl],
        },
        {
          '@type': 'ProfilePage',
          name: SITE.title,
          description: SITE.description,
          url: SITE.url,
          mainEntity: { '@type': 'Person', name: SITE.name },
        },
      ],
    };

    let script = document.getElementById('json-ld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, []);

  return null;
}
