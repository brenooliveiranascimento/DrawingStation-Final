import { where } from "sequelize";
import CommentModel from "../../database/models/CommentModel";
import SubCommentModel from "../../database/models/SubCommentModel";
import { IallComments, IComments, IsubComments } from "../../interfaces/commentsTypes";
import CustomError from "../../utils/StatusError";

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

  async execute(): Promise<IallComments> {
    try {
      const comments = await this.commentModel.findAll(
      {include: [{ model: SubCommentModel, as: 'subComments' }], where: { active: true }})

      return this.filterActiveComments(comments) as any;
    } catch(e: any) {
      throw new CustomError(e.message, 500)
    }
  }
}