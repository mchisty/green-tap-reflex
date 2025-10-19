# Mobile App Setup Guide (Android)

Your game is now configured for Android with AdMob ads and in-app purchases! Follow these steps to test and deploy.

## 📱 Prerequisites

### Required
1. Install [Node.js](https://nodejs.org/) (v16 or higher)
2. Have a [Google AdMob account](https://admob.google.com/)
3. Have a [Google Play Console account](https://play.google.com/console/) (for production IAP)

### Optional (Choose One)
- **Option A (Lightweight)**: [Android Command Line Tools](https://developer.android.com/studio#command-tools) - Use GitHub Actions for builds
- **Option B (Full IDE)**: [Android Studio](https://developer.android.com/studio) - For local development and testing

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

## 📲 Create App in Google Play Console

Before you can publish or configure in-app purchases, you need to create your app in Google Play Console. This is a detailed process that requires careful attention.

### Prerequisites for Play Console

1. **Google Play Developer Account** ($25 one-time registration fee)
   - Go to [Google Play Console](https://play.google.com/console/)
   - Sign up with your Google account
   - Pay the one-time registration fee
   - Complete identity verification (may take 24-48 hours)

2. **Required Assets Ready**
   - App icon (512x512 PNG, no transparency)
   - Feature graphic (1024x500 PNG or JPG)
   - At least 2 screenshots (phone: 16:9 or 9:16 aspect ratio)
   - Privacy policy URL (required for all apps)
   - App description and promotional text

### Step 1: Create a New App

1. **Go to Play Console Dashboard**
   - Visit [Google Play Console](https://play.google.com/console/)
   - Click **"Create app"** button (top right)

2. **Fill in App Details**
   - **App name**: `Green Tap Reflex` (max 50 characters)
     - This is the name users will see on Google Play
     - Can be changed later but may affect ASO (App Store Optimization)
   - **Default language**: Choose your primary language (e.g., English - United States)
   - **App or game**: Select **"Game"**
   - **Free or paid**: Select **"Free"** (apps with in-app purchases must be free)

3. **Declarations** (Critical - Read Carefully!)
   - ✅ Check: "I declare that this app complies with Google Play's Developer Program Policies"
   - ✅ Check: "I acknowledge that this app is subject to US export laws"
   - Click **"Create app"**

### Step 2: Set Up Store Listing

After creating the app, you'll be taken to the dashboard. Complete these required sections:

#### 2.1 Store Listing (Required)

Navigate to **Grow** → **Store presence** → **Main store listing**

**App Details:**
- **App name**: `Green Tap Reflex` (pre-filled)
- **Short description**: (Max 80 characters)
  ```
  Test your reflexes! Tap the green circle before time runs out. Beat your best!
  ```
- **Full description**: (Max 4000 characters)
  ```
  🎯 Green Tap Reflex - The Ultimate Reaction Speed Challenge!

  How fast are your reflexes? Put yourself to the test with Green Tap Reflex, the addictive game that challenges you to tap green circles before time runs out!

  🎮 GAMEPLAY
  • Tap the green circle as quickly as possible
  • Each successful tap increases your score
  • Miss the green circle and the game is over
  • Circles appear faster as you progress
  • Beat your high score with each attempt

  ✨ FEATURES
  • Simple one-tap gameplay
  • Progressive difficulty that keeps you on your toes
  • Track your best scores
  • Clean, minimalist design
  • Smooth animations and responsive controls
  • Sound effects and haptic feedback
  • Option to remove ads with one-time purchase

  Perfect for:
  • Quick gaming sessions
  • Improving hand-eye coordination
  • Competing with friends
  • Killing time during commutes

  Download now and see how high you can score! Can you beat your friends' reflexes?
  ```

**Graphics:**
- **App icon**: 512x512 PNG (use your existing `public/icon-512.png`)
- **Feature graphic**: 1024x500 (create one or use a solid color with app name)
- **Phone screenshots**: Upload at least 2 screenshots (required)
  - Take screenshots from your emulator or device
  - Use Android Studio's screenshot tool or `adb screencap`
  - Best practice: 4-8 screenshots showing gameplay

**Categorization:**
- **App category**: Games → Arcade
- **Tags** (optional): action, arcade, casual, reflexes, tapping

**Contact Details:**
- **Email**: Your support email (must be valid, users can contact you)
- **Website**: Optional (your website or GitHub repo)
- **Phone**: Optional

**Privacy Policy** (Required!)
- **Privacy policy URL**: You MUST provide a valid URL
  - If you don't have one, use a privacy policy generator
  - Recommended: [Privacy Policy Generator](https://www.privacypolicygenerator.info/)
  - Or create a simple GitHub Gist with privacy policy
  - Must explain how you collect/use data (analytics, ads, etc.)

Click **"Save"** at the bottom

#### 2.2 App Content (Required)

Navigate to **Policy** → **App content** and complete ALL declarations:

**Privacy Policy:**
- Add your privacy policy URL (same as above)

**Ads:**
- Select **"Yes, my app contains ads"** (since you're using AdMob)

**App Access:**
- If all features are accessible: Select **"All or some functionality is restricted"** → No
- Or describe any login requirements

**Content Ratings:**
1. Click **"Start questionnaire"**
2. Enter your email
3. Select category: **"Games"**
4. Answer questions honestly (for this game, all answers should be "No")
   - No violence, sexual content, language, controlled substances, etc.
5. Submit - you'll get a rating (likely ESRB: Everyone, PEGI: 3)

**Target Audience:**
1. Click **"Start"**
2. Select target age groups: Check **"Ages 13 and older"** or appropriate age
3. Is your app designed specifically for children? **No**
4. Appeal to children? **No** (unless specifically designed for kids)
5. Save

**News Apps:**
- Select **"No"** (this is not a news app)

**Data Safety:**
1. Click **"Start"**
2. **Does your app collect or share user data?** 
   - Select **"Yes"** (AdMob collects data)
3. **Data collection and security:**
   - Add: **Device or other IDs** (collected by AdMob)
   - Purpose: **Advertising or marketing**
   - Collection: **Optional** (if users can disable personalization)
   - Encrypted in transit: **Yes**
   - Users can request data deletion: **Yes** (add instructions)
4. Review and submit

**Government Apps:**
- Select **"No"** (unless it is)

**Financial Features:**
- Select **"No"** (in-app purchases don't count here)

**Health:**
- Select **"No"** (unless tracking health data)

### Step 3: Select Countries and Regions

Navigate to **Policy** → **App availability** → **Countries/Regions**

1. Click **"Add countries/regions"**
2. For worldwide distribution: Click **"Select all countries"**
3. Or manually select specific countries
4. Click **"Add countries"**
5. Save

### Step 4: Set Up Pricing (if applicable)

Navigate to **Policy** → **App pricing**

- Since your app is free with in-app purchases:
  1. Confirm **"Free"** is selected
  2. Distributed apps: Available in selected countries
  3. Save

### Step 5: Create Production Release (Initial Setup)

Navigate to **Release** → **Production** → **Create new release**

**⚠️ IMPORTANT: You need a signed AAB file first!**

Before you can create a release, you need to:
1. Build your production AAB (see "Production Build" section)
2. Sign the AAB with your keystore
3. Return here to upload

**For now, save this step for later** - you'll come back after building your AAB.

### Step 6: Set Up App Signing

Navigate to **Release** → **Setup** → **App integrity** → **App signing**

1. **Enroll in Play App Signing** (Recommended)
   - Google manages your app signing key
   - You upload an upload key instead
   - More secure and Google handles key management
   - Click **"Continue"** to accept terms

2. **Download certificates** (keep these safe!)
   - Download your upload certificate
   - Store securely - you'll need it for future builds

### Common Issues and How to Avoid Them

**❌ REJECTION REASONS TO AVOID:**

1. **Missing Privacy Policy**
   - ALWAYS provide a valid, accessible privacy policy URL
   - Must explain data collection (ads, analytics)

2. **Incorrect Age Rating**
   - Answer content rating questions honestly
   - For this game: No violence, no mature content

3. **Misleading Store Listing**
   - Screenshots must show actual gameplay
   - Description must accurately describe the app
   - Don't use copyrighted images or misleading claims

4. **Intellectual Property Violations**
   - Don't use copyrighted images, names, or trademarks
   - "Green Tap Reflex" is generic enough, but be careful with branding

5. **Dangerous Permissions**
   - Only request permissions you actually need
   - Your app should only need: INTERNET, ACCESS_NETWORK_STATE

6. **Malicious Behavior**
   - Don't collect unnecessary data
   - Be transparent about ads and data collection

**✅ CHECKLIST BEFORE SUBMITTING:**

- [ ] Store listing complete with description, icon, screenshots
- [ ] Privacy policy URL provided and accessible
- [ ] Content rating questionnaire completed
- [ ] Data safety form filled out (mention AdMob data collection)
- [ ] App uses correct package name: `com.mchisty.greentapreflex`
- [ ] All graphics meet size requirements
- [ ] Contact email is valid and monitored
- [ ] Target audience selected appropriately
- [ ] Countries/regions selected
- [ ] Test the app thoroughly on multiple devices

### Expected Timeline

- **Account verification**: 24-48 hours after registration
- **First app review**: Can take 7-14 days (sometimes longer)
- **Subsequent updates**: Usually 1-3 days

### After App Creation

Once your app is created in Play Console, you can proceed with:
1. Configuring in-app purchases (next section)
2. Setting up AdMob integration
3. Building and uploading your production AAB
4. Submitting for review

---

## 💰 Configure In-App Purchases (Google Play Billing)

**IMPORTANT**: The current implementation is a placeholder that uses local storage. For production, you MUST implement real Google Play Billing with server-side receipt validation.

**PREREQUISITE**: Your app must be created in Google Play Console (see section above)

### 1. Create In-App Product in Play Console

1. Go to [Google Play Console](https://play.google.com/console/)
2. **Select your app** from the dashboard (the app you created in the previous section)
3. Navigate to **Monetize** → **Products** → **In-app products**
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

### Run on Physical Device (Recommended for Low-Spec Machines)

1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect device via USB
4. Run:
   ```bash
   npx cap run android
   ```

**Tip**: Testing on a physical device is lighter on resources than running emulators and gives more accurate results!

### Run on Emulator (Requires Android Studio or Command Line Tools)

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

### 2. Build Release Bundle

#### Option A: Using GitHub Actions (Recommended for Low-Spec Machines)

Your project already has automated builds set up! Just push to GitHub:

```bash
git add .
git commit -m "Ready for production build"
git push origin main
```

Then:
1. Go to your GitHub repository
2. Click **Actions** tab
3. Find the latest **Build Android App Bundle** workflow
4. Once complete, download the `app-release.aab` artifact
5. Upload the AAB to Google Play Console

**Note**: You'll need to set up secrets in GitHub (see `.github/KEYSTORE_SETUP.md` for details)

#### Option B: Using Android Studio (Requires More Resources)

```bash
npm run build
npx cap sync android
npx cap open android
```

In Android Studio:
1. **Build** → **Generate Signed Bundle / APK**
2. Follow wizard to create keystore and sign APK
3. Upload to Google Play Console

#### Option C: Command Line Only (Lightweight)

If you have Android command line tools installed:

```bash
npm run build
npx cap sync android
cd android
./gradlew bundleRelease \
  -Pandroid.injected.signing.store.file=YOUR_KEYSTORE.jks \
  -Pandroid.injected.signing.store.password=YOUR_STORE_PASSWORD \
  -Pandroid.injected.signing.key.alias=YOUR_KEY_ALIAS \
  -Pandroid.injected.signing.key.password=YOUR_KEY_PASSWORD
```

The AAB will be at: `android/app/build/outputs/bundle/release/app-release.aab`

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
