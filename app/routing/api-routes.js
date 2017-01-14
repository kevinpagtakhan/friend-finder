// The api-routes.js file should contain two routes:
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results.
// This route will also be used to handle the compatibility logic.
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var friends = require('../data/friends.js');


// showing friends data in json
module.exports = function(app) {
    app.get("/api/friends", function(request, response) {
        response.json(friends);
    });

// post route for incoming survey results
    app.post("/api/friends", function(request, response) {
        var addedFriend = request.body;

        // loop through reach fiend
        friends.forEach(function(friend) {
          // initialize accumulated difference to zero before comparing
          friend.difference = 0;

          // loop through each score
          friend.scores.forEach(function(score, index) {
            // get the difference for each matching answer
            var difference = Math.abs(score - parseInt(addedFriend.scores[index]));
            // accumulated difference
            friend.difference += difference;
          })
        })

        // sort users by difference (ascending) to index 0 will
        // have the smallest difference
        friends.sort(function(a, b){
          return a.difference - b.difference;
        })

        // push new friend to array
        friends.push(addedFriend);

        // respond with the first index of friends array (smallest difference value)
        response.json(friends[0]);

    });
}
