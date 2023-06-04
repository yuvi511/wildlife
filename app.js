const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const url = 'mongodb://localhost:27017';
const dbName = 'Pandas';
const ejs = require('ejs');
app.set('view engine', 'ejs');


mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('form');
});

const userSchema2 = new mongoose.Schema({
    name: {
      type: String,
      
    },
    email: {
      type: String,
      
    },
    phone: {
      type: String,
      
    },

    suggestion : {
        type: String,
        
      },

      feedback:{
        type : String
      }
  });
  
  
  
  const UserN = mongoose.model('UserN', userSchema2);

app.get('/success', (req, res) => {
    const name = req.query.fname;
    const email = req.query.email;
    const phone = req.query.phone;
    const suggestion = req.query.suggestion;
    const feedback = req.query.feedback;

  
    const newUser = new UserN({
      name,
      email,
      phone,
      suggestion,
      feedback
    });
  
    newUser.save()
      .then(() => {
        const data = {
          title: 'Form Submitted Successfully',
          message: 'Thank you for contacting us! We will get back to you shortly'+' '+name
        };
        res.render('form', { data });
      })
      .catch(err => console.log(err));
  });

app.listen(3000,()=>{
    console.log("Listening To Port 3000");
})