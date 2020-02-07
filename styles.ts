import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  mainContainer: {
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  form: {
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  centeredTextContainer: {
      display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold"
  },
  normal: {
    fontWeight: "normal"
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#00BCD4',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  }
});
