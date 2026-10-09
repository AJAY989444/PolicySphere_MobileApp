import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useNotificationStore } from '../store/useNotificationStore';
import { NotificationItem } from '../types/package3';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'NotificationCenter'>;

const CHANNELS: Array<'All' | NotificationItem['channel']> = [
  'All',
  'InApp',
  'Push',
  'SMS',
  'WhatsApp',
  'Email',
];

export const NotificationCenterScreen: React.FC<Props> = ({ navigation }) => {
  const { notifications, unreadCount, isLoading, loadNotifications, markAsRead, markAllAsRead } =
    useNotificationStore();
  const [selectedChannel, setSelectedChannel] = useState<'All' | NotificationItem['channel']>('All');

  useEffect(() => {
    loadNotifications();
  }, []);

  const filteredNotifications =
    selectedChannel === 'All'
      ? notifications
      : notifications.filter((n) => n.channel === selectedChannel);

  const getEventBadgeColor = (category: NotificationItem['eventCategory']) => {
    switch (category) {
      case 'Claim':
        return COLORS.accent;
      case 'Renewal':
        return COLORS.warning;
      case 'Payment':
        return COLORS.primaryLight;
      case 'OTP':
        return '#EC4899';
      default:
        return COLORS.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Hub (Module 14)</Text>
        {unreadCount > 0 ? (
          <TouchableOpacity style={styles.markAllBtn} onPress={() => markAllAsRead()}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 60 }} />
        )}
      </View>

      {/* Omnichannel Dispatch Status Bar */}
      <View style={styles.omniBar}>
        <Text style={styles.omniTitle}>Omnichannel Event Dispatcher</Text>
        <Text style={styles.omniSub}>
          InApp • Web Push • Automated SMS Gateways • Official WhatsApp Business • Encrypted Email
        </Text>
      </View>

      {/* Channel Filter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.channelRow}>
        {CHANNELS.map((ch) => (
          <TouchableOpacity
            key={ch}
            style={[styles.chChip, selectedChannel === ch && styles.chChipSelected]}
            onPress={() => setSelectedChannel(ch)}
          >
            <Text style={[styles.chText, selectedChannel === ch && styles.chTextSelected]}>
              {ch}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.accent} style={{ marginTop: 20 }} />
        ) : filteredNotifications.length === 0 ? (
          <Text style={styles.emptyText}>No notifications found in channel.</Text>
        ) : (
          filteredNotifications.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.notifCard, !item.isRead && styles.notifCardUnread]}
              onPress={() => markAsRead(item.id)}
            >
              <View style={styles.notifHeader}>
                <View style={styles.titleRow}>
                  {!item.isRead && <View style={styles.unreadDot} />}
                  <Text style={styles.notifTitle}>{item.title}</Text>
                </View>
                <View
                  style={[
                    styles.catBadge,
                    { backgroundColor: getEventBadgeColor(item.eventCategory) },
                  ]}
                >
                  <Text style={styles.catText}>{item.eventCategory}</Text>
                </View>
              </View>

              <Text style={styles.notifMessage}>{item.message}</Text>

              <View style={styles.notifFooter}>
                <Text style={styles.channelLabel}>Channel: {item.channel}</Text>
                <Text style={styles.timeLabel}>{item.timestamp}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 16,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  backBtn: { padding: 4 },
  backText: { color: COLORS.primaryLight, fontSize: 14, fontWeight: '600' },
  headerTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '700' },
  markAllBtn: { paddingVertical: 4 },
  markAllText: { color: COLORS.accent, fontSize: 12, fontWeight: '700' },
  omniBar: {
    backgroundColor: '#1E3A8A',
    padding: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryLight,
  },
  omniTitle: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  omniSub: { color: COLORS.borderLight, fontSize: 10, marginTop: 2 },
  channelRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 56,
  },
  chChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#1E293B',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  chChipSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryLight,
  },
  chText: { color: COLORS.textSecondary, fontSize: 12 },
  chTextSelected: { color: '#FFFFFF', fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  emptyText: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 20 },
  notifCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  notifCardUnread: {
    borderColor: COLORS.accent,
    backgroundColor: '#0F172A',
  },
  notifHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.accent },
  notifTitle: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14, flex: 1 },
  catBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  catText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  notifMessage: { color: COLORS.textSecondary, fontSize: 12, marginTop: 8, lineHeight: 18 },
  notifFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#334155' },
  channelLabel: { color: COLORS.primaryLight, fontSize: 11, fontWeight: '600' },
  timeLabel: { color: '#64748B', fontSize: 11 },
});
