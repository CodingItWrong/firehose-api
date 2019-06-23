export default function() {
  this.namespace = 'api'

  this.get('/bookmarks', ({ bookmarks }, request) => {
    let read = request.queryParams['filter[read]']
    if (typeof read !== 'undefined') {
      return bookmarks.where({ read })
    }

    return bookmarks.all()
  })
  this.get('/bookmarks/:id')
  this.post('/bookmarks', ({ bookmarks }, request) => {
    let params = JSON.parse(request.requestBody)
    let link = bookmarks.new({
      url: params.data.attributes.url,
      title: 'My Link Title',
      read: false,
      'moved-to-list-at': new Date(),
      public: false,
      'published-at': null,
    })
    link.save()
    return link
  })
  this.patch('/bookmarks/:id', ({ bookmarks }, request) => {
    let params = JSON.parse(request.requestBody)
    let updatedValues = params.data.attributes
    let link = bookmarks.find(request.params.id)

    if (updatedValues['moved-to-list-at'] || updatedValues['published-at']) {
      return new Response(400)
    }

    if (link.read !== updatedValues.read) {
      updatedValues['moved-to-list-at'] = new Date()
    }

    if (!link.public && updatedValues.public) {
      updatedValues['published-at'] = new Date()
    } else if (link.public && !updatedValues.public) {
      updatedValues['published-at'] = null
    }

    link.update(updatedValues)
    link.save()
    return link
  })
  this.delete('/bookmarks/:id')

  this.get('/tags', ({ tags }, { params }) => {
    const name = params['filter[name]']
    if (name) {
      return tags.where({ name })
    } else {
      return tags.all()
    }
  })

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // make this `/api`, for example, if your API is namespaced
  // this.namespace = '';

  // delay for each request, automatically set to 0 during testing
  // this.timing = 400;

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
}
