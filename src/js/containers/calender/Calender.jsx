import React, { PureComponent } from 'react';
import _ from 'lodash';
import styles from './Calender.scss';

import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import events from './BigCalender/event';
import dates from './BigCalender/dates';
require('react-big-calendar/lib/css/react-big-calendar.css');

class Calender extends PureComponent {

    render() {
        const localizer = BigCalendar.momentLocalizer(moment);

        return (
            <div className={styles.home}>
                <h1 className={styles.heading}>Welcome to the Calender!</h1>
                <div className={styles.demo}>
                    <BigCalendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                    />
                </div>
            </div>
        );
    }
}

export default Calender;
