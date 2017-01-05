const assert = require('assert');

const { h, render } = require('preact');
const timeago = require('timeago.js');

const TimeAgo = require('./timeago.js');

describe('TimeAgo', () => {
    let datetime, rendered;

    const renderWith = props => render(h(TimeAgo, props), document.body);

    before(() => {
        // https://github.com/tmpvar/jsdom/pull/1445
        global.SVGElement = () => {};
        datetime = new Date();
        rendered = renderWith({ 'class': 'test-timeago', datetime });
    });

    it('contains a reference to the timeago.js instance', () => {
        assert.equal(rendered._component.instance.constructor, timeago().constructor);
    });

    it('propagates class to <time> element', () => {
        assert(document.querySelector('time').classList.contains('test-timeago'));
    });

    it('can live update', done => {
        rendered = renderWith({ 'class': 'test-timeago', datetime, live: true });
        assert(document.querySelector('time').textContent, 'just now');
        setTimeout(() => {
            assert(document.querySelector('time').textContent, '1 second ago');
            done();
        }, 1000);
    });

    after(() => {
        document.body.innerHTML = '';
    });
});
