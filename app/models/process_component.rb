# This is the base STI model for ProcessMap related models
#
# A process map is a tree-like structure containing a
# single root node - a ProcessMap
#
# From there, all other ProcessComponents (Phase, Module, Step, Task)
# can be associated with their respective parent
#
# ProcessMap (root, only one)
# -- ProcessPhase (child, 0-N)
# ---- ProcessModule (child, 0-N)
# ------ ProcessStep (child, 0-N)
# -------- ProcessTask (child, 0-N)
class ProcessComponent < ApplicationRecord
  has_ancestry
  has_many_attached :files
  belongs_to :project

  def file_ids
    files.map {|file| file.id }
  end
end