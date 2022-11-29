import { Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { OrdersScreenNavigationProp } from './OrdersScreen'
import { RootStackParamList } from '../navigator/RootNavigator'
import DeliveryCard from '../components/DeliveryCard'

type OrderScreenRouteProp = RouteProp<RootStackParamList, 'Order'>

export const OrderScreen = () => {
  const tw = useTailwind()
  const navigation = useNavigation<OrdersScreenNavigationProp>()
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTintColor: '#EB6A7C',
      headerBackTitle: 'Deliveries',
    })
  }, [order])

  return (
    <View style={tw('-mt-2')}>
      <DeliveryCard order={order} fullWidth />
    </View>
  )
}

export default OrderScreen
