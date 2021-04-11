import React, { Component } from 'react';
import moment from 'moment';
import './DateSchedular.css';
import {
    Box, Button, Dialog,
    DialogActions, DialogContent, DialogTitle, Grid
} from '@material-ui/core';
import { AiTwotoneCalendar, AiOutlineClockCircle, AiOutlineFileText } from 'react-icons/ai';

class ConfirmDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Dialog open={this.props.open} fullWidth maxWidth="sm" className="dialog-container">
                    <DialogTitle className="form-dialog-title">Confirmed</DialogTitle>
                    <DialogContent style={{ padding: '0 24px' }}>
                        <h5 style={{ color: 'rgba(3, 2, 2, 0.66)', fontSize: 19, margin: '0 0 20px', fontWeight: 500 }}>Your appointment with your mentor is booked.</h5>
                        <Box>
                            <Grid item xs={12} md={12} style={{ padding: '10px 0' }}>
                                <AiTwotoneCalendar className="dialog-date dialog-icon" />
                                <div style={{ display: 'inline' }}>
                                    <p style={{ display: 'inline' }} className="dialog-date">{moment(this.props.date).format('MMMM Do YYYY')}</p>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12} style={{ padding: '10px 0', color: 'rgba(3, 2, 2, 0.66)' }}>
                                <AiOutlineClockCircle className="dialog-icon" />
                                <div style={{ display: 'inline' }}>
                                    <p style={{ display: 'inline', fontSize: '20px' }}>
                                        {(this.props.time > 12)
                                            ? ((this.props.time - 12) + 'pm')
                                            : (this.props.time + 'am')}
                                    </p>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12} style={{ padding: '10px 0', color: 'rgba(3, 2, 2, 0.66)' }}>
                                <AiOutlineFileText className="dialog-icon" />
                                <div style={{ display: 'inline' }}>
                                    <label className="dialog-content-label">Reason:</label>
                                    <p style={{ display: 'inline', fontSize: '20px', margin: '0 13px' }}>{this.props.reason}</p>
                                </div>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions style={{ padding: '0 24px 24px' }}>
                        <Button size="small" color="primary" onClick={this.props.closeModal} className="confirm-btn">
                            Close
                    </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

export default ConfirmDialog;
