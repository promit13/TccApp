import React from 'react';
import {WebView} from 'react-native-webview';

// ...
export function WebViewComponent({gameLink}) {
  return <WebView source={{uri: gameLink}} />;
}
