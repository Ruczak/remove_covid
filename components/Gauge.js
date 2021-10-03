import React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { withAnchorPoint } from 'react-native-anchor-point';

const Gauge = ({ risk }) => {
  const rotationFactor = (risk / 100) * 180;

  return (
    <View style={styles.container}>
      <View style={styles.gauge}>
        <View
          style={[
            styles.pointer,
            getRotation(`${risk <= 100 ? rotationFactor + 180 : 0}deg`)
          ]}
        ></View>
        {risk > 100 ? (
          <View
            style={[
              styles.pointer,
              getRotation(`${(rotationFactor % 180) + 180}deg`),
              {
                zIndex: 3,
                backgroundColor: '#ff7712'
              }
            ]}
          ></View>
        ) : null}
      </View>
      <View style={styles.shield}></View>
    </View>
  );
};

const getRotation = (rotate) => {
  let transform = {
    transform: [{ rotateZ: rotate }]
  };
  return withAnchorPoint(
    transform,
    { x: 0.5, y: 1 },
    { width: 200, height: 100 }
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 200,
    position: 'relative',
    overflow: 'hidden'
  },
  gauge: {
    height: '100%',
    width: '100%',
    backgroundColor: 'lightgray',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    zIndex: 1,
    overflow: 'hidden'
  },
  pointer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#007AFF',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    zIndex: 2,
    position: 'absolute'
  },
  shield: {
    position: 'absolute',
    width: '70%',
    height: '140%',
    borderRadius: 70,
    backgroundColor: 'white',
    bottom: '-70%',
    left: '40%',
    transform: [{ translateX: -50 }],
    zIndex: 3
  }
});

export default Gauge;
