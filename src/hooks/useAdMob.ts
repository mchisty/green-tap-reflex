import { useState, useEffect } from 'react';
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, InterstitialAdPluginEvents, AdMobBannerSize } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

export const useAdMob = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [interstitialReady, setInterstitialReady] = useState(false);

  // Replace these with your actual AdMob IDs from Google AdMob console
  const BANNER_AD_ID = Capacitor.getPlatform() === 'android' 
    ? 'ca-app-pub-3940256099942544/6300978111' // Test banner ID
    : 'ca-app-pub-3940256099942544/2934735716';
  
  const INTERSTITIAL_AD_ID = Capacitor.getPlatform() === 'android'
    ? 'ca-app-pub-3940256099942544/1033173712' // Test interstitial ID
    : 'ca-app-pub-3940256099942544/4411468910';

  useEffect(() => {
    const initializeAdMob = async () => {
      if (Capacitor.isNativePlatform()) {
        try {
          await AdMob.initialize({
            testingDevices: ['YOUR_DEVICE_ID'],
            initializeForTesting: true,
          });
          setIsInitialized(true);
        } catch (error) {
          console.error('AdMob initialization failed:', error);
        }
      }
    };

    initializeAdMob();
  }, []);

  const showBanner = async () => {
    if (!isInitialized || !Capacitor.isNativePlatform()) return;

    try {
      const options: BannerAdOptions = {
        adId: BANNER_AD_ID,
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: true,
      };

      await AdMob.showBanner(options);
      setBannerVisible(true);
    } catch (error) {
      console.error('Failed to show banner:', error);
    }
  };

  const hideBanner = async () => {
    if (!Capacitor.isNativePlatform()) return;

    try {
      await AdMob.hideBanner();
      setBannerVisible(false);
    } catch (error) {
      console.error('Failed to hide banner:', error);
    }
  };

  const removeBanner = async () => {
    if (!Capacitor.isNativePlatform()) return;

    try {
      await AdMob.removeBanner();
      setBannerVisible(false);
    } catch (error) {
      console.error('Failed to remove banner:', error);
    }
  };

  const prepareInterstitial = async () => {
    if (!isInitialized || !Capacitor.isNativePlatform()) return;

    try {
      await AdMob.prepareInterstitial({
        adId: INTERSTITIAL_AD_ID,
        isTesting: true,
      });
      setInterstitialReady(true);
    } catch (error) {
      console.error('Failed to prepare interstitial:', error);
    }
  };

  const showInterstitial = async () => {
    if (!interstitialReady || !Capacitor.isNativePlatform()) return;

    try {
      await AdMob.showInterstitial();
      setInterstitialReady(false);
      // Prepare next interstitial
      prepareInterstitial();
    } catch (error) {
      console.error('Failed to show interstitial:', error);
    }
  };

  return {
    isInitialized,
    bannerVisible,
    interstitialReady,
    showBanner,
    hideBanner,
    removeBanner,
    prepareInterstitial,
    showInterstitial,
  };
};
