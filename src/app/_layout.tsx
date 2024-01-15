import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useStyles, UnistylesRuntime } from "react-native-unistyles";
import "../../unistyles";
import { MMKV } from "react-native-mmkv";
export const storage = new MMKV();
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { View } from "react-native";
import { AuthProvider } from "@/context/AuthProvider";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(auth)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	useEffect(() => {
		const theme = storage.getString("theme");

		const getTheme = () => {
			if (theme) {
				return theme === "light" ? "light" : "dark";
			} else {
				return "light";
			}
		};

		UnistylesRuntime.setTheme(getTheme());
	}, []);

	const [fontLoaded, error] = useFonts({
		SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	const [sessionLoadAttempted, setSessionLoadAttempted] = useState(false);
	const [initialSession, setInitialSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth
			.getSession()
			.then(({ data }) => {
				if (data) {
					setInitialSession(data.session);
				}
			})
			.finally(() => {
				setSessionLoadAttempted(true);
			});
	}, []);

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	const onLayoutRootView = useCallback(async () => {
		if (fontLoaded && sessionLoadAttempted) {
			SplashScreen.hideAsync();
		}
	}, [fontLoaded, sessionLoadAttempted]);

	if (!fontLoaded || !sessionLoadAttempted) {
		return null;
	}

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<AuthProvider initialSession={initialSession}>
				<Slot />
			</AuthProvider>
		</View>
	);
}

function RootLayoutNav() {
	const { theme } = useStyles();

	return (
		<Stack>
			<Stack.Screen
				name="(app)"
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="modal"
				options={{
					presentation: "modal",
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
					headerTintColor: theme.colors.typography,
				}}
			/>
		</Stack>
	);
}
