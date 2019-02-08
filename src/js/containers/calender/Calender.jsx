import React, { PureComponent } from 'react';
import _ from 'lodash';
import styles from './Calender.scss';

import localizer from 'react-big-calendar/lib/localizers/moment';
import moment from 'moment';


import Basic from '../../components/calender/demos/basic';


require('react-big-calendar/lib/css/react-big-calendar.css');

const globalizeLocalizer = localizer(moment);

class Calender extends PureComponent {

    state = {
        selected: 'basic',
        events: [
            {
                start: new Date(),
                end: new Date(moment().add(1, "days")),
                title: "Some title"
            }
        ]
    };


    render() {
        let selected = this.state.selected;
        let Current = { basic: Basic }[selected];

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
