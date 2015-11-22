// App component - represents the whole app
App = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            feeds: Feeds.find({}).fetch(),
            user: Meteor.user()
        }
    },

    renderFeeds() {
        return this.data.feeds.map((feed) => {
            return <Feed key={feed._id} feed={feed} />;
        });
    },

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        var name = ReactDOM.findDOMNode(this.refs.name).value.trim();
        var url = ReactDOM.findDOMNode(this.refs.url).value.trim();

        Feeds.insert({
            name: name,
            url: url
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.name).value = "";
        ReactDOM.findDOMNode(this.refs.url).value = "";

        alert('feed added!');
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
                <ul>
                    {this.renderFeeds()}
                </ul>
            </div>
        );
    }
});






