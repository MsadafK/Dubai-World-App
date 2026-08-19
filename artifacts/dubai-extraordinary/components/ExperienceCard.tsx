import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import type { Experience } from '@/context/ExperienceContext';

export function ExperienceCard({
  item,
  saved,
  onPress,
  onSave,
  compact = false,
}: {
  item: Experience;
  saved: boolean;
  onPress: () => void;
  onSave: () => void;
  compact?: boolean;
}) {
  const colors = useColors();
  return (
    <Pressable onPress={onPress} style={[styles.card, compact && styles.compactCard]} testID={`experience-${item.id}`}>
      <Image source={item.image} contentFit="cover" style={styles.image} transition={250} />
      <View style={styles.imageShade} />
      <Pressable onPress={onSave} hitSlop={12} style={styles.saveButton} testID={`save-${item.id}`}>
        <Ionicons name={saved ? 'heart' : 'heart-outline'} size={19} color={saved ? colors.accent : colors.foreground} />
      </Pressable>
      <View style={styles.cardCopy}>
        <View style={styles.tag}>
          <Text style={[styles.tagText, { color: item.accent }]}>{item.category.toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{item.location}</Text>
          <View style={styles.rating}><Ionicons name="star" size={12} color={colors.accent} /><Text style={styles.meta}>{item.rating}</Text></View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: 260, height: 335, borderRadius: 22, overflow: 'hidden', marginRight: 14, backgroundColor: '#102236' },
  compactCard: { width: '100%', height: 250, marginRight: 0, marginBottom: 16 },
  image: { ...StyleSheet.absoluteFillObject },
  imageShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(4,10,19,0.3)' },
  saveButton: { position: 'absolute', top: 15, right: 15, width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(7,18,31,0.68)', alignItems: 'center', justifyContent: 'center' },
  cardCopy: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 18, paddingTop: 48 },
  tag: { alignSelf: 'flex-start', marginBottom: 6 },
  tagText: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  title: { color: '#F5F0E8', fontSize: 23, fontWeight: '700', letterSpacing: -0.5 },
  subtitle: { color: 'rgba(245,240,232,0.75)', fontSize: 12, marginTop: 4 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  meta: { color: 'rgba(245,240,232,0.7)', fontSize: 11 },
  rating: { flexDirection: 'row', gap: 4, alignItems: 'center' },
});