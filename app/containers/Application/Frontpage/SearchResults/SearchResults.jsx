import React            from 'react';
import { connect }      from 'react-redux';
import configuredRadium from 'styles/configuredRadium.js';

import { measures }     from 'styles/definitions.js';

import ResultItem       from './ResultItem/ResultItem.jsx';

const mapStateToProps = state => ({ search: state.search });

const searchResultContainerStyle = {
    padding: measures.standard
};

const SearchResults = (props) => {
    return (
        <section style={ searchResultContainerStyle }>
            {(function renderResults(search) {
                if(search.Search && search.Search.length > 0) {
                    return search.Search.map((item) => {
                        return <ResultItem item={ item } />;
                    });
                }
                return 'No results';
            }(props.search))}
        </section>
    );
};

export default connect(mapStateToProps)(configuredRadium(SearchResults));
