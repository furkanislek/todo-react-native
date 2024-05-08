import { StyleSheet, Dimensions } from "react-native";

export const s = StyleSheet.create({
  container: {},
  titleDarkMode: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'left',
  },
  flags: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flag: {
    flex: 1,
    resizeMode: 'contain',
    height: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width / 2.4,
  },
  icons: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 20,
   
  },
  icon: {
    width: Dimensions.get("screen").width*0.2,
    height: Dimensions.get("screen").height*0.1,
    resizeMode:"contain"
  },
});
