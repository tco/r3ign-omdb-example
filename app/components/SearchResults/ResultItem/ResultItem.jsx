import React                from 'react';
import { connect }          from 'react-redux';
import configuredRadium     from 'styles/configuredRadium.js';

import { compose, media }   from 'styles/compositions.js';
import { measures }         from 'styles/definitions.js';

import { loadDetails }      from 'redux/modules/details/details.js';

import ResultMeta           from './ResultMeta.jsx';

const resultItemStyle = compose({
    padding:    measures.standard
}, media);

const imageStyle = {
    float:          'left',
    width:          '8em',
    marginRight:    measures.standard
};

const mapStateToProps = state => ({ details: state.details });
const mapActionsToProps = (dispatch) => ({
    loadMetaDetails: (imdbID) => {
        dispatch(loadDetails(imdbID));
    }
});

const ResultItem = (props) => {

    const loadMeta = (event) => {
        event.preventDefault();
        props.loadMetaDetails(props.item.imdbID);
    };

    return (
        <article style={ resultItemStyle }>
            <img style={ imageStyle } src={ props.item.Poster } />
            <h4>{ props.item.Title }</h4>
            {(function renderDetails(details) {
                const meta = details[props.item.imdbID];
                if(meta) {
                    return <ResultMeta meta={ meta } />;
                }
                return <a href="#" onClick={ loadMeta }>Get Details</a>;
            }(props.details))}

        </article>
    );
};

export default connect(mapStateToProps, mapActionsToProps)(configuredRadium(ResultItem));
