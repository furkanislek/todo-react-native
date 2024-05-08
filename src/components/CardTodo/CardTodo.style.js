import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  card: {
    backgroundColor: "#fefefe",
    height: 85,
    shadowColor: "#ababab",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5,
    elevation: 2,
    borderRadius: 15,
    borderWidth:1,
    borderColor:"#dcdcdc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
  },
  img: {
    height: 25,
    width: 25,
  },
});
