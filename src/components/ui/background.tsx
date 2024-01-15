import { size } from "@/constants/sizes";
import {
	StyleProp,
	SafeAreaView,
	ViewProps,
	ViewStyle,
	View,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface BackgroundProps extends ViewProps {
	style?: StyleProp<ViewStyle>;
}

export const Background = ({ children, style, ...props }: BackgroundProps) => {
	const { styles } = useStyles(stylesheet);
	return (
		<SafeAreaView style={[styles.safeArea]} {...props}>
			<View style={[styles.container, style]}>{children}</View>
		</SafeAreaView>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	safeArea: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	container: {
		flex: 1,
		margin: size.$4,
	},
}));
