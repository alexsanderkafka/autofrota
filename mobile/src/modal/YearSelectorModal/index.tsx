import { useState } from "react";
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal
  } from 'react-native';

import ChartSelect from "../../components/ChartSelect";
import { colors } from "../../theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props{
    selectedYear: number;
    onSelectYear: (year: number) => void;
}

export default function YearSelectorModal({ selectedYear, onSelectYear }: Props) {

  const [modalVisible, setModalVisible] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 31 }, (_, i) => currentYear - i);

  return (
      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: colors.primary.main, padding: 8, borderRadius: 5, flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Text style={{ color: '#fff' }}>
            {selectedYear}
          </Text>
          <Icon name="chevron-down" size={20} color={colors.primary.white} style={{ marginRight: 10}} />
        </TouchableOpacity>
  
          <Modal visible={modalVisible} transparent animationType="slide">
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{ backgroundColor: colors.primary.main, padding: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15, maxHeight: '50%' }}>
              <FlatList
                data={years}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => { onSelectYear(item); setModalVisible(false); }}>
                    <Text style={{ fontSize: 18, paddingVertical: 10, color: '#Fff' }}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
}