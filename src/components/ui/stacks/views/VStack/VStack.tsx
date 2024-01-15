import React from "react";
import { View, StyleSheet } from "react-native";
import { AlignmentMap } from "../../constants";
import { VStackProps } from "../../types";

export const VStack = ({
	gap,
	spacing,
	alignment = "center",
	style,
	children,
}: VStackProps) => {
	return (
		<View
			style={[
				styles.vStack,
				AlignmentMap.vstack[alignment],
				{ gap: gap ? gap : 0 },
				,
				style,
			]}
		>
			{spacing && spacing !== 0
				? React.Children.map(children, (child) => (
						<>
							<View style={{ height: spacing }} />
							{child}
							<View style={{ height: spacing }} />
						</>
					))
				: children}
		</View>
	);
};

const styles = StyleSheet.create({
	vStack: {
		flexDirection: "column",
	},
});
