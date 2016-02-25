import React                from 'react';
import configuredRadium     from 'styles/configuredRadium.js';

import { compose, media }   from 'styles/compositions.js';
import { measures }         from 'styles/definitions.js';

const resultItemStyle = compose({
    padding:    measures.standard
}, media);

const imageStyle = {
    float:          'left',
    width:          '8em',
    marginRight:    measures.standard
};

const ResultItem = (props) => {
    return (
        <article style={ resultItemStyle }>
            <img style={ imageStyle } src={ props.item.Poster } />
            <h4>{ props.item.Title }</h4>
        </article>
    );
};

export default configuredRadium(ResultItem);
