defmodule HelixApp.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      HelixAppWeb.Telemetry,
      HelixApp.Repo,
      {DNSCluster, query: Application.get_env(:helix_app, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: HelixApp.PubSub},
      # Start a worker by calling: HelixApp.Worker.start_link(arg)
      # {HelixApp.Worker, arg},
      # Start to serve requests, typically the last entry
      HelixAppWeb.Endpoint,
      {Absinthe.Subscription, HelixAppWeb.Endpoint},
      AshGraphql.Subscription.Batcher,
      {AshAuthentication.Supervisor, [otp_app: :helix_app]}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: HelixApp.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    HelixAppWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
