class Channel < ApplicationRecord
  has_many :messages, dependent: :destroy

  validates :name, presence: true, length: { in: 1..20 }
end
