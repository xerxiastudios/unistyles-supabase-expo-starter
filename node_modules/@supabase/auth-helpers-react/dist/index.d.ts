import * as _supabase_supabase_js from '@supabase/supabase-js';
import { SupabaseClient, Session, AuthError } from '@supabase/supabase-js';
export { Session, SupabaseClient, User } from '@supabase/supabase-js';
import * as _supabase_supabase_js_dist_module_lib_types from '@supabase/supabase-js/dist/module/lib/types';
import { PropsWithChildren } from 'react';

type SessionContext = {
    isLoading: true;
    session: null;
    error: null;
    supabaseClient: SupabaseClient;
} | {
    isLoading: false;
    session: Session;
    error: null;
    supabaseClient: SupabaseClient;
} | {
    isLoading: false;
    session: null;
    error: AuthError;
    supabaseClient: SupabaseClient;
} | {
    isLoading: false;
    session: null;
    error: null;
    supabaseClient: SupabaseClient;
};
interface SessionContextProviderProps {
    supabaseClient: SupabaseClient;
    initialSession?: Session | null;
}
declare const SessionContextProvider: ({ supabaseClient, initialSession, children }: PropsWithChildren<SessionContextProviderProps>) => JSX.Element;
declare const useSessionContext: () => SessionContext;
declare function useSupabaseClient<Database = any, SchemaName extends string & keyof Database = 'public' extends keyof Database ? 'public' : string & keyof Database>(): SupabaseClient<Database, SchemaName, Database[SchemaName] extends _supabase_supabase_js_dist_module_lib_types.GenericSchema ? Database[SchemaName] : any>;
declare const useSession: () => Session | null;
declare const useUser: () => _supabase_supabase_js.AuthUser | null;

export { SessionContext, SessionContextProvider, SessionContextProviderProps, useSession, useSessionContext, useSupabaseClient, useUser };
