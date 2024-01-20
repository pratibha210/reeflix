// NotifiedMessageComponent
import React from 'react';
import './uicomponent.css';
import { withRouter } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ButtonComponent from './ButtonComponent';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NotifiedMessageComponent = (props) => {
    const [state, setState] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = state;

    const notificationClick = newState => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <div className={"notifiactionmessage-component" + " " + props.extracls}>
            
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={props.open}
                autoHideDuration={6000}

            >
                <Alert
                    onClose={props.onClose}
                    variant="filled"
                    severity={props.alertType}>
                    {props.notifiactionText}
                </Alert>
            </Snackbar>
        </div>
    );

}

export default withRouter(NotifiedMessageComponent);
