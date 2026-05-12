import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
import { colors } from '../../../theme/colors';
import { presets } from '../../../theme/typography';
import { spacing, layout } from '../../../theme/spacing';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    console.log('Requesting OTP for:', email);
  };

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.content}>
        <Text style={presets.h1}>Welcome to RentalTrakr</Text>
        <Text style={[presets.body, styles.subtitle]}>
          Enter your email to receive a secure login code.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: layout.gutter,
  },
  content: {
    width: '100%',
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    color: colors.textLight,
  },
  input: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.md,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
