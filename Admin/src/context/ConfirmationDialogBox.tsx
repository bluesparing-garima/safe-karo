//import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { spacing } from "@mui/system";
import {
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  Paper as MuiPaper,
  DialogContentText,
  LinearProgress as MuiLinearProgress,
  DialogTitle,
} from "@mui/material";

const Button = styled(MuiButton)(spacing);
//Confirm function
const LinearProgress = styled(MuiLinearProgress)(spacing);
const Paper = styled(MuiPaper)(spacing);

function ConfirmationDialogBox(props: any) {
  const { onClose, open } = props;
  //const navigate = useNavigate();
  const { dialogResponse, setDialogResponse } = props;
  const handleClose = () => {
    onClose(!open);
  };
  //   const onConfirm = async () => {
  //     navigate(
  //       dialogResponse.isConnector
  //         ? "/x"
  //         : dialogResponse.isAdventure
  //         ? "/y"
  //         : dialogResponse.isDevice
  //         ? "/z"
  //         : ""
  //     );
  //   };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="confimation-dialog-title"
      aria-describedby="confimation-dialog-description"
      open={dialogResponse.open}
    >
      <DialogTitle id="confimation-dialog-title">
        {dialogResponse.title}
      </DialogTitle>
      <DialogContent>
        <Paper>
          {dialogResponse.isLoading ? <LinearProgress my={2} /> : null}
        </Paper>
        <DialogContentText id="confimation-dialog-description">
          {dialogResponse.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => setDialogResponse({ ...dialogResponse, open: false })}
        >
          Close
        </Button>
        {/* <Button
          style={
            dialogResponse.isView ? { display: "visible" } : { display: "none" }
          }
          color="primary"
          onClick={() => onConfirm()}
          autoFocus
        >
          {dialogResponse.isConnector
            ? "x"
            : dialogResponse.isAdventure
            ? "y"
            : dialogResponse.isDevice
            ? "x"
            : ""}
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialogBox;
