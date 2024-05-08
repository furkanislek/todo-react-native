import { Image, Text, TouchableOpacity, useColorScheme } from "react-native";
import { s } from "./CardTodo.style";
import checkImg from "../../assets/check.png";
import {Colors} from 'react-native/Libraries/NewAppScreen';

const CardTodo = ({ todo, onPress, onLongPress }) => {
   const isDarkMode = useColorScheme() === 'dark';

   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
   
   const textStyle = {
     color: isDarkMode ? '#e6e6e6' : '#666666',
   };

  return (
    <TouchableOpacity
      style={[s.card, backgroundStyle]}
      onPress={() => onPress(todo)}
      onLongPress={() => onLongPress(todo)}>
      <Text
        style={[
          s.title,
          textStyle,
          todo.isCompleted && {textDecorationLine: 'line-through'},
        ]}>
        {todo.title}
      </Text>
      {todo.isCompleted && <Image style={s.img} source={checkImg} />}
    </TouchableOpacity>
  );
};

export default CardTodo;
