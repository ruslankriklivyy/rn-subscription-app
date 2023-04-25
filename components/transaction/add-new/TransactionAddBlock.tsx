import React, {useState} from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';

import {TransactionAddForm} from './TransactionAddForm';
import {AddButton} from '../../UI/AddButton';

export const TransactionAddBlock = () => {
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  const onCloseModal = () => {
    setIsShowAddModal(false);
  };

  return (
    <View>
      <AddButton
        onPress={() => setIsShowAddModal(true)}
        buttonStyles={styles.transactionsAddButton}
      />

      <Modal
        animationType={'slide'}
        visible={isShowAddModal}
        onRequestClose={onCloseModal}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <TransactionAddForm onClose={onCloseModal} />
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionsAddButton: {
    borderColor: '#63f532',
    backgroundColor: '#63f532',
  },
});
