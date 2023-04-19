import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import {useLinkTo} from '@react-navigation/native';

import {GlobalStylesVariables} from '../config/global-styles';
import {MainButton} from '../components/UI/MainButton';

const GetStarted = () => {
  const linkTo = useLinkTo();

  return (
    <>
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

            <MainButton
              onClick={() => linkTo('/screens/Home')}
              title={'Get started'}
            />
          </View>
        </ImageBackground>
      </View>
    </>
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
    fontFamily: GlobalStylesVariables.mainFontSemiBold,
    color: '#000',
    fontSize: 32,
    marginBottom: 35,
    lineHeight: 40,
    textAlign: 'center',
  },
});

export default GetStarted;
