import React from 'react';
import Checkbox from 'rc-checkbox';
import BigCalendar from 'react-big-calendar';
import events from '../../../containers/calender/BigCalender/event';
import { format } from 'date-fns';
import { BaseDialog } from '../../Base';
import { TextField } from '../../TextField';
import { BaseButton } from '../../Buttons/Base';
import styles from '../../../../style/main.scss';
import 'rc-checkbox/assets/index.css';

const propTypes = {}

class Selectable extends React.Component {
    constructor(...args) {
        super(...args)

        this.state = {
            events: events,
            showModel: false,
            handleModel: false,
            repeated: false,
            title: '',
            start: '',
            end: '',
            duration: '',
            viewEvent: '',
            startTime: '',
            endTime: '',
            temp: '',
            selectedWeek: {
                mon: false,
                tue: false,
                wed: false,
                thu: false,
                fri: false,
                sat: false,
                sun: false,
            }
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

    onChange = (e) => {
        // console.log('Checkbox checked:', (e.target.checked));
        this.setState({
            repeated: e.target.checked
        })
    }

    handleCheckBox = key => e => {
        debugger
        const day = `${key}`;
        // console.log('Checkbox checked:', (e.target.checked));
        this.setState(currentState => {
            const { selectedWeek } = currentState;
            selectedWeek[`${key}`] = e.target.checked;
            return currentState;
        }, () => {
            console.log(this.state);
        });
    }

    render() {
        const { localizer } = this.props
        const { repeated, selectedWeek } = this.state;
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
                <BaseDialog open={true} title={<u>Select the Appointment Style</u>}>
                    <div className={styles.repeatedDayOption}>
                        <div className={styles.repeatedDayOptionName}>
                            Duration
                        </div>
                        <div style={{ width: '50%', display: 'inline-flex' }}>
                            <TextField
                                type="text"
                                value={this.state.duration}
                                placeholder={'Time Duration'}
                                onChange={this.handleInputTimeChange('duration')}
                            />
                        </div>
                    </div>
                    <div className={styles.repeatedDayOption}>
                        <div className={styles.repeatedDayOptionName}>
                            Repeated Days
                        </div>
                        <div className={styles.repeatedDayOptionValue}>
                            <Checkbox
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    {repeated &&
                        <div>
                            <hr />
                            <div className={styles.repetedDaySelectionForm}>
                                <div className={styles.dayName}>Monday</div>
                                <div className={styles.dayNameValue}>
                                    <Checkbox
                                        onChange={this.handleCheckBox('mon')}
                                    />
                                </div>
                            </div>
                            {selectedWeek.mon &&
                                <div style={{ marginBottom: '5px' }}>
                                    <div className={styles.fromTime}>
                                        <TextField
                                            type="text"
                                            value={this.state.duration}
                                            placeholder={'Time Duration'}
                                            onChange={this.handleInputTimeChange('duration')}
                                        />
                                    </div>
                                    <div className={styles.toTime}>
                                        <TextField
                                            type="text"
                                            value={this.state.duration}
                                            placeholder={'Time Duration'}
                                            onChange={this.handleInputTimeChange('duration')}
                                        />
                                    </div>
                                </div>}
                            <div className={styles.repetedDaySelectionForm}>
                                <div className={styles.dayName}>Tuesday</div>
                                <div className={styles.dayNameValue}>
                                    <Checkbox
                                        onChange={this.handleCheckBox('tue')}
                                    />
                                </div>
                            </div>
                            {selectedWeek.tue &&
                                <div style={{ marginBottom: '5px' }}>
                                    <div className={styles.fromTime}>
                                        <TextField
                                            type="text"
                                            value={this.state.duration}
                                            placeholder={'Time Duration'}
                                            onChange={this.handleInputTimeChange('duration')}
                                        />
                                    </div>
                                    <div className={styles.toTime}>
                                        <TextField
                                            type="text"
                                            value={this.state.duration}
                                            placeholder={'Time Duration'}
                                            onChange={this.handleInputTimeChange('duration')}
                                        />
                                    </div>
                                </div>}
                            <div className={styles.repetedDaySelectionForm}>
                                <div className={styles.dayName}>Wednesday</div>
                                <div className={styles.dayNameValue}>
                                    <Checkbox
                                        onChange={this.handleCheckBox('wed')}
                                    />
                                </div>
                            </div>
                            {selectedWeek.wed &&
                                <div style={{ marginBottom: '5px' }}>
                                    <div className={styles.fromTime}>
                                        <TextField
                                            type="text"
                                            value={this.state.duration}
                                            placeholder={'Time Duration'}
                                            onChange={this.handleInputTimeChange('duration')}
                                        />
                                    </div>
                                    <div className={styles.toTime}>
                                        <TextField
                                            type="text"
                                            value={this.state.duration}
                                            placeholder={'Time Duration'}
                                            onChange={this.handleInputTimeChange('duration')}
                                        />
                                    </div>
                                </div>}
                            <div className={styles.repetedDaySelectionForm}>
                                <div className={styles.dayName}>Thrusday</div>
                                <div className={styles.dayNameValue}>
                                    <Checkbox
                                        onChange={this.handleCheckBox('thu')}
                                    />
                                </div>
                            </div>
                            {selectedWeek.thu &&
                                <div style={{ marginBottom: '5px' }}>
                                    <div className={styles.fromTime}>
                                        <TextField
                                            type="text"
                                            value={this.state.duration}
                                            placeholder={'Time Duration'}
                                            onChange={this.handleInputTimeChange('duration')}
                                        />
                                    </div>
                                    <div className={styles.toTime}>
                                        <TextField
                                            type="text"
                                            value={this.state.duration}
                                            placeholder={'Time Duration'}
                                            onChange={this.handleInputTimeChange('duration')}
                                        />
                                    </div>
                                </div>}
                            <div className={styles.repetedDaySelectionForm}>
                                <div className={styles.dayName}>Friday</div>
                                <div className={styles.dayNameValue}>
                                    <Checkbox
                                        onChange={this.handleCheckBox('fri')}
                                    />
                                </div>
                            </div>
                            {selectedWeek.fri &&
                                <div style={{ marginBottom: '5px' }}>
                                    <div className={styles.fromTime}>
                                        <TextField
                                            type="text"
                                            value={this.state.duration}
                                            placeholder={'Time Duration'}
                                            onChange={this.handleInputTimeChange('duration')}
                                        />
                                    </div>
                                    <div className={styles.toTime}>
                                        <TextField
                                            type="text"
                                            value={this.state.duration}
                                            placeholder={'Time Duration'}
                                            onChange={this.handleInputTimeChange('duration')}
                                        />
                                    </div>
                                </div>}
                            <div className={styles.repetedDaySelectionForm}>
                                <div className={styles.dayName}>Saturday</div>
                                <div className={styles.dayNameValue}>
                                    <Checkbox
                                        onChange={this.handleCheckBox('sat')}
                                    />
                                </div>
                            </div>
                            {selectedWeek.sat &&
                                <div style={{ marginBottom: '5px' }}>
                                    <div className={styles.fromTime}>
                                        <TextField
                                            type="text"
                                            value={this.state.duration}
                                            placeholder={'Time Duration'}
                                            onChange={this.handleInputTimeChange('duration')}
                                        />
                                    </div>
                                    <div className={styles.toTime}>
                                        <TextField
                                            type="text"
                                            value={this.state.duration}
                                            placeholder={'Time Duration'}
                                            onChange={this.handleInputTimeChange('duration')}
                                        />
                                    </div>
                                </div>}
                            <div className={styles.repetedDaySelectionForm}>
                                <div className={styles.dayName}>Sunday</div>
                                <div className={styles.dayNameValue}>
                                    <Checkbox
                                        onChange={this.handleCheckBox('sun')}
                                    />
                                </div>
                            </div>
                            {selectedWeek.sun &&
                                <div style={{ marginBottom: '5px' }}>
                                    <div className={styles.fromTime}>
                                        <TextField
                                            type="text"
                                            value={this.state.duration}
                                            placeholder={'Time Duration'}
                                            onChange={this.handleInputTimeChange('duration')}
                                        />
                                    </div>
                                    <div className={styles.toTime}>
                                        <TextField
                                            type="text"
                                            value={this.state.duration}
                                            placeholder={'Time Duration'}
                                            onChange={this.handleInputTimeChange('duration')}
                                        />
                                    </div>
                                </div>}
                        </div>}
                    {!repeated &&
                        <div className={styles.calenderView}>
                            
                        </div>}
                    <div className={styles.btnSubmitRepeatedDate}>
                        <BaseButton
                            height="thin"
                            size="tiny"
                            color="primary"
                        >{'Submit'}
                        </BaseButton>
                    </div>
                </BaseDialog>
            </div>
        )
    }
}

Selectable.propTypes = propTypes

export default Selectable
