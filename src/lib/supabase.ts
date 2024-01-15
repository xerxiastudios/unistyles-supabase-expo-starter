import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_API_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_API_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
