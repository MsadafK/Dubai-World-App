import { useSignIn, useSignUp } from '@clerk/expo';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import colors from '@/constants/colors';

const theme = colors.light;

export default function AuthScreen() {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit() {
    setBusy(true);
    setError('');
    try {
      if (mode === 'signIn') {
        const result = await signIn.password({ emailAddress: email.trim(), password });
        if (result.error) throw new Error(result.error.message || 'Unable to sign in');
        if (signIn.status === 'complete') {
          await signIn.finalize();
          router.back();
        }
        return;
      }

      const result = await signUp.password({ emailAddress: email.trim(), password });
      if (result.error) throw new Error(result.error.message || 'Unable to create account');
      await signUp.verifications.sendEmailCode();
      setVerificationSent(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong');
    } finally {
      setBusy(false);
    }
  }

  async function verify() {
    setBusy(true);
    setError('');
    try {
      await signUp.verifications.verifyEmailCode({ code: code.trim() });
      if (signUp.status === 'complete') {
        await signUp.finalize();
        router.back();
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Invalid verification code');
    } finally {
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable onPress={() => router.back()} style={styles.close}>
          <Text style={styles.closeText}>Close</Text>
        </Pressable>
        <Text style={styles.eyebrow}>DUBAI EXTRAORDINARY</Text>
        <Text style={styles.title}>{verificationSent ? 'Check your inbox.' : mode === 'signIn' ? 'Welcome back.' : 'Make Dubai yours.'}</Text>
        <Text style={styles.subtitle}>
          {verificationSent ? 'Enter the verification code we sent to your email.' : 'Save places, build itineraries, and keep every Dubai moment in one place.'}
        </Text>

        {!verificationSent ? (
          <>
            <View style={styles.switcher}>
              {(['signIn', 'signUp'] as const).map((item) => (
                <Pressable key={item} onPress={() => setMode(item)} style={[styles.switchItem, mode === item && styles.switchActive]}>
                  <Text style={[styles.switchText, mode === item && styles.switchTextActive]}>{item === 'signIn' ? 'Sign in' : 'Create account'}</Text>
                </Pressable>
              ))}
            </View>
            <TextInput autoCapitalize="none" autoComplete="email" keyboardType="email-address" placeholder="Email address" placeholderTextColor={theme.mutedForeground} value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput autoCapitalize="none" autoComplete="password" placeholder="Password" placeholderTextColor={theme.mutedForeground} secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
            <Pressable disabled={busy || !email || !password} onPress={submit} style={[styles.button, (busy || !email || !password) && styles.buttonDisabled]}>
              <Text style={styles.buttonText}>{busy ? 'Please wait…' : mode === 'signIn' ? 'Sign in' : 'Create account'}</Text>
            </Pressable>
          </>
        ) : (
          <>
            <TextInput autoCapitalize="none" keyboardType="number-pad" placeholder="Verification code" placeholderTextColor={theme.mutedForeground} value={code} onChangeText={setCode} style={styles.input} />
            <Pressable disabled={busy || !code} onPress={verify} style={[styles.button, (busy || !code) && styles.buttonDisabled]}>
              <Text style={styles.buttonText}>{busy ? 'Verifying…' : 'Verify email'}</Text>
            </Pressable>
          </>
        )}
        {!!error && <Text style={styles.error}>{error}</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.background },
  content: { flexGrow: 1, padding: 24, paddingTop: 70, justifyContent: 'center' },
  close: { position: 'absolute', top: 24, right: 24, padding: 8 },
  closeText: { color: theme.mutedForeground, fontSize: 14 },
  eyebrow: { color: theme.primary, fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 12 },
  title: { color: theme.foreground, fontSize: 36, fontWeight: '800', letterSpacing: -1, lineHeight: 42 },
  subtitle: { color: theme.mutedForeground, fontSize: 15, lineHeight: 23, marginTop: 12, marginBottom: 28 },
  switcher: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  switchItem: { borderWidth: 1, borderColor: theme.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10 },
  switchActive: { backgroundColor: theme.primary, borderColor: theme.primary },
  switchText: { color: theme.foreground, fontSize: 13, fontWeight: '600' },
  switchTextActive: { color: theme.primaryForeground },
  input: { borderWidth: 1, borderColor: theme.border, backgroundColor: theme.card, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 15, color: theme.foreground, fontSize: 15, marginBottom: 12 },
  button: { backgroundColor: theme.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: theme.primaryForeground, fontSize: 15, fontWeight: '800' },
  error: { color: '#D45B56', fontSize: 13, lineHeight: 19, marginTop: 14 },
});