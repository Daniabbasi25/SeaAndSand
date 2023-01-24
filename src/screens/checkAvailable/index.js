import React from 'react';
import BaseScreen from '../base';
import { AvailableHotel, AvailableTour, AvailableSpace, AvailableEvent, AvailableCar, AvailableBoat, AvailableFlight } from '@CheckAvailableScreenComponent';
import { HeaderApp } from '@BaseComponent';

const CheckAvailableScreen = ({ navigation, route }) => {
    const { type, id } = route?.params;
    const handleType = () => {
        switch (type) {
            case 'hotel':
                return <AvailableHotel type={type} id={id} navigation={navigation} />;
            case 'tour':
                return <AvailableTour type={type} id={id} navigation={navigation} />;
            case 'space':
                return <AvailableSpace type={type} id={id} navigation={navigation} />;
            case 'event':
                return <AvailableEvent type={type} id={id} navigation={navigation} />;
            case 'car':
                return <AvailableCar type={type} id={id} navigation={navigation} />;
            case 'boat':
                return <AvailableBoat type={type} id={id} navigation={navigation} />;
            case 'flight':
                return <AvailableFlight type={type} id={id} navigation={navigation} />;
        }
    }
    const handleTitle = type => {
        switch (type) {
            case 'hotel':
                return global.language['AvailabilityHotel'];
            case 'space':
                return global.language['AvailabilitySpace'];
            case 'car':
                return global.language['AvailabilityCar'];
            case 'event':
                return global.language['AvailabilityEvent'];
            case 'tour':
                return global.language['AvailabilityTour'];
            case 'boat':
                return global.language['AvailabilityBoat'];
            case 'flight':
                return global.language['AvailabilityFlight'];
            default:
                return global.language['Availability'];
        }
    }
    return (
        <BaseScreen
            usePadding
            scroll
            header={<HeaderApp middleContent={`${handleTitle(type)}`} isPaddingTop />}
        >
            {handleType()}
        </BaseScreen>
    );
};
export default React.memo(CheckAvailableScreen);
