import {Constants} from 'expo'

import React from 'react';
import {View, Platform, StatusBar} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'

import {decks} from './reducers'
import {setLocalNotification} from './utils/helpers'
import {primary, white} from './utils/colors'

import NewDeck from './components/NewDeck'
import HomeScreen from './components/HomeScreen'
import DeckDetails from './components/DeckDetails'
import NewCard from './components/NewCard'
import QuizScreen from './components/QuizScreen'

function AppStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const Tabs = TabNavigator({
    Decks: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards' size={25} color={tintColor}/>
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-add' size={25} color={tintColor}/>
        }
    }
}, {
    navigationOptions: {
        header: null
    },
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? primary : white,
        style: {
            height: 50,
            backgroundColor: Platform.OS === 'ios' ? white : primary
        }
    }
});


const Navigator = StackNavigator({
        Home: {
            screen: Tabs
        },
        DeckDetails: {
            screen: DeckDetails
        },
        NewCard: {
            screen: NewCard
        },
        QuizScreen: {
            screen: QuizScreen
        }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: primary,
            },
            headerTitleStyle: {
                color: white
            },
            headerTintColor: white,
        }
    });

export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(decks)}>
                <View style={{flex: 1}}>
                    <AppStatusBar backgroundColor={primary} barStyle="light-content"/>
                    <Navigator/>
                </View>
            </Provider>
        )
    }
}