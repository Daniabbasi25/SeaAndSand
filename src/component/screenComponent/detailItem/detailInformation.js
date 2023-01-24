import React from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';
import NameItem from './detailBlock/nameItem';
import Description from './detailBlock/description';
import Term from './detailBlock/term';
import Policy from './detailBlock/policy';
import Reviews from './detailBlock/reviews';
import WriteReview from './detailBlock/reviews/writeReview';
import Related from './detailBlock/related';
import FAQs from './detailBlock/FAQs';
import AdditionalTerms from './detailBlock/additionalTerms';

const DetailInformation = ({ data }) => {
    return (
        <View style={styles.container}>
            <NameItem
                title={data?.title}
                address={data?.address}
                star_rate={data?.star_rate}
                review_score={data?.review_score}
                data={data}
            />
            {data?.content && <Description data={data?.content} />}
            {data?.terms && <Term data={data?.terms} />}
            {data?.policy && <Policy data={data?.policy} />}
            {data?.faqs && <FAQs data={data?.faqs} />}
            {data?.terms_information && <AdditionalTerms data={data?.terms_information} />}
            <Reviews review_score={data?.review_score}
                review_lists={data?.review_lists} />
            <WriteReview review_stats={data?.review_stats} type={data?.object_model} id={data?.id} />
            {_.has(data, 'related') && !_.isEmpty(data?.related) && <Related data={data?.related} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        zIndex: 99999,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingBottom: 30,
    }
});

export default React.memo(DetailInformation);