import {View, Modal, ScrollView} from 'react-native';
import React, {useState} from 'react';

import {AddButton} from '../../UI/AddButton';
import {SubscriptionAddForm} from './SubscriptionAddForm';

export const SubscriptionAddBlock = () => {
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  const onCloseModal = () => {
    setIsShowAddModal(false);
  };

  return (
    <View>
      <AddButton onPress={() => setIsShowAddModal(true)} />

      <Modal
        animationType={'slide'}
        visible={isShowAddModal}
        onRequestClose={onCloseModal}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <SubscriptionAddForm onClose={onCloseModal} />
        </ScrollView>
      </Modal>
    </View>
  );
};
