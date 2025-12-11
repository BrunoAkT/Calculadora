import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./block.style";

interface BlockProps {
    button: string;
    onPress?: () => void;
}


export default function Block({ button, onPress }: BlockProps) {
    return (
        <TouchableOpacity key={button} style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{button}</Text>
        </TouchableOpacity>
    )
}