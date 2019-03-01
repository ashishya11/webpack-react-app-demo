import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'material-ui/ButtonBase';
import classnames from 'classnames';

import styles from './SimpleButton.scss';

class SimpleButton extends Component {
    static propTypes = {
        className: PropTypes.string,
        linkClassName: PropTypes.string,
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    };

    static defaultProps = {
        className: '',
        to: undefined,
        linkClassName: undefined,
    };

    render() {
        const { className, to, linkClassName, ...restProps } = this.props;

        const buttonClassName = classnames(
            styles.btn,
            { [className]: Boolean(className) },
        );

        if (to) {
            const link = classnames(
                styles.link,
                { [linkClassName]: Boolean(linkClassName) },
            );

            return (
                <Link to={to} className={link} draggable={false}>
                    <Button className={buttonClassName} {...restProps}/>
                </Link>
            );
        }

        return (<Button className={buttonClassName} {...restProps}/>);
    }
}

export default SimpleButton;
