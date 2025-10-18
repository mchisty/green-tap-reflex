# GitHub Export Guide for Green Tap Blast

This guide will help you export your Green Tap Blast project to GitHub for version control and deployment.

## Prerequisites

- A GitHub account
- Git installed on your local machine (for local development)

## Step 1: Connect to GitHub from Lovable

1. In the Lovable editor, look for the **GitHub button** in the top right corner
2. Click **"Connect to GitHub"**
3. Authorize the Lovable GitHub App when prompted
4. Select the GitHub account or organization where you want to create the repository
5. Click **"Create Repository"** in Lovable

Lovable will automatically:
- Create a new GitHub repository with your project code
- Set up bidirectional sync (changes in Lovable push to GitHub automatically)
- Configure the repository with all necessary files

## Step 2: Access Your Repository

After creation, you'll be able to:
- View your repository on GitHub
- Clone it locally: `git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`
- Make changes locally and push them (they'll sync back to Lovable)

## Step 3: Local Development Setup

If you want to develop locally:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# Install dependencies
npm install

# For Android development, add Capacitor platforms
npx cap add android

# Build the web assets
npm run build

# Sync with native projects
npx cap sync

# Open in Android Studio
npx cap open android
```

## Step 4: Native App Setup for Android

### Configure App Icon

1. After adding the Android platform, copy your app icons to the proper location:
   - Copy `public/icon-512.png` to `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png`
   - Use Android Studio's Image Asset Studio to generate all icon sizes automatically

2. The splash screen is already configured in `android/app/src/main/res/drawable/splash.xml`

### Configure AdMob

1. Replace test ad IDs in `src/hooks/useAdMob.ts` with your real AdMob IDs:
   ```typescript
   // Banner Ad - Replace with your real ID
   adId: "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX"
   
   // Interstitial Ad - Replace with your real ID
   adId: "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX"
   ```

2. Add your AdMob App ID to `android/app/src/main/AndroidManifest.xml`:
   ```xml
   <meta-data
       android:name="com.google.android.gms.ads.APPLICATION_ID"
       android:value="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"/>
   ```

### Configure In-App Purchases

1. Set up your Google Play Console product:
   - Product ID: `remove_ads`
   - Type: Non-consumable
   - Price: Set your desired price

2. Update the product ID in `src/hooks/useInAppPurchase.ts` if you want to use a different ID

## Step 5: Build for Production

### Android Release Build

```bash
# Build web assets
npm run build

# Sync with Android
npx cap sync android

# Open in Android Studio
npx cap open android
```

In Android Studio:
1. Go to Build → Generate Signed Bundle / APK
2. Select "Android App Bundle" (recommended for Play Store)
3. Create or select your keystore
4. Build the release version

## Step 6: Publishing to Google Play Store

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app
3. Fill in all required information:
   - App name: Green Tap Blast
   - Category: Casual Games
   - Upload screenshots (take from your app)
   - Upload your app icon (`public/icon-512.png`)
   - Write description based on the game's functionality
4. Upload the signed AAB file
5. Complete the store listing and content rating questionnaire
6. Submit for review

## Important Notes

- **Bidirectional Sync**: Changes made in Lovable automatically push to GitHub, and changes pushed to GitHub automatically sync to Lovable
- **Branch Support**: Lovable has experimental branch support. Enable it in Account Settings → Labs → GitHub Branch Switching
- **Environment Variables**: If you add API keys or secrets, use Lovable's Secrets Management (not committed to GitHub)
- **AdMob Setup**: Make sure to replace test ad IDs with real ones before publishing
- **Version Control**: Lovable provides built-in version history for easy rollbacks

## Continuous Development

You can continue developing in Lovable while the code stays synced with GitHub:
- Use Lovable's AI features to iterate quickly
- Review changes in GitHub
- Set up GitHub Actions for automated testing/deployment
- Collaborate with team members through pull requests

## Resources

- [Lovable GitHub Integration Docs](https://docs.lovable.dev/features/github-integration)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [AdMob Integration Guide](https://developers.google.com/admob)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Mobile Setup Instructions](./MOBILE_SETUP.md)

## Support

If you encounter any issues:
- Check the [Lovable Documentation](https://docs.lovable.dev)
- Visit the [Lovable Discord Community](https://discord.gg/lovable)
- Review the Mobile Setup guide in this repository
