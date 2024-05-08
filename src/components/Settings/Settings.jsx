import React from 'react';
import {
  Text,
  TouchableOpacity,
  Linking,
  View,
  Image,
  useColorScheme,
} from 'react-native';
import {setLanguage} from '../../Store/SiteSlicer';
import {useSelector, useDispatch} from 'react-redux';
import {s} from './Settings.style';
import turk from '../../assets/türk.png';
import eng from '../../assets/eng.png';
import ll from '../../assets/linkedinlight.png';
import ml from '../../assets/ml.png';
import gthb from '../../assets/gthb.png';
import github from '../../assets/github.png';

const Settings = () => {
  const dispatch = useDispatch();

  const handleLanguageTurk = () => {
    dispatch(setLanguage(true));
  };

  const handleLanguageEng = () => {
    dispatch(setLanguage(false));
  };

  const {language} = useSelector(state => state.site);

  const handleLinkPress = link => {
    Linking.openURL(link);
  };
  const isDarkMode = useColorScheme() === 'dark';

  const titleStyle = {
    color: isDarkMode ? '#e6e6e6' : '#666666',
  };
  return (
    <View style={s.container}>
      <View style={s.container}>
        <Text style={[s.titleDarkMode, titleStyle]}>
          {!language ? 'Language' : 'Dil Seçeneği'}
        </Text>
        <View style={s.flags}>
          <TouchableOpacity onPress={handleLanguageTurk}>
            <Image
              source={turk}
              style={[
                s.flag,
                {
                  marginRight: 10,
                },
                language == false && {opacity: 0.5},
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLanguageEng}>
            <Image
              source={eng}
              style={[s.flag, language == true && {opacity: 0.5}]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={s.container}>
        <Text style={[s.titleDarkMode, titleStyle]}>
          {language ? 'İletişim' : 'Contact'}
        </Text>
        <View style={s.icons}>
          <TouchableOpacity
            onPress={() =>
              handleLinkPress('https://www.linkedin.com/in/furkanislek/')
            }>
            <Image source={ll} style={[s.icon]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLinkPress('https://github.com/furkanislek')}>
            <Image source={github} style={[s.icon]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleLinkPress(`mailto:${'furkanakifislek@gmail.com'}`)
            }>
            <Image source={ml} style={[s.icon]} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Settings;
