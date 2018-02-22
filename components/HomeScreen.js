import React, {Component} from 'react';
import {FlatList, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux'
import sortBy from 'sort-by';
import {SearchBar} from 'react-native-elements'

import {Ionicons} from '@expo/vector-icons'

import {primary, white} from '../utils/colors'
import {styles} from '../utils/styles'
import {loadDecks} from '../utils/api'

class HomeScreen extends Component {

    state = {
        refreshing: false,
        filter: ''
    };

    componentDidMount() {
        loadDecks(this.props.dispatch);
    }

    renderHeader = () => {
        const containerStyle = {backgroundColor: primary, borderColor: primary};
        const inputStyle = {backgroundColor: white};
        return (
            <SearchBar
                placeholder="Find deck"
                containerStyle={containerStyle}
                inputStyle={inputStyle}
                onChangeText={this.searchText}
            />
        )
    };

    renderListItem = ({item}) => {
        return (
            <TouchableHighlight
                onPress={() => {
                    this.props.navigation.navigate('DeckDetails', {title: item.title});
                }}
            >
                <View style={styles.listItem}>
                    <View style={{flex: 2, marginLeft: 20, alignItems: 'flex-start'}}>
                        <Text style={[styles.header]}>{item.title}</Text>
                        <Text style={styles.cardsCount}>{item.questions.length} cards</Text>
                    </View>
                    <View style={{flex: 1, marginRight: 20, alignItems: 'flex-end', justifyContent: 'center'}}>
                        <Text><Ionicons name="ios-arrow-forward" color={primary} size={30}/></Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: primary
                }}
            />
        )
    };

    keyExtractor = (item, index) => {
        return index
    };


    searchText = (text) => {
        this.setState({filter: text})
    };


    pullToRefresh = () => {
        this.setState({
                refreshing: true
            },
            () => {
                loadDecks(this.props.dispatch);
                this.setState({refreshing: false})
            })
    };

    render() {
        const {decks} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: white}}>
                {((decks !== null || decks !== undefined) && decks.length > 0)
                    ? <FlatList
                        data={decks.filter((deck) => ~deck.title.toLowerCase().indexOf(this.state.filter.toLowerCase())).sort(sortBy('title'))}
                        style={{flex: 1}}
                        ListHeaderComponent={this.renderHeader}
                        renderItem={this.renderListItem}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={this.keyExtractor}
                        extraData={this.props}
                        refreshing={this.state.refreshing}
                        onRefresh={this.pullToRefresh}
                    />
                    : <View style={{flex: 1, padding: 10, alignItems: 'center'}}>
                        <Text style={styles.header}>No Decks yet</Text>
                    </View>}
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        decks: state.decks
    }
}

export default connect(mapStateToProps)(HomeScreen)