import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Dialog from 'material-ui/Dialog';

import styles from './BaseDialog.scss';
import { SimpleButton } from '../Buttons/Simple';

import CloseIcon from '../Icons/Close';

class BaseDialog extends Component {
    static propTypes = {
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        classes: PropTypes.object,
        withoutTitle: PropTypes.bool,
        withoutCloseButton: PropTypes.bool,
    };

    static defaultProps = {
        title: '',
        classes: {},
        withoutTitle: false,
        withoutCloseButton: false,
    };

    render() {
        const { children, title, onClose, classes, withoutTitle, withoutCloseButton, ...restProps } = this.props;

        return (
            <Dialog
                classes={{
                    root: classnames(
                        styles.dialog,
                        { [classes.root]: classes.root }
                    ),
                    paper: classnames(
                        styles.paper,
                        { [classes.paper]: classes.paper }
                    ),
                }}
                onClose={onClose}
                {...restProps}
            >
                {!withoutCloseButton &&
                <SimpleButton
                    className={styles.close}
                    onClick={onClose}
                >
                    <CloseIcon/>
                </SimpleButton>}
                <div className={styles.content}>
                    {!withoutTitle &&
                    <div className={styles.header}>
                        {title &&
                        <h1 className={styles.title}>{this.props.title || 'Title'}</h1>}
                    </div>}
                    <div className={
                        classnames(
                            styles.body,
                            { [classes.body]: classes.body }
                        )
                    }>
                        {children}
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default BaseDialog;
