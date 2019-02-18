import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../../../containers/calender/BigCalender/event';
import { format } from 'date-fns';
import { BaseDialog } from '../../Base';
import { TextField } from '../../TextField';
import { BaseButton } from '../../Buttons/Base';
import styles from '../../../../style/main.scss';

const propTypes = {}

class Selectable extends React.Component {
    constructor(...args) {
        super(...args)

        this.state = {
            events: events,
            showModel: false,
            handleModel: false,
            title: '',
            start: '',
            end: '',
            viewEvent: '',
            startTime: '',
            endTime: '',
            temp: '',
        }
    }

    formatTimeDisplay = (date, defaultText) => {
        if (!date) return defaultText;
        return format(date, 'hh:mm a');
    }

    formatDateDisplay = (date, defaultText) => {
        if (!date) return defaultText;
        return format(date, 'DD/MM/YYYY');
    }

    handleClose = () => {
        this.setState({
            handleModel: false
        })
    }

    handleOpen = ({ start, end }) => {
        this.setState({
            handleModel: true,
            start: start,
            end: end,
            startTime: this.formatTimeDisplay(start),
            endTime: this.formatTimeDisplay(end),
        })
    }

    addEvent = () => {
        const start = new Date();
        const end = new Date();
        this.setState({
            handleModel: true,
            start: start,
            end: end,
            startTime: this.formatTimeDisplay(start),
            endTime: this.formatTimeDisplay(end),
        })
    }

    handleInputChange = key => e => {
        let inputValue = e.target.value;
        this.setState({
            [`${key}`]: inputValue,
        });
    };

    handleInputTimeChange = key => e => {
        this.setState({
            [`${key}Time`]: e.target.value,
        });
    }

    dateTimeBindingFormation = (date, time) => {
        let newDate = date;
        const YYYY = newDate.getFullYear();
        const DD = newDate.getDate();
        const MM = newDate.getMonth();
        let Time = time;
        let hh, mm;
        if (Time.search("am") !== -1) {
            time = time.split(':');
            if (Time === "12:00 am") {
                hh = '00';
            } else {
                hh = time[0];
            }
            mm = time[1].substring(0, 2);
        } else {
            time = time.split(':');
            if (Time === "12:00 pm") {
                hh = '12';
            } else {
                hh = parseInt(time[0]) + 12;
            }
            mm = time[1].substring(0, 2);
        }
        newDate = new Date(YYYY, MM, DD, hh, mm, 0, 0);
        return newDate;
    }

    createEvent = () => {
        const month = this.state.start.getMonth();
        const title = this.state.title;
        const start = this.dateTimeBindingFormation(this.state.start, this.state.startTime);
        const end = this.dateTimeBindingFormation(this.state.end, this.state.endTime);
        if (title)
            this.setState({
                events: [
                    ...this.state.events,
                    {
                        start,
                        end,
                        title,
                    },

                ],
                temp: month,
            }, () => {
                this.setState({
                    handleModel: false,
                    title: '',
                    start: '',
                    end: '',
                })
            })
    }

    showEvent = (event) => {
        this.setState({
            viewEvent: event,
            showModel: true,
        })
    }

    handleShowModelClose = () => {
        this.setState({
            showModel: false
        })
    }

    eevent = (event) => {
        debugger
        console.log(event);
        const month = event.getMonth();
        let start = new Date();
        start = start.setFullYear(event.getFullYear());
        start = new Date(start);
        start = start.setMonth(event.getMonth());
        start = new Date(start);
        let end = new Date();
        end = end.setFullYear(event.getFullYear());
        end = new Date(end);
        end = end.setMonth(event.getMonth());
        end = new Date(end);
        const title = "temporary Event";
        if (this.state.temp > month && month === 0) {
            this.setState({
                events: [
                    ...this.state.events,
                    {
                        start,
                        end,
                        title,
                    },
                ],
                temp: month,
            })
        } else if (this.state.temp < month) {
            this.setState({
                events: [
                    ...this.state.events,
                    {
                        start,
                        end,
                        title,
                    },
                ],
                temp: month,
            })
        }
    }

    render() {
        const { localizer } = this.props
        return (
            <div>
                <div className={styles.addBtn}>
                    <BaseButton
                        height="thin"
                        size="tiny"
                        color="primary"
                        onClick={this.addEvent}
                    > Add
                    </BaseButton>
                </div>
                <BigCalendar
                    selectable
                    localizer={localizer}
                    events={this.state.events}
                    defaultView={BigCalendar.Views.MONTH}
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    onSelectEvent={event => this.showEvent(event)}
                    onSelectSlot={this.handleOpen}
                    onNavigate={event => this.eevent(event)}
                    style={{ height: 'calc(100vh - 165px)' }}
                />
                <BaseDialog open={this.state.handleModel} onClose={this.handleClose}>
                    <div className={styles.formEvent}>
                        <h3>Add Event</h3>
                        <div className={styles.eventName}>
                            <TextField
                                autoFocus
                                type="text"
                                value={this.state.title}
                                placeholder={'New Event Name'}
                                onChange={this.handleInputChange('title')}
                            />
                        </div>
                        <div className={styles.eventTimeSlot}>
                            <div className={styles.eventStartTime}>
                                <TextField
                                    type="text"
                                    value={this.state.startTime}
                                    placeholder={'Start Event Time'}
                                    onChange={this.handleInputTimeChange('start')}
                                />
                            </div>
                            <div className={styles.eventEndTime}>
                                <TextField
                                    type="text"
                                    value={this.state.endTime}
                                    placeholder={'End Event Time'}
                                    onChange={this.handleInputTimeChange('end')}
                                />
                            </div>
                        </div>
                        <div className={styles.submitBtn}>
                            <BaseButton
                                height="thin"
                                size="tiny"
                                color="primary"
                                onClick={this.createEvent}
                            > Submit
                            </BaseButton>
                        </div>
                    </div>
                </BaseDialog>
                <BaseDialog open={this.state.showModel} onClose={this.handleShowModelClose}>
                    <div style={{ textAlign: 'justify', minHeight: 70 }}>
                        <h3>Event-Name :- {this.state.viewEvent.title}</h3>
                        <div className={styles.showEventStartTime}>
                            <TextField
                                disabled
                                value={this.formatDateDisplay(this.state.viewEvent.start)}
                            />
                        </div>
                        <div className={styles.showEventEndTime}>
                            <TextField
                                disabled
                                value={this.formatDateDisplay(this.state.viewEvent.end)}
                            />
                        </div>
                        <div className={styles.showEventStartTime}>
                            <TextField
                                disabled
                                value={this.formatTimeDisplay(this.state.viewEvent.start)}
                            />
                        </div>
                        <div className={styles.showEventEndTime}>
                            <TextField
                                disabled
                                value={this.formatTimeDisplay(this.state.viewEvent.end)}
                            />
                        </div>
                    </div>
                </BaseDialog>
            </div>
        )
    }
}

Selectable.propTypes = propTypes

export default Selectable
