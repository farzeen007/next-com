import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { backendClient } from "@/sanity/lib/client";

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { addressId } = await request.json();

    if (!addressId) {
      return NextResponse.json(
        { error: "Address ID required" },
        { status: 400 }
      );
    }

    // ✅ Only fetch if this address belongs to user
    const address = await backendClient.fetch(
      `*[_type == "address" && _id == $id][0]`,
      { id: addressId }
    );

    if (!address) {
      return NextResponse.json(
        { error: "Address not found or unauthorized" },
        { status: 404 }
      );
    }

    // 🗑️ Delete
    await backendClient.delete(addressId);

    return NextResponse.json({
      success: true,
      message: "Address deleted",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete" },
      { status: 500 }
    );
  }
}