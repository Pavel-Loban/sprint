import axios from 'axios';




const BASE_URL = 'https://strapi.cleverland.by'


export const instance = axios.create({

  baseURL: `${BASE_URL}`,
});

export const apiSetHeader = (name:string, value: string) => {
  if (value) {
    instance.defaults.headers[name] = value;
  }
};

// Если токен есть, то добавим заголовок к запросам
  const JWTToken = localStorage.getItem('tokenData');

  if (JWTToken) {
  console.log(JWTToken)
  apiSetHeader('Authorization', `Bearer ${localStorage.getItem('tokenData')}`);
}



instance.interceptors.request.use((config) => {


  // Если пользователь делает запрос и у него нет заголовка с токеном, то...
  if (!config.headers.Authorization) {
    // Тут пишем редирект если не авторизован
    console.log('ne avtorizovan')
  }

  return config;
});













//  export const authorize = async (username: string, password: string) => {
//         try {
//           const { data } = await instance.post('/api/auth/local', {
//             'identifier':username,
//             'password':password
//           });
//           console.log(data)
//         //   const tokenData = data.jwt;

//           localStorage.setItem('tokenData', data.jwt);
//           // dispatch(setUser(data.user))
//           apiSetHeader('Authorization', `Bearer ${data.jwt}`);
//         } catch (error) {
//           console.log('ERROR', error);
//         }
//       };

