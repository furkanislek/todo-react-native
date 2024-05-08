import { Text, TouchableOpacity } from "react-native";
import { s } from "./NewTodoButton.style";
import { useSelector } from "react-redux";

const NewTodoButton = ({ onPress }) => {
  const { language } = useSelector((state) => state.site);

  return (
    <TouchableOpacity onPress={onPress} style={s.btn}>
      <Text style={s.txt}>+ {language ? "Yeni" : "New"} 2DO</Text>
    </TouchableOpacity>
  );
};

export default NewTodoButton;
