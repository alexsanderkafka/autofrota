import { registerRootComponent } from 'expo';

import MyStack from './src/routes/StackNavigation'
import ChangePassword from './src/screens/ChangePassword';
import OnboardingScreen from './src/screens/Onboarding';
import SplashScreen from './src/screens/Splash';

registerRootComponent(MyStack);
