import {Text, TouchableOpacity, View, useColorScheme} from 'react-native';
import {s} from './TabBttomMenu.style';
import {useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const TabBottomMenu = ({selectedTabName, onPress, todoList}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const titleStyle = {
    color: isDarkMode ? '#e6e6e6' : '#666666',
  };

  const {language} = useSelector(state => state.site);
  const countByStatus = todoList.reduce(
    (acc, todo) => {
      todo.isCompleted ? acc.done++ : acc.inProgress++;
      return acc;
    },
    {
      all: todoList.length,
      inProgress: 0,
      done: 0,
    },
  );

  const getTextStyle = tabName => {
    return {
      fontWeight: 'bold',
      color: selectedTabName === tabName ? '#2F76E5' : 'black',
    };
  };
  return (
    <View style={[s.root, backgroundStyle]}>
      <TouchableOpacity onPress={() => onPress('all')}>
        <Text style={[getTextStyle('all'), titleStyle]}>
          {language ? 'Hepsi' : 'All'} ( {countByStatus.all} )
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress('inProgress')}>
        <Text style={[getTextStyle('inProgress'), titleStyle]}>
          {language ? 'Devam Edenler' : 'In Progress'} ({' '}
          {countByStatus.inProgress} )
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress('done')}>
        <Text style={[getTextStyle('done'), titleStyle]}>
          {language ? 'Tamamlananlar' : 'Done'} ( {countByStatus.done} )
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress('settings')}>
        <Text style={[getTextStyle('settings'), titleStyle]}>
          {language ? 'Tercihler' : 'Settings'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBottomMenu;
