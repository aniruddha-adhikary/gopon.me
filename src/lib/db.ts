import { createClient } from '@supabase/supabase-js';
import cuid2 from "@paralleldrive/cuid2";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Message {
  content: string;
  created_at: string;
}

export interface Database {
  createInbox(): Promise<string>;
  getInboxMessages(id: string): Promise<Message[]>;
  sendMessage(id: string, message: string): Promise<void>;
}

export const db: Database = {
  async createInbox() {
    const { data, error } = await supabase
      .from('inboxes')
      .insert({
        id: cuid2.createId()
      })
      .select('id')
      .single();
    if (error) throw error;
    return data.id;
  },
  async getInboxMessages(id) {
    const { data, error } = await supabase
      .from('messages')
      .select('content,created_at')
      .eq('inbox_id', id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  async sendMessage(id, message) {
    const { error } = await supabase
      .from('messages')
      .insert({ inbox_id: id, content: message });
    if (error) throw error;
  },
};
