class IssueTreeController < ApplicationController
  before_action :find_project
  before_action :authorize

  helper :issues
  include IssuesHelper

  def index
    @issues = @project.issues
                      .where(parent_id: nil)
                      .order(:id)
  end

  private

  def find_project
    @project = Project.find(params[:project_id])
  end
end
