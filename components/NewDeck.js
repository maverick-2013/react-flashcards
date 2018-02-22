import React, {Component} from 'react';
import {connect} from 'react-redux'
import {KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {addDeck} from '../utils/api'
import {styles} from '../utils/styles'
import {red, placeholder_color} from '../utils/colors'
import {loadDecks} from '../utils/api'

class NewDeck extends Component {
    state = {
        title: '',
        valid: true
    };


    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View>
                    <TextInput
                        ref="title"
                        style={[styles.inputField, (!this.state.valid) ? styles.errorInput : '']}
                        value={this.state.title}
                        onChangeText={(title) => this.setState({title})}
                        placeholderTextColor={(!this.state.valid) ? red : placeholder_color}
                        placeholder="Title"
                    />
                </View>
                <View style={{marginTop: 10}}>
                    <SubmitBtn onPress={this.newDeck}/>
                </View>
            </KeyboardAvoidingView>
        )
    }

    newDeck = () => {
        if (this.state.title) {
            addDeck(this.state.title);
            this.refs['title'].setNativeProps({text: ''});
            this.props.navigation.navigate('DeckDetails', {title: this.state.title});
            this.setState({valid: true, title: ''});
            loadDecks(this.props.dispatch)
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

function mapStateToProps(state) {
    return {
        decks: state.decks
    }
}

export default connect(mapStateToProps)(NewDeck)