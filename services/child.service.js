import {
  saveChild,
  updateChild,
  deleteChild,
  getChilds,
  getAllChilds,
  getAllStaffUser,
  getChildByID,
} from "../repository/index.js";
import AppError from "../utils/appError.js";

export const saveChildService = async (data) => {
  const { name, age, gender, dateOfBirth, image, school, hobby } = data;
  try {
    const child = await saveChild({
      name,
      age,
      gender,
      dateOfBirth,
      image,
      school,
      hobby,
    });
    return Promise.resolve(child);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const updateChildService = async (id, data) => {
  try {
    const child = await updateChild(id, data);
    return Promise.resolve(child);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const deleteChildService = async (id) => {
  try {
    const child = await deleteChild(id);
    return Promise.resolve(child);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const getChildsService = async () => {
  try {
    const childs = await getAllChilds();
    return Promise.resolve(childs);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const getAllChildsService = async () => {
  try {
    const childs = await getAllChilds();
    return Promise.resolve(childs);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const getStaffService = async (role) => {
  try {
    const staffs = await getAllStaffUser(role);
    return Promise.resolve(staffs);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const getSingleChildService = async (id) => {
  try {
    const child = await getChildByID(id);
    return Promise.resolve(child);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};
