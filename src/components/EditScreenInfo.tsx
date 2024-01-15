import React from "react";
import { View } from "react-native";
import {
	UnistylesRuntime,
	createStyleSheet,
	useStyles,
} from "react-native-unistyles";
import { ExternalLink } from "./ExternalLink";
import { storage } from "@/app/_layout";
import { Button, Text, HStack, VStack } from "@/components/ui";
import { size } from "@/constants/sizes";
import { supabase } from "@/lib/supabase";

export default function EditScreenInfo({ path }: { path: string }) {
	const { styles } = useStyles(stylesheet);
	const changeTheme = () => {
		const theme = UnistylesRuntime.themeName === "light" ? "dark" : "light";
		UnistylesRuntime.setTheme(theme);
		storage.set("theme", theme);
	};

	async function signOutEmail() {
		const { error } = await supabase.auth.signOut();
	}

	return (
		<View>
			<VStack gap={size.$3}>
				<Text>Open up the code for this screen:</Text>

				<Button radius={"xl"} disabled>
					Primary
				</Button>

				<HStack gap={20}>
					<Text>Goku</Text>
					<Button title={"Secondary"} variant="secondary" />
				</HStack>

				<Button
					style={{ marginTop: size.$4 }}
					title={"Outlined"}
					variant="outlined"
				/>

				<Button title={"Ghost"} variant="ghost" />
				<Button
					onPress={signOutEmail}
					title={"Sign out"}
					variant="destructive"
				/>

				<View
					style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
				>
					<Text style={styles.mono}>{path}</Text>
				</View>

				<Text style={styles.getStartedText}>
					Change any of the text, save the file, and your app will automatically
					update.
				</Text>

				<Button
					radius={"sm"}
					title={"Change Theme"}
					onPress={() => changeTheme()}
				/>
			</VStack>

			<View style={styles.helpContainer}>
				<ExternalLink
					style={styles.helpLink}
					href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
				>
					<Text style={styles.helpLinkText}>
						Tap here if your app doesn't automatically update after making
						changes
					</Text>
				</ExternalLink>
			</View>
		</View>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	getStartedContainer: {
		alignItems: "center",
		marginHorizontal: 50,
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	codeHighlightContainer: {
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	getStartedText: {
		fontSize: 17,
		lineHeight: 24,
		textAlign: "center",
		color: theme.colors.typography,
	},
	helpContainer: {
		marginTop: 15,
		marginHorizontal: 20,
		alignItems: "center",
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		textAlign: "center",
		color: theme.colors.typography,
	},
	mono: {
		color: theme.colors.typography,
	},
	button: {
		backgroundColor: theme.colors.accent,
		color: theme.colors.background,
		padding: 10,
		borderRadius: 10,
		marginVertical: 10,
	},
}));
