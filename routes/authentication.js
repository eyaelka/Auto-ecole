const  Router  = require('express');
const User = require ('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require ('../config/database');


module.exports = (router) => {
    router.post('/sinscrire', async (req,res) => {
        //req.body.email;
        //req.body.username;
        //req.body.password;
        const salt = await bcrypt.genSalt(10);
        let newPassword = await bcrypt.hash(req.body.password, salt) ;
        
        if(newPassword) {
          const user = new User({
            username: req.body.username.toLowerCase(),
            birth: req.body.birth,
            email: req.body.email.toLowerCase(),
            password: newPassword,
            phone: req.body.phone,
            role:req.body.role });
          
          user.save((err) => {
            console.log(user);
            console.log(err);
            if (err) {    
              res.json({success: false, message: err});
            }else{
              res.json({ success: true, message: 'Compte enregistré'});
            }            
          });
        }
        
      });            
                                
                                                        
        //Check if email is available                                         
        router.get('/checkEmail/:email', (req, res) => {
            if (!req.params.email) {
              res.json({ success: false, message: 'E-mail non fourni' });
            } else {
              User.findOne({ email: req.params.email }, (err, user) => {
                if (err) {
                  res.json({ success: false, message: err });
                } else {
                  if (user) {
                    res.json({ success: false, message: 'E-mail déjà utilisé' });
                  } else {
                    res.json({ success: true, message: 'E-mail est valable' });
                  }
                }
              });
            }
          });

        //chack if username is available
        router.get('/checkUsername/:username', (req, res) => {
            if (!req.params.username) {
              res.json({ success: false, message: 'Nom utilisateur non fourni' });
            } else {
              // Look for username in database
              User.findOne({ username: req.params.username }, (err, user) => {
                if (err) {
                  res.json({ success: false, message: err });
                } else {
                  if (user) {
                    res.json({ success: false, message: 'Nom utilisateur déjà utilisé' });
                  } else {
                    res.json({ success: true, message: 'Nom utilisateur est valable' });
                  }
                }
              });
            }
          });

        router.post('/seconnecter', async (req,res) => {
          const user = await User.findOne({ email: req.body.email });
          if (user){
            const validPassword = await bcrypt.compare(req.body.password, user.password)
             if (!validPassword){
                res.json({success: false, message: 'Mot de passe invalide'});
             }else{
              const token = jwt.sign({userId: user._id}, config.secret,{expiresIn:'24h'});

              res.json({success: true, message: 'Succès !',token: token, user: { username: user.username} });
             }
          }else{
            res.json({success: false, message: 'utilisateur introuvable'});
          }
        });




        router.use((req,res,next) => {
          const token = req.headers['authorization'];
          if (!token){
            res.json ({success: false, message: 'pas de token'});
          } else {
            jwt.verify(token, config.secret, (err, decoded) => {
              if (err) {
                res.json({ success: false, message: 'Token invalide: ' + err }); 
              } else {
                req.decoded = decoded; 
                next(); 
              }
            });
          }
        });


    router.get('/profil', (req,res) => {
      User.findOne({_id: req.decoded.userId}).select(' username email').exec((err, user) => {
        if (err) {
          res.json({ success: false, message: err }); 
        } else {
          if (!user) {
            res.json({ success: false, message: 'Utilisateur non inscrit ' }); 
          } else {
            res.json({ success: true, user: user });
          }
        }  
      })
    });
 
    return router;
}