import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'com.mchisty.greentapreflex',
  appName: 'Green Tap Reflex',
  webDir: 'dist',
  server: {
    url: 'https://82eb1283-ea38-4630-b4a5-6cc059290223.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    AdMob: {
      testingDevices: ['YOUR_DEVICE_ID'],
      trackingAuthorizationStatus: true
    }
  }
};

export default config;
