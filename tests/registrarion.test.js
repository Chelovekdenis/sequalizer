const checkingRegistrationData = require("../routes/checkingRegistrationData");

describe("Registration tests", () => {
    test('Right passwords, existing username', async () => {
        let data = await checkingRegistrationData("user1", "123", "123")
        expect(data[0].length).toBe(1)
        expect(data[1]).toBe(false)
    })

    test('Right passwords, right username', async () => {
        let data = await checkingRegistrationData("user143234", "123", "123")
        expect(data[0].length).toBe(0)
        expect(data[1]).toBe(true)
    })

    test('Not the same passwords, right username', async () => {
        let data = await checkingRegistrationData("user143234", "122", "123")
        expect(data[0].length).toBe(1)
        expect(data[1]).toBe(false)
    })

    test('Not the same passwords, existing username', async () => {
        let data = await checkingRegistrationData("user1", "122", "123")
        expect(data[0].length).toBe(2)
        expect(data[1]).toBe(false)
    })

    test('One of the passwords is empty, right username', async () => {
        let data = await checkingRegistrationData("user143234", "", "123")
        expect(data[0].length).toBe(2)
        expect(data[1]).toBe(false)
    })
})


