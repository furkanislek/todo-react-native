import {s} from './Header.style';
import {View, Text, useColorScheme} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Header = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const titleStyle = {
    color: isDarkMode ? '#e6e6e6' : '#666666',
  };

  const {language} = useSelector(state => state.site);
  return (
    <View style={[s.container, backgroundStyle]}>
      <Text style={[s.Title, titleStyle]}>2D🕘 List</Text>
      <Text style={[s.SubTitle, titleStyle]}>
        {language
          ? 'Yapılacaklar Listesine İhtiyacın Olabilir'
          : 'You Probably Have Something To Do'}
      </Text>
    </View>
  );
};

export default Header;
