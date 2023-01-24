import React from 'react';
import BaseScreen from '../base';
import {
    ConfirmBooking,
    ConfirmBookingTour,
    ConfirmBookingSpace,
    ConfirmBookingEvent,
    ConfirmBookingCar,
    ConfirmBookingBoat,
    ConfirmBookingFlight
} from '@ConfirmBookingScreenComponent';
import { HeaderApp } from '@BaseComponent';

const ConfirmBookingScreen = ({ navigation, route }) => {
    const { params, dataItem } = route?.params;
    const handleTypeBooking = () => {
        switch (dataItem?.object_model) {
            case 'hotel':
                return <ConfirmBooking params={params} dataItem={dataItem} navigation={navigation} />;
            case 'tour':
                return <ConfirmBookingTour params={params} dataItem={dataItem} navigation={navigation} />;
            case 'space':
                return <ConfirmBookingSpace params={params} dataItem={dataItem} navigation={navigation} />;
            case 'event':
                return <ConfirmBookingEvent params={params} dataItem={dataItem} navigation={navigation} />;
            case 'car':
                return <ConfirmBookingCar params={params} dataItem={dataItem} navigation={navigation} />;
            case 'boat':
                return <ConfirmBookingBoat params={params} dataItem={dataItem} navigation={navigation} />;
            case 'flight':
                return <ConfirmBookingFlight params={params} dataItem={dataItem} navigation={navigation} />;
        }
    }

    return (
        <BaseScreen
            usePadding
            scroll
            header={<HeaderApp middleContent={global.language['PreviewOrder']} isPaddingTop />}
        >
            {handleTypeBooking()}
        </BaseScreen>
    );
};
export default React.memo(ConfirmBookingScreen);
