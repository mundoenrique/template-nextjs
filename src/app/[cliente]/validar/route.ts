import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
 let json_response = {
  status: "success",
  results: '10'
};
return NextResponse.json(json_response);
}