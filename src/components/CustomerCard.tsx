import { Text, TouchableOpacity, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import { useNavigation } from '@react-navigation/native'
import { Card, Icon } from '@rneui/themed'

import useCustomOrder from '../hooks/useCustomerOrder'
import { CustomersScreenNavigationProp } from '../screens/CustomersScreen'

type CustomerCardType = {
  email: string
  name: string
  userId: string
}

const CustomerCard: React.FC<CustomerCardType> = ({ email, name, userId }) => {
  const { loading, error, orders } = useCustomOrder(userId)
  const tw = useTailwind()
  const navigation = useNavigation<CustomersScreenNavigationProp>()
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyModal', { name, userId })}>
      <Card containerStyle={tw('p-5 rounded-lg')}>
        <View>
          <View style={tw('flex-row justify-between')}>
            <View>
              <Text style={tw('text-2xl font-bold')}>{name}</Text>
              <Text style={[tw('text-sm'), { color: '#59C1CC' }]}>ID: {userId} </Text>
            </View>
            <View style={tw('flex-row items-center justify-end')}>
              <Text style={{ color: '#59C1CC' }}>
                {loading ? 'Loading...' : `${orders.length} x`}
              </Text>
              <Icon
                style={tw('mb-5 ml-auto ')}
                name="box"
                type="entypo"
                color="#59C1CC"
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  )
}

export default CustomerCard
