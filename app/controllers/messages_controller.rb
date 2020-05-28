class MessagesController < ApplicationController
  def index
    @user = User.find(current_user[:id])
    @name = current_user.name
  end
end
