import {StyleSheet} from 'react-native';

export const GlobalStylesVariables = {
  // Fonts
  mainFontRegular: 'Poppins-Regular',
  mainFontMedium: 'Poppins-Medium',
  mainFontSemiBold: 'Poppins-SemiBold',

  // Variables
  boxPadding: 20,

  // Colors
  placeholderInputColor: '#726d6d',
};

export const GlobalStyles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#F6ECC9',
  },
  form: {
    padding: GlobalStylesVariables.boxPadding,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#FAFCFE',
    borderRadius: 20,
    padding: 15,
    fontSize: 16,
    fontFamily: GlobalStylesVariables.mainFontRegular,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9eaec',
    borderStyle: 'solid',
    color: '#000',
  },
  inputError: {
    backgroundColor: '#FAFCFE',
    color: '#000',
    borderRadius: 20,
    padding: 15,
    fontSize: 16,
    fontFamily: GlobalStylesVariables.mainFontRegular,
    marginBottom: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    marginTop: -15,
    marginBottom: 20,
    fontFamily: GlobalStylesVariables.mainFontRegular,
  },
});
