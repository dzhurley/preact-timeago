const { h, Component } = require('preact');
const timeago = require('timeago.js');

class TimeAgo extends Component {
    componentWillMount() {
        this.instance = timeago();
    }

    componentDidMount() {
        this.renderTimeAgo();
    }

    componentDidUpdate() {
        this.renderTimeAgo();
    }

    componentWillUnmount() {
        this.instance.cancel();
    }

    renderTimeAgo() {
        const { datetime, live=false } = this.props;

        this.instance.cancel();

        if (!this.base || (live === false)) return;

        // When used in combination with jsdom for headless testing, we need to ensure that
        // `dataset` exists on the base until https://github.com/tmpvar/jsdom/issues/961 is
        // resolved, as under the covers timeago.js checks `dataset` before `getAttribute`.
        //
        // TODO: pull request timeago.js to reorder checks on `getAttribute`/`dataset`.
        if (typeof this.base.dataset == 'undefined') {
            this.base.dataset = {};
        }

        this.base.setAttribute('datetime', datetime.getTime ? datetime.getTime() : datetime);
        this.instance.render(this.base);
    }

    render(props) {
        return h('time', { 'class': props.class }, this.instance.format(props.datetime));
    }
}

module.exports = TimeAgo;
