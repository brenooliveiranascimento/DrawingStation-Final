import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { INewComment, INewSubComment } from '../../../interfaces/modules/commentsModuleInterfaces';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { apiConnection } from '../../../services/api.connection';
import { requestComments } from './genericAtions';

export const crateCommentAction = (commentData: INewComment): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { classroomId, content, userId } = commentData;
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.post('/comments/create',
        { classroomId, content, userId, },
        { headers: { 'Authorization': token } });
      toast.success(data);
      const { data: newComments } = await apiConnection.get(`/comments/all${classroomId}`, { headers: { 'Authorization': token } });
      dispatch(requestComments(newComments.reverse()));
    } catch(e: any) {
      toast.error(e.response.data.message);
    }
  };
};

export const crateSubCommentAction = (commentData: INewSubComment): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { commentId, content, userId, comentTo } = commentData;
    const { classroomController: { classroom }, user: { userData } } = state();
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.post(`/subComments/create${classroom.id}`,
        { commentId, content, userId, },
        { headers: { 'Authorization': token } });
      await apiConnection.post('/notification/create',
        { commentId, content, userId: comentTo, classroomId: classroom.id, senderId: userData.id, type: 'comentario' },
        { headers: { 'Authorization': token } });
      toast.success(data);
      const { data: newComments } = await apiConnection.get('/comments/all', { headers: { 'Authorization': token } });
      dispatch(requestComments(newComments.reverse()));
    } catch(e: any) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };
};
