import React from 'react';
import {
    View
} from 'react-native';

import algoliasearch from 'algoliasearch';
import {
    connectRefinementList, InstantSearch
} from 'react-instantsearch-native';
import InfiniteHits from './components/InfiniteHits';
import SearchBox from './components/SearchBox';
import styles from './styles';
import Header from '../../components/Header';
import { connect } from 'react-redux';

const algoliaClient = algoliasearch(
    'MOMHBUJFM8',
    '110bf4874cab087690527dec42643d51'
);
let firstLoad = true

const VirtualRefinementList = connectRefinementList(() => null);

class SearchScreen extends React.Component {
    root = {
        Root: View,
        props: {
            style: {
                flex: 1,
            },
        },
    };

    state = {
        isModalOpen: false,
        searchState: {},
    };
    componentWillUnmount = () =>{
        firstLoad=true
    }
    toggleModal = () =>
        this.setState(({ isModalOpen }) => ({
            isModalOpen: !isModalOpen,
        }));

    onSearchStateChange = searchState =>
        this.setState(() => ({
            searchState,
        }));
    
    render() {
        const { isModalOpen, searchState } = this.state;
        const {route, navigation} = this.props
        const {currentPosition} = route.params
        const searchClient = {
            search(requests) {
                console.log(firstLoad)
              if (firstLoad === true) {
                firstLoad = false;
                return;
              }
              return algoliaClient.search(requests,
            //     {
            //     aroundLatLng: `${currentPosition.latitude}, ${currentPosition.longitude}`,
            //     aroundRadius: 1000000 // 1,000 km
            //   }
              );
            }
        }
        return (
            <View style={styles.container}>
                <Header navigation={navigation} title="Search" back/>
                <View style={styles.mainView}>
                    <InstantSearch
                        searchClient={searchClient}
                        indexName="title"
                        root={this.root}
                        searchState={searchState}
                        onSearchStateChange={this.onSearchStateChange}
                    >
                        <VirtualRefinementList attribute="title" />
                        <SearchBox navigation={navigation}/>
                        <InfiniteHits navigation={navigation}/>
                    </InstantSearch>
                </View>
            </View>

        );
    }
};
export default SearchScreen;
