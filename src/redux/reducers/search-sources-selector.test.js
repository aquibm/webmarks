import { expect } from 'chai';
import uniqid from 'uniqid';

import searchSourcesSelector from './search-sources-selector';
import * as actions from '../actions/search-sources-selector';


describe('search-sources-selector reducer spec', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            allSources: [],
            selectedSources: [],
        };
    });

    it('should initialize with dummy data', () => {
        const addSourceAction = actions.addSource('http://www.reddit.com');

        const state = searchSourcesSelector(undefined, addSourceAction);

        // Check that we initialized with dummy data.
        expect(state.allSources.length).to.be.above(1);
    });

    it('should be able to add new sources', () => {
        const source = 'http://www.google.com';
        const addSourceAction = actions.addSource(source);

        const state = searchSourcesSelector(initialState, addSourceAction);

        expect(state.allSources.length).to.equal(1);
        expect(state.allSources[0].name).to.equal(source);
    });

    it('should automatically select sources when they are added', () => {
        const source = 'http://www.google.com';
        const addSourceAction = actions.addSource(source);

        const state = searchSourcesSelector(initialState, addSourceAction);

        expect(state.selectedSources.length).to.equal(1);
        expect(state.selectedSources[0].name).to.equal(source);
    });

    it('should be able to select a source', () => {
        const source = {
            id: uniqid(),
            name: 'http://www.bing.com',
            indexed: true
        };
        const selectSourceAction = actions.selectSource(source.id);
        initialState.allSources.push(source);

        const state = searchSourcesSelector(initialState, selectSourceAction);

        expect(state.allSources.length).to.equal(1);
        expect(state.selectedSources.length).to.equal(1);
        expect(state.selectedSources[0].name).to.equal(source.name);
    });

    it('?', () => {
        const source = {
            id: uniqid(),
            name: 'http://www.bing.com',
            indexed: true
        };
        const selectSourceAction = actions.selectSource(source.id);
        initialState.allSources.push(source);

        let state = searchSourcesSelector(initialState, selectSourceAction);
        state = searchSourcesSelector(state, selectSourceAction);

        // TODO(AM): Should not let it select twice.
        console.log(state);
    });

    it('should be able to deselect a source', () => {

    });

    it('should be able to remove a source', () => {

    });
});