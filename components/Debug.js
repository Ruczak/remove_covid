import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Debug = ({
  tag,
  population,
  density,
  totalCases,
  latestCases,
  acitveCases,
  loaded
}) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => (dots + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
        Statistics
      </Text>
      {loaded ? (
        <React.Fragment>
          <Text>Country: {tag}</Text>
          <Text>Country Population: {population}</Text>
          <Text>
            Population Density:{' '}
            {density === 'NoData'
              ? 'Unknown'
              : parseFloat(density).toFixed(2) + ' people / sq. kilometre'}
          </Text>
          <Text>Total number of COVID cases: {totalCases}</Text>
          <Text>Latest number of COVID cases: {latestCases}</Text>
          <Text>Believed current number of cases: {acitveCases}</Text>
        </React.Fragment>
      ) : (
        <Text>Loading{'.'.repeat(dots)}</Text>
      )}
    </View>
  );
};

export default Debug;
