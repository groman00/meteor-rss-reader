// Feed component
Feed = React.createClass({
    propTypes: {
        feed: React.PropTypes.object.isRequired
    },
    handleClick: function(e){
        e.preventDefault();
        
        console.log(this);

        $.ajax({
            type: "GET",
            url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=" + this.props.feed.url,
            dataType: "jsonp",
            success: function( data ) {
                ReactDOM.render(
                    <FeedItemList items={data.responseData.feed.entries} />, 
                    document.getElementById("feedItemList")
                );              
            }.bind(this)
        });
    
    },
    render() {
        return (
            <li><a onClick={this.handleClick} href={this.props.feed.url}>{this.props.feed.name}</a></li>
        );
    }
});