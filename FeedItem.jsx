// Feed Item component
FeedItem = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    render() {
        console.log(this);
        return (
            <a href={this.props.item.link} target="_blank">{this.props.item.title} - {this.props.item.author}</a>
        );
    }
});