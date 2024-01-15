import { Background, HStack, Text, VStack } from "@/components/ui";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function Settings() {
	const { styles } = useStyles(stylesheet);

	return (
		<Background>
			<VStack>
				<Text>Row 1</Text>
				<Text>Row 2</Text>
			</VStack>

			<HStack gap={20}>
				<Text>Col 1</Text>
				<Text>Col 2</Text>
			</HStack>
		</Background>
	);
}

const stylesheet = createStyleSheet((theme) => ({}));
