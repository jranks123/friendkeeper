import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  friendContainer: {
    justifyContent: "center",
    alignItems: "stretch",
    flexDirection: "row"
  },
  statusBar: {
    flex: 1,
    width: 10
  },
  redBackground: {
    backgroundColor: "red"
  },
  greenBackground: {
    backgroundColor: "green"
  },
  friendInfo: {
    flex: 24,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10
  },
  friendName: {
    fontSize: 20
  },
  buttonContainer: {
    margin: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer: {
    justifyContent: "center",
    marginRight: 10
  }
});
