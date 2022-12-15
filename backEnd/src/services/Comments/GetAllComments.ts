import CommentModel from "../../database/models/CommentModel";
import SubCommentModel from "../../database/models/SubCommentModel";
import { IallComments, IComments, IsubComments } from "../../interfaces/commentsTypes";
import CustomError from "../../utils/StatusError";
import Users from "../../database/models/UserModel";

export default class GetAllCommentsServices {
  constructor(private commentModel = CommentModel) {}

  private filterActiveComments(comments: any): IallComments[] {
    return comments.map((
      { active, classroomId, content, creationDate, id, userId, subComments}: IallComments) => {
        const filterSuibComments = subComments.filter((currSubComments: IsubComments) => currSubComments.active);
        const items = {
          id, userId, active, classroomId, content, subComments: filterSuibComments, creationDate
        }
        return items
    })
  }

  private async getUsersData(comments: IallComments[]): Promise<IallComments> {
    const commentsWithUsers = await Promise.all(comments.map(async (currComment: IallComments) => {
        const userData = await Users.findByPk(Number(currComment.userId), { attributes: {
          exclude: ['password', 'birthday', 'phoneNumber', 'loginType']
        }})
        return { userData, ...currComment }
    }))
    const addUserInSubComment = await Promise.all(commentsWithUsers.map(async (currComment) => {
      const subComments = await Promise.all(currComment.subComments.map(async (currSubComment: IsubComments) => {
        const getUserData = await Users.findByPk(Number(currComment.userId), { attributes: {
          exclude: ['password', 'birthday', 'phoneNumber', 'loginType']
        }})
        const userData = {
          name: getUserData?.name,
          email: getUserData?.email,
          profilePhoto: getUserData?.profilePhoto,
          active: getUserData?.active,
          premium: getUserData?.premium
        }
        const { active, commentId, content, creationDate, id, userId } = currSubComment;
        const currData = {active, commentId, content, creationDate, id, userId}
        return { userData, ...currData }
      }))
      const { active, classroomId, content, creationDate, userData } = currComment;
      const currData = {userData, active, classroomId, content, creationDate};
      return { ...currData, subComments }
    }))
    return addUserInSubComment as any;
  }

  async execute(): Promise<IallComments> {
    try {
      const comments = await this.commentModel.findAll(
      {
        include: [{ model: SubCommentModel, as: 'subComments' }],
        where: { active: true },
        attributes: { exclude: ['classroomId', 'active', 'commentId'] }
      })

      const activeComments = this.filterActiveComments(comments) as any;
      const commentsWithUsers = await this.getUsersData(activeComments)
      return commentsWithUsers
    } catch(e: any) {
      throw new CustomError(e.message, 500)
    }
  }
}