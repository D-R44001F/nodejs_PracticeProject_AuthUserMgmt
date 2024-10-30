const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
  res.send(JSON.stringify(friends, null, 4));
});

// GET by specific ID request: Retrieve a single friend with email ID
// THIS IS WITHOUT FILTER METHOD
router.get("/:email",(req,res)=>{
    // Request email
    const email = req.params.email;
    
    // response
    res.send(friends[email]);
});


// POST request: Add a new friend
router.post("/",(req,res)=>{
    // Check if email is provided
    if (req.params.email){
        // Create or update friends's details based on provided email
        friends[req.body.email] = {
            "firstName": req.params.firstName,
            "lastName": req.params.lastName,
            "DOB": req.params.DOB
        };
    }

    res.send("The user " + (' ') + (req.body.firstName) + " Has been added.");

});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
    // Extract email parameter from request URL
    const email = req.params.email;
    let friend = friends[email]; // retrieve friend object 

    if (friend){ // check if frend exists
        let DOB = req.body.DOB;              // Retrieving
        let firstName = req.body.firstName;  // existing
        let lastName = req.body.lastName;    // parameters

        // updating existing parameters
        if (DOB){
            friend["DOB"] = DOB;
        }
        if (firstName){
            friend["firstName"] = firstName;
        }
        if (lastName){
            friend["lastName"] = lastName;
        }

        friends[email] = friend; // update friend details
        res.send(`Friend with the email ${email} updated.`);

    } else {
        // If not found
        res.send("Unable to find friend.");
    }

});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
    // request email from the user
    const email = req.params.email;

    // check if email is provided
    if (email){
        // delete
        delete friends[email];
    }
    
    // Response
    res.send(`Friend with email ${email} removed.`);

});

module.exports=router;
