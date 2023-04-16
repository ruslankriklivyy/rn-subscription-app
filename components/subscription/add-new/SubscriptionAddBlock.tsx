import {View, Modal, Alert} from 'react-native';
import React, {useState} from 'react';

import {AddButton} from './AddButton';
import {SubscriptionAddForm} from './SubscriptionAddForm';

export const SubscriptionAddBlock = () => {
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  const onCloseModal = () => {
    Alert.alert('Modal has been closed.');
    setIsShowAddModal(false);
  };

  return (
    <View>
      <AddButton onPress={() => setIsShowAddModal(true)} />

      <Modal
        animationType={'slide'}
        visible={isShowAddModal}
        onRequestClose={onCloseModal}>
        <SubscriptionAddForm />
      </Modal>
    </View>
  );
};
