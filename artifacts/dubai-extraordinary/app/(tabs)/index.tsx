import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { ExperienceCard } from '@/components/ExperienceCard';
import { SectionHeader } from '@/components/SectionHeader';
import { categories, experiences } from '@/data/experiences';
import { useExperiences } from '@/context/ExperienceContext';

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { savedIds, toggleSaved } = useExperiences();
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () =>
      experiences.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 12, paddingBottom: Platform.OS === 'web' ? 105 : 112 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topbar}>
          <View>
            <Text style={[styles.kicker, { color: colors.primary }]}>DUBAI / 2026</Text>
            <Text style={[styles.wordmark, { color: colors.foreground }]}>Extraordinary.</Text>
          </View>
          <Pressable
            onPress={() => router.push('/profile')}
            style={[styles.avatar, { borderColor: colors.border }]}
            testID="profile-button"
          >
            <Text style={[styles.avatarText, { color: colors.primary }]}>S</Text>
          </Pressable>
        </View>

        <LinearGradient
          colors={['#163856', '#0C2034', '#07121F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Image
            source={require('@/assets/images/hero-dubai.jpg')}
            contentFit="cover"
            style={styles.heroImage}
            transition={300}
          />
          <LinearGradient
            colors={['rgba(7,18,31,0.15)', 'rgba(7,18,31,0.95)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>THE CITY THAT NEVER SETTLES</Text>
            <Text style={styles.heroTitle}>Discover{'\n'}the extraordinary.</Text>
            <Text style={styles.heroSubtitle}>
              Your edit of iconic places, secret corners, and experiences worth crossing the world
              for.
            </Text>
          </View>
        </LinearGradient>

        <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="search" size={19} color={colors.primary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="What do you want to experience?"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.searchInput, { color: colors.foreground }]}
            returnKeyType="search"
            testID="home-search"
          />
          <Pressable onPress={() => router.push('/explore')} hitSlop={8}>
            <Ionicons name="options-outline" size={19} color={colors.mutedForeground} />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {categories.map((category, index) => (
            <Pressable
              key={category.label}
              onPress={() => {
                Haptics.selectionAsync();
                router.push('/explore');
              }}
              style={[styles.category, index === 0 && { backgroundColor: colors.primary }]}
              testID={`category-${category.label}`}
            >
              <Ionicons
                name={category.icon}
                size={19}
                color={index === 0 ? colors.primaryForeground : colors.primary}
              />
              <Text
                style={[
                  styles.categoryText,
                  { color: index === 0 ? colors.primaryForeground : colors.foreground },
                ]}
              >
                {category.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <SectionHeader
            eyebrow="Curated for you"
            title="Trending in Dubai"
            action="See all"
            onAction={() => router.push('/explore')}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filtered.slice(0, 3).map((item) => (
              <ExperienceCard
                key={item.id}
                item={item}
                saved={savedIds.includes(item.id)}
                onPress={() => router.push({ pathname: '/detail', params: { id: item.id } })}
                onSave={() => toggleSaved(item.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader
            eyebrow="This week only"
            title="Offers worth leaving home for"
            action="View all"
            onAction={() => router.push('/explore')}
          />
          <Pressable
            onPress={() => router.push({ pathname: '/detail', params: { id: 'desert' } })}
            style={[styles.offer, { borderColor: colors.border, backgroundColor: colors.card }]}
          >
            <Image
              source={require('@/assets/images/desert-experience.jpg')}
              contentFit="cover"
              style={styles.offerImage}
            />
            <View style={styles.offerCopy}>
              <View style={[styles.discount, { backgroundColor: colors.primary }]}>
                <Text style={[styles.discountText, { color: colors.primaryForeground }]}>-25%</Text>
              </View>
              <Text style={[styles.offerTitle, { color: colors.foreground }]}>Dune dinner, reimagined</Text>
              <Text style={[styles.offerMeta, { color: colors.mutedForeground }]}>
                Private desert escape · Al Marmoom
              </Text>
              <Text style={[styles.offerPrice, { color: colors.primary }]}>
                From AED 285{' '}
                <Text style={[styles.strike, { color: colors.mutedForeground }]}>AED 380</Text>
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={19} color={colors.primary} style={styles.offerIcon} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <SectionHeader eyebrow="Your city edit" title="Make it yours" />
          <View style={[styles.itineraryBanner, { backgroundColor: colors.secondary }]}>
            <View style={[styles.miniCompass, { backgroundColor: colors.primary }]}>
              <Ionicons name="navigate" size={22} color={colors.primaryForeground} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.itineraryTitle, { color: colors.foreground }]}>Build your Dubai</Text>
              <Text style={[styles.itineraryText, { color: colors.mutedForeground }]}>
                Save places and shape a day that is entirely yours.
              </Text>
            </View>
            <Pressable onPress={() => router.push('/saved')} hitSlop={10}>
              <Ionicons name="arrow-forward-circle" size={28} color={colors.primary} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  kicker: { fontSize: 10, fontWeight: '700', letterSpacing: 2.2 },
  wordmark: { fontSize: 25, fontWeight: '700', letterSpacing: -1.2, marginTop: 3 },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 15, fontWeight: '700' },
  hero: { height: 390, borderRadius: 24, overflow: 'hidden', marginBottom: 16 },
  heroImage: { ...StyleSheet.absoluteFillObject },
  heroCopy: { position: 'absolute', bottom: 25, left: 22, right: 22 },
  heroEyebrow: { color: '#EBCB91', fontSize: 10, fontWeight: '700', letterSpacing: 1.7, marginBottom: 10 },
  heroTitle: { color: '#F5F0E8', fontSize: 38, fontWeight: '700', lineHeight: 41, letterSpacing: -1.3 },
  heroSubtitle: { color: 'rgba(245,240,232,0.74)', fontSize: 13, lineHeight: 19, marginTop: 12, maxWidth: 290 },
  searchBox: { height: 57, borderRadius: 17, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 16 },
  searchInput: { flex: 1, fontSize: 13 },
  categoryRow: { gap: 10, paddingVertical: 17 },
  category: { height: 43, paddingHorizontal: 15, borderRadius: 22, borderWidth: 1, borderColor: '#26425B', flexDirection: 'row', alignItems: 'center', gap: 7 },
  categoryText: { fontSize: 12, fontWeight: '600' },
  section: { marginTop: 17 },
  offer: { minHeight: 130, borderRadius: 19, borderWidth: 1, overflow: 'hidden', flexDirection: 'row', alignItems: 'center' },
  offerImage: { width: 112, height: '100%', minHeight: 130 },
  offerCopy: { padding: 14, flex: 1 },
  discount: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 7, marginBottom: 8 },
  discountText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.6 },
  offerTitle: { fontSize: 15, fontWeight: '700' },
  offerMeta: { fontSize: 11, marginTop: 4 },
  offerPrice: { fontSize: 12, fontWeight: '700', marginTop: 11 },
  strike: { textDecorationLine: 'line-through', fontWeight: '400', marginLeft: 4 },
  offerIcon: { marginRight: 13 },
  itineraryBanner: { borderRadius: 19, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 13 },
  miniCompass: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  itineraryTitle: { fontSize: 15, fontWeight: '700' },
  itineraryText: { fontSize: 11, lineHeight: 16, marginTop: 3, paddingRight: 8 },
});
