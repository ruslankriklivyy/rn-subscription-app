import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {GlobalStylesVariables} from '../../config/global-styles';
import {FC, useState} from 'react';

interface IPasswordInputProps {
  onBlur: () => void;
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  error?: string | null;
}

export const PasswordInput: FC<IPasswordInputProps> = ({
  onBlur,
  onChange,
  value,
  placeholder,
  error,
}) => {
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const secureIconSource = isSecure
    ? require('../../assets/images/eye-hide.png')
    : require('../../assets/images/eye-open.png');

  return (
    <View style={styles.box}>
      <TextInput
        style={!error ? styles.input : styles.inputError}
        secureTextEntry={isSecure}
        placeholder={placeholder ?? 'Password'}
        placeholderTextColor={GlobalStylesVariables.placeholderInputColor}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
      />

      <TouchableOpacity
        activeOpacity={1}
        style={styles.inputIconBox}
        onPress={() => setIsSecure(!isSecure)}>
        <Image source={secureIconSource} style={styles.inputIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#FAFCFE',
    borderRadius: 20,
    padding: 15,
    fontSize: 16,
    fontFamily: GlobalStylesVariables.mainFontRegular,
    marginBottom: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e9eaec',
    color: '#000',
  },
  inputError: {
    backgroundColor: '#FAFCFE',
    borderRadius: 20,
    padding: 15,
    fontSize: 16,
    fontFamily: GlobalStylesVariables.mainFontRegular,
    marginBottom: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
    color: '#000',
  },
  inputIconBox: {
    position: 'absolute',
    top: 14,
    right: 10,
    bottom: 0,
    backgroundColor: '#FAFCFE',
    paddingLeft: 5,
    width: 40,
    height: 40,
  },
  inputIcon: {
    width: 28,
    height: 28,
  },
});
