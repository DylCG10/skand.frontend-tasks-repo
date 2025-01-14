import { Response } from 'miragejs';
import isEqual from 'lodash/isEqual';

const addRoutesToMockServer = (mockServer) => {
  // eslint-disable-next-line no-param-reassign
  mockServer.namespace = '/api/v2';

  // Users CRUD
  mockServer.get('/users', (schema, request) => {
    const jwt = request.requestHeaders.authorization;
    if (jwt === 'null' || !jwt) {
      return new Response(401, {}, { message: 'Please Login' });
    }

    console.log("SCHEMA [GET /users]: ", schema.users.all());
    return schema.users.all();
  });
  mockServer.get('/users/:id', (schema, request) => {
    const jwt = request.requestHeaders.authorization;
    if (jwt === 'null' || !jwt) {
      return new Response(401, {}, { message: 'Please Login' });
    }

    const user = schema.users.find(request.params.id);
    if (!user) {
      return new Response(500, {}, { message: `No user with id: ${request.params.id} found` });
    }

    console.log("SCHEMA [GET /users/:id]: ", user);

    return user;
  });
  mockServer.post('/users', (schema, request) => {
    const jwt = request.requestHeaders.authorization;
    if (jwt === 'null' || !jwt) {
      return new Response(401, {}, { message: 'Please Login' });
    }

    const attributes = JSON.parse(request.requestBody);
    console.log("attributes: ", attributes);
    const idAppendedAttributes = { ...attributes, id: 1000 };
    
    // console.log("SCHEMA [POST /users]: ", JSON.parse(JSON.stringify(schema.users.create(idAppendedAttributes).attrs)));
    // schema._schema.isSaving.find("model:users(1000)") = true;

    // userData = [...userData, JSON.parse(JSON.stringify(schema.users.create(idAppendedAttributes).attrs))];
    return schema.users.create(idAppendedAttributes);
  });
  mockServer.patch('/users/:id', (schema, request) => {
    const jwt = request.requestHeaders.authorization;
    if (jwt === 'null' || !jwt) {
      return new Response(401, {}, { message: 'Please Login' });
    }

    const user = schema.users.find(request.params.id);
    // console.log("USERRR: ", user);
    if (!user) {
      return new Response(500, {}, { message: `No user with id: ${request.params.id} found` });
    }

    const attributes = JSON.parse(request.requestBody);
    // console.log("attributes: ", attributes);
    return user.update(attributes);
  });
  mockServer.delete('/users/:id', (schema, request) => {
    const jwt = request.requestHeaders.authorization;
    if (jwt === 'null' || !jwt) {
      return new Response(401, {}, { message: 'Please Login' });
    }

    const user = schema.users.find(request.params.id);
    if (!user) {
      return new Response(500, {}, { message: `No user with id: ${request.params.id} found` });
    }

    user.destroy();
    return new Response(200, {}, {});
  });

  // Session Login / Logout
  mockServer.post('/users/tokens', (schema, request) => {
    const acceptedParam = { email: 'test@skand.io', password: 'password' };
    const requestBody = JSON.parse(request.requestBody);
    const headers = { Authorization: '123abc456def789ghi' };
    const errorMessage = { message: 'Email does not match the password' };
    const responseData = 'ok';

    const expectedParamMatchesRequest = !!acceptedParam && isEqual(requestBody, acceptedParam);

    if (!expectedParamMatchesRequest) {
      return new Response(401, {}, errorMessage);
    }

    return new Response(200, headers, responseData);
  });

  mockServer.delete('/users/tokens', () => {
    const headers = { 'Content-Type': 'application/json; charset=utf-8' };
    const responseData = {};

    return new Response(200, headers, responseData);
  });
};

export default addRoutesToMockServer;
