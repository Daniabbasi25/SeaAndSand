import React, { useEffect, useState } from 'react';
import BaseScreen from '../base';
import { ListImage, DetailInformation, BookingAction } from '@DetailItemScreenComponent';
import { getDataItem } from '../../redux/detailRedux';
import { useDispatch } from 'react-redux';
import { Indicator } from '@BaseComponent';

const DetailItemScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { type, id } = route?.params;
    const [dataItem, setDataItem] = useState(null);

    useEffect(() => {
        if (!dataItem) {
            dispatch(getDataItem(type, id)).then(res => {
                setDataItem(res);
            });
        }
    }, []);

    if (dataItem == null) {
        return (
            <BaseScreen
                usePadding
            >
                <Indicator />
            </BaseScreen>
        );
    }
    return (
        <BaseScreen
            scroll
            notSafe
            fixedContent={<BookingAction data={dataItem} navigation={navigation} />}
        >
            <ListImage gallery={dataItem?.gallery} navigation={navigation} title={dataItem?.title} id={dataItem?.id} object_model={dataItem?.object_model} />
            <DetailInformation data={dataItem} />
        </BaseScreen>
    );
};
export default React.memo(DetailItemScreen);
