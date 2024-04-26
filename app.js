const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const session = require('express-session');
const ejs = require('ejs');

const app = express();

// Session middleware
app.use(session({
    secret: 'abc', // Specify a secret for session management
    resave: false,
    saveUninitialized: false
}));

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
}, { collection: 'registration' });

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb+srv://anuj107126:o9u7qVkWB141a1O1@cluster0.wogs2tb.mongodb.net/web_tech?retryWrites=true&w=majority&appName=Cluster0')
//   useNewUrlParser: true,mongodb+srv://anuj107126:<password>@cluster0.wogs2tb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//   useUnifiedTopology: true
.then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err.message);
});

app.get("/", (req, res) => {
    res.render('pg1');
});

app.get("/home", (req, res) => {
    res.render('home');
});

app.get("/about", (req, res) => {
    res.render('about');
}); 

app.get("ex", (req, res) => {
    res.render('ex');
});


app.get("/gls", (req, res) => {
    res.render('gls');
});

app.get("/pro", (req, res) => {
    res.render('pro');
});

app.get("/s", (req, res) => {
    res.render('s');
});

app.get("/service", (req, res) => {
    res.render('service');
});
app.get("/register", (req, res) => {
    res.render('register');
});
app.get("/login", (req, res) => {
    res.render('login');
});

// Handle POST request for registration
app.post("/register", (req, res) => {
    const {name, email, password} = req.body;
    console.log(req.body);

    const newUser = new User({
        name,
        email,
        password
    });

    newUser.save()
        .then(() => {
            res.render("home");
        })
        .catch((err) => {
            console.error("Error registering user:", err);
            res.status(500).send("Error registering user");
        });
});

// Handle POST request for login
app.post("/login", (req, res) => {
    const { name, email, password } = req.body;

    // Find user in the database based on username and password
    User.findOne({name, email, password })
        .then((user) => {
            if (user) {
                // User found, authentication successful
                req.session.user = user;
                res.render("home", { user: user });
            } else {
                // User not found or invalid credentials
                res.status(401).send("Invalid username or password");
            }
        })
        .catch((err) => {
            console.error("Error logging in:", err);
            res.status(500).send("Error logging in");
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});