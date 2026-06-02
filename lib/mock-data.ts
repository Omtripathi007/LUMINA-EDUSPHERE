import { Course } from '@/types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1b48b11-37d4-4a24-9b0d-71b80e64c39c',
    title: 'Advanced React Patterns',
    progress: 75,
    icon_name: 'Code2',
    created_at: new Date().toISOString(),
  },
  {
    id: 'c2b48b11-37d4-4a24-9b0d-71b80e64c39d',
    title: 'TypeScript Mastery',
    progress: 55,
    icon_name: 'Braces',
    created_at: new Date().toISOString(),
  },
  {
    id: 'c3b48b11-37d4-4a24-9b0d-71b80e64c39e',
    title: 'Next.js Architecture',
    progress: 90,
    icon_name: 'Layers',
    created_at: new Date().toISOString(),
  },
  {
    id: 'c4b48b11-37d4-4a24-9b0d-71b80e64c39f',
    title: 'Database Systems',
    progress: 40,
    icon_name: 'Database',
    created_at: new Date().toISOString(),
  },
];

const WEEKS_COUNT = 24;
const DAYS_COUNT = 7;

export interface ActivityDay {
  date: string;
  hours: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export const generateMockActivity = (): ActivityDay[][] => {
  const weeks: ActivityDay[][] = [];
  const now = new Date();
  
  for (let w = WEEKS_COUNT - 1; w >= 0; w--) {
    const week: ActivityDay[] = [];
    for (let d = 0; d < DAYS_COUNT; d++) {
      const dayOffset = (w * 7) + (6 - d);
      const date = new Date(now.getTime() - dayOffset * 24 * 60 * 60 * 1000);
      
      const isWeekend = d === 0 || d === 6;
      const skipChance = Math.random() < 0.2;
      let hours = 0;
      if (!skipChance) {
        hours = isWeekend 
          ? parseFloat((Math.random() * 4 + 1).toFixed(1)) 
          : parseFloat((Math.random() * 3).toFixed(1));
      }
      
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (hours > 0 && hours <= 1) level = 1;
      else if (hours > 1 && hours <= 2.5) level = 2;
      else if (hours > 2.5 && hours <= 4) level = 3;
      else if (hours > 4) level = 4;

      week.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        hours,
        level,
      });
    }
    weeks.push(week);
  }
  return weeks;
};
