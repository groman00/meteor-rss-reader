FeedItemList = React.createClass({
    //propTypes: {
        //item: React.PropTypes.object.isRequired
    //},
    /*getInitialState : function() {
        return {
            items: []
        };
    },*/   
    renderFeedItems() {
        return this.props.items.map((item) => {
            return <FeedItem key={item.link} item={item} />;
        });
    },     
    render() {
        return (
            <ul>
                {this.renderFeedItems()}
            </ul>
        );
    }
});