import React, { PureComponent } from 'react';
import _ from 'lodash';
import styles from './Calender.scss';

import localizer from 'react-big-calendar/lib/localizers/moment';
import moment from 'moment';


import Basic from '../../components/calender/demos/basic';
import Selectable from '../../components/calender/demos/selectable';
import EditCalendar from '../../components/calender/demos/editCalendar';


require('react-big-calendar/lib/css/react-big-calendar.css');

const globalizeLocalizer = localizer(moment);

class Calender extends PureComponent {

    state = {
        selected: 'editCalendar'
    };


    render() {
        let selected = this.state.selected;
        let Current = { basic: Basic, selectable: Selectable, editCalendar: EditCalendar }[selected];

        return (
            <div className={styles.home}>
                <h1 className={styles.heading}>Welcome to the Calender!</h1>
                <div className={styles.demo}>
                    <Current localizer={globalizeLocalizer} />
                </div>
            </div>
        );
    }
}

export default Calender;
