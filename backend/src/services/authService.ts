import supabase from "../config/supabase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  // Check if email already exists
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  // Insert user
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        name,
        email,
        password: hashedPassword,
        is_admin: false,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  // Don't send password to frontend
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    is_admin: data.is_admin,
  };
}

export async function loginUser(
  email: string,
  password: string
) {
  // Find user
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    throw new Error(
      "Invalid email or password"
    );
  }

  // Compare password
  const isPasswordCorrect =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordCorrect) {
    throw new Error(
      "Invalid email or password"
    );
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      is_admin: user.is_admin,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return {
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    is_admin: user.is_admin,
  },
};
}