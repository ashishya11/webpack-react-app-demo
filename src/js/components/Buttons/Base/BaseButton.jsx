import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'material-ui/ButtonBase';
import classnames from 'classnames';

import styles from './BaseButton.scss';

class BaseButton extends Component {
    static propTypes = {
        className: PropTypes.string,
        linkClassName: PropTypes.string,
        size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'full']),
        height: PropTypes.oneOf(['thin', 'default']),
        color: PropTypes.oneOf(['primary', 'danger', 'default', 'secondary', 'blue', 'paypal']),
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        linkProps: PropTypes.object,
    };

    static defaultProps = {
        className: '',
        color: 'default',
        size: 'medium',
        height: 'default',
        to: undefined,
        linkProps: {},
        linkClassName: undefined,
    };

    render() {
        const { className, color, size, height, to, linkProps, linkClassName, ...restProps } = this.props;

        const buttonClassName = classnames(
            styles.btn,
            { [styles[`color-${color}`]]: color },
            { [styles[`size-${size}`]]: size },
            { [styles[`height-${height}`]]: height },
            { [className]: Boolean(className) },
        );

        if (to) {
            const link = classnames(
                styles.link,
                { [linkClassName]: Boolean(linkClassName) },
            );

            return (
                <Link to={to} className={link} draggable={false} {...linkProps}>
                    <Button
                        className={buttonClassName}
                        {...restProps}
                    />
                </Link>
            );
        }

        return (<Button className={buttonClassName} {...restProps}/>);
    }
}

export default BaseButton;
