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
    textAlign: 'center',
  },
  numericInput: {
    marginTop: 10,
    marginBottom: 40
  },
  bottom: {
    color: 'white',
    fontSize: 16,
    paddingBottom: 10
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  editPhotoText:
      {
        color:"#00BCD4",
        marginBottom: 10,
        marginTop: 5
      }
});
