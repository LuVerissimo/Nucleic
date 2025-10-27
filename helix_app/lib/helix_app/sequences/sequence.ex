defmodule HelixApp.Sequences.Sequence do
  use Ash.Resource,
    domain: HelixApp.Domain,
    data_layer: AshPostgres.DataLayer

  postgres do
    table("sequences")
    repo(HelixApp.Repo)
  end

  attributes do
    uuid_primary_key(:id)

    attribute :name, :string do
      allow_nil?(false)
    end

    attribute :data, :string do
      allow_nil?(false)
    end
  end

  actions do
    create :create do
      # accept these inputs
      primary?(true)
      accept([:name, :data])
    end

    update :update do
      accept([:name, :data])
    end

    read(:read)
    destroy(:destroy)
  end
end
