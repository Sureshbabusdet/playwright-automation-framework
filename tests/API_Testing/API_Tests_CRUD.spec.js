import { test, expect } from '@playwright/test'

// Run API tests serially in the order: POST -> GET -> PUT -> DELETE
test.describe.serial('Petstore User API - ordered CRUD tests', () => {
    let username = 'Test_user1';

    test('POST | Verify POST Request - create user', async ({ request }) => {
        const response = await request.post('https://petstore.swagger.io/v2/user/createWithList', {
            data: [
                {
                    id: 1232,
                    username: username,
                    firstName: 'user',
                    lastName: 'user',
                    email: 'test@yopmail.com',
                    password: 'password@1234',
                    phone: '1234567890',
                    userStatus: 1,
                },
            ],
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log('POST response:', body);
    });

    test('GET | Verify GET Request - fetch created user', async ({ request }) => {
        const response = await request.get(`https://petstore.swagger.io/v2/user/${username}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('GET response:', responseBody);
        // validate user exists and username matches
        expect(responseBody.username).toBe(username);
    });

    test('PUT | Verify PUT Request - update user', async ({ request }) => {
        const response = await request.put(`https://petstore.swagger.io/v2/user/${username}`, {
            data: {
                id: 123334,
                username: username,
                firstName: 'user_updated',
                lastName: 'user_updated',
                email: 'test_updated@yopmail.com',
                password: 'password@1234',
                phone: '1234567890',
                userStatus: 1,
            },
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log('PUT response:', body);
    });

    test('DELETE | Verify DELETE Request - delete user', async ({ request }) => {
        const response = await request.delete(`https://petstore.swagger.io/v2/user/${username}`, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log('DELETE response:', body);
    });
});
