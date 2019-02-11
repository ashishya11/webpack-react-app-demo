import React, { PureComponent } from 'react';
import _ from 'lodash';
import styles from './Home.scss';

class Home extends PureComponent {
    render() {
        return (
            <div className={styles.home}>
                <div className={styles.heading}>
                    <h1>Welcome to the HomePage!</h1>
                    <a href={'/testing'}>Go to the Calendar</a>
                </div>
            </div>
        );
    }
}

export default Home;
