import { ClassroomDataInterface, ClassroomInterface } from "../../interfaces/classroomsTypes";
import { errorMapTypes } from "../../utils/errorMap";
import Classroom from "./Classroom"
import ClassRoomDataModel from "../../database/models/ClassRoomDataModel";
import ClassroomModel from "../../database/models/ClassroomModel";
import CustomError from "../../utils/StatusError";
import statusCodes from "../../statusCode";
import { ICommentGenericReturn } from "../../interfaces/commentsTypes";

export default class Update extends Classroom {
 constructor() { super() }
 public async updateClassroomData(classroomData: ClassroomDataInterface, id: number) {
  try {
    const { description, drawing, isPremium, video, image } = classroomData
    const updatedClassroomData = await ClassRoomDataModel.update(
      { image, description, drawing, isPremium, video },
      { where: { id } },
    )
    return updatedClassroomData
  } catch(e: any) {
    throw new CustomError(e.message, statusCodes.BAD_REQUEST);
  }
};

 public async execute(
  newClassroom: ClassroomInterface, classroomData: ClassroomDataInterface, id: number
  ):Promise<ICommentGenericReturn> {
  try {
    const classroom = await this.findClassroomById(id);
    if(!classroom) throw new CustomError(errorMapTypes.CLASSROOM_DONT_EXIST, statusCodes.NOT_FOUND);

    const {image, name, premium} = newClassroom

    const classroomDataUpdated = await this.updateClassroomData(classroomData, id);
    if(!classroomDataUpdated) throw new CustomError(errorMapTypes.CLASSROOM_DONT_EXIST, statusCodes.NOT_FOUND);

    await ClassroomModel.update({ image, name, premium }, { where: { id } })
    return { message: 'Aula atualizada com sucesso!' };
  } catch(e: any) {
    throw new CustomError(e.message, statusCodes.BAD_REQUEST);
  }
}
}