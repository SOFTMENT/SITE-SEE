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

const algoliaClient = algoliasearch(
    '5ZDNXVM8M8',
    '9265d931a90114d65a5d0543a494cf44'
);
let firstLoad = true
const searchClient = {
    search(requests) {
        console.log(firstLoad)
      if (firstLoad === true) {
        firstLoad = false;
        return;
      }
      return algoliaClient.search(requests);
    },
  };
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
        return (
            <View style={styles.container}>
                <Header navigation={navigation} title="Search" back/>
                <View style={styles.mainView}>
                    <InstantSearch
                        searchClient={searchClient}
                        indexName="item"
                        root={this.root}
                        searchState={searchState}
                        onSearchStateChange={this.onSearchStateChange}
                    >
                        <VirtualRefinementList attribute="name" />
                        <SearchBox navigation={navigation}/>
                        <InfiniteHits navigation={navigation}/>
                    </InstantSearch>
                </View>
            </View>

        );
    }
}

export default SearchScreen;
