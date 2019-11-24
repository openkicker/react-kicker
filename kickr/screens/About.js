import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Colors from '../constants/Colors';

export default function About() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.header}>Kicker 0.2α</Text>
                <Text>
                    This app is in its infancy. Bugs are expected, functionality
                    is very limited, etc.
                </Text>
                <Text>
                    Here are some things that should come shortly in the app
                    (top-priority for v1):
                </Text>
                <Text>- less bugs</Text>
                <Text>- profile screen for other players (picture, stats)</Text>
                <Text style={styles.header}>Credits</Text>
                <Text>
                    Backend, modelling, pizza eating and general input: @bst
                    (🔥), @jem (🔥), @mat, @dbe, probably a few other people.
                </Text>
                <Text>
                    Design (I mean, mockups - I murdered her designs in this
                    alpha release): @est
                </Text>
                <Text>Mobile app: @dbo</Text>
                <Text style={styles.header}>Changelog</Text>
                <Text style={styles.logHeader}>0.2α (25/11/2019)</Text>
                <Text>
                    Added ranking page; you can now see rankings along 3 metrics
                    (won/lost/total matches) for 3 time windows
                    (week/month/year).
                </Text>
                <Text>
                    Also, manually added cat avatars; plan on adding them
                    automatically and at random for future new players (will
                    continue to do it by hand until then).
                </Text>
                <Text style={styles.logHeader}>0.3α (05/12/2019)</Text>
                <Text>Made the score input screen less shitty.</Text>
                <Text>
                    Added section titles when navigating between screens.
                </Text>
                <Text style={styles.logHeader}>0.4α (08/12/2019)</Text>
                <Text>Removed some code anti-patterns and improved code quality in general.</Text>
            </View>
        </ScrollView>
    );
}

const styles = {
    header: {
        color: Colors.brandSecondary,
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 10
    },
    logHeader: {
        color: Colors.darkGray,
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 5
    },
    container: {
        backgroundColor: '#fff'
    },
    contentContainer: {
        padding: 10
    }
};
