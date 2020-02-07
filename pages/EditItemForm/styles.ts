import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  formContainer: {
    flex: 1
  },
  input: {
    marginBottom: 40
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "grey",
    marginLeft: 10
  },
  datePicker: {
    width: 200,
    marginLeft: 10,
    marginTop: 10
  },
  numericInput: {
    marginTop: 10,
    marginBottom: 40
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
});
