import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  const { t } = useTranslation('home');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          {t('explore')}
        </ThemedText>
      </ThemedView>
      <ThemedText>{t('explore_subtitle')}</ThemedText>
      <Collapsible title={t('explore_routing_title')}>
        <ThemedText>
          {t('explore_routing_desc1')}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{t('explore_and')}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          {t('explore_routing_desc2')}<ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          {t('explore_routing_desc3')}
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">{t('explore_learn_more')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore_platforms_title')}>
        <ThemedText>
          {t('explore_platforms_desc1')}
          <ThemedText type="defaultSemiBold">w</ThemedText>{t('explore_platforms_desc2')}
        </ThemedText>
      </Collapsible>
      <Collapsible title={t('explore_images_title')}>
        <ThemedText>
          {t('explore_images_desc1')}<ThemedText type="defaultSemiBold">@2x</ThemedText>{t('explore_and')}{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText>{t('explore_images_desc2')}
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">{t('explore_learn_more')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore_theme_title')}>
        <ThemedText>
          {t('explore_theme_desc1')}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText>{t('explore_theme_desc2')}
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">{t('explore_learn_more')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore_animations_title')}>
        <ThemedText>
          {t('explore_animations_desc1')}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText>{t('explore_animations_desc2')}{' '}
          <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
            react-native-reanimated
          </ThemedText>{' '}
          {t('explore_animations_desc3')}
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              {t('explore_parallax_desc1')}<ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              {t('explore_parallax_desc2')}
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
