import { Request, Response } from "express"
import { userServices } from "./user.service";




const getAllUser = async (req: Request, res: Response) => {

  try {
    const result = await userServices.getAllUser();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};




const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone, role } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const currentUser = req.user;

    if (currentUser.role === "customer") {
      if (currentUser.id !== id) {
        return res.status(403).json({
          message: "Cannot update other users",
        });
      }

      const result = await userServices.updateUser(
        id,
        name,
        email,
        password,
        phone,
        currentUser.role
      );

      return res.status(200).json({
        success: true,
        message: "Profile updated",
        data: result,
      });
    }

    if (currentUser.role === "admin") {
      const result = await userServices.updateUser(
        id,
        name,
        email,
        password,
        phone,
        role
      );

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result,
      });
    }

    return res.status(403).json({ message: "Unauthorized role" });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




const deleteUser = async (req: Request, res: Response) => {

  try {
    const result = await userServices.deleteUser(req.params.id!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      })
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows,
      });
    }

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}






export const userController = {
  getAllUser,
  updateUser,
  deleteUser,

}