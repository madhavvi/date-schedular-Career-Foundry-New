import React, { Component } from 'react';
import './DateSchedular.css';
import {
    Box, Button, Dialog,
    DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';

class ErrorDialog extends Component {
    constructor(props) {
        super(props);
        console.log('props from date schedular : ', props);
    }

    render() {
        return (
            <>
                <Box maxWidth="md" className="main-wrapper">
                </Box>
                <Dialog open={this.props.open} fullWidth maxWidth="sm">
                    <DialogTitle id="form-dialog-title">Error</DialogTitle>
                    <DialogContent>
                        This time slot is already allocated. Please select other slot.
                </DialogContent>
                    <DialogActions>
                        <Button size="small" color="primary" onClick={this.props.closeModal} className="confirm-btn">
                            Close
                    </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

export default ErrorDialog;
