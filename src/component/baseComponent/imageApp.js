import React from 'react';
import { Image } from 'react-native';
import { Images } from '@Assets';

const ImageApp = (props) => {
    let src = props?.source?.uri;
    return <Image {...props} source={src ? { ...props.source } : Images.iconApp} />
}
export default React.memo(ImageApp);