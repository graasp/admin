import {
  EnableNotifications,
  EnableNotificationsParam,
  NotificationStatusType,
} from '../types.js';

export const DEFAULT_ENABLE_NOTIFICATIONS: EnableNotificationsParam = {
  enableNotifications: true,
};

export const isNotificationEnabled = (
  enableNotifications: EnableNotifications | undefined,
  notificationStatus: NotificationStatusType,
) => {
  if (enableNotifications === undefined) {
    return true;
  }

  if (typeof enableNotifications === 'boolean') {
    return enableNotifications;
  }

  return Boolean(enableNotifications[notificationStatus]);
};
