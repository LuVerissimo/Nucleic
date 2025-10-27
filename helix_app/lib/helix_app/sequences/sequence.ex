defmodule HelixApp.Sequences.Sequence do
  use Ash.Resource,
    data_layer: AshPostgres.DataLayer

  attributes do
    uuid_primary_key :id

    attribute :name, :string do
      allow_nil? false
    end

    attribute :data, :string do
      allow_nil? false
    end
  end

  actions do
    defaults [:create, :read, :update, :delete]
  end

  code_interface do
    define_for HelixApp.Api
  end
end
