import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';

export function SectionHeader({ eyebrow, title, action, onAction }: { eyebrow?: string; title: string; action?: string; onAction?: () => void }) {
  const colors = useColors();
  return (
    <View style={styles.row}>
      <View>
        {eyebrow ? <Text style={[styles.eyebrow, { color: colors.primary }]}>{eyebrow.toUpperCase()}</Text> : null}
        <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
      </View>
      {action ? <Pressable onPress={onAction} style={styles.action}><Text style={[styles.actionText, { color: colors.primary }]}>{action}</Text><Ionicons name="arrow-forward" size={15} color={colors.primary} /></Pressable> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
  eyebrow: { fontSize: 10, fontWeight: '700', letterSpacing: 1.8, marginBottom: 6 },
  title: { fontSize: 25, fontWeight: '700', letterSpacing: -0.6 },
  action: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingBottom: 3 },
  actionText: { fontSize: 12, fontWeight: '600' },
});