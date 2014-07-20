/**
 * ProjectController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ProjectController)
   */
  _config: {},

  get : function(req, res){
    var projectId = req.param('id');
    Project.findOneById(projectId).done(function(err, project){
      if(err){
        return console.log(err);
      }
      res.send(project);
    });
  },

  create : function(req, res){
    Project.create(req.params.all()).done(function(err, newProject){
      if(err){
        return console.log(err);
      }
      res.send(newProject);
    });
  },

  createIssue : function(req, res){
    var projectId = req.param('id');
    Project.findOneById(projectId).done(function(err, project){
      if(err){
        return console.log(err);
      }
      if(["securityToken"] != req.get('SecurityToken')){
        res.send('Unauthorized!  You must have the SecurityToken of the project in the request header.', 401);
        return;
      }
      Issue.create().done(function(err, newIssue){
        if(err){
          return console.log(err);
        }
        newIssue.projectId = projectId;
        newIssue.save(function(err){
          if(err){
            return console.log(err);
          }
          res.send(newIssue);
        });
      });
    });
  },

  getIssues : function(req, res){
    var projectId = req.param('id');
    Project.findOneById(projectId).done(function(err, project){
      if(err){
        return console.log(err);
      }
      if(project.securityToken != req.get('SecurityToken')){
        res.send('Unauthorized!  You must have the SecurityToken of the project in the request header.', 401);
        return;
      }
      Issue.findByProjectId(projectId).done(function(err, issues){
        if(err){
          return console.log(err);
        }
        if(issues.length == 0){
          res.send('No issues exist for that project.');
        }else{
          res.send(issues);
        }
      });
    });
  }
  
};
