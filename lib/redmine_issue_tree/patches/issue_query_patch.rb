module RedmineIssueTree
  module Patches
    module IssueQueryPatch

      def groupable_columns_options
        options = super

        unless options.any? { |o| o[1] == 'parent_id' }
          options << ['Tarea padre', 'parent_id']
        end

        options
      end

    end
  end
end
