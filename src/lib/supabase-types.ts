
export interface User {
  id: string;
  email: string;
  username: string;
  xp: number;
  level: number;
  streak_days: number;
  last_login: string;
  created_at: string;
}

export interface LearningProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  score: number;
  xp_earned: number;
  completed_at: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  level: number;
  category: string;
  xp_reward: number;
  required_level: number;
  has_audio: boolean;
  has_video: boolean;
  features: string[];
  created_at: string;
}
