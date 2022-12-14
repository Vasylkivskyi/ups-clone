import { useState, useLayoutEffect } from 'react'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { Button, Image } from '@rneui/themed'

import { RootStackParamList } from '../navigator/RootNavigator'
import { TabStackParamList } from '../navigator/TabNavigator'
import useOrders from '../hooks/useOrders'
import OrderCard from '../components/OrderCard'

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>

const OrdersScreen = () => {
  const tw = useTailwind()
  const navigation = useNavigation<OrdersScreenNavigationProp>()
  const { loading, error, orders } = useOrders()
  const [ascending, setAscending] = useState<boolean>(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? '#EB6A7C' : color, fontSize: 10 }}>Orders</Text>
      ),
    })
  }, [])
  return (
    <ScrollView style={{ backgroundColor: '#EB6A7C' }}>
      <Image
        source={{ uri: 'https://links.papareact.com/m51' }}
        containerStyle={tw('w-full h-64')}
        PlaceholderContent={<ActivityIndicator />}
      />

      <View>
        <Button
          color="pink"
          titleStyle={{ color: 'gray', fontWeight: '400' }}
          style={tw('py-2 px-5')}
          onPress={() => setAscending(!ascending)}
        >
          {ascending ? 'Showing: Oldest first' : 'Showing: Most recent first'}
        </Button>
        {orders
          .sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
            }
            return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
          })
          .map(order => (
            <OrderCard key={order.trackingId} item={order} />
          ))}
      </View>
    </ScrollView>
  )
}

export default OrdersScreen
