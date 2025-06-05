// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = 'https://zgbeqzxwacpmpwzwfccs.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
