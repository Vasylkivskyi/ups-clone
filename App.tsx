import { TailwindProvider } from 'tailwind-rn'
import { NavigationContainer } from '@react-navigation/native'

import utilities from './tailwind.json'
import RootNavigator from './src/navigator/RootNavigator'

export default function App() {
  return (
    // @ts-ignore - Tailwind provider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </TailwindProvider>
  )
}
