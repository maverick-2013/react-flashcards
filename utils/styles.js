import React from 'react'
import {StyleSheet} from 'react-native'

import * as colors from './colors'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 10
    },
    header: {
        fontSize: 20,
        fontWeight: "600"
    },
    cardsCount: {
        fontSize: 15,
        color: '#444'
    },
    inputField: {
        height: 40,
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.white,
        borderColor: '#222',
        borderWidth: 1
    },
    errorInput: {
        borderColor: colors.red
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: colors.white,
    },
    iosSubmitBtn: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtn: {
        backgroundColor: colors.primary,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: colors.white,
        fontSize: 18,
        textAlign: 'center'
    },
});