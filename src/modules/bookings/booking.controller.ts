import { Request, Response } from "express";
import { bookingServices } from "./booking.service";
import { pool } from "../../config/db";




const createBooking = async (req: Request, res: Response) => {
  try {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;


    if (!customer_id || !vehicle_id || !rent_start_date || !rent_end_date) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }


    const customer = await pool.query(`SELECT id FROM users WHERE id=$1`, [customer_id]);
    if (customer.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Customer not found",
      });
    }


    const vehicle = await pool.query(`SELECT id FROM vehicles WHERE id=$1`, [vehicle_id]);
    if (vehicle.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Vehicle not found",
      });
    }


    const result = await bookingServices.createBooking({
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getAllBookings(req.user);


    res.status(200).json({
      success: true,
      message: req.user.role === "admin" ? "All Bookings retrived successfully" : "Your bookings retrieved successfully",
      data: result,

    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




const updateBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!bookingId || !status) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and status are required",
      });
    }

    const result = await bookingServices.updateBooking(
      bookingId,
      status,
      req.user
    );

    return res.status(200).json({
      success: true,
      message:
        status === "cancelled"
          ? "Booking cancelled successfully"
          : "Booking marked as returned. Vehicle is now available",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



export const bookingControllers = {
  createBooking,
  getAllBookings,
  updateBooking
}