


export const fetcher = async (method: string = 'GET', API_ENDPOINT: string, {
    token, lapadi_app_token, body
}: {token?: string, lapadi_app_token: string, body?: any}): Promise<any> => {

    let parameters: any = {
      method,
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': lapadi_app_token,
      }
    };

    if(token) {
        parameters.headers['token'] = token
    }
    if (body) {
        parameters['body'] = JSON.stringify(body)
    }
      
    return await fetch(API_ENDPOINT, parameters)
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
}