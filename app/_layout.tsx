import { Slot } from "expo-router";
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins'

export default function RootLayout() {

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  })

  if (!fontsLoaded) {
    return null;
  }

  return <Slot />;
}
