import { UserRepository } from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config";

export class AuthService {

  static async login(options: {username: string, password: string}) {
    const user = await UserRepository.getUserByName(options.username);

    if (!user) {
      throw new Error("Invalid username or password");
    }

    if (options.password != user.usr_password) {
      throw new Error("Invalid username or password");
    }

    // สร้าง JWT Token
    const token = jwt.sign(
      { id: user.usr_id, role: user.usr_role }, // ข้อมูลที่ต้องการเก็บใน token
      envConfig.seScret as string, // ความลับ (secret) สำหรับการเซ็นต์ token
      { expiresIn: "1h" } // กำหนดเวลาหมดอายุของ token
    );

    return token;
  }
}
