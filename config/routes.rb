RedmineApp::Application.routes.draw do
  get 'projects/:project_id/issue_tree',
      to: 'issue_tree#index'
end
