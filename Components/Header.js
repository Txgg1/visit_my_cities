import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '../core/theme';

class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
                <Text style={styles.header}>{this.props.title ? this.props.title : "Page sans titre"}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        fontSize: 34,
        color: Theme.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 14,
    },
});

export default (Header);
