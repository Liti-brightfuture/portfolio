export const sections = ['about', 'build', 'projects', 'skills', 'contact'] as const
export type SectionId = (typeof sections)[number]
