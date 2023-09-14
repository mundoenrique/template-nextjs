import connectServices from "./connectServices"

export const authenticate = async (email: string, password: string, req: any) => {

	const ipAddress = req.headers['x-forwarded-for'];
	const response: any = await connectServices.get(`/users?user=${email}&password=${password}`);

	switch (response.code) {
      case 0:
        const { id, name, user } = response.data[0]
        const payload = { id, name, email:user };

        return {code: 0, user: payload, ipAddress }
      default:
        return {code: 1}
    }
}
