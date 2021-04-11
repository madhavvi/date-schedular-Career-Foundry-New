import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSlotsRequest } from '../redux/actions/slots';
import moment from 'moment';
import MomentUtils from "@date-io/moment";
import {
    Grid, TextField, Select, FormControl, MenuItem, InputLabel,
    CssBaseline, Box, Paper, Button
} from '@material-ui/core';
import { MuiPickersUtilsProvider, Calendar } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ConfirmDialog from './ConfirmDialog';
import ErrorDialog from './ErrorDialog';
import './DateSchedular.css';
import { groupBy } from 'lodash';

const theme = createMuiTheme({
    typography: {
        htmlFontSize: 15,
    },
    palette: {
        primary: {
            main: '#00A2FF',
            light: '#FFFFFF'
        },
    },
});

class DateSchedular extends Component {

    constructor(props) {
        super(props);
        this.props.getSlotsRequest();
        this.state = {
            slots: [],
            selectedDate: moment(),
            selectedTime: '',
            reason: '',
            maxDate: moment().add(5, 'months'), //max date set to 5 months from today
            showTimeField: false,
            showReasonField: false,
            submitDisabled: true,
            open: false,
            openErrorDialog: false,
            selectOptions: [],
            allottedSlotsTime: [],
            allottedSlotsDate: [],
            groupedDates: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            slots: nextProps.slots && nextProps.slots.items && nextProps.slots.items.data && nextProps.slots.items.data.calendar
        });

        for (var i = 0; i < 24; i++) {
            this.state.selectOptions.push((i + 1).toLocaleString());
        }
        const mappedOptions = this.state.selectOptions.map((o) => ({
            label: o.length < 2 ? '0' + o : o,
            value: o,
            allotted: false
        }));
        this.setState({ selectOptions: mappedOptions });

        const dates = nextProps.slots && nextProps.slots.items.data && nextProps.slots.items.data.calendar;
        const filteredDates = dates.map((date) => {
            return moment(date.date_time).format('YYYY-MM-DD HH:mm:ss');
        });
        const groupedData = groupBy(filteredDates, function (date) {
            return moment(date).format('YYYY-MM-DD')
        })
        this.setState({ allottedSlotsDate: filteredDates, groupedDates: groupedData });

    }

    closeModal() {
        this.setState({
            open: !this.state.open,
            selectedDate: moment(),
            selectedTime: '',
            reason: '',
            showTimeField: false,
            showReasonField: false,
            openErrorDialog: false,
            submitDisabled: true
        });
    };

    closeErrorModal() {
        this.setState({ openErrorDialog: !this.state.openErrorDialog });
    }

    handleDateChange(date) {
        const date1 = moment(date).format('YYYY-MM-DD');
        const currentDate = this.state.groupedDates[date1];
        console.log('date : ', date1, currentDate);

        currentDate && currentDate.forEach(date => {
            this.state.allottedSlotsTime.push(moment(date).format('HH:mm:ss'))
        });
        if (this.state.allottedSlotsTime.length) {
            this.state.selectOptions = this.state.selectOptions.filter((v) => {
                return this.state.allottedSlotsTime.map(o => {
                    return v.allotted = true && o.includes(v.value);
                })
            })
        }

        this.setState({ selectedDate: date, showTimeField: true });
    };

    handleTimeChange(time) {
        this.setState({ selectedTime: time.target.value, showReasonField: true });
    };

    handleReasonChange(e) {
        this.setState({ submitDisabled: e.target.value ? false : true, reason: e.target.value });
    }

    confirmSlot() {
        this.setState({ open: true });
    }

    disableWeekends(date) {
        return moment(date).weekday() === 0 || moment(date).weekday() === 6;
    }

    render() {
        // const slots = this.props.slots;

        return (
            <>
                <Box maxWidth="md" className="main-wrapper">
                    <main className="ulp-outer main-container">
                        <Grid container item xs={12} md={12} direction="row" className="grid-container">
                            <p className="slot-label">Schedule a call with your mentor</p>
                            <Grid container item xs={12} md={12} direction="row">
                                <Grid item xs={6} md={6}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <Grid item>
                                            <Paper style={{ overflow: "hidden", maxWidth: '400px', margin: 'auto' }}>
                                                <ThemeProvider theme={theme}>
                                                    <Calendar
                                                        date={this.state.selectedDate}
                                                        onChange={this.handleDateChange.bind(this)}
                                                        disablePast
                                                        maxDate={this.state.maxDate}
                                                        shouldDisableDate={this.disableWeekends.bind(this)} //to disable weekendds
                                                    />
                                                </ThemeProvider>
                                            </Paper>
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={6} md={6} className="input-container">
                                    <Grid item xs={12} md={12} className="input-fields">
                                        {this.state.showTimeField && (
                                            <FormControl fullWidth>
                                                <InputLabel>{'Select time'}</InputLabel>
                                                <Select
                                                    multiple={false}
                                                    disabled={false}
                                                    value={this.state.selectedTime || ''}
                                                    onChange={this.handleTimeChange.bind(this)}
                                                    style={{ textAlign: 'left' }}
                                                >
                                                    {this.state.selectOptions.map((v) => (
                                                        <MenuItem key={v.value} value={v.value} >
                                                            {(parseInt(v.label) > 12) ? (v.label + ':00 PM') : (v.label + ':00 AM')}
                                                        </MenuItem>
                                                        // disabled={v.allotted}
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} md={12} className="input-fields">
                                        {(this.state.showTimeField && this.state.showReasonField) && (
                                            <FormControl fullWidth>
                                                <TextField
                                                    required
                                                    value={this.state.reason || ''}
                                                    label="Reason"
                                                    onChange={this.handleReasonChange.bind(this)}
                                                />
                                            </FormControl>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Grid container style={{ paddingTop: 10 }} justify="flex-end">
                                            <Button
                                                size="large"
                                                color="primary"
                                                type="submit"
                                                className="confirm-btn"
                                                onClick={this.confirmSlot.bind(this)}
                                                disabled={this.state.submitDisabled}
                                            >
                                                {'Confirm'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <CssBaseline />
                    </main>
                </Box>
                {this.state.open && (
                    <ConfirmDialog
                        open
                        date={this.state.selectedDate}
                        time={this.state.selectedTime}
                        reason={this.state.reason}
                        closeModal={this.closeModal.bind(this)}
                    />
                )}
                {this.state.openErrorDialog && (
                    <ErrorDialog open closeModal={this.closeErrorModal.bind(this)} />
                )}
            </>
        );
    }

}

export default connect(({ slots }) => ({ slots }), {
    getSlotsRequest
})(DateSchedular);


