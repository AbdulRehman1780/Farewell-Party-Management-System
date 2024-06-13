const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
// Add the following line to parse JSON data
app.use(express.json());
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "leolala1234",
    database: "project",
});

const port = 3000;

app.listen(port, function () {
    console.log(`Listening on port ${port}...`);
});

app.get('/WelcomePage', (req, res) => {
    res.sendFile(path.join(__dirname, 'WelcomePage.html'));
});

app.get('/guestlogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'guestlogin.html'));
    console.log("nicee!");
});

app.get('/teamlogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'teamlogin.html'));
    console.log("yay!");
});
app.get('/managerlogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'guestlogin.html'));
    console.log("nicee!");
});

app.get('/contactus', (req, res) => {
    res.sendFile(path.join(__dirname, 'contactus.html'));
});

app.post('/register', (req, res) => {
    const {
        firstName,
        lastName,
        password,
        confirmedPassword,
        nuIdInput,
        roleSelect,
        EmailSelect,
        accompanyingSelect,
        familyMembersSelect,
        teamOrGuestSelect,
        teamSelect // New field for team selection
    } = req.body;

    let teamMembership = null; // Default value if not part of a team
    if (teamOrGuestSelect === 'team') {
        teamMembership = teamSelect; // Set team name if part of a team
    }

    const sql = 'INSERT INTO register (firstName, lastName, password, confirmedPassword, nuIdInput, roleSelect, EmailSelect, accompanyingSelect, familyMembersSelect, teamOrGuestSelect, teamMembership) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    connection.query(sql, [firstName, lastName, password, confirmedPassword, nuIdInput, roleSelect, EmailSelect, accompanyingSelect, familyMembersSelect, teamOrGuestSelect, teamMembership], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            res.status(500).send('Error inserting data');
        } else {
            console.log('User registered successfully:', results);
            res.send(`
                <html>
                    <head>
                        <title>Registration Success</title>
                        <style>
                            body {
                                background-image: url('successfulRegistration.jpg');
                                background-color: #f0f0f0; /* Light gray background */
                                font-family: Arial, sans-serif;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #fff; /* White container background */
                                border-radius: 10px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Shadow effect */
                            }
                            h1 {
                                color: #333; /* Dark gray heading color */
                            }
                            p {
                                color: #666; /* Medium gray paragraph color */
                            }
                            button {
                                padding: 10px 20px;
                                background-color: #4CAF50; /* Green button background */
                                color: white;
                                border: none;
                                border-radius: 5px;
                                cursor: pointer;
                                font-size: 16px;
                            }
                            button:hover {
                                background-color: #45a049; /* Darker green on hover */
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>User Registered Successfully</h1>
                            <p>Your registration was successful!</p>
                            <a href="/WelcomePage"><button>Back to Welcome Page</button></a>
                        </div>
                    </body>
                </html>
            `);
        }
    });
});





app.post('/guestlogin', (req, res) => {
    const { nuIdInput, password } = req.body;
    console.log('Received credentials:', nuIdInput, password);

    const sql = "SELECT * FROM register WHERE nuIdInput = ? AND password = ?";
    connection.query(sql, [nuIdInput, password], (err, results) => {
        if (err) {
            console.error('Error authenticating user:', err);
            res.send({ authentication: false }); // Send authentication false if an error occurs
        } else {
            if (results.length > 0 && results[0].teamOrGuestSelect === 'guest') {
                console.log('Guest authentication successful');
                res.send({ authentication: true }); // Send authentication true for guest login
            } else {
                console.log('Guest authentication failed');
                res.send({ authentication: false }); // Send authentication false for guest login
            }
        }
    });
});

app.post('/teamlogin', (req, res) => {
    const { nuIdInput, password } = req.body;

    const sql = "SELECT * FROM register WHERE nuIdInput = ? AND password = ?";
    connection.query(sql, [nuIdInput, password], (err, results) => {
        if (err) {
            console.error('Error authenticating user:', err);
            res.send({ authentication: false }); // Send authentication false if an error occurs
        } else {
            if (results.length > 0 && results[0].teamOrGuestSelect === 'team') {
                console.log('Team authentication successful');
                res.send({ authentication: true }); // Send authentication true for team login
            } else {
                console.log('Team authentication failed');
                res.send({ authentication: false }); // Send authentication false for team login
            }
        }
    });
});

app.post('/contactus', (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
    connection.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error inserting contact message into database:', err);
            res.status(500).json({ success: false, error: 'An error occurred while saving your message.' });
        } else {
            console.log('Contact message saved successfully');
            res.status(200).json({ success: true, message: 'Your message has been successfully submitted.' });
        }
    });
});


/*app.post('/teamlogin', (req, res) => {
    const { nuIdInput, password } = req.body;
    console.log('Received credentials:', nuIdInput, password);

    const sql = "SELECT * FROM register WHERE nuIdInput = ? AND password = ?";
    console.log('Executing SQL query:', sql, [nuIdInput, password]);

    connection.query(sql, [nuIdInput, password], (err, results) => {
        if (err) {
            console.error('Error authenticating user:', err);
            res.send({ authentication: false }); // Send authentication false if an error occurs
        } else {
            if (results.length > 0 && results[0].teamOrGuestSelect === 'team') {
                console.log('Team authentication successful');
        
                switch (results[0].nuIdInput) {
                    case 'danceID':
                        console.log('Redirecting to dance.html');
                        res.redirect('/dance/' + results[0].nuIdInput);
                        break;
                }
            } else {
                console.log('Team authentication failed');
                res.send({ authentication: false });
            }
        }
    });
});*/

app.get('/dance/:nuIdInput', (req, res) => {
    const nuIdInput = req.params.nuIdInput;
    res.sendFile(path.join(__dirname, 'dance.html'));
    console.log("Redirected to dance.html for nuIdInput:", nuIdInput);
});
//new menu funciaton 

app.post('/menu', (req, res) => {
    const { dish } = req.body; // Assuming dish names are sent from the frontend as 'dish'

    // Assuming 'dish_name' is the column name for the dish name
    const sql = 'UPDATE menu SET votes = votes + 1 WHERE dish_name = ?';

    // Handle a maximum of 4 dishes
    if (!Array.isArray(dish)) {
        if (dish) {
            connection.query(sql, [dish], (error, results) => {
                if (error) {
                    console.error('Error updating votes:', error);
                    return res.status(500).send('Error updating votes');
                } else {
                    console.log('Vote registered for dish:', dish);
                    return res.status(200).send('Vote registered successfully');
                }
            });
        } else {
            return res.status(400).send('No dish selected');
        }
    } else {
        if (dish.length <= 4) {
            // Loop through the selected dishes and update votes for each
            dish.forEach((dishName) => {
                connection.query(sql, [dishName], (error, results) => {
                    if (error) {
                        console.error('Error updating votes:', error);
                    } else {
                        console.log('Vote registered for dish:', dishName);
                    }
                });
            });
            return res.status(200).send('Votes registered successfully');
        } else {
            return res.status(400).send('Too many dishes selected');
        }
    }
});

app.post('/performances', (req, res) => {
    const { performances, perform, performerPerformance } = req.body;

    if (perform === 'yes' && performerPerformance) {
        const sqlPerformer = 'UPDATE performances SET performer_count = performer_count + 1 WHERE performance_name = ?';

        connection.query(sqlPerformer, [performerPerformance], (error, results) => {
            if (error) {
                console.error('Error updating performer count:', error);
                res.status(500).send('Error updating performer count');
            } else {
                console.log('Performer count incremented for performance:', performerPerformance);
                res.status(200).send('Performer count updated successfully');
            }
        });
    } else if (perform === 'no') {
        const sqlVoting = 'UPDATE performances SET votes = votes + 1 WHERE performance_name IN (?)';

        connection.query(sqlVoting, [performances], (error, results) => {
            if (error) {
                console.error('Error updating votes:', error);
                res.status(500).send('Error updating votes');
            } else {
                console.log('Vote incremented for performances:', performances);
                res.status(200).send('Votes updated successfully');
            }
        });
    } else {
        res.status(400).send('Invalid request');
    }
});
// Express route for manager login
app.post('/managerlogin', (req, res) => {
    const { username, password } = req.body;

    // Assuming you have a database for manager credentials and roles
    // Adjust the SQL query based on your database schema
    const sql = "SELECT * FROM managers WHERE username = ? AND password = ?";
    connection.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Error authenticating manager:', err);
            res.send({ authentication: false });
        } else {
            if (results.length > 0) {
                console.log('Manager authentication successful');

                // Determine the role of the manager (e.g., budget_manager)
                const role = results[0].role;

                res.send({ authentication: true, role });
            } else {
                console.log('Manager authentication failed');
                res.send({ authentication: false });
            }
        }
    });
});
