import React, { Component } from 'react';
import { connect }          from 'react-redux';
import configuredRadium     from 'styles/configuredRadium.js';

import { search }           from 'redux/modules/search/search.js';

import { join, coloredBorder }          from 'styles/compositions.js';
import { measures, display, colors }    from 'styles/definitions.js';

const searchContainerStyle = {
    width:          measures.fullWidth,
    margin:         measures.standard,
    borderRadius:   measures.onePixel,
    border:         coloredBorder(colors.black),
    padding:        join(measures.zero, measures.half)
};

const searchInputStyle = {
    border:     display.none,
    width:      measures.fullWidth,
    lineHeight: measures.double,
    fontSize:   measures.standard,
    ':focus': {
        outline: display.none
    }
};

@configuredRadium
@connect((state) => ({
    search: state.search
}), { search })
export default class Search extends Component {

    doSearch = (event) => {
        event.preventDefault();
        const query = document.getElementById('q');
        this.props.search(query.value);
    };

    render() {
        return (
            <form style={ searchContainerStyle } onSubmit={ this.doSearch }>
                <input type="text" name="q" id="q" style={ searchInputStyle } />
            </form>
        );
    }
}
