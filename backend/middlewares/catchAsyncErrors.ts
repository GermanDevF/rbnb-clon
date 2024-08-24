import { NextRequest, NextResponse } from "next/server";

type HandlerFunction = (req: NextRequest, params: any) => Promise<NextResponse>;

interface IValidationError {
  message: string;
  name: string;
  errors: any;
}

export const catchAsyncErrors =
  (handler: HandlerFunction) => async (req: NextRequest, params: any) => {
    try {
      return await handler(req, params);
    } catch (error: any) {
      console.log(error);

      if (error.name === "CastError") {
        const message = `Resource not found. Invalid: ${error?.path}`;
        error = new Error(message);
        error.statusCode = 400;
      }

      if (error.name === "ValidationError") {
        error.message = Object.values<IValidationError>(error.errors).map(
          (value: any) => value.message
        );
        error.statusCode = 400;
      }

      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode || 500 }
      );
    }
  };
