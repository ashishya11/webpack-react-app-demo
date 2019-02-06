import React, { PureComponent } from 'react';
import _ from 'lodash';
import styles from './Home.scss';

class Home extends PureComponent {
    render() {
        return (
            <div className={styles.home}>
                <h1 className={styles.heading}>Welcome to the HomePage!</h1>
            </div>
        );
    }
}

export default Home;
