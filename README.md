# Green Tap Reflex

A fast-paced mobile reflex game built with React, TypeScript, and Capacitor. Test your reflexes by tapping the circle only when it turns electric green!

## Project Info

**URL**: https://lovable.dev/projects/82eb1283-ea38-4630-b4a5-6cc059290223

## Features

- 🎯 Test your reflexes with color-changing circles
- 🎨 16 vibrant colors with 3D effects
- 🔊 Dynamic sound effects (tap, success, game over)
- 📱 Native Android app with AdMob integration
- 💰 In-app purchase to remove ads
- ⚙️ Customizable settings (sound, speed)
- 🏆 High score tracking
- 📋 Help menu with game instructions

## How to Play

1. Wait for the circle to turn **electric green**
2. Tap it as quickly as possible!
3. Tapping any other color ends the game
4. Beat your high score!

## Development

### Prerequisites

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- For Android: Android Studio and Java 17

### Local Setup

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd green-tap-reflex

# Install dependencies
npm install

# Start development server
npm run dev
```

### Mobile Development

For Android app development:

```sh
# Build web assets
npm run build

# Add Android platform (first time only)
npx cap add android

# Sync changes to Android
npx cap sync android

# Open in Android Studio
npx cap open android
```

See [MOBILE_SETUP.md](./MOBILE_SETUP.md) for detailed mobile setup instructions.

## Technologies

- **Frontend**: React, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn-ui
- **Mobile**: Capacitor
- **Monetization**: AdMob, In-App Purchases
- **Storage**: Capacitor Preferences

## Deployment

### Web Deployment

Simply open [Lovable](https://lovable.dev/projects/82eb1283-ea38-4630-b4a5-6cc059290223) and click Share → Publish.

### Android Release

See [GITHUB_EXPORT.md](./GITHUB_EXPORT.md) for instructions on building and publishing to Google Play Store.

You can also use GitHub Actions to automatically build AAB files - see [.github/KEYSTORE_SETUP.md](./.github/KEYSTORE_SETUP.md).

## Custom Domain

To connect a custom domain, navigate to Project > Settings > Domains in Lovable.

Read more: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain)

## Documentation

- [Mobile Setup Guide](./MOBILE_SETUP.md) - Complete Android setup instructions
- [GitHub Export Guide](./GITHUB_EXPORT.md) - Publishing to Play Store
- [Keystore Setup](./KEYSTORE_SETUP.md) - GitHub Actions for automated builds

## Support

For issues or questions, visit the [Lovable Discord community](https://discord.gg/lovable).
