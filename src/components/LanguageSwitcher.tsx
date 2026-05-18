import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const selectLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  const currentLangLabel = i18n.language === 'fr' ? 'FR' : 'EN';

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(true)} style={styles.container}>
        <Text style={styles.text}>
          🌐 {currentLangLabel} ▼
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setIsOpen(false)}>
          <View style={styles.dropdown}>
            <TouchableOpacity 
              style={[
                styles.option, 
                i18n.language === 'en' && styles.activeOption
              ]} 
              onPress={() => selectLanguage('en')}
            >
              <Text style={[
                styles.optionText,
                i18n.language === 'en' && styles.activeOptionText
              ]}>
                English
              </Text>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={[
                styles.option, 
                i18n.language === 'fr' && styles.activeOption
              ]} 
              onPress={() => selectLanguage('fr')}
            >
              <Text style={[
                styles.optionText,
                i18n.language === 'fr' && styles.activeOptionText
              ]}>
                Français
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 122, 255, 0.08)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.15)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  dropdown: {
    marginTop: 65, // Height aligning with header
    marginRight: 15,
    width: 140,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 4,
    // Shadows for premium depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  activeOption: {
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  optionText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  activeOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginHorizontal: 10,
  },
});
