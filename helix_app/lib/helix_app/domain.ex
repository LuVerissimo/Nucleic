defmodule HelixApp.Domain do
  use Ash.Domain
  alias HelixApp.Accounts

  resources do
    # include users/tokens from installer
    resource(Accounts.User)
    resource(Accounts.Token)

    # include sequence.ex file as a resource
    resource(HelixApp.Sequences.Sequence)
  end
end
