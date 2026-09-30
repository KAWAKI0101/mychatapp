import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList, RootStackParamList } from "./types";
import { NavigationContainer } from "@react-navigation/native";
import { SplashScreen } from "../features/splash/screens/SplashScreen";
import { OnboardingScreen } from "../features/onboarding/screens/OnboardingScreen";
import LoginScreen from "../features/auth/screens/LoginScreen";
import {OtpScreen} from "../features/auth/screens/OtpScreen";
import { MainNavigator } from "../navigation/MainNavigator";


const RootStack = createNativeStackNavigator<RootStackParamList>()
const AuthStack = createNativeStackNavigator<AuthStackParamList>()


export const AuthNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{headerShown:false}}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Otp" component={OtpScreen} />
        </AuthStack.Navigator>
    )
}

export const RootNavigator = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <RootStack.Screen name="Splash" component={SplashScreen} />
                <RootStack.Screen name="Onboarding"  component={OnboardingScreen}/>
                <RootStack.Screen name="Auth" component={AuthNavigator} />
                <RootStack.Screen name="Main" component={MainNavigator} />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}