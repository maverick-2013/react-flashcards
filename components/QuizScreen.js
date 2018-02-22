import React, {Component} from 'react';
import {Alert, Platform, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux'


import {primary, red} from '../utils/colors'
import {styles} from '../utils/styles'
import {loadDeck} from '../utils/api'

import {clearLocalNotifications, setLocalNotification} from '../utils/helpers'

class QuizScreen extends Component {
    state = {
        showAnswer: false,
        correct: 0,
        index: 0
    };


    componentDidMount() {
        loadDeck(this.props.navigation.state.params.title, this.props.dispatch)
    }

    nextQuestion = () => {
        const {questions} = this.props.deck;
        if (this.state.index < questions.length - 1) {
            this.setState({index: this.state.index + 1})
        }
        else {
            clearLocalNotifications()
                .then(setLocalNotification);
            Alert.alert(
                '',
                `Correct answers: ${this.state.correct} / ${questions.length}`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            this.props.navigation.goBack()
                        }
                    },
                ],
                {cancelable: false}
            )
        }
    };

    showButtons = (questions) => {
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity
                    style={[(Platform.OS === 'ios') ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, {
                        marginBottom: 10,
                        backgroundColor: primary
                    }]}
                    onPress={() => {
                        if (questions[this.state.index].answer === "Correct") {
                            this.setState({correct: this.state.correct + 1});
                        }
                        this.nextQuestion()
                    }}>
                    <Text style={styles.submitBtnText}>Correct</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[(Platform.OS === 'ios') ? styles.iosSubmitBtn : styles.AndroidSubmitBtn, {backgroundColor: red}]}
                    onPress={() => {
                        if (questions[this.state.index].answer === "Incorrect") {
                            this.setState({correct: this.state.correct + 1});
                        }
                        this.nextQuestion()
                    }}>
                    <Text style={styles.submitBtnText}>Incorrect</Text>
                </TouchableOpacity>
            </View>
        )
    };


    showAnswer = (questions) => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.header}>{questions[this.state.index].answer}</Text>
                <View style={{padding: 20}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.flip()
                        }}>
                        <Text style={{color: red, fontWeight: '600'}}>Show Question</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    showQuestion = (questions) => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.header}>{questions[this.state.index].question}</Text>
                <View style={{padding: 20}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.flip()
                        }}>
                        <Text style={{color: red, fontWeight: '600'}}>Show Answer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    flip = () => {
        this.setState({
            showAnswer: !this.state.showAnswer
        });
    };

    render() {
        const {questions} = this.props.deck;

        return (
            <View style={styles.container}>
                <View>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>{this.state.index + 1}/{questions.length}</Text>
                </View>
                <View style={{flex: 1}}>
                    {(this.state.showAnswer) ? this.showAnswer(questions) : this.showQuestion(questions)}
                </View>
                {this.showButtons(questions)}
            </View>
        )
    }

}


function mapStateToProps(state) {
    return {
        deck: state.deck
    }
}

export default connect(mapStateToProps)(QuizScreen)