import { Button as RNButton, ButtonProps as RNButtonProps } from "@rneui/base";
import { useState } from "react";
import {
	Pressable,
	StyleProp,
	TextStyle,
	ViewStyle,
	Platform,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface ButtonProps extends RNButtonProps {
	variant?: "primary" | "secondary" | "outlined" | "ghost" | "destructive";
	buttonStyle?: StyleProp<ViewStyle>;
	titleStyle?: StyleProp<TextStyle>;
}

export const Button = ({
	variant = "primary",
	buttonStyle,
	titleStyle,
	...props
}: ButtonProps) => {
	const [hovering, setHovering] = useState<boolean>(false);

	const { styles } = useStyles(stylesheet, {
		variant: variant,
	});

	const RNEButton = () => {
		return (
			<RNButton
				buttonStyle={[styles.button(hovering), buttonStyle]}
				titleStyle={[styles.buttonText, titleStyle]}
				{...props}
			/>
		);
	};

	return Platform.OS === "web" ? (
		<Pressable
			onHoverIn={() => setHovering(true)}
			onHoverOut={() => setHovering(false)}
		>
			{RNEButton}
		</Pressable>
	) : (
		<RNEButton />
	);
};

const stylesheet = createStyleSheet((theme) => ({
	button: (hovering: boolean) => ({
		borderRadius: 4,
		paddingHorizontal: 20,
		paddingVertical: 10,
		variants: {
			variant: {
				primary: {
					backgroundColor: hovering
						? theme.colors.mutedPrimary
						: theme.colors.primary,
				},
				secondary: {
					backgroundColor: hovering
						? theme.colors.mutedSecondary
						: theme.colors.secondary,
				},
				outlined: {
					backgroundColor: hovering
						? theme.colors.mutedTransparent
						: "transparent",
					borderWidth: 0.5,
					borderColor: theme.colors.primary,
				},
				ghost: {
					backgroundColor: "transparent",
				},
				destructive: {
					backgroundColor: hovering
						? theme.colors.mutedError
						: theme.colors.error,
				},
			},
		},
	}),
	buttonText: {
		fontSize: 16,
		variants: {
			variant: {
				primary: {
					color: theme.colors.white,
				},
				secondary: {
					color: theme.colors.typography,
				},
				outlined: {
					color: theme.colors.primary,
				},
				ghost: {
					color: theme.colors.primary,
				},
				destructive: {
					color: theme.colors.white,
				},
			},
		},
	},
}));
