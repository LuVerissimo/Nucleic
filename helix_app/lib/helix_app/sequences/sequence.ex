defmodule HelixApp.Sequences.Sequence do
  use Ash.Resource,
    domain: HelixApp.Domain,
    data_layer: AshPostgres.DataLayer,
    extensions: [Ash.Resource.CodeInterface, AshPostgres.Resource, AshGraphql.Resource]

  postgres do
    table("sequences")
    repo(HelixApp.Repo)
  end

  attributes do
    uuid_primary_key(:id)
    attribute(:name, :string, allow_nil?: false, public?: true)
    attribute(:data, :string, allow_nil?: false, public?: true)
  end

  actions do
    # This is the idiomatic way to define standard CRUD actions.
    defaults [:create, :read, :update, :destroy]
  end

  graphql do
    type(:sequence)

    queries do
      get(:get_sequence, :read) #single record
      list(:list_sequences, :read)
    end

    mutations do
      create(:create_sequence, :create)
      update(:update_sequence, :update)
      destroy(:destroy_sequence, :destroy)
    end
  end
end
