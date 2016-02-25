import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import configuredRadium         from 'styles/configuredRadium.js';

import { connectData }          from 'decorators/index.js';

import {
    isSearching,
    isSearchedWith,
    search
} from 'redux/modules/search/search.js';

import {
    StandardPage,
    Search,
    SearchResults
} from 'components/index.js';

const fetchData = (getState, dispatch, subscribe, location, params) => {
    const state = getState();

    if(!isSearching(state) && !isSearchedWith(state, params.query)) {
        return dispatch(search(params.query));
    }

};

@connectData(fetchData, true)
@configuredRadium
@connect(state => ({
    search: state.search
}))
export default class SearchView extends Component {

    render() {
        return (
            <StandardPage>
                <Search />
                <SearchResults />
            </StandardPage>
        );
    }
}
