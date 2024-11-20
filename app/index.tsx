import { Text, View, StyleSheet, TouchableOpacity, useColorScheme, Alert } from "react-native";
import Icon from '@/assets/images/wordle-icon.svg';
import { Link } from "expo-router";
import { format } from "date-fns";
import { Colors } from "@/constants/Colors";
import ThemedText from "@/components/ThemedText";
import SubscribeModal from "@/components/SubscribeModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";

export default function Index() {

  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;

  const subscribeModalRef = useRef<BottomSheetModal>(null);

  const handlePresentSubscribeModalPress = () => subscribeModalRef.current?.present();

  const { signOut } = useAuth();

  // Alert user to confirm sign out (this is not from the tutorial)
  const handleSignOutPress = () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Sign Out",
          onPress: () => signOut(),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SubscribeModal ref={subscribeModalRef} />
      
      <View style={styles.header}>
        <Icon width={100} height={100} />
        <ThemedText style={styles.title}>Wordle</ThemedText>
        <ThemedText style={styles.text}>Get 6 chances to guess a 5-letter word.</ThemedText>
      </View>

      <View style={styles.menu}>
        <Link
          href="/game"
          style={[styles.btn, { backgroundColor: colorScheme === "light" ? "#000" : "#4a4a4a" }]}
          asChild>
          <TouchableOpacity>
            <Text style={[styles.btnText, styles.primaryText]} >Play</Text>
          </TouchableOpacity>
        </Link>

        <SignedOut>
          <Link
            href="/login"
            style={[styles.btn, {borderColor: textColor}]}
            asChild>
            <TouchableOpacity>
              <ThemedText style={[styles.btnText]} >Log In</ThemedText>
            </TouchableOpacity>
          </Link>
        </SignedOut>

        <SignedIn>
          <TouchableOpacity
            onPress={handleSignOutPress}
            style={[styles.btn, {borderColor: textColor}]}>
            <ThemedText style={[styles.btnText]} >Sign Out</ThemedText>
          </TouchableOpacity>
        </SignedIn>

        <TouchableOpacity
          onPress={handlePresentSubscribeModalPress}
          style={[styles.btn, {borderColor: textColor}]}>
          <ThemedText style={[styles.btnText]} >Subscribe</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <ThemedText style={styles.footerDate}>{format(new Date(), "MMMM d, yyyy")}</ThemedText>
        <ThemedText style={styles.footerText}>Edited by Kirk Graham</ThemedText>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 50,
    gap: 40,
  },
  header: {
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 40,
    fontFamily: "FrankRuhlLibre_800ExtraBold",
  },
  text: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_500Medium",
  },
  menu: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  btn: {
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: "60%",
    maxWidth: 200,
  },
  btnText: {
    padding: 14,
    fontSize: 16,
    fontWeight: "semibold",
    color: "#333",
  },
  primaryItem: {
    backgroundColor: "#000",
  },
  primaryText: {
    color: '#fff',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerDate: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
  },
});
