

//Collection of RSS Feeds
Feeds = new Mongo.Collection("feeds");



if (Meteor.isClient) {
  // This code is executed on the client only

    //var hasStarted = false;

    // function render(){
    //     ReactDOM.render(<App />, document.getElementById("render-target"));
    // };

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });

  /*  Tracker.autorun(function() {
        
        if (Meteor.userId()) {
            console.log('user logged in');
            console.log(Session);
        }else{
            console.log('user logged out');
        }

console.log(Session);
        //should it use react component set state instead???
        // if(hasStarted){
        //     render();
        // }
        
       
    });*/


    Meteor.startup(function () {
        // Use Meteor.startup to render the component after the page is ready
        ReactDOM.render(<App />, document.getElementById("render-target"));
    });
}