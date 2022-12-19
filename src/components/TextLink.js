import React from 'react';
import { Link } from 'react-router-dom';

const TextLink = ({ text, to }) => {
    return (
        <Link to={to}>
            <span className="text-blue-500 hover:font-semibold">{ text }</span>
        </Link>
    );
};

export default TextLink;