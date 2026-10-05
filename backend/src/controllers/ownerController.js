import bcrypt from "bcryptjs";
import { query } from "../config/db.js";

export async function dashboard(req, res, next) {
  try {
    const store = await query(
      "SELECT id, name, address FROM stores WHERE owner_id = $1",
      [req.user.id]
    );

    if (!store.rowCount) {
      return res.status(404).json({
        message: "No store is assigned to this owner.",
      });
    }

    const s = store.rows[0];

    const [avg, ratings] = await Promise.all([
      query(
        `SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0) AS average
         FROM ratings
         WHERE store_id = $1`,
        [s.id]
      ),

      query(
        `SELECT
           u.id,
           u.name,
           u.email,
           r.rating,
           r.updated_at
         FROM ratings r
         JOIN users u ON u.id = r.user_id
         WHERE r.store_id = $1
         ORDER BY r.updated_at DESC`,
        [s.id]
      ),
    ]);

    return res.json({
      store: s,
      averageRating: avg.rows[0].average,
      ratings: ratings.rows,
    });
  } catch (error) {
    next(error);
  }
}

export async function updatePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required.",
      });
    }

    if (
      newPassword.length < 8 ||
      newPassword.length > 16 ||
      !/[A-Z]/.test(newPassword) ||
      !/[^A-Za-z0-9]/.test(newPassword)
    ) {
      return res.status(400).json({
        message:
          "Password must be 8-16 characters and contain at least one uppercase letter and special character.",
      });
    }

    const result = await query(
      `SELECT password_hash
       FROM users
       WHERE id = $1 AND role = 'OWNER'`,
      [req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Owner not found.",
      });
    }

    const valid = await bcrypt.compare(
      currentPassword,
      result.rows[0].password_hash
    );

    if (!valid) {
      return res.status(400).json({
        message: "Current password is incorrect.",
      });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await query(
      `UPDATE users
       SET password_hash = $1
       WHERE id = $2`,
      [passwordHash, req.user.id]
    );

    return res.json({
      message: "Password updated successfully.",
    });
  } catch (error) {
    next(error);
  }
}