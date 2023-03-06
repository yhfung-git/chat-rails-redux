class Api::V1::MessagesController < ApplicationController
  before_action :set_channel, only: %i[index]

  def index
    if @channel
      @messages = @channel.messages
      render json: @messages
    else
      render json: { error: "Channel not found" }, status: :not_found
    end
  end

  def create
  end

  private

  def set_channel
    @channel = Channel.find_by(name: params[:channel_id])
  end
end
