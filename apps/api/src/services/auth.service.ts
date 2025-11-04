import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AppError } from '../middleware/error-handler';

// TODO: Replace with actual Prisma client when database is set up
// import { prisma } from '../lib/prisma';

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  async signup(data: SignupData) {
    const { email, password, name } = data;

    // TODO: Check if user already exists
    // const existingUser = await prisma.user.findUnique({ where: { email } });
    // if (existingUser) {
    //   throw new AppError('User already exists', 409);
    // }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // TODO: Create user in database
    // const user = await prisma.user.create({
    //   data: {
    //     email,
    //     password: hashedPassword,
    //     name,
    //   },
    // });

    // Temporary mock user
    const user = {
      id: 'temp-id',
      email,
      name,
    };

    return user;
  }

  async login(data: LoginData) {
    const { email, password } = data;

    // TODO: Find user in database
    // const user = await prisma.user.findUnique({ where: { email } });
    // if (!user) {
    //   throw new AppError('Invalid credentials', 401);
    // }

    // TODO: Verify password
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   throw new AppError('Invalid credentials', 401);
    // }

    // Temporary mock user
    const user = {
      id: 'temp-id',
      email,
      name: 'Test User',
    };

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return {
      user,
      token,
    };
  }

  async forgotPassword(email: string) {
    // TODO: Find user and generate reset token
    // const user = await prisma.user.findUnique({ where: { email } });
    // if (!user) {
    //   // Don't reveal if user exists
    //   return;
    // }

    // TODO: Generate reset token and save to database
    // const resetToken = crypto.randomBytes(32).toString('hex');
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: {
    //     resetToken,
    //     resetTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
    //   },
    // });

    // TODO: Send reset email
    console.log(`Password reset requested for: ${email}`);
  }

  async resetPassword(token: string, password: string) {
    // TODO: Find user by reset token
    // const user = await prisma.user.findFirst({
    //   where: {
    //     resetToken: token,
    //     resetTokenExpiry: { gt: new Date() },
    //   },
    // });

    // if (!user) {
    //   throw new AppError('Invalid or expired reset token', 400);
    // }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // TODO: Update password and clear reset token
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: {
    //     password: hashedPassword,
    //     resetToken: null,
    //     resetTokenExpiry: null,
    //   },
    // });

    console.log('Password reset successful');
  }
}
