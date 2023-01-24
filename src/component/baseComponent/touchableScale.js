import React, { PureComponent } from "react";
import { Animated, TouchableOpacity } from "react-native";

export default class TouchableScale extends PureComponent {
  constructor() {
    super();
    this.scaleValue = new Animated.Value(1);
    this.pressThreshold = 300;
  }

  onPressIn = () => {
    const scaleTo = this.props.scaleTo || 0.95;
    this.pressedIn = Date.now();
    Animated.timing(this.scaleValue, {
      toValue: scaleTo,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  onPressOut = (event) => {
    Animated.timing(this.scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { style, onPress, children, disabled, activeOpacity } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={activeOpacity ? activeOpacity : 1}
        onPress={onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        disabled={disabled}
      >
        <Animated.View
          style={[style, { transform: [{ scale: this.scaleValue }] }]}>
          {children}
        </Animated.View>
      </TouchableOpacity>
    );
  }
}
