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

        this.node.setAttribute('datetime', datetime.getTime ? datetime.getTime() : datetime);
        this.instance.render(this.node);
    }

    render({ datetime }) {
        return <time ref={n => this.node = n}>{this.instance.format(datetime)}</time>;
    }
}

module.exports = TimeAgo;
