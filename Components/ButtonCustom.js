import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import { Theme } from '../core/theme';

class ButtonCustom extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {title, onPress, style} = this.props
        return(
            <View>
                <Button style={styles.button}
                    onPress={onPress}
                    title={title}
                    style={style}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 26,
        color: Theme.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 14,
    },
});

export default (ButtonCustom);
