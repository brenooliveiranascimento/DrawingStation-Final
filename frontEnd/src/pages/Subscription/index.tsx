import React, { useEffect } from 'react';
import { getStripeJs } from '../../services/stripe-js';
import { serverSideConnection, apiConnection } from '../../services/api.connection';
import { parseCookies } from 'nookies';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { serverSideSetupUser } from '../../services/setupUser';
import jwtDecode from 'jwt-decode';
import { UserInterface } from '../../interfaces/UserInterfaces';
import { AutenticationSuccess } from '../../redux/actions/autenticationActions/autenticationGenericActions';
import { useDispatch, useSelector } from 'react-redux';
import { globalState } from '../../interfaces/modules/globalStateInterface';

interface DashboardPropTypes {
  userData: UserInterface,
}
export default function Subscription({ userData }: DashboardPropTypes) {

  const dispatch = useDispatch();

  const setUser = () => {
    dispatch(AutenticationSuccess(userData));
  };

  useEffect(() => {
    setUser();
  }, []);

  const { id } = useSelector(({ user }: globalState) => user.userData);

  const initCheckout = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies['DRAWING_USER_DATA'];
  
      const resposne = await apiConnection.post('/subscription/create',
        { userId: id },
        { headers: { 'Authorization': token } });
      const { sessionId } = resposne.data;
  
      const stripe = await getStripeJs();
  
      await stripe?.redirectToCheckout({ sessionId });
    } catch(e: any) {
      console.log(e.message);
    }
  };

  return (
    <section>
      <button onClick={initCheckout}>
        Assianr plano mensal
      </button>
    </section>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const userConncetion = serverSideSetupUser(ctx);
  const cookies = parseCookies(ctx);  

  const token = cookies['DRAWING_USER_DATA'];
  const decodedEmail: any = jwtDecode(token);

  const {data} = await userConncetion.post('/auth/me');
  const { id, name, email, profilePhoto, birthday, phoneNumber, premium } = data.message;
  return {
    props: {
      userData: { id, name, email, profilePhoto, birthday, phoneNumber, premium },
    }
  };

});
