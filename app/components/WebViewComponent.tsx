import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

// ...
export function WebViewComponent({gameLink}) {
  return <WebView source={{uri: gameLink}} />;
}
