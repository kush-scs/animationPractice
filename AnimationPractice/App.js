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
  const [timeout, setTimeout] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimOut = useRef(new Animated.Value(0)).current;

  const timer = () => {
    Animated.timing(fadeAnimOut, {
      toValue: 1,
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
  const spinReverse = fadeAnimOut.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });
  useEffect(() => {
    fadeIn();
  }, []);

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
  return (
    <SafeAreaView style={{flex: 1}}>
      {countDown == 0 ? (
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
                  outputRange: [0.1, 300], // 0 : 150, 0.5 : 75, 1 : 0
                  extrapolate: 'clamp',
                }),
              },
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 400], // 0 : 150, 0.5 : 75, 1 : 0
                  // extrapolate: 'clamp',
                }),
              },
              {
                rotate: spin,
              },
            ],
          }}>
          <Image source={require('./theme/images/man.jpeg')} />
          <View>
            <Text style={{}}>
              {minutes}:{seconds}
            </Text>
          </View>
        </Animated.View>
      ) : (
        <Animated.View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            opacity: fadeAnimOut, // Binds directly
            transform: [
              {
                translateY: fadeAnimOut.interpolate({
                  inputRange: [0, 1],
                  outputRange: [400, 1], // 0 : 150, 0.5 : 75, 1 : 0
                  // extrapolate: 'clamp',
                }),
              },
              {
                translateX: fadeAnimOut.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0.1], // 0 : 150, 0.5 : 75, 1 : 0
                  extrapolate: 'clamp',
                }),
              },
              {
                rotate: spinReverse,
              },
            ],
          }}>
          <Image source={require('./theme/images/man.jpeg')} />
          <View>
            <Text style={{}}>
              {minutes}:{seconds}
            </Text>
          </View>
        </Animated.View>
      )}
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
