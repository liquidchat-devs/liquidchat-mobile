import React, { Component } from 'react';
import { TouchableOpacity, Text, Image } from "react-native";
import styles from "./style";

export const LcButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.lcButton}>
      <Text style={styles.lcButtonText}>{title}</Text>
    </TouchableOpacity>
);

export const LcMenuButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.lcMenuButton}>
    <Text style={styles.lcMenuButtonText}>{title}</Text>
  </TouchableOpacity>
);

export const LcServerButton = ({ onPress, uri }) => (
  <TouchableOpacity onPress={onPress} style={styles.lcServerButton}>
    <Image style={styles.serverIcon} source={{ uri: uri }} />
  </TouchableOpacity>
);

export const LcServerIconButton = ({ onPress, uri }) => (
  <TouchableOpacity onPress={onPress} style={styles.lcServerButton}>
    <Image style={styles.serverIcon2} source={{ uri: uri }} />
  </TouchableOpacity>
);