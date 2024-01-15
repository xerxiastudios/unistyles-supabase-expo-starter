import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { supabase } from "@/lib/supabase";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { VStack } from "@/components/ui";

export default function Screen() {
	const { theme } = useStyles();
	return (
		<SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
			<Stack.Screen
				options={{
					headerShown: false,
					title: "Sign In",
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
					headerShadowVisible: true,
					headerTintColor: theme.colors.typography,
				}}
			/>
			<SignIn />
		</SafeAreaView>
	);
}

async function signUpWithEmail() {
	const { error } = await supabase.auth.signUp({
		email: "test@test.com",
		password: "Admin@123",
	});
}

async function signInWithEmail() {
	const { error } = await supabase.auth.signInWithPassword({
		email: "test@test.com",
		password: "Admin@123",
	});
}

function SignIn() {
	const { styles } = useStyles(stylesheet);
	return (
		<VStack style={styles.container} gap={20}>
			<Text style={styles.title} onPress={signUpWithEmail}>
				Sign Up
			</Text>

			<Text style={styles.title} onPress={signInWithEmail}>
				Sign In
			</Text>
		</VStack>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.colors.background,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: theme.colors.typography,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
}));
