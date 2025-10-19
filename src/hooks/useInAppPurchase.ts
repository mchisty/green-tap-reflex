import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

const PURCHASE_KEY = 'ads_removed';
const PRODUCT_ID = 'remove_ads';

// SECURITY WARNING: This is a client-side only implementation
// It can be bypassed by modifying local storage
// For production, you MUST implement server-side receipt validation

export const useInAppPurchase = () => {
  const [adsRemoved, setAdsRemoved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkPurchaseStatus();
  }, []);

  const checkPurchaseStatus = async () => {
    try {
      const { value } = await Preferences.get({ key: PURCHASE_KEY });
      setAdsRemoved(value === 'true');
    } catch (error) {
      console.error('Failed to check purchase status:', error);
    } finally {
      setLoading(false);
    }
  };

  const purchaseRemoveAds = async () => {
    if (!Capacitor.isNativePlatform()) {
      // For web testing, simulate purchase
      await Preferences.set({ key: PURCHASE_KEY, value: 'true' });
      setAdsRemoved(true);
      return { success: true };
    }

    // WARNING: This implementation is insecure and can be bypassed
    // For production, integrate Google Play Billing with server-side validation
    try {
      // TODO: Implement actual Google Play Billing integration
      await Preferences.set({ key: PURCHASE_KEY, value: 'true' });
      setAdsRemoved(true);
      return { success: true };
    } catch (error) {
      console.error('Purchase failed:', error);
      return { success: false, error };
    }
  };

  const restorePurchases = async () => {
    if (!Capacitor.isNativePlatform()) {
      await checkPurchaseStatus();
      return { success: true };
    }

    // WARNING: This doesn't actually restore from Google Play
    try {
      await checkPurchaseStatus();
      return { success: true };
    } catch (error) {
      console.error('Restore failed:', error);
      return { success: false, error };
    }
  };

  return {
    adsRemoved,
    loading,
    purchaseRemoveAds,
    restorePurchases,
  };
};
