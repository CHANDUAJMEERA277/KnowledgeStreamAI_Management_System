import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const {
      full_name,
      email,
      password,
      phone,
      department,
      designation,
    } = await req.json();

    // Create Auth user
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    // Insert employee
    const { error: employeeError } = await supabaseAdmin
      .from("employees")
      .insert([
        {
          full_name,
          email,
          phone,
          department,
          designation,
          role: "employee",
          auth_user_id: authData.user.id,
        },
      ]);

    if (employeeError) {
      return NextResponse.json(
        { error: employeeError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}