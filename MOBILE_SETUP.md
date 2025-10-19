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

**IMPORTANT**: The current implementation is a placeholder that uses local storage. For production, you MUST implement real Google Play Billing with server-side receipt validation.

### 1. Create In-App Product in Play Console

1. Go to [Google Play Console](https://play.google.com/console/)
2. Select your app (or create new app if first time)
3. Navigate to **Monetize** → **In-app products**
4. Click **Create product**
5. Configure the product:
   - **Product ID**: `remove_ads` (must match PRODUCT_ID in code)
   - **Type**: Non-consumable (one-time purchase)
   - **Name**: Remove Ads
   - **Description**: Remove all advertisements from the game
   - **Price**: Set your desired price (e.g., $2.99)
6. Click **Save** and then **Activate**

### 2. Install Google Play Billing Plugin

Install the Capacitor Purchases plugin:

```bash
npm install @capawesome/capacitor-purchases
npx cap sync android
```

### 3. Update useInAppPurchase Hook

Replace `src/hooks/useInAppPurchase.ts` with this production-ready implementation:

```typescript
import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { Purchases } from '@capawesome/capacitor-purchases';

const PURCHASE_KEY = 'ads_removed';
const PRODUCT_ID = 'remove_ads';

export const useInAppPurchase = () => {
  const [adsRemoved, setAdsRemoved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeBilling();
  }, []);

  const initializeBilling = async () => {
    if (!Capacitor.isNativePlatform()) {
      await checkPurchaseStatus();
      setLoading(false);
      return;
    }

    try {
      // Initialize the billing library
      await Purchases.initialize();
      
      // Check if user already owns the product
      const { purchases } = await Purchases.getPurchases();
      const hasRemoveAds = purchases.some(p => p.productId === PRODUCT_ID);
      
      if (hasRemoveAds) {
        await Preferences.set({ key: PURCHASE_KEY, value: 'true' });
        setAdsRemoved(true);
      }
    } catch (error) {
      console.error('Failed to initialize billing:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkPurchaseStatus = async () => {
    try {
      const { value } = await Preferences.get({ key: PURCHASE_KEY });
      setAdsRemoved(value === 'true');
    } catch (error) {
      console.error('Failed to check purchase status:', error);
    }
  };

  const purchaseRemoveAds = async () => {
    if (!Capacitor.isNativePlatform()) {
      // Web testing mode
      await Preferences.set({ key: PURCHASE_KEY, value: 'true' });
      setAdsRemoved(true);
      return { success: true };
    }

    try {
      // Start the purchase flow
      const result = await Purchases.purchaseProduct({ productId: PRODUCT_ID });
      
      // Verify the purchase with your backend
      const verified = await verifyPurchaseWithBackend(result.purchaseToken);
      
      if (verified) {
        await Preferences.set({ key: PURCHASE_KEY, value: 'true' });
        setAdsRemoved(true);
        return { success: true };
      } else {
        return { success: false, error: 'Purchase verification failed' };
      }
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

    try {
      const { purchases } = await Purchases.getPurchases();
      const hasRemoveAds = purchases.some(p => p.productId === PRODUCT_ID);
      
      if (hasRemoveAds) {
        await Preferences.set({ key: PURCHASE_KEY, value: 'true' });
        setAdsRemoved(true);
      }
      
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

// Backend verification function
async function verifyPurchaseWithBackend(purchaseToken: string): Promise<boolean> {
  try {
    // Call your Lovable Cloud Edge Function for server-side validation
    const response = await fetch('YOUR_EDGE_FUNCTION_URL/verify-purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        purchaseToken,
        productId: PRODUCT_ID,
      }),
    });
    
    const data = await response.json();
    return data.verified === true;
  } catch (error) {
    console.error('Verification request failed:', error);
    return false;
  }
}
```

### 4. Set Up Server-Side Receipt Validation (CRITICAL for Security)

**⚠️ SECURITY REQUIREMENT**: Client-side purchases can be bypassed. You MUST validate receipts server-side.

#### Option A: Using Lovable Cloud (Recommended)

1. **Enable Lovable Cloud** in your project
2. **Add Google Play Developer API credentials** as secrets
3. **Create Edge Function** for receipt validation:

Create `supabase/functions/verify-purchase/index.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const GOOGLE_PLAY_DEVELOPER_API = 'YOUR_API_KEY_FROM_SECRETS';

serve(async (req) => {
  try {
    const { purchaseToken, productId } = await req.json();

    // Call Google Play Developer API to verify the purchase
    const verifyUrl = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/YOUR_PACKAGE_NAME/purchases/products/${productId}/tokens/${purchaseToken}`;
    
    const response = await fetch(verifyUrl, {
      headers: {
        'Authorization': `Bearer ${GOOGLE_PLAY_DEVELOPER_API}`,
      },
    });

    const data = await response.json();
    
    // Check if purchase is valid
    const verified = data.purchaseState === 0; // 0 = purchased
    
    return new Response(
      JSON.stringify({ verified }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ verified: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
```

4. **Deploy the Edge Function**
5. **Update the verification URL** in `useInAppPurchase.ts`

#### Option B: Using External Backend

If you have your own backend server:
1. Create an endpoint that accepts purchase tokens
2. Use Google Play Developer API to verify the receipt
3. Return verification status to your app
4. Update the `verifyPurchaseWithBackend` function with your endpoint URL

### 5. Configure Google Play Developer API

To enable server-side verification:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google Play Android Developer API**
4. Create credentials (Service Account)
5. Download the JSON key file
6. Go to [Google Play Console](https://play.google.com/console/)
7. Navigate to **Settings** → **API access**
8. Link your Google Cloud project
9. Grant access to the service account
10. Store the credentials securely in Lovable Cloud Secrets

### 6. Testing In-App Purchases

#### Set Up Test Accounts

1. Go to [Google Play Console](https://play.google.com/console/)
2. Navigate to **Settings** → **License testing**
3. Add test Gmail accounts (email addresses)
4. These accounts can make test purchases without being charged

#### Testing Flow

1. **Build and install** your app on a device with a test account
2. **Sign in** to Google Play with the test account
3. **Trigger purchase flow** in your app
4. **Complete test purchase** (no actual charge)
5. **Verify** ads are removed
6. **Test restore** by uninstalling and reinstalling the app
7. **Click "Restore Purchases"** to verify restoration works

#### Debug Purchases

Enable logging to debug purchase issues:

```typescript
// Add to your useInAppPurchase hook
useEffect(() => {
  if (__DEV__) {
    Purchases.addListener('purchaseUpdated', (result) => {
      console.log('Purchase updated:', result);
    });
  }
}, []);
```

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
