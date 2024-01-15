import { Text as RNBText, TextProps as RNTextProps } from "@rneui/base";
import { StyleProp, TextStyle } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface TextProps extends RNTextProps {
	style?: StyleProp<TextStyle>;
}

export const Text = ({ children, style, ...props }: TextProps) => {
	const { styles } = useStyles(stylesheet, undefined);
	return (
		<RNBText style={[styles.text, style]} {...props}>
			{children}
		</RNBText>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	text: {
		fontSize: 16,
		lineHeight: 24,
		color: theme.colors.typography,
	},
}));
