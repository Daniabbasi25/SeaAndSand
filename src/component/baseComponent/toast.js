import React from 'react';
import Toast from 'react-native-toast-message';

const ToastComponent = ({ type = 'success', title = 'Hi!', message = 'Message', duration = 3000 }) => (
    Toast.show({
        type: type,
        text1: title,
        text1Style: { fontSize: 40 },
        text2: message,
        visibilityTime: duration,
    })
)

export default React.memo(ToastComponent);