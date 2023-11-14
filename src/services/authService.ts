import connectServices from "./connectServices"

export const authenticate = async (email: string, password: string, req: any) => {

	const ipAddress = req.headers['x-forwarded-for'];
	const response = await connectServices.get(`/users?user=${email}&password=${password}`);

	switch (response.data.code) {
      case 0:
        const { id, name, user } = response.data.data[0]
        const payload = { id, name, email:user };

        return {code: 0, user: payload, ipAddress }
      default:
        return {code: 1}
    }
}
