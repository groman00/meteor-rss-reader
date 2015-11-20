// Feed component - represents a single Feed item
Feed = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    feed: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li><a href={this.props.feed.url}>{this.props.feed.name}</a></li>
    );
  }
});