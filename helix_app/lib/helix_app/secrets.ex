defmodule HelixApp.Secrets do
  use AshAuthentication.Secret

  def secret_for(
        [:authentication, :tokens, :signing_secret],
        HelixApp.Accounts.User,
        _opts,
        _context
      ) do
    Application.fetch_env(:helix_app, :token_signing_secret)
  end
end
