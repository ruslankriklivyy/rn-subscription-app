import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useLinkTo} from '@react-navigation/native';
import globalStyles from '../config/global-styles';

const GetStarted = () => {
  const linkTo = useLinkTo();

  const btnAnimation = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(btnAnimation, {
      toValue: 0.93,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(btnAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    linkTo('/screens/Home');
  };

  return (
    <View style={styles.box}>
      <ImageBackground
        source={require('../assets/images/get_started_bg.jpg')}
        resizeMode={'cover'}
        style={styles.bgImage}>
        <View style={styles.bottomBox}>
          <View>
            <Text style={styles.text}>
              Streamline your subscriptions, simplify your life
            </Text>
          </View>

          <Animated.View
            style={{
              transform: [{scale: btnAnimation}],
            }}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={1}
              onPressIn={onPressIn}
              onPressOut={onPressOut}>
              <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  box: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  bottomBox: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontFamily: globalStyles.mainFontSemiBold,
    color: '#000',
    fontSize: 32,
    marginBottom: 35,
    lineHeight: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: globalStyles.mainFontRegular,
  },
});

export default GetStarted;
