import { View, Text } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { Card, Icon, Divider } from '@rneui/themed'
import MapView, { Marker } from 'react-native-maps'

type Props = {
  order: Order
  fullWidth?: boolean
}
const DeliveryCard: React.FC<Props> = ({ order, fullWidth = false }) => {
  const tw = useTailwind()
  return (
    <Card
      containerStyle={[
        tw(`${fullWidth ? 'rounded-0 m-0' : 'rounded-lg'} my-2`),
        {
          padding: 0,
          paddingTop: 16,
          shadowColor: 'black',
          shadowOpacity: 0.2,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          backgroundColor: fullWidth ? '#EB6A7C' : '#59C1CC',
        },
      ]}
    >
      <View style={fullWidth && { height: '100%' }}>
        <Icon name="box" type="entypo" color="white" size={50} />
        <View style={tw('items-start p-5 -mt-3')}>
          <View style={tw('mx-auto')}>
            <Text style={tw('text-xs text-center uppercase text-white font-bold')}>
              {order.carrier}-{order.trackingId}
            </Text>
            <Text style={tw('text-white text-center text-lg font-bold mb-5')}>
              Expected delivery: {new Date(order.createdAt).toLocaleDateString()}
            </Text>
            <Divider color="white" />
          </View>
          <View style={tw('mx-auto pb-5')}>
            <Text style={tw('text-base text-center text-white font-bold mt-5')}>Address:</Text>
            <Text style={tw('text-sm text-center text-white')}>
              {order.Address}, {order.City}
            </Text>
            <Text style={tw('text-sm italic text-center text-white')}>
              Shipping cost: {order.shippingCoast ? `$${order.shippingCoast}` : 'free'}
            </Text>
          </View>
        </View>

        <Divider color="white" />
        <View style={tw('p-5')}>
          {order.trackingItems.items.map(item => (
            <View key={item.item_id} style={tw('flex-row justify-between items-center')}>
              <Text style={tw('text-sm italic text-white')}>{item.name}</Text>
              <Text style={tw('text-xl text-white')}>x {item.quantity}</Text>
            </View>
          ))}
        </View>
        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={[tw('w-full'), { flexGrow: 1 }, !fullWidth && { height: 200 }]}
        >
          <Marker
            coordinate={{
              latitude: order.Lat,
              longitude: order.Lng,
            }}
            title="Delivery location"
            description={order.Address}
            identifier="destination"
          />
        </MapView>
      </View>
    </Card>
  )
}

export default DeliveryCard
