import React, { Component }     from 'react';
import configuredRadium         from 'styles/configuredRadium.js';

import {
    StandardPage,
    Search
} from 'components/index.js';

import SearchResults from './SearchResults/SearchResults.jsx';

@configuredRadium
export default class Frontpage extends Component {

    render() {
        return (
            <StandardPage>
                <Search />
                <SearchResults />
            </StandardPage>
        );
    }
}
