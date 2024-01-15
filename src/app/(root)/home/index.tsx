import { supabase } from "@/lib/supabase";
import { Background, Text } from "@/components/ui";
import EditScreenInfo from "@/components/EditScreenInfo";

async function signUpWithEmail() {
	const { error } = await supabase.auth.signOut();
}

export default function Home() {
	return (
		<Background>
			<Text onPress={signUpWithEmail}>Sign Out</Text>
			<EditScreenInfo path="/home" />
		</Background>
	);
}
