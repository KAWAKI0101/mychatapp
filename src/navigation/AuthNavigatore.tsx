import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import LoginScreen from "src/features/auth/screens/LoginScreen";
import {OtpScreen} from "../features/auth/screens/OtpScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Otp" component={OtpScreen}/>
        </Stack.Navigator>
    )
}