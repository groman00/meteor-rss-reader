// App component - represents the whole app
App = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    getMeteorData() {

        var userFeeds = UserFeeds.find({userId:Meteor.userId()}).fetch();
        var feedIds = userFeeds.map(function(feed) { 
            return feed.feedId; 
        });

        //attach feed data to user each user feed
        Feeds.find({_id:{$in:feedIds}}).map(function(doc, i, collection){
            userFeeds[i].url = doc.url;
        });

        return {
            feeds: userFeeds,
            user: Meteor.user()
        }
    },

    renderFeeds() {
        return this.data.feeds.map((feed) => {
            return <Feed key={feed._id} feed={feed} />;
        });
    },

    handleSubmit(e) {
        e.preventDefault();

        var name = ReactDOM.findDOMNode(this.refs.name).value.trim();
        var url = ReactDOM.findDOMNode(this.refs.url).value.trim();

        //Insert into general feed collection
        //"url" is indexed to be unique
        Feeds.insert({
            url: url
        }, function(error, feedId){
            
            //console.log('inserted', arguments);
        
            if(!!error){
                feedId = Feeds.findOne({'url': url})._id;
            }

            //insert feed for this user
            UserFeeds.insert({
                createdAt: new Date(),
                name: name, 
                userId: Meteor.userId(),
                feedId: feedId
            });


        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.name).value = "";
        ReactDOM.findDOMNode(this.refs.url).value = "";
    },

    render() {

        //logged out view
        if(!Meteor.user()){

            return (

                <div className="container">
                    <header>
                        <h1>Feed List</h1>
                        <AccountsUIWrapper />
                    </header>
                </div>

            );
        }

        //logged in view
        return (
            <div className="container">
                <header>
                    <h1>Feed List</h1>
                    <AccountsUIWrapper />
                    <form className="new-feed" onSubmit={this.handleSubmit}>
                        <input type="text" ref="name" placeholder="Feed Name" required />
                        <input type="url" ref="url" placeholder="Feed URL" required />
                        <button type="submit">Add Feed</button>
                    </form>                    
                </header>
                <div className="feeds">
                    <ul>
                        {this.renderFeeds()}
                    </ul>
                </div>
                <div id="feedItemList"></div>
            </div>
        );
    }
});






