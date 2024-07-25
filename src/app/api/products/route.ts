import dbConnect from "@/db/dbConnect";
import Product from "@/db/model/Product";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnect();
        const products = await Product.find({});
        return NextResponse.json(products);
    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}