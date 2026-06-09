import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function WelcomePage() {
    const router = useRouter();
    const { t } = useTranslation("auth");

    const handleFindHomes = () => {
        router.push("/(tabs)/explore");
    };

    const handleFindServices = () => {
        router.push("/(tabs)/activities");
    };

    const handleFindOpportunities = () => {
        router.push("/(tabs)");
    };

    const handleCreateAccount = () => {
        router.push("/register");
    };

    const handleLogin = () => {
        router.push("/login");
    };

    return (
        <ScreenContainer scrollable={true}>
            <View style={styles.container}>
                {/* Language Switcher Container */}
                <View style={styles.switcherContainer}>
                    <LanguageSwitcher />
                </View>

                {/* Logo / Header Title */}
                <Text style={styles.headerTitle}>{t("welcome_header")}</Text>

                {/* Skyscraper Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require("@/assets/images/glass-building.png")}
                        style={styles.buildingImage}
                        resizeMode="cover"
                    />
                </View>

                {/* Main Info Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{t("all_in_one_title")}</Text>
                    <Text style={styles.cardDescription}>{t("all_in_one_desc")}</Text>
                </View>

                {/* Quick Actions Tabs */}
                <View style={styles.tabsRow}>
                    <TouchableOpacity style={styles.tabItem} onPress={handleFindHomes}>
                        <Ionicons name="home-outline" size={24} color={colors.primary} />
                        <Text style={styles.tabText}>{t("find_homes")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabItem} onPress={handleFindServices}>
                        <Ionicons name="construct-outline" size={24} color={colors.primary} />
                        <Text style={styles.tabText}>{t("find_services")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabItem} onPress={handleFindOpportunities}>
                        <Ionicons name="trending-up" size={24} color={colors.primary} />
                        <Text style={styles.tabText}>{t("find_opportunities")}</Text>
                    </TouchableOpacity>
                </View>

                {/* Auth Action Buttons */}
                <View style={styles.authActions}>
                    <TouchableOpacity style={styles.primaryButton} onPress={handleCreateAccount}>
                        <Text style={styles.primaryButtonText}>{t("create_account")}</Text>
                    </TouchableOpacity>

                    <Text style={styles.alreadyText}>{t("already_have_account")}</Text>

                    <TouchableOpacity style={styles.outlineButton} onPress={handleLogin}>
                        <Text style={styles.outlineButtonText}>{t("login")}</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer Text */}
                <Text style={styles.footerText}>{t("footer_text")}</Text>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.huge,
        flex: 1,
    },
    switcherContainer: {
        alignSelf: "flex-end",
        marginTop: spacing.sm,
        marginBottom: spacing.xs,
        zIndex: 999,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.primary,
        textAlign: "center",
        marginVertical: spacing.md,
    },
    imageContainer: {
        width: "100%",
        height: 220,
        borderRadius: layout.borderRadius.lg,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacing.lg,
    },
    buildingImage: {
        width: "100%",
        height: "100%",
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: layout.borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: spacing.xs,
    },
    cardDescription: {
        fontSize: 14,
        color: colors.textLight,
        lineHeight: 20,
    },
    tabsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: spacing.sm,
        marginBottom: spacing.xl,
    },
    tabItem: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: layout.borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xs,
        alignItems: "center",
        justifyContent: "center",
    },
    tabText: {
        fontSize: 11,
        fontWeight: "600",
        color: colors.text,
        marginTop: spacing.sm,
        textAlign: "center",
    },
    authActions: {
        width: "100%",
        marginBottom: spacing.huge,
    },
    primaryButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.lg,
        borderRadius: layout.borderRadius.md,
        alignItems: "center",
        justifyContent: "center",
    },
    primaryButtonText: {
        color: colors.surface,
        fontSize: 16,
        fontWeight: "bold",
    },
    alreadyText: {
        fontSize: 14,
        color: colors.textLight,
        textAlign: "center",
        marginVertical: spacing.md,
    },
    outlineButton: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.primary,
        paddingVertical: spacing.lg,
        borderRadius: layout.borderRadius.md,
        alignItems: "center",
        justifyContent: "center",
    },
    outlineButtonText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "bold",
    },
    footerText: {
        fontSize: 11,
        color: colors.textLight,
        textAlign: "center",
        marginTop: spacing.sm,
        marginBottom: spacing.lg,
    },
});

