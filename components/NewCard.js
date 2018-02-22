import React, {Component} from 'react';
import {Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {red, placeholder_color} from '../utils/colors'
import {addCardToDeck} from '../utils/api'
import {styles} from '../utils/styles'

class NewCard extends Component {
    state = {
        question: '',
        answer: '',
        valid: true
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={{marginBottom: 10}}>
                    <TextInput
                        style={[styles.inputField, (!this.state.valid) ? styles.errorInput : '']}
                        ref="question"
                        onChangeText={(question) => this.setState({question})}
                        placeholderTextColor={(!this.state.valid) ? red : placeholder_color}
                        placeholder="Question"/>
                </View>
                <View style={{marginBottom: 10}}>
                    <TextInput
                        style={[styles.inputField, (!this.state.valid) ? styles.errorInput : '']}
                        ref="answer"
                        onChangeText={(answer) => this.setState({answer})}
                        placeholderTextColor={(!this.state.valid) ? red : placeholder_color}
                        placeholder="Answer ('Correct' or 'Incorrect')"/>
                </View>
                <View style={{marginTop: 10}}>
                    <SubmitBtn onPress={this.addCard}/>
                </View>
            </View>
        )
    }

    addCard = () => {
        if (this.state.question && this.state.answer) {
            addCardToDeck(this.props.navigation.state.params.title, this.state);
            this.props.navigation.goBack();
            this.props.navigation.state.params.refresh();
        }
        else {
            this.setState({valid: false})
        }

    }
}

function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Add</Text>
        </TouchableOpacity>
    )
}

export default NewCard