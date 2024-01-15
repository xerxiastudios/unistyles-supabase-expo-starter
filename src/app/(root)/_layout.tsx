import { size } from "@/constants/sizes";
import { Href, Link, Navigator, Slot, Tabs } from "expo-router";
import { Platform, Pressable, Text, View, ViewStyle } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function Layout() {
	const { theme } = useStyles();
	if (Platform.OS === "web") {
		return (
			<View style={{ flex: 1 }}>
				<Navigator>
					<CustomTabBar />
					<Slot />
				</Navigator>
			</View>
		);
	}

	return (
		<Tabs
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.colors.background,
					borderColor: theme.colors.accent,
					borderBottomColor: theme.colors.accent,
				},
				tabBarActiveBackgroundColor: theme.colors.background,
				tabBarInactiveBackgroundColor: theme.colors.background,
				tabBarActiveTintColor: theme.colors.accent,
			}}
		>
			<Tabs.Screen
				name="home/index"
				options={{ title: "Home", headerTintColor: theme.colors.typography }}
			/>
			<Tabs.Screen
				name="settings/index"
				options={{
					title: "Settings",
					headerTintColor: theme.colors.typography,
				}}
			/>
		</Tabs>
	);
}

function CustomTabBar() {
	const { styles } = useStyles(stylesheet);
	return (
		<View style={styles.header}>
			<Link href="/" style={[styles.link]}>
				ExpoWeb
			</Link>

			<View
				style={{
					flexDirection: "row",
				}}
			>
				<TabLink
					// `name` is used to determine if the tab is selected.
					name="home/index"
					href="/home"
				>
					{({ focused }) => (
						<Text style={[styles.link, { opacity: focused ? 1 : 0.8 }]}>
							Home
						</Text>
					)}
				</TabLink>

				<TabLink name="settings/index" href="/settings">
					{({ focused }) => (
						<Text style={[styles.link, { opacity: focused ? 1 : 0.8 }]}>
							Settings
						</Text>
					)}
				</TabLink>
			</View>
		</View>
	);
}

function useIsTabSelected(name: string): boolean {
	const { state } = Navigator.useContext();
	const current = state.routes.find((route, i) => state.index === i);
	return current?.name === name;
}

function TabLink({
	children,
	name,
	href,
	style,
}: {
	children?: (props: { focused: boolean }) => JSX.Element;
	name: string;
	href: string;
	style?: ViewStyle;
}) {
	const focused: boolean = useIsTabSelected(name);
	const path = href as Href<"string">;

	return (
		<Link href={path} asChild style={style}>
			<Pressable>{(props) => children?.({ ...props, focused })}</Pressable>
		</Link>
	);
}

const stylesheet = createStyleSheet((theme) => ({
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: theme.colors.mutedPrimary,
		padding: size.$4,
		paddingVertical: size.$5,
	},
	link: {
		fontSize: size.$5,
		color: theme.colors.white,
		fontWeight: "600",
		paddingHorizontal: 24,
	},
}));
