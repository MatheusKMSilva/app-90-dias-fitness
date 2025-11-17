import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  users: {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  quiz_responses: {
    id: string;
    user_id: string;
    gender: string;
    activity_level: string;
    goals: string;
    exercise_frequency: string;
    training_location: string;
    main_barrier: string;
    previous_plan: string;
    exercise_type: string;
    age_range: string;
    dietary_restrictions: string;
    favorite_foods: string[];
    fast_food_frequency: string;
    preferred_time: string;
    try_new_activities: string;
    post_workout_feeling: string;
    most_gratifying: string;
    photo_url: string;
    created_at: string;
  };
  subscriptions: {
    id: string;
    user_id: string;
    plan_type: 'monthly' | 'annual';
    status: 'active' | 'cancelled' | 'expired';
    payment_method: 'credit' | 'debit' | 'pix';
    amount: number;
    started_at: string;
    expires_at: string;
    created_at: string;
    updated_at: string;
  };
  workout_plans: {
    id: string;
    user_id: string;
    quiz_response_id: string;
    plan_data: any;
    created_at: string;
    updated_at: string;
  };
};
