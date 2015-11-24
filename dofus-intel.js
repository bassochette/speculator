Samples = new Mongo.Collection("samples")
Items = new Mongo.Collection("items")

if (Meteor.isClient) {
    // counter starts at 0
    Template.body.helpers({
        samples: function () {
            return Samples.find({}, {
                sort: {
                    stamp: -1
                }
            })

        },
        items: function () {
            return Items.find()
        },
        displayNewItemForm: function () {
            return Session.get('newItemForm')
        },
        settings: function () {
            return {
                position: "bottom",
                limit: 100,
                rules: [
                    {
                        token: '',
                        collection: Items,
                        field: "nom",
                        template: Template.nomObjet,
                        options: 'i'
                    }
                ]
            };
        }

    })

    Template.body.events({
        'click #newItem': function (event) {
            Session.set('newItemForm', true);
        },
        'click #createItem': function (event) {
            console.log('create item');

            var item = {
                nom: $('#search').val(),
                category: $('#newItemCategory').val(),
                level: $('#newItemLevel').val()
            }

            Items.insert(item)

            Session.set('newItemForm', false)
        },
        'click #addSample': function () {
            var sample = {
                objet: $('#itemSelected').val(),
                prix: $('#sampleKama').val(),
                qt: $('#sampleQt').val(),
                stamp: new Date()
            }
            console.log(sample);
            Samples.insert(sample);
            q
        },
        "autocompleteselect #itemSearch": function (event, template, doc) {
            console.log("selected ", doc);
        }
    })

}

