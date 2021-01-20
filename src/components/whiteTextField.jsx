import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export default withStyles({
  root: {
    "& label": {
      color: "#615a5a",
    },
    "& div": {
      color: "#FFF",
    },
    "& div:before": {
      borderBottomColor: "#615a5a",
    },
    "& div:after": {
      borderBottomColor: "#FFF",
    },
    "& label.Mui-focused": {
      color: "#FFF",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#FFF",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFF",
      },
      "&:hover fieldset": {
        borderColor: "#FFF",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFF",
      },
    },
  },
})(TextField);