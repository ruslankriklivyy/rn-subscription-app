import {FC} from 'react';
import {View, Text} from 'react-native';
import {Props as FallbackComponentProps} from 'react-native-error-boundary/src/ErrorBoundary/FallbackComponent';

export const ErrorComponent: FC<FallbackComponentProps> = ({error}) => {
  return (
    <View>
      <Text>{error.message}</Text>
    </View>
  );
};
