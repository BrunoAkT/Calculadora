import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { styles } from "../../../styles/home";
import Block from "@/components/block/block";
import { useState } from "react";

export default function home() {
    const buttons = [
        ['C', '+/-', '%', '/'],
        ['7', '8', '9', '*'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '.', 'DEL', '=']
    ];
    const [query, setQuery] = useState<string[]>([]);
    const [result, setResult] = useState(0);
    const [mark, setMark] = useState("+");
    const [value, setValue] = useState('0');

    const pressedButton = (num: string) => {
        const numero = parseFloat(num);
        if (isNaN(numero)) {
            console.log('em Operador ' + num);
            if (num === '.') {
                setValue(prevValue => {
                    if (prevValue.includes('.')) {
                        return prevValue;
                    } else {
                        return prevValue + '.';
                    }
                });
            }
            else if (num === 'C') {
                setValue('0');
                setQuery([]);
                setMark('+');
            }
            else if (num === 'DEL') {
                setValue(prevValue => {
                    if (prevValue.length === 1) {
                        return '0';
                    } else {
                        return prevValue.slice(0, -1);
                    }
                });
            } else if (num === '+/-') {
                setMark(prevMark => prevMark === '+' ? '-' : '+');
                setValue(prevValue => {
                    if (prevValue.startsWith('-')) {
                        return prevValue.slice(1);
                    } else {
                        return '-' + prevValue;
                    }
                });
            }
            else {
                nextLayer(num);
            }
        } else {
            if (value === '0') {
                setValue(num);
                return;
            }
            setValue(prevValue => prevValue + num);
        }
    }

    const nextLayer = (op: string) => {
        if (op === '=') {
            calculateResult([...query, value]);
        }
        if (mark === '-' && query.at(-1) !== '-') {
            setQuery(prevQuery => [...prevQuery, '(' + value + ')', op]);
        } else if (query.at(-1) === '-' && mark === '-') {
            setQuery(prevQuery => [...prevQuery.slice(0, -1), value , op]);
        } else if (query.at(-1) === '-' && mark === '+') {
            setQuery(prevQuery => [...prevQuery.slice(0, -1), '+' + value , op]);
        } else {
            setQuery(prevQuery => [...prevQuery, value, op]);
        }
        setValue('0');
        console.log('query atual: ' + [...query, value, op].join(' '));
        if (op === '-') {
            setMark('-');
            setValue(prevValue => {
                if (prevValue.startsWith('-')) {
                    return prevValue.slice(1);
                } else {
                    return '-' + prevValue;
                }
            });
        } else {
            setMark('+');
        }
        
    }

    const calculateResult = (fullQuery: Array[]) => {
        let expression = fullQuery.join(' ');
        expression.forEach(value =>{
            console.log('valor do for each: ' + value);
        })
        console.log('Calculating result for expression: ' + expression);
    }

    return (
        <View style={styles.MainContainer}>
            <View style={styles.header}>
                <Text style={styles.headerSubText}>{query}</Text>
                <View style={styles.headerValue}>
                    <Text style={styles.headerMarkText}>{mark}</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }} >
                        <Text style={styles.headerText}>{value}</Text>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                {buttons.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((button) => (
                            <Block key={button} button={button} onPress={() => pressedButton(button)} />
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
}
