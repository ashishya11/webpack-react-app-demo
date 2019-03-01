import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';
import Input from 'material-ui/Input';

import styles from './TextField.scss';

class TextField extends Component {
    static propTypes = {
        textarea: PropTypes.bool,
        classes: PropTypes.object,
        withoutFullWidth: PropTypes.bool,
        maxLength: PropTypes.number,
        error: PropTypes.any,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        blurredValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    static defaultProps = {
        classes: {},
        textarea: false,
        withoutFullWidth: false,
        maxLength: undefined,
        value: '',
        blurredValue: '',
        error: false,
    };

    state = {
        focused: false,
    };

    handleFocus = (e) => {
        this.setState({ focused: true });
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    };

    handleBlur = (e) => {
        this.setState({ focused: false });
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    };

    render() {
        const { withoutFullWidth, classes, textarea, maxLength, error, value, blurredValue, ...restProps } = this.props;
        const { focused } = this.state;
        const propRootClassName = _.get(classes, 'root', null);
        const propInputClassName = _.get(classes, 'input', null);
        const propErrorClassName = _.get(classes, 'error', null);

        return (
            <Input
                value={!focused && blurredValue ? blurredValue : value}
                fullWidth={!withoutFullWidth}
                multiline={textarea}
                classes={{
                    root: classnames(styles.root, { [propRootClassName]: propRootClassName }),
                    input: classnames(styles.input, { [propInputClassName]: propInputClassName }),
                    error: classnames(styles.error, { [propErrorClassName]: propErrorClassName }),
                }}
                inputProps={{
                    maxLength,
                }}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                error={Boolean(error)}
                {...restProps}
            />
        );
    }
}

export default TextField;
