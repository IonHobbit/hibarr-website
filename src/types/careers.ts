export type Job = {
  id: number | string;
  slug?: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  minWorkExperience?: string;
}
