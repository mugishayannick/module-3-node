const Article = require("../models/article");

exports.createArticle = (req, res, next) => {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
      userId: req.body.userId
    });
    article.save().then(
      () => {
        res.status(201).json({
          article: 'Article saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };


exports.getOneArticle =(req, res, next) => {
    Article.findOne({
        _id: req.params.id
    }).then(
        (article) => {
                res.status(200).json(article)
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};


exports.modifyArticle = (req, res, next) => {
    const article = new Article({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    });
    Article.updateOne({_id: req.params.id}, article).then(
        () => {
            res.status(201).json({
                article: 'Article updated successfully'
            });
        }
    ).catch(
        (error) => {
            res.status(401).json({
                error: error
            });
        }
    );
};


exports.deleteArticle = (req, res, next) =>{
    Article.findOne({ _id: req.params.id }).then(
        (article) => {
            if (!article){
               return res.status(404).json({
                    error: new Error('No such article')
                });
            }
            Article.deleteOne({_id: req.params.id}).then(
                () => {
                    res.status(200).json({
                        article: 'Deleted'
                    });
                }
            ).catch(
                (error) => {
                   res.status(401).json({
                       error: error
                   });
                }
            );
        }
    );
    
};


exports.getAllArticles= (req, res, next) => {
    Article.find().then(
        (articles) => {
            res.status(200).json(articles);
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(400).json({
                error: error
            });
        }
    );
   
    };

module.exports.signup_get = (req, res) => {
    res.render('signup')
} 


module.exports.login_get = (req, res) => {
    res.render('login')
} 


module.exports.signup_post = (req, res) => {
    res.send('new signup')
} 


module.exports.login_post = (req, res) => {
    res.send('user login')
}    