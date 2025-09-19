# Skill Swap Hub 🔄 - iOS Edition

A React Native app for trading skills within local communities. Instead of money, users exchange knowledge and expertise!

## 🍎 iOS Development Ready

This app is optimized for iOS development with proper configurations for iOS Simulator and physical devices.

## Features

✅ **User Authentication** - Register/Login with email  
✅ **Skill Profiles** - Showcase what you can teach and want to learn  
✅ **Skill Discovery** - Browse and filter skills by category  
✅ **Swap System** - Request and manage skill exchanges  
✅ **Real-time Messaging** - Chat with other skill swappers  
✅ **Achievement System** - Earn badges and level up  
✅ **MongoDB Integration** - Persistent data storage  
✅ **iOS Optimized** - Native iOS experience

## Quick Start for iOS

### Prerequisites
- macOS with Xcode installed
- Node.js (v16 or higher)
- MongoDB running

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 2. iOS App Setup
```bash
npm install
npm run ios
```

The iOS Simulator will open automatically with your app! 🎉

## iOS-Specific Features

- ✅ **iOS Simulator Support** - Automatic launch
- ✅ **iOS Permissions** - Camera, Photos, Location
- ✅ **iOS Navigation** - Native animations and gestures
- ✅ **iOS Design** - Follows Human Interface Guidelines
- ✅ **Dark Mode** - Automatic iOS dark mode support

## Development Commands

```bash
# iOS Development
npm run ios              # Launch iOS Simulator
npm run ios-simulator    # Force iOS Simulator
npm start               # Start with QR code for physical device

# Backend
cd backend && npm run dev  # Start API server

# Other Platforms
npm run android         # Android emulator
npm run web            # Web browser
```

## Project Structure

```
skill-swap-hub/
├── src/
│   ├── screens/        # App screens
│   ├── context/        # Authentication context
│   └── services/       # API services
├── backend/            # Node.js API server
├── assets/            # Images and icons
└── iOS-Setup.md       # Detailed iOS setup guide
```

## API Endpoints

- **Authentication:** `/api/auth/login`, `/api/auth/register`
- **Users:** `/api/users`, `/api/users/profile`
- **Swaps:** `/api/swaps`, `/api/swaps/my-swaps`
- **Messages:** `/api/messages/conversations`

## iOS Testing

Test on multiple iOS devices:
- iPhone SE (small screen)
- iPhone 14 (standard)
- iPhone 14 Pro Max (large screen)
- iPad (tablet support)

## Troubleshooting

### iOS Simulator Issues
```bash
# Reset simulator
xcrun simctl erase all

# Clear Metro cache
npx react-native start --reset-cache
```

### Physical Device Issues
1. Ensure same WiFi network
2. Update API URL with your computer's IP
3. Check firewall settings

## Next Steps

1. ✅ **iOS Development** - Ready to go!
2. 🔄 **Test on physical iPhone/iPad**
3. 📱 **Add iOS-specific features** (Push notifications, Siri)
4. 🚀 **Prepare for App Store**

## Tech Stack

**Frontend:**
- React Native (Expo) - iOS optimized
- React Navigation - iOS native animations
- AsyncStorage - iOS secure storage
- Context API - State management

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Socket.io - Real-time messaging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Test on iOS Simulator
4. Submit a pull request

## License

MIT License - Perfect for iOS App Store submission!

---

**Ready for iOS development! 📱✨**

For detailed iOS setup instructions, see [iOS-Setup.md](./iOS-Setup.md)