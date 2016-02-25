import React, { Component }     from 'react';
import configuredRadium         from 'styles/configuredRadium.js';

import {
    StandardPage,
    Search,
    SearchResults
} from 'components/index.js';

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
