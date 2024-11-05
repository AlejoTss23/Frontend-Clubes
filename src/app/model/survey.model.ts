export interface Survey {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export interface Question {
  id: number;
  text: string;
  type: 'TEXT' | 'NUMBER' | 'DATE' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  options: string[];
}
