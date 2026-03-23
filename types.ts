export interface SectionProps {
  id?: string;
  className?: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface GalleryImage {
  id: number;
  url: string;
  alt: string;
  caption?: string;
}

export interface EventDetail {
  title: string;
  time: string;
  location: string;
  description: string;
  icon: 'ring' | 'cheers' | 'church';
}
