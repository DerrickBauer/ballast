ballast
=======
Sever: written in Sails.  
-create project: post to /project?name=PROJECT_NAME  
	returns the project info with the securityToken included  
-create issue: post to /project/{projectId}/issues  
	must have the "SecurityToken" request header set to the project's securityToken attribute  
	TODO: set issue title, description, etc in the post  
-get project issues: get to /project/{projectId}/issues  
	must have the "SecurityToken" request header set to the project's securityToken attribute  