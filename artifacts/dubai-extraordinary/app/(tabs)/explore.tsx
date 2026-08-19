import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { ExperienceCard } from '@/components/ExperienceCard';
import { experiences } from '@/data/experiences';
import { useExperiences } from '@/context/ExperienceContext';

export default function ExploreScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { savedIds, toggleSaved } = useExperiences();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('All');
  const filters = ['All', 'Iconic', 'Adventure', 'Luxury', 'Culture'];
  const list = useMemo(() => experiences.filter((item) => (active === 'All' || item.category === active) && `${item.title} ${item.subtitle}`.toLowerCase().includes(query.toLowerCase())), [active, query]);
  return <View style={[styles.screen, { backgroundColor: colors.background }]}><ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 15, paddingBottom: Platform.OS === 'web' ? 105 : 112 }]}><View style={styles.header}><View><Text style={[styles.eyebrow, { color: colors.primary }]}>EXPLORE</Text><Text style={[styles.title, { color: colors.foreground }]}>Find your Dubai.</Text></View><Pressable onPress={() => router.push('/profile')}><Ionicons name="person-circle-outline" size={30} color={colors.primary} /></Pressable></View><View style={[styles.search, { backgroundColor: colors.card, borderColor: colors.border }]}><Ionicons name="search" size={18} color={colors.primary} /><TextInput value={query} onChangeText={setQuery} placeholder="Search places, experiences..." placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground }]} /></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{filters.map((filter) => <Pressable key={filter} onPress={() => setActive(filter)} style={[styles.filter, active === filter && { backgroundColor: colors.primary, borderColor: colors.primary }]}><Text style={[styles.filterText, { color: active === filter ? colors.primaryForeground : colors.foreground }]}>{filter}</Text></Pressable>)}</ScrollView><View style={styles.grid}>{list.map((item) => <ExperienceCard key={item.id} item={item} compact saved={savedIds.includes(item.id)} onPress={() => router.push({ pathname: '/detail', params: { id: item.id } })} onSave={() => toggleSaved(item.id)} />)}</View>{list.length === 0 && <View style={styles.empty}><Ionicons name="compass-outline" size={34} color={colors.primary} /><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Nothing found yet</Text><Text style={[styles.emptyText, { color: colors.mutedForeground }]}>Try a different search or explore all of Dubai.</Text></View>}</ScrollView></View>;
}
const styles = StyleSheet.create({ screen: { flex: 1 }, content: { paddingHorizontal: 20 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }, eyebrow: { fontSize: 10, fontWeight: '700', letterSpacing: 2 }, title: { fontSize: 28, fontWeight: '700', letterSpacing: -1, marginTop: 5 }, search: { borderRadius: 17, borderWidth: 1, height: 54, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 15 }, input: { flex: 1, fontSize: 13 }, filters: { gap: 8, paddingVertical: 17 }, filter: { borderWidth: 1, borderColor: '#26425B', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 9 }, filterText: { fontSize: 12, fontWeight: '600' }, grid: { gap: 0 }, empty: { alignItems: 'center', paddingTop: 70 }, emptyTitle: { fontSize: 17, fontWeight: '700', marginTop: 12 }, emptyText: { fontSize: 13, marginTop: 5 } });