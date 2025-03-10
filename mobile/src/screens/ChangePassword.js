import React, { useState, useEffect, useRef} from 'react';
import Icon from 'react-native-ico-material-design';

import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';

/*
    <View style={styles.logo}>
                    <Icon
                    name="car-front"
                    height="72"
                    width="72"
                    color="#176585"
                    style={{ marginRight: 13 }} 
                    />
                    <Icon
                    name="car-front"
                    height="72"
                    width="72"
                    color="#176585"
                    style={{ marginRight: 13 }} 
                    />
                    <Icon
                    name="car-front"
                    height="72"
                    width="72"
                    color="#176585"
                    />          
                </View>
 */


export default function ChangePassword({ navigation }) {

    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');

    return(
        <SafeAreaView style={styles.containerSafeArea}>
            <View style={styles.container}>
                

                <Text style={styles.title}>Altere sua senha</Text>

                <Text style={styles.descriptions}>Crie uma senha longa e complexa, use números e símbolos, letras maiúsculas e minúsculas.</Text>

                <View style={styles.containerFields}>

                    <Text style={styles.titleField}>Senha atual</Text>
                    <View style={styles.sectionField}>
                        <TextInput
                        style={styles.inputs}
                        placeholder='Senha atual'
                        value={newPass}
                        onChangeText={ (text) => setCurrentPass(text)}
                        />

                        
                        <TouchableOpacity>
                            <Icon
                            name="turn-visibility-off-button"
                            height="24"
                            width="24"
                            color="#176585"
                            style={styles.icon}
                            />      
                        </TouchableOpacity> 
                    </View>

                </View>

                <View style={styles.containerFields}>

                <Text style={styles.titleField}>Nova senha</Text>

                    <View style={styles.sectionField}>
                        <TextInput
                        style={styles.inputs}
                        placeholder='Nova senha'
                        value={newPass}
                        onChangeText={ (text) => setNewPass(text)}
                        />

                        <TouchableOpacity>
                            <Icon
                            name="visibility-button"
                            height="24"
                            width="24"
                            color="#176585"
                            style={styles.icon}
                            />      
                        </TouchableOpacity> 
                    </View>
                   

                </View>

                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Alterar senha</Text>
                </TouchableOpacity>


            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerSafeArea:{
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
      backgroundColor: '#FFF',
      flexDirection: 'column',
      paddingHorizontal: 20,
      height: 'auto',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo:{
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'center'
    },
    descriptions:{
        maxWidth: 270,
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 30
    },
    containerFields:{
        width: '100%',
        height: 'auto'
    },
    titleField:{
        fontSize: 12,
        fontWeight: 'bold'
    },
    sectionField:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#176585',
        borderRadius: 5,
        marginBottom: 20,
    },
    inputs:{
        flex: 1,
        fontSize: 18,
        marginLeft: 2
    },
    icon:{
        marginHorizontal: 8
    },
    btn:{
        width: "100%",
        backgroundColor: "#176585",
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText:{
        fontSize: 16,
        color: '#FFF'
    },
});