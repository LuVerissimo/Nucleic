defmodule HelixApp.Accounts do
  use Ash.Domain, otp_app: :helix_app, extensions: [AshAdmin.Domain]

  admin do
    show? true
  end

  resources do
    resource HelixApp.Accounts.Token
    resource HelixApp.Accounts.User
  end
end
