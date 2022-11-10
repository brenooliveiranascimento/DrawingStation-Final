import { Response, Request } from 'express';
import { UserCredentials, UserGoogleCredentials } from '../interfaces/userTypes';
import AuthService from '../services/Autentication.services';
import statusCodes from '../statusCode';
import createToken from '../utils/jwt.utils';

class UserController {
  constructor(private authService = new AuthService()) {}

  public create = async (req: Request, res: Response) => {
    const user: UserCredentials = req.body;
    const { error, message } = await this.authService.register(user);

    if(error) return res.status(statusCodes.NOT_FOUND)
      .json({message: error.message, token: null, error: true});

    const token = createToken({email: user.email, id: message})
    return res.status(statusCodes.OK)
      .json({message: 'Usuário cirado com sucesso', token, error: false});
  }

  public login = async (req: Request, res: Response) => {
    const user: UserCredentials = req.body;
    const { error, message } = await this.authService.login(user)

    if(error) return res.status(statusCodes.NOT_FOUND)
      .json({message: error.message, token: null, error: true});

    const token = createToken({email: user.email, id: message})
    return res.status(statusCodes.OK).json({message: 'Logado com sucesso', token, error: false});
  }

  public loginByGoogle = async (req: Request, res: Response) => {
    const user: UserGoogleCredentials = req.body;
    const { error, message, type } = await this.authService.authByGoogle(user)

    if(error) return res.status(statusCodes.NOT_FOUND)
      .json({message: error.message, token: null, error: true});

    const token = createToken({email: user.email, id: message})
    if(type === 'Register') {
      return res.status(statusCodes.OK).json({ message: 'Registrado com sucesso!', token, error: false });
    }
    return res.status(statusCodes.OK).json({message: 'Logado com sucesso', token, error: false});
  }

}

export default UserController;
