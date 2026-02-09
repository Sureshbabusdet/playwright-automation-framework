import { test, expect } from '@playwright/test'

test.describe.skip('Petstore User API - Chained API Requests', () => {
test("Verify Chained API Requests - Create, Fetch, Update User", async ({ request }) => {

    const response = await request.post("https://petstore.swagger.io/v2/user/createWithList", {

        data: [
            {
                    id: 1232,
                    username: 'Testuser',
                    firstName: 'user',
                    lastName: 'user',
                    email: 'test@yopmail.com',
                    password: 'password@1234',
                    phone: '1234567890',
                    userStatus: 1,
                },
        ],
        headers : {
            accept: 'application/json',
            'Content-Type': 'application/json'
        }

    });
  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(`POST /user/createWithList -> status: ${response.status()}\nPOST response body:\n${JSON.stringify(body, null, 2)}`);

  const res = await request.get(`https://petstore.swagger.io/v2/user/Testuser`);
  expect(res.status()).toBe(200);
  const getResponseBody = await res.json();
  console.log(`GET /user/Testuser -> status: ${res.status()}\nGET response body:\n${JSON.stringify(getResponseBody, null, 2)}`);
  expect(getResponseBody.username).toBe("Testuser");

});



test('Handle dependent APIs with token-based authentication (mock flow)', async ({ request }) => {

  const loginResponse = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      username: 'testuser',
      password: 'password123'
    }
  });

  expect(loginResponse.ok()).toBeTruthy();

  const authToken = 'mocked-jwt-token-12345';
  console.log('Auth Token:', authToken);

  const createResponse = await request.post('https://jsonplaceholder.typicode.com/posts', {
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    data: {
      title: 'Playwright Demo',
      body: 'This is a dependent API test',
      userId: 1
    }
  });

  expect(createResponse.ok()).toBeTruthy();

  const createData = await createResponse.json();
  const resourceId = createData.userId;
  console.log('Created Resource ID:', resourceId);


  const getResponse = await request.get(`https://jsonplaceholder.typicode.com/posts/${resourceId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  console.log(await getResponse.json());
  expect(getResponse.ok()).toBeTruthy();
  const getData = await getResponse.json();
  console.log('Resource Details:', getData);
});
});


