defmodule HelixAppWeb.AshTypescriptRpcController do
  use HelixAppWeb, :controller

  def run(conn, params) do
    result = AshTypescript.Rpc.run_action(:helix_app, conn, params)
    json(conn, result)
  end

  def validate(conn, params) do
    result = AshTypescript.Rpc.validate_action(:helix_app, conn, params)
    json(conn, result)
  end
end
