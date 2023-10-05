import { RecaptchaProvider } from '@/app/Providers';

import { Signin } from '@/views';

export default function SigninPage({params}:any) {

  return (
		<RecaptchaProvider>
			<Signin tenant={params.tenant} />
    </RecaptchaProvider>
  );
}
