import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./block.style";

interface BlockProps {
    button: string;
    onPress?: () => void;
}


export default function Block({ button, onPress }: BlockProps) {
    return (
        <View style={styles.container}>
            {
                (parseFloat(button)) >= 0 || button === '.' || button === 'DEL' ?
                    <TouchableOpacity key={button} style={styles.containerNumber} onPress={onPress}>
                        <Text style={styles.textNumber}>{button}</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity key={button}  onPress={onPress}>
                        <Text style={styles.text}>{button}</Text>
                    </TouchableOpacity>

            }
        </View>
    )
}