class User < ApplicationRecord

  belongs_to :company, optional: true, counter_cache: true
  belongs_to :user_role, optional: true
  belongs_to :contact, required: true

  has_many :risks

  validates :email, presence: true,
                    allow_blank: false,
                    format: { with: /.+@.+\..+/i, on: :create, message: "Email format is false" }

  # Include default devise modules. Others available are:
  #  and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable, :trackable
         #:confirmable, :lockable, :timeoutable,
end
