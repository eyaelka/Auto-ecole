
const User = require('../models/user'); 
const Post = require('../models/forum'); 
const forum = require('../models/forum');

module.exports = (router) => {
    router.post('/newPost', (req, res) => {
       if (!req.body.body) {
            res.json({ success: false, message: 'Vous devez saisir une question' }); 
            } else {
              if (!req.body.createdBy) {
                res.json({ success: false, message: 'Qui a écrit la question?' }); 
              } else {
                 const newpost = new Post({
                  body: req.body.body, 
                  createdBy: req.body.createdBy 
                });

        newpost.save((err) => {
            if (err) {
                if (err.errors) {
                    if (err.errors.body) {
                        res.json({ success: false, message: err.errors.body.message }); 
                    }else{
                        res.json({ success: false, message: err });
                        }
                    }else{
                      res.json({ success: false, message: err }); 
                    }
                }else{
                    res.json({ success: true, message: 'Post Enregistré !' });
                    
                  }
                });
             
            }
        }
    });

    router.get ('/allPosts', (req,res) => {
    forum.find({}, (err, posts) => {
      if (err) {
        res.json({ success: false, message: err }); 
      } else {
        if (!posts) {
          res.json({ success: false, message: 'Aucun post trouvé.' }); 
        } else {
          res.json({ success: true, posts: posts }); 
        }
      }
    }).sort({ '_id': -1 });
    });


    router.post('/comment', (req, res) => {
      Post.findOne({ _id: req.body.id }, (err, post) => {   //find the post by id
      if (err) {
        res.json({ success: false, message: 'id post invalide' }); 
      } else {
        if (!post) {
          res.json({ success: false, message: 'Post introuvable.' }); 
        } else {
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
          if (err) {
            res.json({ success: false, message: 'erreur !! ' }); 
          } else {
          if (!user) {
            res.json({ success: false, message: 'Utilisateur introuvable .' }); 
          } else {
            post.comments.push({
            comment: req.body.comment,
            commentator: user.username });

        
          post.save((err) => {
          if (err) {
            res.json({ success: false, message: 'commentaire non enregistré' }); 
          } else {
            res.json({ success: true, message: 'Commentaire enregistré avec succès ' }); 
          }
          });
        }
      }
      });
    }
  }
});
});







    return router;
};