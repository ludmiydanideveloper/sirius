import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Base de datos local activa de forma nativa en localhost. No es necesario realizar sembrado manual.'
  });
}
