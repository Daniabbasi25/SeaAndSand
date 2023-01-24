import React from 'react';
import BaseScreen from '../base';
import { HeaderApp } from '@BaseComponent';
import WebView from 'react-native-webview';

const WebViewScreen = ({ navigation, route }) => {
    const { url, screen } = route?.params;

    return (
        <BaseScreen
            usePadding
            header={<HeaderApp
                middleContent={screen}
                isPaddingTop
            />}

        >
            <WebView
                originWhitelist={["*"]}
                thirdPartyCookiesEnabled={true}
                allowsInlineMediaPlayback
                startInLoadingState={true}
                source={{
                    uri: url,
                }}

                style={{
                    width: '100%',
                    height: '150%',

                }}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                javaScriptEnabled={true}

            />
        </BaseScreen>
    );
};
export default React.memo(WebViewScreen);
