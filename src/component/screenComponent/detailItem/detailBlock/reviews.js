import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextApp, SizedBox } from '@BaseComponent';
import TitleBlock from './titleBlock';
import { useTheme } from 'react-native-paper';
import ItemReview from './reviews/itemReview';

const Reviews = ({ review_score, review_lists }) => {
    return (
        <View style={styles.wrapContent}>
            <TitleBlock title={global.language['Reviews'].toUpperCase()} />
            <TotalReviewTable review_score={review_score} />
            <ListReviews review_lists={review_lists} />
        </View>
    )
}

const TotalReviewTable = ({ review_score }) => {
    const { colors } = useTheme();
    const itemRateScore = (element, index) => {
        return (
            <View key={`${index}`} style={styles.wrapItemRateScore}>
                <View style={styles.leftContent}>
                    <TextApp>{element?.title}</TextApp>
                </View>
                <View style={styles.midContent}>
                    <View style={[styles.percent, { width: `${element?.percent}%`, backgroundColor: colors.primary }]} />
                </View>
                <View style={styles.rightContent}>
                    <TextApp>{element?.total}</TextApp>
                </View>
            </View>
        )
    }
    const rateScore = () => {
        let arrScore = [];
        review_score?.rate_score && Object.values(review_score?.rate_score).map((element, index) => {
            arrScore.push(itemRateScore(element, index));
        });
        return arrScore;
    }
    const score = () => {
        return (
            <View>
                <TextApp h2 bold primary style={styles.centerText}>{review_score?.score_total}<TextApp primary title>/5</TextApp></TextApp>
                <TextApp h7 medium style={styles.centerText}>{review_score?.score_text}</TextApp>
                <SizedBox height={5} />
                {global.isRtl ? <TextApp button medium style={styles.centerText}><TextApp button medium primary style={styles.centerText}>{`${review_score?.total_review > 1 ? global.language['Reviews'] : global.language['Review']}`} {review_score?.total_review}</TextApp> {global.language['BasedOn']} </TextApp>
                    : <TextApp button medium style={styles.centerText}>{global.language['BasedOn']} <TextApp button medium primary style={styles.centerText}>{`${review_score?.total_review} ${review_score?.total_review > 1 ? global.language['Reviews'] : global.language['Review']}`}</TextApp></TextApp>}
            </View>
        )
    }
    return (
        <View style={styles.wrapTable}>
            {score()}
            {rateScore()}
        </View>
    )
}

const ListReviews = ({ review_lists }) => {

    return (
        <FlatList
            horizontal
            data={review_lists?.data}
            renderItem={({ item }) => <ItemReview item={item} />}
            keyExtractor={(item) => `item_${item?.id}`}
            ItemSeparatorComponent={() => <SizedBox width={15} />}
            contentContainerStyle={styles.contentContainerStyle}
            showsHorizontalScrollIndicator={false}
        />
    )
}


const styles = StyleSheet.create({
    wrapContent: {
        paddingVertical: 10,
    },
    wrapTable: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#DEDEDE',
        marginTop: 15,
        paddingBottom: 5
    },
    centerText: {
        textAlign: 'center'
    },
    wrapItemRateScore: {
        flexDirection: global.isRtl ? 'row-reverse' : 'row',
        paddingHorizontal: 10,
        paddingVertical: 3,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftContent: {
        width: '25%'
    },
    midContent: {
        width: '60%',
        backgroundColor: '#DEDEDE',
        height: 10,
        borderRadius: 30,
    },
    percent: {
        borderRadius: 30,
        height: 10
    },
    rightContent: {
        width: '10%',
        alignItems: 'flex-end'
    },
    contentContainerStyle: {
        paddingVertical: 5,
        paddingHorizontal: 2
    }
});
export default React.memo(Reviews);