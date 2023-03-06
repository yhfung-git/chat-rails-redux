class Api::V1::MessagesController < ApplicationController
  before_action :set_channel

  def index
    if @channel
      @messages = @channel.messages.order('created_at ASC')
      render json: @messages
    else
      render json: { error: "Channel not found" }, status: :not_found
    end
  end

  def create
    message = @channel.messages.build(content: params[:content])
    message.user = current_user
    message.save
    render json: message
  end

  private

  def set_channel
    @channel = Channel.find_by(name: params[:channel_id])
  end
end
