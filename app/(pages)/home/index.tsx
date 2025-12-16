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
    const [mark, setMark] = useState("+");
    const [value, setValue] = useState('0');

    const pressedButton = (num: string) => {
        const numero = parseFloat(num);
        if (isNaN(numero)) {

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
            }
            else if (num === '+/-') {
                setMark(prevMark => prevMark === '+' ? '-' : '+');
                setValue(prevValue => {
                    if (prevValue.startsWith('-')) {
                        return prevValue.slice(1);
                    } else {
                        return '-' + prevValue;
                    }
                });
            } else if (num === '%') {
                let i = query.length - 1;
                let base = '0'
                let queryStr = ''
                while (i >= 0) {
                    if (query[i] === '+' || query[i] === '-') {
                        base = query[i-1]
                        setValue(prevValue => (parseFloat(prevValue) * (parseFloat(base) / 100)).toString());
                        break;
                    } else if (query[i] === '*' || query[i] === '/') {
                        base = query[i-1]
                        setValue(prevValue => (parseFloat(prevValue)/ 100).toString());
                        break;
                    } 
                }
                console.log(base)

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
        if (op === '=' && mark === '-') {
            calculateResult([...query, '(' + value + ')']);
            return;
        } else if (op === '=') {
            calculateResult([...query, value]);
            return;
        }

        if (mark === '-') {
            setQuery(prevQuery => [...prevQuery, '(' + value + ')', op]);
        } else {
            setQuery(prevQuery => [...prevQuery, value, op]);
        }
        setMark('+');
        setValue('0');
    }

    const calculateResult = (fullQuery: string[]) => {
        console.log('------------------------------')
        console.log(fullQuery)
        const expression = fullQuery
        let i = 0

        const product = []
        while (i < expression.length) {
            let item = expression[i]

            console.log('Pushing: ', item)
            if (item.startsWith('(-')) {
                item = item.slice(1, -1)
            }

            if (item === '*' || item === '/') {
                const left = parseFloat(expression[i - 1].startsWith('(-') ? expression[i - 1].slice(1, -1) : expression[i - 1])
                console.log('Left: ', left)
                const right = parseFloat(expression[i + 1].startsWith('(-') ? expression[i + 1].slice(1, -1) : expression[i + 1])
                console.log('Right: ', right)
                let tempResult;

                if (item === '*') {
                    tempResult = left * right
                } else {
                    tempResult = left / right
                }
                console.log('****Temp Result: ', tempResult)
                expression[i + 1] = tempResult.toString()

                i++
            } else if (i >= 0 && (expression[i + 1] === '*' || expression[i + 1] === '/')) {
                console.log('Skipping: ', item)
                i++
            } else {
                product.push(item)
                i++
            }

        }
        console.log('After * and /: ', product)
        let result = parseFloat(product[0])
        i = 1
        while (i < product.length) {
            const operator = product[i]
            const right = parseFloat(product[i + 1])

            if (operator === '+') {
                result += right
            } else {
                result -= right
            }
            i += 2
        }
        console.log('Final Result: ', result)
        if (isNaN(result)) {
            setValue('0');
            setQuery([]);
            setMark('+');
            return;
        }
        setValue(result.toString());
        setQuery([]);
        setMark('+');
        return
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
