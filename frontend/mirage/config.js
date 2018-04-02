export default function() {
  this.urlPrefix = '/api';

  this.post('/oauth/token', (_, request) => {
    let params = {};
    request.requestBody.split('&').forEach((pair) => {
      let [key, value] = pair.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    if (params.username === 'example@example.com'
        && params.password === 'password') {
      return { access_token: 'abc123' };
    }

    return new Response(401);
  });

  this.get('/links', ({ links }, request) => {
    let read = request.queryParams['filter[read]'];
    if (typeof read !== 'undefined') {
      return links.where({ read });
    }

    return links.all();
  });
  this.get('/links/:id');
  this.post('/links', ({ links }, request) => {
    let params = JSON.parse(request.requestBody);
    let link = links.new({
      url: params.data.attributes.url,
      title: 'My Link Title',
      read: false,
      'moved-to-list-at': new Date(),
      public: false,
      'published-at': null,
    });
    link.save();
    return link;
  });
  this.patch('/links/:id', ({ links }, request) => {
    let params = JSON.parse(request.requestBody);
    let updatedValues = params.data.attributes;
    let link = links.find(request.params.id);

    if (updatedValues['moved-to-list-at'] || updatedValues['published-at']) {
      return new Response(400);
    }

    if (link.read !== updatedValues.read) {
      updatedValues['moved-to-list-at'] = new Date();
    }

    if (!link.public && updatedValues.public) {
      updatedValues['published-at'] = new Date();
    } else if (link.public && !updatedValues.public) {
      updatedValues['published-at'] = null;
    }

    link.update(updatedValues);
    link.save();
    return link;
  });
  this.delete('/links/:id');

  this.get('/tags');

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

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
