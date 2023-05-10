import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Animated,
  View,
  Text,
} from 'react-native';

const App = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const spin = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const MINUTES_COUNT = 0.5;
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(true);

  // * USE THIS SECONDS AND MINUTES TO SHOW IN UI
  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  useEffect(() => {
    let timerId;
    if (runTimer) {
      setCountDown(60 * MINUTES_COUNT);
      timerId = setInterval(() => {
        setCountDown(countDown => countDown - 1);
      }, 200);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      // console.log('time expired');
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  useEffect(() => {
    fadeIn();
    setTimeout(() => {
      fadeOut();
    }, 5000);
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'center',
          opacity: fadeAnim, // Binds directly
          transform: [
            {
              translateX: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0.1], // 0 : 150, 0.5 : 75, 1 : 0
              }),
            },
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [400, 1], // 0 : 150, 0.5 : 75, 1 : 0
              }),
            },
            {
              rotate: spin,
            },
          ],
        }}>
        <Image source={require('./theme/images/man.jpeg')} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
