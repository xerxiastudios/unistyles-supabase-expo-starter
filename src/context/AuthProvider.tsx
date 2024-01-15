import { router, useSegments } from "expo-router";
import React, { createContext, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import {
	Session,
	SessionContext as SessionContextHelper,
	SessionContextProviderProps,
} from "@supabase/auth-helpers-react";
import { AuthError } from "@supabase/supabase-js";

export const SessionContext = createContext<SessionContextHelper>({
	session: null,
	error: null,
	isLoading: false,
	supabaseClient: supabase,
});

export type AuthProviderProps = {
	initialSession?: SessionContextProviderProps["initialSession"];
	children?: React.ReactNode;
};

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: any) {
	const segments = useSegments();

	React.useEffect(() => {
		const inAuthGroup = segments[0] === "(auth)";

		if (
			// If the user is not signed in and the initial segment is not anything in the auth group.
			!user &&
			!inAuthGroup
		) {
			// Redirect to the sign-in page.
			router.replace("/sign-in");
		} else if (user && inAuthGroup) {
			// Redirect away from the sign-in page.
			router.replace("/home");
		}
	}, [user, segments]);
}

export const AuthProvider = ({
	children,
	initialSession,
}: AuthProviderProps) => {
	const [session, setSession] = useState<Session | null>(
		initialSession || null,
	);
	const [error, setError] = useState<AuthError | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	useProtectedRoute(session?.user ?? null);

	useEffect(() => {
		setIsLoading(true);
		supabase.auth
			.getSession()
			.then(({ data: { session } }) => {
				setSession(session);
			})
			.catch((error) => setError(new AuthError(error.message)))
			.finally(() => setIsLoading(false));

		const { data: authListner } = supabase.auth.onAuthStateChange(
			async (_event, session) => {
				setSession(session);

				if (_event == "TOKEN_REFRESHED") {
					//Handle Accordinngly
				}
			},
		);

		return () => {
			authListner.subscription;
		};
	}, []);

	return (
		<SessionContext.Provider
			value={
				session
					? {
							session,
							isLoading: false,
							error: null,
							supabaseClient: supabase,
						}
					: error
						? {
								error,
								isLoading: false,
								session: null,
								supabaseClient: supabase,
							}
						: {
								error: null,
								isLoading,
								session: null,
								supabaseClient: supabase,
							}
			}
		>
			{children}
		</SessionContext.Provider>
	);
};
