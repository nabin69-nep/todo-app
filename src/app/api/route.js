import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/config/db";
import TodoModel from "../../../lib/models/TodoModel";

const loadDB = async () => {
  await connectDB();
};

loadDB();
export async function GET(request) {
  const todos = await TodoModel.find({});
  return NextResponse.json({ todos });
}
export async function POST(request) {
  const { title } = await request.json();
  await TodoModel.create({ title });
  return NextResponse.json({ msg: "Todo Created" });
}
export async function DELETE(request) {
  const mongoId=await request.nextUrl.searchParams.get('mongoId');
  await TodoModel.findByIdAndDelete(mongoId);
  return NextResponse.json({ msg: "Todo Deleted" });
}
export async function PUT(request) {
  const mongoId=await request.nextUrl.searchParams.get('mongoId');
  await TodoModel.findByIdAndUpdate(mongoId,{
    $set:{
      isCompleted: true,
    }
  });
  return NextResponse.json({ msg: "Todo Completed" });
}
