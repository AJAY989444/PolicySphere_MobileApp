import React from 'react';
import { AppContainer } from './src/components/common/AppContainer';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <AppContainer>
      <RootNavigator />
    </AppContainer>
  );
}
