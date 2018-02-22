import React, {Component} from 'react';
import {connect} from 'react-redux'
import {ActivityIndicator, Platform, Text, TouchableOpacity, View} from 'react-native';
import {primary} from '../utils/colors'
import {styles} from '../utils/styles'
import {getDeckByTitle, getDeck} from '../utils/api'

class DeckDetails extends Component {

    state = {
        loading: false
    };

    componentDidMount() {
        this.loadDeck()
    }

    loadDeck = () => {
        this.setState({loading: true});
        const {dispatch} = this.props;
        getDeckByTitle(this.props.navigation.state.params.title)
            .then((deck) => {
                dispatch(getDeck(deck));
                this.setState({loading: false})
            })
    };

    deckView = (deck) => {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.header}>{deck.title}</Text>
                    <Text style={styles.cardsCount}>{deck.questions.length} cards</Text>
                </View>
                <View style={{flex: 2, justifyContent: 'flex-start'}}>
                    <TouchableOpacity
                        style={[(Platform.OS === 'ios') ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, {marginBottom: 10}]}
                        onPress={() => {
                            this.props.navigation.navigate('NewCard', {title: deck.title, refresh: this.loadDeck})
                        }}>
                        <Text style={styles.submitBtnText}>New Card</Text>
                    </TouchableOpacity>
                    {deck.questions.length > 0 &&
                    <TouchableOpacity
                        style={(Platform.OS === 'ios') ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                        disabled={deck.questions.length === 0}
                        onPress={() => {
                            this.props.navigation.navigate('QuizScreen', {title: deck.title})
                        }}>
                        <Text style={styles.submitBtnText}>Start Quiz</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        )
    };


    render() {
        const {deck} = this.props;
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={this.state.loading} color={primary}/>
                {this.deckView(deck)}
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        deck: state.deck
    }
}

export default connect(mapStateToProps)(DeckDetails)