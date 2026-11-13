import { getCollection } from 'astro:content';

export const SITE = 'https://olaqrnews.com.mx';
export const CENTRAL = 'https://central.neuronamedios.com';
export const SECTIONS = [
  'Turismo',
  'Medio ambiente',
  'Historia',
  'Cultura',
  'Naturaleza',
  'Política regional',
];
export const FOOTER_SECTIONS = [
  'Economía', 'Infraestructura', 'Gastronomía', 'Leyenda', 'Lifestyle', 'Agenda estatal', 'Deportes',
];

export const slugify = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export async function getNotas() {
  const all = await getCollection('notas', (n) => !n.data.draft);
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const img = (n: any) => n.data.heroImage ?? n.data.image ?? null;
export const summary = (n: any) => n.data.excerpt ?? n.data.description ?? n.data.subtitle ?? '';
export const cats = (n: any): string[] =>
  n.data.categories.length ? n.data.categories : n.data.category ? [n.data.category] : [];
export const fmt = (d: Date) =>
  d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });


export const CLOUD_NAME = 'kyq0fnmi';

// Optimiza imágenes alojadas en Cloudinary (WebP/AVIF automático + calidad + ancho).
// Las imágenes locales (/images/...) se sirven tal cual.
export function optimize(src: string | null, width = 900): string | null {
  if (!src) return src;
  if (src.includes('res.cloudinary.com') && src.includes('/image/upload/') && !src.includes('/f_auto')) {
    return src.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${width}/`);
  }
  return src;
}
