require 'zmq'

class ZeroMQMessagePackClient

  @@context = ZMQ::Context.new

  def initialize(server_uri)
    @sock = @@context.socket(ZMQ::PUB)
    @sock.connect(server_uri)
  end

  def send(data)
    @sock.send(pack(data))
  end

private

  def pack(data)
    MessagePack.pack(data)
  end

  def unpack(msg)
    MessagePack.unpack(data)
  end

end

class TriageClient < ZeroMQMessagePackClient

  def log_error(error)
    send({
      error: error,
      time: Time.now.to_i
    })
  end

  def log_message(level, msg)
    send({
      level: level,
      message: msg,
      time: Time.now.to_i
    })
  end

end
