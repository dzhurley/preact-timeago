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

        if (!this.node || (live === false)) return;

        // When used in combination with jsdom for headless testing, we need to ensure that
        // `dataset` exists on the node until https://github.com/tmpvar/jsdom/issues/961 is
        // resolved, as under the covers timeago.js checks `dataset` before `getAttribute`.
        //
        // TODO: pull request timeago.js to reorder checks on `getAttribute`/`dataset`.
        if (typeof this.node.dataset == 'undefined') {
            this.node.dataset = {};
        }

        this.node.setAttribute('datetime', datetime.getTime ? datetime.getTime() : datetime);
        this.instance.render(this.node);
    }

    render({ datetime }) {
        return <time ref={n => this.node = n}>{this.instance.format(datetime)}</time>;
    }
}

module.exports = TimeAgo;
