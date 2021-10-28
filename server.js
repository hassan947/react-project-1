const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const mongoose = require('mongoose');
const cors = require("cors");
const path = require("path");

mongoose.connect('mongodb+srv://abc:hassan12345@cluster0.q3tvs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    created: { type: Date, default: Date.now },
});

const Text = mongoose.model('Text', {
    name: String,
    created: { type: Date, default: Date.now },
});


app.use(express.json())
app.use(cors(["localhost:3000", "localhost:5000"]))

app.use('/', express.static(path.join(__dirname, 'web/build')))

app.post('/api/v1/login', (req, res) => {

    if (!req.body.email ||
        !req.body.password
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    }

    console.log("req.body: ", req.body);


    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {

                if (user.password === req.body.password) {
                    res.send(user);

                } else {
                    res.send("Authentication fail");
                }

            } else {
                res.send("user not found");
            }
        }

    })
})
app.post('/api/v1/signup', (req, res) => {

    if (!req.body.email ||
        !req.body.password ||
        !req.body.name
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    } else {

        console.log(req.body)

        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        newUser.save(() => {
            console.log("data saved")
            res.send('profile created')
        })
    }

})


//get
// app.get('/api/v1/profile', (err, data) => {

//     Text.find({}, (err, data) => {

//         if(err){
//             res.status(500).send("error in getting database")
//         }else{
//             res.send(data)
//         }

//     })
// })

// app.get('/api/v1/profile', (req, res) => {
//     Text.find({}, (err, data) => {
//       res.send(data);
//     });
//   });

app.post('/api/v1/profile', (req, res) => {

    if (!req.body.name
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    } else {

        console.log(req.body)

        let newText = new Text({
            name: req.body.name
        })
        newText.save(() => {
            console.log("data saved")
            res.send('Post Created')
        })
    }

})

// //get



// app.get('/api/v1/profile', (req, res) => {
//     Text.find()
//     .then(texts=>res.json(texts))
//     .catch(err=>res.status(400).json('Error: ' + err));
// }
// )
// app.get('/api/v1/profile', (req, res) => {

//     Text.find({}, (err, data) => {

//         if(err){
//             res.status(500).send("error in getting database")
//         }else{
//             res.send(data)
//         }

//     })
// })



app.delete('/api/v1/profile', (req, res) => {
    res.send('profile deleted')
})

app.get("/**", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
    // res.redirect("/")
})
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
