import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";
import { COLORS } from "../src/constants/colors";
import { Button } from "../src/components/Button";

const NETWORKS = [
  { id: "solana", name: "Solana", icon: "logo-usd" }, // Using standard icons
  { id: "ethereum", name: "Ethereum", icon: "logo-octocat" },
  { id: "bsc", name: "BNB Chain", icon: "logo-ionic" },
  { id: "polygon", name: "Polygon", icon: "logo-medium" },
];

const TOKENS = [
  { id: "usdc", name: "USDC", symbol: "USDC" },
  { id: "usdt", name: "USDT", symbol: "USDT" },
  { id: "sol", name: "SOL", symbol: "SOL" },
  { id: "eth", name: "ETH", symbol: "ETH" },
];

export default function FundScreen() {
  const router = useRouter();
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0]);
  const [selectedToken, setSelectedToken] = useState(TOKENS[0]);
  const [amount, setAmount] = useState("");
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [quote, setQuote] = useState<any>(null);

  // Progress stepper state
  const [bridgeStep, setBridgeStep] = useState(0); // 0: input, 1: lock tx, 2: bridge processing, 3: completed
  const [stepMessage, setStepMessage] = useState("");

  const getQuote = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setLoadingQuote(true);
    // Simulate API fetch delay
    setTimeout(() => {
      setLoadingQuote(false);
      setQuote({
        fee: (parseFloat(amount) * 0.005).toFixed(4),
        receiveAmount: (parseFloat(amount) * 0.995).toFixed(2),
        route: `${selectedNetwork.name} (${selectedToken.symbol}) ➡️ Stellar (USDC)`,
      });
    }, 1000);
  };

  const startBridge = () => {
    setBridgeStep(1);
    setStepMessage(`1. Initiating transfer on ${selectedNetwork.name}...`);

    // Step 1 -> Step 2
    setTimeout(() => {
      setBridgeStep(2);
      setStepMessage(
        `2. Awaiting lock confirmations on ${selectedNetwork.name} (4/12)...`
      );
    }, 2000);

    // Step 2 -> Step 3
    setTimeout(() => {
      setStepMessage(
        "3. Relaying tokens through Allbridge validator consensus..."
      );
    }, 4500);

    // Step 3 -> Completed
    setTimeout(() => {
      setBridgeStep(3);
      setStepMessage(
        "4. Funds released on Stellar! USDC deposited to your wallet."
      );
    }, 7000);
  };

  const handleDone = () => {
    // Navigate home
    router.replace("/(personal)/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fund Wallet</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {bridgeStep === 0 ? (
          <View>
            <Text style={styles.subtitle}>
              Bridge assets from other blockchains directly to your Stellar
              wallet using Allbridge Core.
            </Text>

            {/* Source Network Selection */}
            <Text style={styles.sectionLabel}>Source Network</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {NETWORKS.map((network) => (
                <TouchableOpacity
                  key={network.id}
                  style={[
                    styles.networkCard,
                    selectedNetwork.id === network.id &&
                      styles.networkCardActive,
                  ]}
                  onPress={() => {
                    setSelectedNetwork(network);
                    setQuote(null);
                  }}
                >
                  <Ionicons
                    name={network.icon as any}
                    size={22}
                    color={
                      selectedNetwork.id === network.id
                        ? COLORS.secondary
                        : COLORS.primary
                    }
                  />
                  <Text
                    style={[
                      styles.networkName,
                      selectedNetwork.id === network.id &&
                        styles.networkNameActive,
                    ]}
                  >
                    {network.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Token Selection */}
            <Text style={styles.sectionLabel}>Token to Bridge</Text>
            <View style={styles.tokenGrid}>
              {TOKENS.map((token) => (
                <TouchableOpacity
                  key={token.id}
                  style={[
                    styles.tokenCard,
                    selectedToken.id === token.id && styles.tokenCardActive,
                  ]}
                  onPress={() => {
                    setSelectedToken(token);
                    setQuote(null);
                  }}
                >
                  <Text
                    style={[
                      styles.tokenText,
                      selectedToken.id === token.id && styles.tokenTextActive,
                    ]}
                  >
                    {token.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Input Amount */}
            <Text style={styles.sectionLabel}>Amount</Text>
            <View style={styles.amountInputContainer}>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                keyboardType="numeric"
                value={amount}
                onChangeText={(val) => {
                  setAmount(val);
                  setQuote(null);
                }}
              />
              <Text style={styles.currencySuffix}>{selectedToken.symbol}</Text>
            </View>

            {/* Call to action for Quote */}
            {!quote ? (
              <Button
                title={loadingQuote ? "Getting Quote..." : "Get Bridge Quote"}
                onPress={getQuote}
                disabled={!amount || parseFloat(amount) <= 0 || loadingQuote}
                style={[styles.actionBtn, { backgroundColor: COLORS.primary }]}
              />
            ) : (
              <View style={styles.quoteCard}>
                <Text style={styles.quoteTitle}>Allbridge Core Quote</Text>
                <View style={styles.quoteDivider} />

                <View style={styles.quoteRow}>
                  <Text style={styles.quoteLabel}>Bridge Route:</Text>
                  <Text style={styles.quoteVal}>{quote.route}</Text>
                </View>

                <View style={styles.quoteRow}>
                  <Text style={styles.quoteLabel}>Bridge fee (0.5%):</Text>
                  <Text style={styles.quoteVal}>
                    {quote.fee} {selectedToken.symbol}
                  </Text>
                </View>

                <View style={styles.quoteRow}>
                  <Text style={styles.quoteLabel}>
                    Estimated USDC Received:
                  </Text>
                  <Text style={styles.quoteValHighlight}>
                    ${quote.receiveAmount} USDC
                  </Text>
                </View>

                <Button
                  title="Confirm & Initiate Bridge"
                  onPress={startBridge}
                  style={[
                    styles.actionBtn,
                    { marginTop: 16, backgroundColor: "#2E7D32" },
                  ]}
                />
              </View>
            )}
          </View>
        ) : (
          /* Interactive stepper view */
          <View style={styles.stepperContainer}>
            <View style={styles.successOuter}>
              {bridgeStep < 3 ? (
                <ActivityIndicator
                  size="large"
                  color={COLORS.primary}
                  style={styles.spinner}
                />
              ) : (
                <View style={styles.successCheck}>
                  <Ionicons name="checkmark" size={60} color="#1A4B4A" />
                </View>
              )}
            </View>

            <Text style={styles.stepperTitle}>
              {bridgeStep < 3
                ? "Cross-Chain Deposit in Progress"
                : "Bridging Successful!"}
            </Text>
            <Text style={styles.stepperDesc}>{stepMessage}</Text>

            {/* Stepper Graphic */}
            <View style={styles.progressLineContainer}>
              <View
                style={[
                  styles.progressDot,
                  bridgeStep >= 1 && styles.progressDotActive,
                ]}
              />
              <View
                style={[
                  styles.progressLine,
                  bridgeStep >= 2 && styles.progressLineActive,
                ]}
              />
              <View
                style={[
                  styles.progressDot,
                  bridgeStep >= 2 && styles.progressDotActive,
                ]}
              />
              <View
                style={[
                  styles.progressLine,
                  bridgeStep >= 3 && styles.progressLineActive,
                ]}
              />
              <View
                style={[
                  styles.progressDot,
                  bridgeStep >= 3 && styles.progressDotActive,
                ]}
              />
            </View>

            <View style={styles.progressLabels}>
              <Text
                style={[
                  styles.progressLabel,
                  bridgeStep >= 1 && styles.progressLabelActive,
                ]}
              >
                1. Init
              </Text>
              <Text
                style={[
                  styles.progressLabel,
                  bridgeStep >= 2 && styles.progressLabelActive,
                ]}
              >
                2. Lock
              </Text>
              <Text
                style={[
                  styles.progressLabel,
                  bridgeStep >= 3 && styles.progressLabelActive,
                ]}
              >
                3. Receive
              </Text>
            </View>

            {bridgeStep === 3 && (
              <Button
                title="Back to Wallet"
                onPress={handleDone}
                style={[
                  styles.actionBtn,
                  { marginTop: 40, backgroundColor: COLORS.primary },
                ]}
              />
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Outfit_700Bold",
    color: COLORS.black,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    flexGrow: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    fontFamily: "Outfit_400Regular",
    lineHeight: 20,
  },
  sectionLabel: {
    fontSize: 15,
    fontFamily: "Outfit_600SemiBold",
    color: COLORS.black,
    marginBottom: 10,
    marginTop: 10,
  },
  horizontalScroll: {
    marginBottom: 16,
  },
  networkCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 100,
    marginRight: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  networkCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  networkName: {
    fontSize: 14,
    color: COLORS.primary,
    fontFamily: "Outfit_500Medium",
  },
  networkNameActive: {
    color: COLORS.secondary,
    fontFamily: "Outfit_700Bold",
  },
  tokenGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  tokenCard: {
    flex: 1,
    minWidth: "22%",
    height: 44,
    backgroundColor: "#F5F5F5",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  tokenCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tokenText: {
    fontSize: 14,
    color: COLORS.primary,
    fontFamily: "Outfit_600SemiBold",
  },
  tokenTextActive: {
    color: COLORS.secondary,
    fontFamily: "Outfit_700Bold",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 24,
    backgroundColor: "#FDFDFD",
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Outfit_500Medium",
    color: COLORS.black,
  },
  currencySuffix: {
    fontSize: 16,
    fontFamily: "Outfit_700Bold",
    color: COLORS.primary,
  },
  actionBtn: {
    marginTop: 10,
    height: 56,
    borderRadius: 28,
  },
  quoteCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ECECEC",
    marginTop: 10,
  },
  quoteTitle: {
    fontSize: 15,
    fontFamily: "Outfit_700Bold",
    color: COLORS.primary,
    marginBottom: 8,
  },
  quoteDivider: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginBottom: 12,
  },
  quoteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  quoteLabel: {
    fontSize: 13,
    color: "#666",
    fontFamily: "Outfit_400Regular",
  },
  quoteVal: {
    fontSize: 13,
    fontFamily: "Outfit_600SemiBold",
    color: COLORS.black,
  },
  quoteValHighlight: {
    fontSize: 14,
    fontFamily: "Outfit_700Bold",
    color: "#2E7D32",
  },
  stepperContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  successOuter: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  spinner: {
    transform: [{ scale: 1.5 }],
  },
  successCheck: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#1A4B4A",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  stepperTitle: {
    fontSize: 20,
    fontFamily: "Outfit_700Bold",
    color: COLORS.black,
    marginBottom: 10,
  },
  stepperDesc: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    fontFamily: "Outfit_400Regular",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  progressLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    justifyContent: "center",
  },
  progressDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
  },
  progressLine: {
    flex: 1,
    height: 3,
    backgroundColor: "#E0E0E0",
  },
  progressLineActive: {
    backgroundColor: COLORS.primary,
  },
  progressLabels: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    marginTop: 10,
  },
  progressLabel: {
    fontSize: 12,
    color: "#999",
    fontFamily: "Outfit_500Medium",
    width: 60,
    textAlign: "center",
  },
  progressLabelActive: {
    color: COLORS.primary,
    fontFamily: "Outfit_700Bold",
  },
});
