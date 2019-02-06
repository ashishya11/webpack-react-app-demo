import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router';

import HomeRouteHandler from '../views/home/index';

const styles = require('../../style/Style.scss');

module.exports = (
    <div className={styles.container}>
        <main className={styles.content}>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={HomeRouteHandler}
                />
            </Switch>
        </main>
    </div>
);