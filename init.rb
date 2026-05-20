require_relative 'lib/redmine_issue_tree/hooks'

Redmine::Plugin.register :redmine_issue_tree do

  name 'Redmine Issue Hierarchical Tree'

  author 'ancrumar'

  description '
    Advanced hierarchical issue tree
    for Redmine with:

    - Expand / collapse
    - Recursive hierarchy
    - Parent grouping
    - Progress KPIs
    - Persisted state
    - Hide closed issues
  '

  version '1.0.0'

  url 'https://github.com/ancrumar/redmine_issue_tree'

  author_url 'https://github.com/ancrumar'

  requires_redmine version_or_higher: '5.0.0'

end
