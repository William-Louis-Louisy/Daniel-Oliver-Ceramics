export function uploadcareLoader(url: string): string {
  if (!url.includes('ucarecdn.net')) return url;
  const baseUrl = url.replace(/\/$/, '');

  const optimizations =
    '-/format/auto/-/quality/smart/-/progressive/yes/-/scale_crop/1920x1080/center/';

  return `${baseUrl}/${optimizations}`;
}
