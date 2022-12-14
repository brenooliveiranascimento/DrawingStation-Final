import SubCommentModel from "../../database/models/SubCommentModel";
import { ICommentGenericReturn, IsubComments, IsubCommentsEdit } from "../../interfaces/commentsTypes";
import CustomError from "../../utils/StatusError";
import ValidateSubComment from "./ValidateSubComment";

export default class UpdateSubComment {
  constructor(
    private validateSubComment = new ValidateSubComment(),
    private subCommentModel = SubCommentModel,
  ) {}
  async execute(subComment: IsubCommentsEdit): Promise<ICommentGenericReturn> {
    const { id, content } = subComment;
    try {
      await this.validateSubComment.checkSubCommentUpdate(subComment);
      await this.subCommentModel.update(
        { content },
        { where: { id } }
      )
      return { message: 'Comentário atualizado com sucesso!!' }
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}