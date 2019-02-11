import React from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import DatePicker from "react-datepicker";
import events from '../../../containers/calender/BigCalender/event';
import { format } from 'date-fns';
import { BaseDialog } from '../../Base';
import { TextField } from '../../TextField';
import { BaseButton } from '../../Buttons/Base';
import styles from '../../../../style/main.scss';

require("react-datepicker/dist/react-datepicker.css");

const propTypes = {}

class Selectable extends React.Component {
    constructor(...args) {
        super(...args)

        this.state = {
            events: events,
            handleModel: false,
            title: '',
            start: '',
            end: '',
        }
    }

    formatDateDisplay = (date, defaultText) => {
        if (!date) return defaultText;
        return format(date, 'hh:mm a');
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
            end: end
        })
    }

    handleInputChange = key => e => {
        let inputValue = e.target.value;
        this.setState({
            [`${key}`]: inputValue,
        }, () => {
            console.log('State', this.state);
        });

    };

    createEvent = () => {
        // const title = window.prompt('New Event name')
        const title = this.state.title;
        const start = this.state.start;
        const end = this.state.end;
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
            }, () => {
                this.setState({
                    handleModel: false,
                    title: '',
                    start: '',
                    end: '',
                })
            })
    }

    showEvent = (title) => {
        <BaseDialog open={true}>
            <div>{title}</div>
        </BaseDialog>
    }

    render() {
        const { localizer } = this.props
        return (
            <div>
                <BigCalendar
                    selectable
                    localizer={localizer}
                    events={this.state.events}
                    defaultView={BigCalendar.Views.MONTH}
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    onSelectEvent={event => console.log(event)}
                    onSelectSlot={this.handleOpen}
                    style={{ height: 'calc(100vh - 140px)' }}
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
                                    disabled
                                    type="text"
                                    value={this.formatDateDisplay(this.state.start)}
                                    placeholder={'Start Event Time'}
                                    onChange={this.handleInputChange('start')}
                                />
                            </div>
                            <div className={styles.eventEndTime}>
                                <TextField
                                    disabled
                                    type="text"
                                    value={this.formatDateDisplay(this.state.end)}
                                    placeholder={'End Event Time'}
                                    onChange={this.handleInputChange('end')}
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
            </div>
        )
    }
}

Selectable.propTypes = propTypes

export default Selectable
