import CommentModel from "../../database/models/CommentModel";
import { ICommentGenericReturn, ICommentUpdate } from "../../interfaces/commentsTypes";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import CheckComment from "./CheckComment";

export default class UpdateComment {
  constructor(
    private commentModel = CommentModel,
    private checkComment = new CheckComment()
    ) {}

  async execute(comment: ICommentUpdate): Promise<ICommentGenericReturn> {
    const { id, content } = comment;
    await this.checkComment.commentUpdateCheckList(comment);
    try {
      await this.commentModel.update({ content }, {where: { id }})
      return { message: 'Comentário atualizado com sucesso!' };
    } catch(e: any) {
      throw new CustomError(e.message, 404);
    }
  }
}