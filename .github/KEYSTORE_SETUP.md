# Keystore Setup for GitHub Actions

## Step 1: Generate Keystore Locally

First, create your keystore file locally:

```bash
keytool -genkey -v -keystore green-tap-reflex-keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias green-tap-reflex
```

Fill in the information when prompted:
- Keystore password: (create a strong password)
- Key password: (can be same as keystore password)
- First and last name, organization, etc.

## Step 2: Convert Keystore to Base64

```bash
base64 green-tap-reflex-keystore.jks > keystore-base64.txt
```

## Step 3: Add Secrets to GitHub

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

1. **KEYSTORE_BASE64**
   - Copy the entire content from `keystore-base64.txt`

2. **KEYSTORE_PASSWORD**
   - The keystore password you created

3. **KEY_ALIAS**
   - Value: `green-tap-reflex`

4. **KEY_PASSWORD**
   - The key password (usually same as keystore password)

## Step 4: Trigger Build

### Manual Trigger:
1. Go to **Actions** tab in GitHub
2. Select "Build Android App Bundle"
3. Click **Run workflow**
4. Wait for build to complete
5. Download the AAB from **Artifacts** section

### Automatic Trigger:
The workflow automatically runs when you push changes to:
- `src/**` files
- `android/**` files
- `capacitor.config.ts`

## Important Notes

- **Keep keystore file safe!** You need it for ALL future app updates
- Store keystore and passwords in a secure location (password manager)
- Never commit keystore file to Git
- The AAB artifact is available for 30 days after build

## Download Built AAB

After workflow completes:
1. Go to **Actions** tab
2. Click on the completed workflow run
3. Scroll down to **Artifacts**
4. Download `app-release-bundle`
5. Upload to Google Play Console
