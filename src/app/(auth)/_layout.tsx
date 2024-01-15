import { Stack } from "expo-router";
import { useStyles } from "react-native-unistyles";

export default function Layout() {
	const { theme } = useStyles();
	return (
		<>
			<Stack.Screen
				options={{
					headerShown: false,
					headerStyle: {
						backgroundColor: theme.colors.background,
					},
				}}
			/>
			<Stack />
		</>
	);
}
