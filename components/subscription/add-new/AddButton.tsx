import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {FC} from 'react';

interface IAddButtonProps {
  onPress: () => void;
}

export const AddButton: FC<IAddButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.addButton}
      activeOpacity={0.8}
      onPress={onPress}>
      <Image
        source={require('../../../assets/images/plus.png')}
        style={styles.plusIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderColor: '#a3a3a6',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    width: 18,
    height: 18,
  },
});
