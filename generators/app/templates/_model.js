import bookshelf from '../bookshelf';

const <%= name %> = bookshelf.Model.extend({
    tableName: '<%= nameUnderscore %>',
    serialize: function () {
        return {
            id: this.attributes.id,
            name: this.attributes.name,
        }
    }
});

export { <%= name %> };