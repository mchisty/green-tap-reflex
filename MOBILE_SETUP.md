# Mobile App Setup Guide (Android)

Your game is now configured for Android with AdMob ads and in-app purchases! Follow these steps to test and deploy.

## 📱 Prerequisites

1. Install [Android Studio](https://developer.android.com/studio)
2. Install [Node.js](https://nodejs.org/) (v16 or higher)
3. Have a [Google AdMob account](https://admob.google.com/)
4. Have a [Google Play Console account](https://play.google.com/console/) (for production IAP)

## 🚀 Initial Setup

### 1. Export and Clone Project

1. Click **"Export to Github"** button in Lovable
2. Clone your repository locally:
   ```bash
   git clone <your-repo-url>
   cd green-tap-reflex
   ```

### 2. Install Dependencies

```bash
npm install
```

### 3. Initialize Capacitor

```bash
npx cap init
```

When prompted, use these values:
- App ID: `app.lovable.82eb1283ea384630b4a56cc059290223`
- App Name: `Green Tap Reflex`

### 4. Add Android Platform

```bash
npx cap add android
```

### 5. Build the Web App

```bash
npm run build
```

### 6. Sync with Native Project

```bash
npx cap sync android
```

## 🎯 Configure AdMob

### 1. Create AdMob Account and App

1. Go to [AdMob Console](https://admob.google.com/)
2. Create a new app (select Android)
3. Create two ad units:
   - **Banner Ad** (for bottom of screen)
   - **Interstitial Ad** (for game over screen)

### 2. Update Ad Unit IDs

Edit `src/hooks/useAdMob.ts` and replace test IDs with your real IDs:

```typescript
const BANNER_AD_ID = 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY';
const INTERSTITIAL_AD_ID = 'ca-app-pub-XXXXXXXXXXXXXXXX/ZZZZZZZZZZ';
```

### 3. Add AdMob App ID to Android

1. Get your AdMob App ID from AdMob console
2. Edit `android/app/src/main/AndroidManifest.xml`
3. Add inside `<application>` tag:

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"/>
```

## 💰 Configure In-App Purchases (Google Play Billing)

### 1. Create In-App Product in Play Console

1. Go to [Google Play Console](https://play.google.com/console/)
2. Select your app (or create new app)
3. Go to **Monetize** → **In-app products**
4. Create new product:
   - Product ID: `remove_ads`
   - Type: Non-consumable
   - Price: Set your price

### 2. Integrate Google Play Billing

For production, you'll need to integrate the actual billing library. The current implementation uses local storage for testing.

To implement real billing:
1. Install billing plugin: `npm install @capawesome/capacitor-purchases`
2. Update `src/hooks/useInAppPurchase.ts` to use the billing plugin
3. Follow [Capacitor Purchases docs](https://github.com/capawesome-team/capacitor-plugins)

## 🧪 Testing

### Run on Emulator

```bash
npx cap run android
```

### Run on Physical Device

1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect device via USB
4. Run:
   ```bash
   npx cap run android
   ```

### Test Ads

- Test ads will show automatically with test IDs
- Banner appears at bottom during gameplay
- Interstitial shows every 3 game overs

### Test In-App Purchase (Local)

- Click "Remove Ads" button
- In test mode, it simulates purchase locally
- Ads will be removed
- Test "Restore" button to restore purchase

## 📦 Production Build

### 1. Update Configuration

1. Remove test mode in `src/hooks/useAdMob.ts`:
   ```typescript
   initializeForTesting: false,
   isTesting: false,
   ```

2. Update `capacitor.config.ts`:
   ```typescript
   server: {
     // Remove or comment out for production
     // url: 'https://...',
   }
   ```

### 2. Build Release APK

```bash
npm run build
npx cap sync android
```

Open Android Studio:
```bash
npx cap open android
```

In Android Studio:
1. **Build** → **Generate Signed Bundle / APK**
2. Follow wizard to create keystore and sign APK
3. Upload to Google Play Console

## 🔄 Development Workflow

After making code changes:

1. Git pull latest changes
2. Run `npm install` (if dependencies changed)
3. Run `npm run build`
4. Run `npx cap sync android`
5. Test in Android Studio or emulator

## 📝 Important Notes

### AdMob Best Practices

- Don't click your own ads during testing
- Use test IDs during development
- Follow [AdMob policies](https://support.google.com/admob/answer/6128543)

### In-App Purchase Best Practices

- Test thoroughly before production
- Implement proper error handling
- Follow [Google Play billing guidelines](https://developer.android.com/google/play/billing)

### Hot Reload During Development

The `capacitor.config.ts` includes a server URL that enables hot-reload from the Lovable sandbox. This is great for development but **must be removed for production**.

## 🆘 Troubleshooting

### Build Errors

- Run `npm install` after pulling changes
- Clear build: `cd android && ./gradlew clean`
- Invalidate cache in Android Studio

### Ads Not Showing

- Verify AdMob App ID in AndroidManifest.xml
- Check ad unit IDs are correct
- Ensure test mode is enabled during testing
- Check AdMob account status

### Purchase Not Working

- Verify product ID matches Play Console
- Test with test account in Play Console
- Check billing integration is complete

## 📚 Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/)
- [AdMob Plugin Docs](https://github.com/capacitor-community/admob)
- [Google Play Billing Docs](https://developer.android.com/google/play/billing)
- [Lovable Mobile Development Blog](https://lovable.dev/blog)

## 🎮 Current Features

✅ Google AdMob Integration
- Banner ads (bottom of screen)
- Interstitial ads (every 3 game overs)
- Mute/unmute control

✅ In-App Purchases
- Remove Ads purchase
- Restore purchases functionality
- Persistent purchase state

✅ Native Mobile Features
- Capacitor ready
- Android platform configured
- Hot reload for development

---

Need help? Check the [Lovable Cloud documentation](https://docs.lovable.dev/features/cloud) or reach out to support!
